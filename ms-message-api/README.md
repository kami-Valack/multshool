# MS Message API

API para envio de emails via RabbitMQ usando arquitetura hexagonal.

## Arquitetura

Este projeto utiliza arquitetura hexagonal (ports and adapters) com as seguintes camadas:

- **Domain**: Entidades, interfaces e contratos
- **Application**: Casos de uso e lógica de negócio
- **Infrastructure**: Implementações concretas (RabbitMQ, Postmark, templates)

## Tipos de Email Suportados

- `verificacao de conta`: Email de verificação de conta
- `notificacao`: Notificações gerais
- `notificacao de pagamento`: Notificações sobre pagamentos
- `recuperacao de senha`: Email para recuperação de senha

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env`:

```env
# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_QUEUE=email_queue
RABBITMQ_EXCHANGE=email_exchange

# Postmark Configuration
POSTMARK_API_TOKEN=seu_token_aqui
POSTMARK_FROM_EMAIL=noreply@example.com
POSTMARK_FROM_NAME=MultiShol

# Application
NODE_ENV=development
PORT=3000
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## Formato da Mensagem RabbitMQ

A mensagem enviada para a fila deve seguir o seguinte formato:

```json
{
  "type": "verificacao de conta",
  "to": "usuario@example.com",
  "data": {
    "nome": "João Silva",
    "linkVerificacao": "https://example.com/verify?token=abc123",
    "tempoExpiracao": "24 horas"
  },
  "metadata": {
    "userId": "123"
  }
}
```

## Estrutura do Projeto

```
src/
├── domain/              # Camada de domínio
│   ├── entities/        # Entidades
│   ├── repositories/    # Interfaces de repositórios
│   └── services/        # Interfaces de serviços
├── application/         # Camada de aplicação
│   └── use-cases/       # Casos de uso
├── infrastructure/      # Camada de infraestrutura
│   ├── events/          # Consumidores de eventos
│   ├── repositories/    # Implementações de repositórios
│   ├── services/        # Implementações de serviços
│   └── templates/       # Templates de email HTML
├── config/              # Configurações
└── index.ts             # Ponto de entrada
```

