#!/bin/bash

# Script para limpar o cache de rotas do Laravel
# Execute este script após atualizar as rotas no servidor de produção

echo "Limpando cache de rotas do Laravel..."

php artisan route:clear
php artisan config:clear
php artisan cache:clear

echo "Cache limpo com sucesso!"
echo ""
echo "Para verificar as rotas registradas, execute:"
echo "php artisan route:list | grep check-by-course"

