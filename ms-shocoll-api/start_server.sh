#!/bin/bash

echo "========================================"
echo "  Iniciando MS School API"
echo "========================================"
echo ""

# Verificar se o RabbitMQ está acessível
echo "Verificando conexão com RabbitMQ..."
if nc -z localhost 5672 2>/dev/null; then
    echo "✓ RabbitMQ acessível"
else
    echo "✗ RabbitMQ não acessível - verifique se está rodando"
    exit 1
fi

echo ""
echo "Iniciando servidor Laravel e consumer RabbitMQ..."
echo ""

# Iniciar servidor em background
php artisan serve --port=8003 &
SERVER_PID=$!

# Aguardar um pouco para o servidor iniciar
sleep 2

# Iniciar consumer em background
php artisan rabbitmq:consume-user-events &
CONSUMER_PID=$!

echo ""
echo "========================================"
echo "  Servidor iniciado!"
echo "========================================"
echo ""
echo "Servidor Laravel: http://localhost:8003"
echo "Consumer RabbitMQ: Rodando (PID: $CONSUMER_PID)"
echo ""
echo "PIDs:"
echo "  Server: $SERVER_PID"
echo "  Consumer: $CONSUMER_PID"
echo ""
echo "Para parar, execute:"
echo "  kill $SERVER_PID $CONSUMER_PID"
echo ""

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "Parando processos..."
    kill $SERVER_PID $CONSUMER_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Manter script rodando
wait

