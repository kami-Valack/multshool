<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="MS Admin API",
 *     version="1.0.0",
 *     description="API para sistema administrativo - Sistema Multishol. Use o token JWT obtido no ms-users-api-laravel para autenticação. Apenas usuários com role 'admin' ou 'super_admin' podem acessar.",
 *     @OA\Contact(
 *         email="suporte@multishol.com"
 *     )
 * )
 *
 * @OA\Server(
 *     url="http://localhost:8002",
 *     description="Servidor Local"
 * )
 *
 * @OA\Server(
 *     url="http://ec2-54-164-91-182.compute-1.amazonaws.com",
 *     description="Servidor VPS (Produção)"
 * )
 *
 * @OA\Tag(
 *     name="Health",
 *     description="Endpoints de verificação de saúde da API"
 * )
 *
 * @OA\Tag(
 *     name="Profile",
 *     description="Endpoints relacionados ao perfil do administrador"
 * )
 *
 * @OA\Tag(
 *     name="Auth",
 *     description="Endpoints de autenticação do sistema admin"
 * )
 *
 * @OA\Tag(
 *     name="Schools",
 *     description="Gerenciamento de escolas (aprovação/rejeição)"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Use o token JWT obtido no login do sistema admin (POST /api/auth/login). Exemplo: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
 * )
 */
abstract class Controller
{
    //
}
