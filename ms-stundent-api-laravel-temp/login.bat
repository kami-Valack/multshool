@echo off
REM Script batch para fazer login e obter token
REM Uso: login.bat seu-email@example.com sua-senha

if "%1"=="" (
    echo Uso: login.bat email senha
    echo Exemplo: login.bat teste1111@example.com senha123
    exit /b 1
)

if "%2"=="" (
    echo Erro: Senha nao fornecida
    echo Uso: login.bat email senha
    exit /b 1
)

set EMAIL=%1
set PASSWORD=%2
set API_URL=http://localhost:8000

echo === Login no ms-users-api-laravel ===
echo Email: %EMAIL%
echo API URL: %API_URL%
echo.

REM Fazer login usando curl
curl -X POST %API_URL%/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"%EMAIL%\", \"password\": \"%PASSWORD%\"}"

echo.
echo.
echo Para usar o token no ms-stundent-api-laravel:
echo curl -X GET http://localhost:8001/api/me -H "Authorization: Bearer SEU_TOKEN_AQUI"

