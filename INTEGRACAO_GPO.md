# Integração GPO - Gateway de Pagamento

Este documento descreve a integração do gateway de pagamento GPO no sistema MultSchool.

## 📋 Configuração

### Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis de ambiente no arquivo `.env` do projeto `ms-shocoll-api`:

```env
# GPO Configuration
GPO_FRAME_TOKEN=seu_frame_token_aqui
GPO_CALLBACK_URL=https://seu-dominio.com/api/payments/gpo-callback
GPO_CSS_URL=https://seu-dominio.com/estilos-gpo.css
GPO_API_URL=https://gpo.emis.co.ao/online-payment-gateway/webframe/v1/frameToken
GPO_FRAME_URL=https://gpo.emis.co.ao/online-payment-gateway/webframe/frame
```

### Onde Obter o Frame Token

1. Acesse o **GPO Portal**
2. Na consulta do perfil de comerciante, clique sobre o logotipo do Quiosque, no canto superior direito
3. Copie o **Frame Token** (Token de Segurança)
4. Este token é confidencial e deve ser usado apenas no backend

## 🔄 Fluxo de Pagamento

### 1. Estudante Solicita Matrícula

Quando o estudante tenta se matricular em um curso:

1. O sistema verifica se existe um pagamento completo para o curso
2. Se não existir, redireciona para a página de pagamento
3. O estudante é direcionado para `/curso/{id}/pagamento`

### 2. Geração do Token de Compra

1. O frontend solicita um token de compra ao backend
2. O backend:
   - Cria um registro de pagamento com status `pending`
   - Gera uma referência única (máx. 15 caracteres)
   - Faz requisição ao GPO com:
     - `reference`: Referência única
     - `amount`: Valor do curso
     - `token`: Frame Token (do .env)
     - `callbackUrl`: URL de callback configurada
     - `qrCode`, `mobile`, `card`: Métodos de pagamento habilitados
     - `cssUrl`: (opcional) URL do CSS customizado
3. O GPO retorna um `purchase_token` (campo `id`)
4. O backend atualiza o registro de pagamento com o token
5. O frontend recebe a URL do iframe

### 3. Pagamento no Iframe

1. O iframe do GPO é carregado na página de pagamento
2. O estudante completa o pagamento dentro do iframe
3. O GPO envia notificação via:
   - **PostMessage** (client-to-client): Notifica o frontend
   - **Callback** (server-to-server): Notifica o backend

### 4. Processamento do Callback

1. O GPO envia POST para `GPO_CALLBACK_URL`
2. O backend:
   - Busca o pagamento pela referência
   - Atualiza o status baseado na resposta do GPO
   - Se `status === 'completed'`: marca como completo
   - Se `status === 'failed'`: marca como falhado

### 5. Notificação no Frontend

1. O frontend escuta mensagens do iframe via `postMessage`
2. Valida a origem (`https://gpo.emis.co.ao`)
3. Processa a mensagem e atualiza a UI
4. Redireciona o estudante após pagamento bem-sucedido

### 6. Finalização da Matrícula

1. Após pagamento confirmado, o estudante pode se matricular
2. O sistema verifica novamente o pagamento antes de criar a matrícula
3. Se o pagamento estiver completo, a matrícula é criada

## 🔌 Endpoints da API

### Estudante (requer API Secret)

#### Gerar Token de Compra
```
POST /api/student/payments/generate-token
```

**Body:**
```json
{
  "course_id": "uuid",
  "student_id": "uuid",
  "student_email": "email@example.com",
  "student_name": "Nome do Estudante"
}
```

**Response:**
```json
{
  "status": "success",
  "payment_id": "uuid",
  "purchase_token": "token-do-gpo",
  "iframe_url": "https://gpo.emis.co.ao/...",
  "time_to_live": 1800000
}
```

#### Verificar Status do Pagamento
```
GET /api/student/payments/check-status?payment_id={uuid}
```

#### Verificar Pagamento por Curso
```
GET /api/student/payments/check-by-course?course_id={uuid}&student_id={uuid}
```

### Callback do GPO (público)

```
POST /api/payments/gpo-callback
```

**Body (exemplo):**
```json
{
  "reference": "PAY2025012312345",
  "status": "completed",
  "transaction_id": "gpo-transaction-id"
}
```

### Admin (requer API Secret)

#### Listar Pagamentos
```
GET /api/admin/payments?status=completed&page=1&per_page=15
```

#### Detalhes do Pagamento
```
GET /api/admin/payments/{id}
```

## 📊 Estrutura do Banco de Dados

### Tabela `payments`

- `id` (UUID): ID único do pagamento
- `course_id` (UUID): ID do curso
- `student_id` (UUID): ID do estudante
- `student_email` (string): Email do estudante
- `student_name` (string): Nome do estudante
- `reference` (string, unique): Referência única (máx. 15 caracteres)
- `amount` (decimal): Valor do pagamento
- `gpo_purchase_token` (string): Token de compra do GPO
- `status` (enum): pending, processing, completed, failed, cancelled
- `gpo_response` (text, JSON): Resposta completa do callback
- `gpo_transaction_id` (string): ID da transação do GPO
- `paid_at` (timestamp): Data/hora do pagamento confirmado
- `failure_reason` (text): Motivo da falha, se houver
- `created_at`, `updated_at` (timestamps)

## 🔒 Segurança

1. **Frame Token**: Nunca expor no frontend, apenas no backend
2. **Callback URL**: Deve ser HTTPS e validar a origem das requisições
3. **PostMessage**: Sempre validar `event.origin === 'https://gpo.emis.co.ao'`
4. **Referência**: Gerada de forma única e não previsível

## 🎨 Customização CSS

Opcionalmente, você pode fornecer um CSS customizado para o iframe do GPO:

1. Crie um arquivo CSS público (deve ser acessível via HTTPS)
2. Configure `GPO_CSS_URL` no `.env` com a URL completa do CSS
3. O GPO aplicará os estilos no iframe

## 📝 Notas Importantes

1. **Pagamento Obrigatório**: O estudante não pode se matricular sem pagamento completo
2. **Validação Dupla**: O sistema verifica pagamento tanto no frontend quanto no backend
3. **Timeout**: O token de compra tem um `timeToLive` (geralmente 30 minutos)
4. **Logs**: Todas as interações com o GPO são logadas para debugging

## 🐛 Troubleshooting

### Erro: "Configuração do gateway de pagamento não encontrada"
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique se `GPO_FRAME_TOKEN` e `GPO_CALLBACK_URL` estão definidas

### Erro: "Erro ao comunicar com o gateway de pagamento"
- Verifique a conectividade com `https://gpo.emis.co.ao`
- Verifique se o Frame Token está correto
- Verifique os logs do Laravel para mais detalhes

### Callback não está sendo recebido
- Verifique se `GPO_CALLBACK_URL` é acessível publicamente
- Verifique se a URL está em HTTPS
- Verifique os logs do servidor

### PostMessage não funciona
- Verifique se a origem da mensagem é `https://gpo.emis.co.ao`
- Verifique o console do navegador para erros
- Verifique se o iframe está carregado corretamente

## 📚 Referências

- Manual de Integração GPO
- Documentação da API GPO: `https://gpo.emis.co.ao`

