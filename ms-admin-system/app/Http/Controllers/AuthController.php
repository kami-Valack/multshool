<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterAdminRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Endpoints de autenticação do sistema admin"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Login de administrador",
     *     description="Faz login no sistema administrativo usando email e senha locais",
     *     operationId="login",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="admin"),
     *             @OA\Property(property="password", type="string", example="admin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login realizado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="accessToken", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."),
     *             @OA\Property(property="expiresIn", type="integer", example=3600),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", example="uuid"),
     *                 @OA\Property(property="email", type="string", example="admin"),
     *                 @OA\Property(property="name", type="string", example="Administrador"),
     *                 @OA\Property(property="role", type="string", example="super_admin")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciais inválidas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Credenciais inválidas")
     *         )
     *     )
     * )
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $credentials = $request->only('email', 'password');

            // Buscar usuário pelo email
            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Credenciais inválidas',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Verificar senha
            if (!Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Credenciais inválidas',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Verificar se o usuário está ativo
            if (!$user->is_active) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Conta desativada',
                ], Response::HTTP_FORBIDDEN);
            }

            // Verificar se é admin
            if (!$user->isAdmin()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Acesso negado. Apenas administradores podem fazer login.',
                ], Response::HTTP_FORBIDDEN);
            }

            // Gerar token JWT
            $token = JWTAuth::fromUser($user);
            $ttl = config('jwt.ttl', 60); // minutos
            $expiresIn = $ttl * 60; // segundos

            Log::info('Login realizado com sucesso', [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
            ]);

            return response()->json([
                'status' => 'success',
                'accessToken' => $token,
                'expiresIn' => $expiresIn,
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                ],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Erro ao fazer login', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer login: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Registrar novo administrador",
     *     description="Registra um novo administrador. Apenas super_admin pode registrar novos admins.",
     *     operationId="registerAdmin",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password", "password_confirmation", "role"},
     *             @OA\Property(property="name", type="string", example="Novo Admin"),
     *             @OA\Property(property="email", type="string", example="novo@admin.com"),
     *             @OA\Property(property="password", type="string", example="senha123"),
     *             @OA\Property(property="password_confirmation", type="string", example="senha123"),
     *             @OA\Property(property="role", type="string", example="admin", enum={"admin", "super_admin"})
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Administrador criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Administrador criado com sucesso"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", example="uuid"),
     *                 @OA\Property(property="email", type="string", example="novo@admin.com"),
     *                 @OA\Property(property="name", type="string", example="Novo Admin"),
     *                 @OA\Property(property="role", type="string", example="admin")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Acesso negado - apenas super_admin",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Apenas super_admin pode registrar novos administradores")
     *         )
     *     )
     * )
     */
    public function register(RegisterAdminRequest $request): JsonResponse
    {
        try {
            // Verificar se o usuário atual é super_admin
            if (!$request->user()->isSuperAdmin()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Apenas super_admin pode registrar novos administradores',
                ], Response::HTTP_FORBIDDEN);
            }

            // Criar novo admin
            $user = User::create([
                'name' => $request->name,
                'email' => strtolower(trim($request->email)),
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'email_verified' => true, // Admins são verificados automaticamente
                'is_active' => true,
            ]);

            Log::info('Novo administrador criado', [
                'created_by' => $request->user()->id,
                'new_admin_id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Administrador criado com sucesso',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                ],
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error('Erro ao criar administrador', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar administrador: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Logout",
     *     description="Faz logout do sistema administrativo",
     *     operationId="logout",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
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
    public function logout(): JsonResponse
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'status' => 'success',
                'message' => 'Logout realizado com sucesso',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer logout: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
