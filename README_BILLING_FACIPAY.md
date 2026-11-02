# Billing API e referências FACIPAY

Microserviço **ms-billing-api** (porta **8004**) gera referências Multicaixa via [GPO FACI API.yaml](GPO%20FACI%20API.yaml) e sincroniza propinas pagas na **ms-student-api**.

## Arranque (Docker)

```bash
docker compose up -d ms-billing ms-student mysql
docker compose exec ms-billing php artisan migrate --force
```

## Variáveis (.env na raiz / docker-compose)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_BILLING_API_URL` | URL exposta ao portal (ex.: `http://localhost:8004/api`) |
| `BILLING_API_SECRET` | Secret inbound do billing (opcional; alinhado com student por defeito) |
| `FACI_MOCK` | `true` — referências fictícias e fluxo local sem carteira FACIPAY |
| `FACI_API_BASE_URL` | Base URL GPO (ex.: `https://gpo.drip.infinityfree.me`, sem `/api/reference` no fim) |
| `FACI_API_KEY` | Header `X-API-Key` |
| `FACI_DEFAULT_ENTITY` | Entidade exibida em mock ou fallback |

O billing usa `STUDENT_API_URL` / `STUDENT_API_SECRET` (Compose) para validar propinas e marcar `paid`, e `SCHOOL_API_URL` / `SCHOOL_API_SECRET` para confirmar taxas de exame de admissão.

## FACIPAY em produção

1. Login na **carteira** FACIPAY (UI) — sessão activa exigida pela API.
2. Configurar `FACI_API_KEY` no painel FACIPAY.
3. Definir `FACI_MOCK=false` e `FACI_API_BASE_URL`.

Sem sessão carteira, a API devolve **401**; o portal mostra mensagem de erro ao gerar referência.

## Endpoints (JWT estudante)

- `POST /api/payment-intents` — `{ "fee_id": "uuid" }` ou `{ "admission_exam_id": "uuid", "course_id": "uuid", "student_name": "..." }`
- `POST /api/payment-intents/{id}/reference` — `{ "mobile_phone": "244923456789", "recipient_name": "..." }` gera referência e envia cobrança GPO (`/api/requester/`)
- `GET /api/payment-intents/{id}/status` — consulta pagamento e marca propina se `paid`
- `POST /api/payment-intents/{id}/simulate-paid` — só com `APP_DEBUG=true` e `FACI_MOCK`

## Portal estudante

Propinas pendentes → pagamento → referência → “Já efectuei o pagamento” (polling). Em desenvolvimento, botão **Simular pagamento (dev)**.
