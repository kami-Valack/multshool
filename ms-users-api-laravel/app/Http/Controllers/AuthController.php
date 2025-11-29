<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\RegisterSchoolRequest;
use App\Http\Requests\Auth\RegisterTeacherRequest;
use App\Http\Requests\Auth\RefreshTokenRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;
use App\Jobs\SendPasswordResetEmailJob;
use App\Jobs\SendVerificationEmailJob;
use App\Models\EmailVerificationToken;
use App\Models\PasswordResetToken;
use App\Models\RefreshToken;
use App\Models\User;
use App\Services\JwtTokenService;
use App\Services\RabbitMQUserEventService;
use App\Services\RabbitMQEmailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __construct(
        private JwtTokenService $tokenService,
        private RabbitMQUserEventService $userEventService,
        private RabbitMQEmailService $emailService
    ) {}

    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Registrar novo estudante",
     *     description="Cria uma nova conta de estudante. Um email de verificação será enviado.",
     *     operationId="register",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password"},
     *             @OA\Property(property="name", type="string", example="João Silva", description="Nome completo do estudante"),
     *             @OA\Property(property="email", type="string", format="email", example="joao@example.com", description="Email do estudante"),
     *             @OA\Property(property="password", type="string", format="password", example="senha123456", description="Senha (mínimo 8 caracteres)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Usuário criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Usuário criado com sucesso"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
     *                 @OA\Property(property="student_id", type="string", example="ST2025000001"),
     *                 @OA\Property(property="email", type="string", example="joao@example.com"),
     *                 @OA\Property(property="name", type="string", example="João Silva"),
     *                 @OA\Property(property="role", type="string", example="student")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro de validação ou email já em uso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Email já está em uso")
     *         )
     *     )
     * )
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            // Check if email already exists
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email já está em uso',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Verificar se auto-verificação está ativa (modo desenvolvimento)
            $autoVerify = env('AUTO_VERIFY_EMAILS', false);

            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => strtolower(trim($request->email)),
                'password' => Hash::make($request->password),
                'role' => User::ROLE_STUDENT,
                'email_verified' => $autoVerify, // Verificado automaticamente se AUTO_VERIFY_EMAILS=true
                'is_active' => true,
            ]);

            if ($autoVerify) {
                // Modo desenvolvimento: verificar email automaticamente
                $user->verifyEmail();
                
                // Emitir evento de usuário verificado imediatamente
                $this->userEventService->emitUserVerifiedEvent($user);
                
                // Se for docente, tentar replicar diretamente via HTTP (fallback se RabbitMQ não estiver disponível)
                if ($user->role === User::ROLE_TEACHER) {
                    $this->replicateTeacherDirectly($user);
                }
            } else {
                // Modo produção: enviar email de verificação
                // Generate verification token
                $verificationToken = EmailVerificationToken::generate();
                $verificationUrl = config('app.frontend_url', 'http://localhost:3001') . 
                                 '/verify-email?token=' . $verificationToken;

                // Create email verification token
                EmailVerificationToken::create([
                    'user_id' => $user->id,
                    'token' => $verificationToken,
                    'expires_at' => now()->addHours(24),
                    'used' => false,
                ]);

                // Send verification email event via RabbitMQ (directly, not via Job)
                $this->emailService->sendEmailEvent(
                    'verificacao de conta',
                    $user->email,
                    [
                        'nome' => $user->name,
                        'linkVerificacao' => $verificationUrl,
                        'token' => $verificationToken,
                        'tempoExpiracao' => '24 horas',
                    ],
                    [
                        'userId' => $user->id,
                    ]
                );
            }

            return response()->json([
                'status' => 'success',
                'message' => $autoVerify 
                    ? 'Usuário criado e verificado automaticamente (modo desenvolvimento)' 
                    : 'Usuário criado com sucesso',
                'user' => [
                    'id' => $user->id,
                    'student_id' => $user->student_id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'email_verified' => $user->email_verified,
                ],
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar usuário: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/register-school",
     *     summary="Registrar nova escola",
     *     description="Cria uma nova conta de escola. Um email de verificação será enviado. Após verificação, a escola precisa ser aprovada por um administrador.",
     *     operationId="registerSchool",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password", "institution_type"},
     *             @OA\Property(property="name", type="string", example="Escola Exemplo", description="Nome da escola"),
     *             @OA\Property(property="email", type="string", format="email", example="escola@example.com", description="Email da escola"),
     *             @OA\Property(property="password", type="string", format="password", example="senha123456", description="Senha (mínimo 8 caracteres)"),
     *             @OA\Property(property="institution_type", type="string", enum={"medio", "superior"}, example="medio", description="Tipo de instituição: 'medio' para ensino médio ou 'superior' para ensino superior")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Escola cadastrada com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Escola cadastrada com sucesso. Verifique seu email para ativar a conta."),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid"),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="role", type="string", example="school"),
     *                 @OA\Property(property="email_verified", type="boolean", example=false)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro de validação ou email já em uso"
     *     )
     * )
     */
    public function registerSchool(RegisterSchoolRequest $request): JsonResponse
    {
        try {
            // Check if email already exists
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email já está em uso',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Verificar se auto-verificação está ativa (modo desenvolvimento)
            $autoVerify = env('AUTO_VERIFY_EMAILS', false);

            // Create school user
            $user = User::create([
                'name' => $request->name,
                'email' => strtolower(trim($request->email)),
                'password' => Hash::make($request->password),
                'role' => User::ROLE_SCHOOL,
                'institution_type' => $request->institution_type, // 'medio' ou 'superior'
                'email_verified' => $autoVerify, // Verificado automaticamente se AUTO_VERIFY_EMAILS=true
                'is_active' => true,
            ]);

            if ($autoVerify) {
                // Modo desenvolvimento: verificar email automaticamente
                $user->verifyEmail();
                
                // Emitir evento de escola criada imediatamente
                $this->userEventService->emitSchoolCreatedEvent($user);
            } else {
                // Modo produção: enviar email de verificação
                // Generate verification token
                $verificationToken = EmailVerificationToken::generate();
                $verificationUrl = config('app.frontend_url', 'http://localhost:3001') . 
                                 '/verify-email?token=' . $verificationToken;

                // Create email verification token
                EmailVerificationToken::create([
                    'user_id' => $user->id,
                    'token' => $verificationToken,
                    'expires_at' => now()->addHours(24),
                    'used' => false,
                ]);

                // Send verification email event via RabbitMQ
                $this->emailService->sendEmailEvent(
                    'verificacao de conta',
                    $user->email,
                    [
                        'nome' => $user->name,
                        'linkVerificacao' => $verificationUrl,
                        'token' => $verificationToken,
                        'tempoExpiracao' => '24 horas',
                    ],
                    [
                        'userId' => $user->id,
                    ]
                );

                // Emit school.create event to RabbitMQ (only after email is verified)
                // Event will be emitted when email is verified via verifyEmail endpoint
            }

            return response()->json([
                'status' => 'success',
                'message' => $autoVerify 
                    ? 'Escola cadastrada e verificada automaticamente (modo desenvolvimento)' 
                    : 'Escola cadastrada com sucesso. Verifique seu email para ativar a conta.',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'email_verified' => $user->email_verified,
                ],
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao cadastrar escola: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/register-teacher",
     *     summary="Registrar novo docente",
     *     description="Cria uma nova conta de docente. Um email de verificação será enviado.",
     *     operationId="registerTeacher",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password"},
     *             @OA\Property(property="name", type="string", example="Professor João Silva", description="Nome completo do docente"),
     *             @OA\Property(property="email", type="string", format="email", example="professor@example.com", description="Email do docente"),
     *             @OA\Property(property="password", type="string", format="password", example="senha123456", description="Senha (mínimo 8 caracteres)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Docente criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Docente cadastrado com sucesso"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
     *                 @OA\Property(property="email", type="string", example="professor@example.com"),
     *                 @OA\Property(property="name", type="string", example="Professor João Silva"),
     *                 @OA\Property(property="role", type="string", example="teacher"),
     *                 @OA\Property(property="email_verified", type="boolean", example=false)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro de validação ou email já em uso"
     *     )
     * )
     */
    public function registerTeacher(RegisterTeacherRequest $request): JsonResponse
    {
        try {
            // Check if email already exists
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email já está em uso',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Verificar se auto-verificação está ativa (modo desenvolvimento)
            $autoVerify = env('AUTO_VERIFY_EMAILS', false);

            // Create teacher user
            $user = User::create([
                'name' => $request->name,
                'email' => strtolower(trim($request->email)),
                'password' => Hash::make($request->password),
                'role' => User::ROLE_TEACHER,
                'email_verified' => $autoVerify, // Verificado automaticamente se AUTO_VERIFY_EMAILS=true
                'is_active' => true,
            ]);

            if ($autoVerify) {
                // Modo desenvolvimento: verificar email automaticamente
                $user->verifyEmail();
                
                // Emitir evento de usuário verificado imediatamente
                $this->userEventService->emitUserVerifiedEvent($user);
                
                // Tentar replicar diretamente via HTTP (fallback se RabbitMQ não estiver disponível)
                $this->replicateTeacherDirectly($user);
            } else {
                // Modo produção: enviar email de verificação
                // Generate verification token
                $verificationToken = EmailVerificationToken::generate();
                $verificationUrl = config('app.frontend_url', 'http://localhost:3001') . 
                                 '/verify-email?token=' . $verificationToken;

                // Create email verification token
                EmailVerificationToken::create([
                    'user_id' => $user->id,
                    'token' => $verificationToken,
                    'expires_at' => now()->addHours(24),
                    'used' => false,
                ]);

                // Send verification email event via RabbitMQ
                $this->emailService->sendEmailEvent(
                    'verificacao de conta',
                    $user->email,
                    [
                        'nome' => $user->name,
                        'linkVerificacao' => $verificationUrl,
                        'token' => $verificationToken,
                        'tempoExpiracao' => '24 horas',
                    ],
                    [
                        'userId' => $user->id,
                    ]
                );

                // Event will be emitted when email is verified via verifyEmail endpoint
            }

            return response()->json([
                'status' => 'success',
                'message' => $autoVerify 
                    ? 'Docente cadastrado e verificado automaticamente (modo desenvolvimento)' 
                    : 'Docente cadastrado com sucesso. Verifique seu email para ativar a conta.',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'email_verified' => $user->email_verified,
                ],
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao cadastrar docente: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Fazer login",
     *     description="Autentica um usuário e retorna tokens JWT. Pode usar email ou student_id para login.",
     *     operationId="login",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="joao@example.com", description="Email ou Student ID"),
     *             @OA\Property(property="password", type="string", format="password", example="senha123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login realizado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="accessToken", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."),
     *             @OA\Property(property="refreshToken", type="string", example="a792c6874040f28f19fec6227feba2ca..."),
     *             @OA\Property(property="expiresIn", type="integer", example=900, description="Tempo de expiração em segundos (15 minutos)"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid"),
     *                 @OA\Property(property="student_id", type="string", nullable=true),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="role", type="string", enum={"student", "school"})
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciais inválidas ou email não verificado",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Email não verificado. Por favor, verifique seu email antes de fazer login.")
     *         )
     *     )
     * )
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            // Try to find user by email or student_id
            $identifier = strtolower(trim($request->email));
            $user = User::where('email', $identifier)
                ->orWhere('student_id', $identifier)
                ->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Credenciais inválidas',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Check if user is active
            if (!$user->is_active) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Conta desativada',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Check if email is verified
            if (!$user->email_verified) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email não verificado. Por favor, verifique seu email antes de fazer login.',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Verify password
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Credenciais inválidas',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Generate tokens
            $tokenPair = $this->tokenService->generateTokenPair($user);

            // Save refresh token
            RefreshToken::create([
                'user_id' => $user->id,
                'token' => $tokenPair['refreshToken'],
                'expires_at' => now()->addDays(7),
                'revoked' => false,
                'device_info' => $request->header('User-Agent'),
            ]);

            return response()->json([
                'status' => 'success',
                'accessToken' => $tokenPair['accessToken'],
                'refreshToken' => $tokenPair['refreshToken'],
                'expiresIn' => $tokenPair['expiresIn'],
                'user' => [
                    'id' => $user->id,
                    'student_id' => $user->student_id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                ],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Erro ao fazer login', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer login: ' . ($e->getMessage() ?? 'An error occurred'),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/refresh-token",
     *     summary="Renovar token de acesso",
     *     description="Renova o access token usando o refresh token. O refresh token antigo é revogado e um novo é gerado.",
     *     operationId="refreshToken",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"refreshToken"},
     *             @OA\Property(property="refreshToken", type="string", example="a792c6874040f28f19fec6227feba2ca...")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Token renovado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="accessToken", type="string"),
     *             @OA\Property(property="refreshToken", type="string"),
     *             @OA\Property(property="expiresIn", type="integer", example=900)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Token inválido ou expirado"
     *     )
     * )
     */
    public function refreshToken(RefreshTokenRequest $request): JsonResponse
    {
        try {
            $refreshToken = $request->refreshToken;

            // Verify token format
            if (!$this->tokenService->verifyRefreshTokenFormat($refreshToken)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Find refresh token
            $tokenEntity = RefreshToken::where('token', $refreshToken)->first();

            if (!$tokenEntity) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token não encontrado',
                ], Response::HTTP_NOT_FOUND);
            }

            // Check if token is valid
            if (!$tokenEntity->isValid()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token expirado ou revogado',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Get user
            $user = User::find($tokenEntity->user_id);

            if (!$user || !$user->is_active) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não encontrado ou inativo',
                ], Response::HTTP_NOT_FOUND);
            }

            // Revoke old token
            $tokenEntity->revoke();

            // Generate new tokens
            $newTokenPair = $this->tokenService->generateTokenPair($user);

            // Save new refresh token
            RefreshToken::create([
                'user_id' => $user->id,
                'token' => $newTokenPair['refreshToken'],
                'expires_at' => now()->addDays(7),
                'revoked' => false,
            ]);

            return response()->json([
                'status' => 'success',
                'accessToken' => $newTokenPair['accessToken'],
                'refreshToken' => $newTokenPair['refreshToken'],
                'expiresIn' => $newTokenPair['expiresIn'],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Erro ao renovar token', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao renovar token: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/verify-email",
     *     summary="Verificar email",
     *     description="Verifica o email do usuário usando o token enviado por email. Após verificação, eventos são emitidos via RabbitMQ.",
     *     operationId="verifyEmail",
     *     tags={"Email Verification"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"token"},
     *             @OA\Property(property="token", type="string", example="abc123def456...", description="Token de verificação recebido por email")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Email verificado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Email verificado com sucesso")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Token inválido, expirado ou já utilizado",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Token expirado ou já utilizado")
     *         )
     *     )
     * )
     */
    public function verifyEmail(VerifyEmailRequest $request): JsonResponse
    {
        try {
            $token = $request->token;

            // Find verification token
            $verificationToken = EmailVerificationToken::where('token', $token)->first();

            if (!$verificationToken) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Check if token is valid
            if (!$verificationToken->isValid()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token expirado ou já utilizado',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Get user
            $user = User::find($verificationToken->user_id);

            if (!$user || !$user->is_active) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não encontrado ou inativo',
                ], Response::HTTP_NOT_FOUND);
            }

            // Check if already verified
            if ($user->email_verified) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email já foi verificado',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Verify email
            $user->verifyEmail();

            // Mark token as used
            $verificationToken->markAsUsed();

            // Emit events based on user role
            if ($user->role === User::ROLE_SCHOOL) {
                // Emit school.create event for schools
                $this->userEventService->emitSchoolCreatedEvent($user);
            } else {
                // Emit user.verified event for students
                $this->userEventService->emitUserVerifiedEvent($user);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Email verificado com sucesso',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao verificar email: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/password-reset/request",
     *     summary="Solicitar reset de senha",
     *     description="Solicita um token para reset de senha. Um email será enviado com o token (válido por 1 hora).",
     *     operationId="forgotPassword",
     *     tags={"Password Reset"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="joao@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Email enviado (mesmo se o email não existir, por segurança)",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Se o email existir, um link de recuperação foi enviado")
     *         )
     *     )
     * )
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', strtolower(trim($request->email)))->first();

            if (!$user) {
                // Return success even if user doesn't exist (security best practice)
                return response()->json([
                    'status' => 'success',
                    'message' => 'Se o email existir, um link de recuperação foi enviado',
                ], Response::HTTP_OK);
            }

            // Generate reset token
            $token = Str::random(64);

            // Store token in password_reset_tokens table
            $passwordReset = PasswordResetToken::updateOrCreate(
                ['email' => $user->email],
                [
                    'token' => Hash::make($token),
                    'created_at' => now(),
                ]
            );
            
            // Ensure created_at is set (in case updateOrCreate didn't set it)
            if (!$passwordReset->created_at) {
                $passwordReset->created_at = now();
                $passwordReset->save();
            }

            // Log token for debugging (remove in production!)
            \Log::info('Token de reset de senha gerado', [
                'email' => $user->email,
                'token' => $token,
                'token_hash' => Hash::make($token),
            ]);

            // Send password reset email via RabbitMQ
            SendPasswordResetEmailJob::dispatch($user, $token);

            return response()->json([
                'status' => 'success',
                'message' => 'Se o email existir, um link de recuperação foi enviado',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao solicitar reset de senha: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/password-reset/reset",
     *     summary="Resetar senha",
     *     description="Reseta a senha usando o token recebido por email. Todos os refresh tokens são revogados.",
     *     operationId="resetPassword",
     *     tags={"Password Reset"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "token", "newPassword"},
     *             @OA\Property(property="email", type="string", format="email", example="joao@example.com"),
     *             @OA\Property(property="token", type="string", example="abc123def456...", description="Token recebido por email (NÃO o hash do banco)"),
     *             @OA\Property(property="newPassword", type="string", format="password", example="novaSenha123456", description="Nova senha (mínimo 8 caracteres)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Senha alterada com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Senha alterada com sucesso")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Token inválido ou expirado"
     *     )
     * )
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        try {
            // Find password reset token by email
            $passwordReset = PasswordResetToken::where('email', strtolower(trim($request->email)))->first();

            if (!$passwordReset) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token de reset não encontrado. Solicite um novo reset.',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Ensure created_at is set (fix for null created_at from old records)
            if (!$passwordReset->created_at) {
                // If created_at is null, set it to now and save
                $passwordReset->created_at = now();
                $passwordReset->save();
                // Reload to ensure the attribute is properly cast
                $passwordReset->refresh();
            }

            // Check if token is valid (will check expiration)
            if (!$passwordReset->isValid()) {
                $passwordReset->delete();
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token expirado. Solicite um novo reset de senha.',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Verify token
            if (!$passwordReset->verifyToken($request->token)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido.',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Get user
            $user = User::where('email', $passwordReset->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não encontrado.',
                ], Response::HTTP_NOT_FOUND);
            }

            // Check if new password is different from current password
            if (Hash::check($request->newPassword, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A nova senha deve ser diferente da senha atual.',
                ], Response::HTTP_BAD_REQUEST);
            }

            // Update password
            $user->update([
                'password' => Hash::make($request->newPassword),
            ]);

            // Delete the used token
            $passwordReset->delete();

            // Revoke all refresh tokens (force new login)
            RefreshToken::where('user_id', $user->id)->update(['revoked' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Senha alterada com sucesso',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Erro ao resetar senha', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'email' => $request->email ?? 'N/A',
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao resetar senha: ' . ($e->getMessage() ?? 'An error occurred'),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Fazer logout",
     *     description="Revoga o refresh token fornecido. Não requer autenticação.",
     *     operationId="logout",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"refreshToken"},
     *             @OA\Property(property="refreshToken", type="string", example="a792c6874040f28f19fec6227feba2ca...")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Logout realizado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Logout realizado com sucesso")
     *         )
     *     )
     * )
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // Get refresh token from request body
            $refreshToken = $request->input('refreshToken');

            if (!$refreshToken) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Refresh token é obrigatório',
                ], Response::HTTP_BAD_REQUEST);
            }

            $tokenEntity = RefreshToken::where('token', $refreshToken)->first();
            if ($tokenEntity) {
                $tokenEntity->revoke();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Logout realizado com sucesso',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Erro ao fazer logout', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer logout: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout-all",
     *     summary="Fazer logout de todos os dispositivos",
     *     description="Revoga todos os refresh tokens do usuário autenticado, fazendo logout de todos os dispositivos.",
     *     operationId="logoutAll",
     *     tags={"Authentication"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logout realizado em todos os dispositivos",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Logout realizado em todos os dispositivos")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado"
     *     )
     * )
     */
    public function logoutAll(Request $request): JsonResponse
    {
        try {
            $user = auth('api')->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não autenticado',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Revoke all refresh tokens
            RefreshToken::where('user_id', $user->id)->update(['revoked' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Logout realizado em todos os dispositivos',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer logout: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/auth/me",
     *     summary="Obter perfil do usuário autenticado",
     *     description="Retorna os dados do usuário autenticado",
     *     operationId="me",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil do usuário",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid"),
     *                 @OA\Property(property="email", type="string", example="joao@example.com"),
     *                 @OA\Property(property="name", type="string", example="João Silva"),
     *                 @OA\Property(property="role", type="string", enum={"student", "school"}),
     *                 @OA\Property(property="email_verified", type="boolean", example=true),
     *                 @OA\Property(property="is_active", type="boolean", example=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Usuário não autenticado")
     *         )
     *     )
     * )
     */
    public function me(): JsonResponse
    {
        try {
            $user = auth('api')->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não autenticado',
                ], Response::HTTP_UNAUTHORIZED);
            }

            return response()->json([
                'status' => 'success',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'email_verified' => $user->email_verified,
                    'is_active' => $user->is_active,
                ],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao obter perfil: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Replicate teacher directly to ms-shocoll-api via HTTP (fallback when RabbitMQ is not available).
     */
    private function replicateTeacherDirectly(User $user): void
    {
        try {
            $schoolApiUrl = env('SCHOOL_API_URL', 'http://localhost:8003');
            $schoolApiSecret = env('SCHOOL_API_SECRET', env('API_SECRET', ''));
            
            if (!$schoolApiUrl || !$schoolApiSecret) {
                \Log::warning('SCHOOL_API_URL ou SCHOOL_API_SECRET não configurados, pulando replicação direta');
                return;
            }

            // Tentar replicar via HTTP endpoint
            $response = Http::withHeaders([
                'X-API-Secret' => $schoolApiSecret,
                'Content-Type' => 'application/json',
            ])->post("{$schoolApiUrl}/api/admin/teachers/replicate", [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'email_verified' => $user->email_verified,
                'is_active' => $user->is_active,
            ]);

            if ($response->successful()) {
                \Log::info('Docente replicado diretamente via HTTP', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                ]);
            } else {
                \Log::warning('Falha ao replicar docente via HTTP, tentando RabbitMQ', [
                    'user_id' => $user->id,
                    'response' => $response->body(),
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('Erro ao tentar replicar docente diretamente', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
            ]);
            // Não falhar o registro se a replicação direta falhar
            // O RabbitMQ ainda pode processar o evento
        }
    }
}

