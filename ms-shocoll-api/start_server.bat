@echo off
echo ========================================
echo   Iniciando MS School API
echo ========================================
echo.

REM Verificar se o RabbitMQ está acessível
echo Verificando conexao com RabbitMQ...
powershell -Command "try { $connection = Test-NetConnection -ComputerName localhost -Port 5672 -InformationLevel Quiet; if ($connection) { Write-Host 'OK - RabbitMQ acessivel' } else { Write-Host 'ERRO - RabbitMQ nao acessivel' } } catch { Write-Host 'ERRO - RabbitMQ nao acessivel' }"
echo.

echo Iniciando servidor Laravel e consumer RabbitMQ...
echo.

REM Iniciar servidor e consumer em paralelo usando start
start "Laravel Server" cmd /k "php artisan serve --port=8003"
timeout /t 2 /nobreak >nul

start "RabbitMQ Consumer" cmd /k "php artisan rabbitmq:consume-user-events"

echo.
echo ========================================
echo   Servidor iniciado!
echo ========================================
echo.
echo Servidor Laravel: http://localhost:8003
echo Consumer RabbitMQ: Rodando em janela separada
echo.
echo Pressione qualquer tecla para fechar esta janela...
echo (As janelas do servidor e consumer continuarao abertas)
pause >nul

