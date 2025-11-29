<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="MS School API",
 *     version="1.0.0",
 *     description="API para gerenciamento de escolas - Sistema Multishol. Use o token JWT obtido no ms-users-api-laravel para autenticação. Apenas usuários com role 'school' podem acessar.",
 *     @OA\Contact(
 *         email="suporte@multishol.com"
 *     )
 * )
 *
 * @OA\Server(
 *     url="http://localhost:8003",
 *     description="Servidor Local"
 * )
 *
 * @OA\Server(
 *     url="http://ec2-54-164-91-182.compute-1.amazonaws.com:8003",
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
 *     description="Endpoints relacionados ao perfil da escola"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Use o token JWT obtido no login do ms-users-api-laravel. Exemplo: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="apiSecret",
 *     type="apiKey",
 *     in="header",
 *     name="X-API-Secret",
 *     description="API Secret para comunicação entre serviços (ms-admin-system -> ms-shocoll-api)"
 * )
 */
abstract class Controller
{
    //
}
