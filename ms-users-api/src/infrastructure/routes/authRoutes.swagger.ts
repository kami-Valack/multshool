/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Registra um novo usuário
 *     description: |
 *       Cria um novo usuário com role padrão "student".
 *       Envia email de verificação ao RabbitMQ.
 *       Rate limit: 5 tentativas por 15 minutos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Dados inválidos ou email já em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Muitas tentativas de registro
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Autentica um usuário
 *     description: |
 *       Realiza login e retorna tokens JWT.
 *       Requer email verificado.
 *       Rate limit: 10 tentativas por 15 minutos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas ou email não verificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Muitas tentativas de login
 */

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Renova os tokens de acesso
 *     description: Gera novos access token e refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Tokens renovados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 expiresIn:
 *                   type: number
 *       401:
 *         description: Refresh token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Verifica o email do usuário
 *     description: |
 *       Verifica o email usando o token enviado por email.
 *       Rate limit: 10 tentativas por 15 minutos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmailRequest'
 *     responses:
 *       200:
 *         description: Email verificado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Token inválido, expirado ou já usado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Muitas tentativas de verificação
 */

/**
 * @swagger
 * /api/auth/password-reset/request:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Solicita recuperação de senha
 *     description: |
 *       Envia email de recuperação de senha ao RabbitMQ.
 *       Sempre retorna sucesso (por segurança, não revela se email existe).
 *       Rate limit: 3 tentativas por 1 hora.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestPasswordResetRequest'
 *     responses:
 *       200:
 *         description: Email de recuperação enviado (se o email existir)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       429:
 *         description: Muitas tentativas de recuperação
 */

/**
 * @swagger
 * /api/auth/password-reset/reset:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Redefine a senha do usuário
 *     description: |
 *       Redefine a senha usando o token de recuperação.
 *       Revoga todos os refresh tokens do usuário.
 *       Rate limit: 3 tentativas por 1 hora.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Token inválido, expirado ou já usado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Muitas tentativas de reset
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realiza logout
 *     description: Revoga o refresh token fornecido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Refresh token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/logout-all:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realiza logout de todos os dispositivos
 *     description: Revoga todos os refresh tokens do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado em todos os dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Verifica o status da API
 *     description: Retorna o status e timestamp da API
 *     responses:
 *       200:
 *         description: API está funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: '2024-01-01T00:00:00.000Z'
 */


