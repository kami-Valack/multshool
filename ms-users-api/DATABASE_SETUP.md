# Configuração do Banco de Dados PostgreSQL

## 🔧 Configuração

A API usa PostgreSQL através do TypeORM. Para usar o banco de dados, configure a variável `DATABASE_URL` no arquivo `.env`:

```env
DATABASE_URL=postgresql://postgres:QnBNIXCSjThlsLuyKuNhjkAkxEjxVDPz@crossover.proxy.rlwy.net:20587/railway
```

## 📊 Estrutura do Banco

O TypeORM criará automaticamente as seguintes tabelas:

### Tabela: `users`
- `id` (UUID, PK)
- `email` (VARCHAR, UNIQUE)
- `passwordHash` (VARCHAR)
- `name` (VARCHAR)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)
- `isActive` (BOOLEAN)
- `emailVerified` (BOOLEAN)

### Tabela: `password_reset_tokens`
- `id` (UUID, PK)
- `userId` (UUID, FK -> users.id)
- `token` (VARCHAR, UNIQUE)
- `expiresAt` (TIMESTAMP)
- `used` (BOOLEAN)
- `createdAt` (TIMESTAMP)

### Tabela: `refresh_tokens`
- `id` (UUID, PK)
- `userId` (UUID, FK -> users.id)
- `token` (VARCHAR, UNIQUE)
- `expiresAt` (TIMESTAMP)
- `revoked` (BOOLEAN)
- `createdAt` (TIMESTAMP)
- `deviceInfo` (VARCHAR, NULLABLE)

### Tabela: `email_verification_tokens`
- `id` (UUID, PK)
- `userId` (UUID, FK -> users.id)
- `token` (VARCHAR, UNIQUE)
- `expiresAt` (TIMESTAMP)
- `used` (BOOLEAN)
- `createdAt` (TIMESTAMP)

## 🚀 Como Funciona

1. **Com DATABASE_URL configurado**: A API usa repositórios PostgreSQL
2. **Sem DATABASE_URL**: A API usa repositórios em memória (para testes)

## ⚠️ Importante

- `synchronize: true` está ativo apenas para desenvolvimento
- Para produção, desative `synchronize` e use migrations do TypeORM
- As tabelas são criadas automaticamente na primeira execução

## 🔍 Verificar Conexão

Ao iniciar a API, você verá:
- `Conectado ao PostgreSQL com sucesso` - se a conexão funcionar
- `Erro ao conectar ao PostgreSQL` - se houver problema

