<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="MS Student API",
 *     version="1.0.0",
 *     description="API para gerenciamento de estudantes - Sistema Multishol. Use o token JWT obtido no ms-users-api-laravel para autenticação.",
 *     @OA\Contact(
 *         email="suporte@multishol.com"
 *     )
 * )
 *
 * @OA\Server(
 *     url="http://localhost:8001",
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
 *     description="Endpoints relacionados ao perfil do estudante"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Use o token JWT obtido no login do ms-users-api-laravel. Exemplo: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
 * )
 */
abstract class Controller
{
    //
}
