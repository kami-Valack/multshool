# Solução: Rota check-by-course não encontrada

## Problema

A rota `api/student/payments/check-by-course` está retornando erro 404 (não encontrada), mesmo estando definida no arquivo `routes/api.php`.

## Causa

O Laravel mantém um cache de rotas para melhorar a performance. Quando você adiciona ou modifica rotas, é necessário limpar esse cache.

## Solução

Execute os seguintes comandos no servidor onde o Laravel está rodando:

```bash
cd /home/ubuntu/valack/multshool/ms-stundent-api-laravel-temp

# Limpar cache de rotas
php artisan route:clear

# Limpar cache de configuração (opcional, mas recomendado)
php artisan config:clear

# Limpar cache geral (opcional)
php artisan cache:clear
```

Ou execute o script fornecido:

```bash
chmod +x clear-route-cache.sh
./clear-route-cache.sh
```

## Verificação

Para verificar se a rota foi registrada corretamente, execute:

```bash
php artisan route:list | grep check-by-course
```

Você deve ver algo como:

```
GET|HEAD  api/student/payments/check-by-course ................. Student\PaymentController@getByStudentAndCourse
```

## Nota Importante

Sempre que você:
- Adicionar novas rotas
- Modificar rotas existentes
- Alterar middlewares de rotas

Execute `php artisan route:clear` para garantir que as mudanças sejam aplicadas.

## Se o problema persistir

1. Verifique se o arquivo `routes/api.php` foi atualizado no servidor
2. Verifique se não há erros de sintaxe no arquivo de rotas
3. Verifique os logs do Laravel: `storage/logs/laravel.log`
4. Certifique-se de que o método `getByStudentAndCourse` existe no `PaymentController`

