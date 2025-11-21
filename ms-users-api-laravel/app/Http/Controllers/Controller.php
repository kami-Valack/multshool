<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="MS Users API",
 *     version="1.0.0",
 *     description="API de Autenticação e Gerenciamento de Usuários - Sistema Multishol. Gerencia autenticação JWT, registro de estudantes e escolas, verificação de email e recuperação de senha.",
 *     @OA\Contact(
 *         email="suporte@multishol.com"
 *     ),
 *     @OA\License(
 *         name="MIT",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 *
 * @OA\Server(
 *     url="http://localhost:8000",
 *     description="Servidor Local"
 * )
 *
 * @OA\Tag(
 *     name="Health",
 *     description="Endpoints de verificação de saúde da API"
 * )
 *
 * @OA\Tag(
 *     name="Authentication",
 *     description="Endpoints de autenticação (login, registro, logout)"
 * )
 *
 * @OA\Tag(
 *     name="Email Verification",
 *     description="Endpoints para verificação de email"
 * )
 *
 * @OA\Tag(
 *     name="Password Reset",
 *     description="Endpoints para recuperação de senha"
 * )
 *
 * @OA\Tag(
 *     name="Profile",
 *     description="Endpoints relacionados ao perfil do usuário autenticado"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Token JWT obtido no login. Use no formato: Bearer {token}"
 * )
 */
abstract class Controller
{
    //
}
