# Guia de Configuração e Execução - Portal Estudante

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**
- As APIs do backend rodando:
  - `ms-users-api-laravel` (porta 8001)
  - `ms-stundent-api-laravel-temp` (porta 8002)
  - `ms-shocoll-api` (porta 8003) - opcional para algumas funcionalidades

## 🚀 Passo a Passo

### 1. Navegar para o diretório do projeto

```bash
cd portal-estudante
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto `portal-estudante`:

```bash
# Windows (PowerShell)
New-Item -Path .env.local -ItemType File

# Linux/Mac
touch .env.local
```

Adicione as seguintes variáveis ao arquivo `.env.local`:

```env
# URLs das APIs
NEXT_PUBLIC_USERS_API_URL=http://localhost:8001/api
NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8002/api
NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8003/api
NEXT_PUBLIC_BILLING_API_URL=http://localhost:8004/api
```

**⚠️ IMPORTANTE:** 
- Ajuste as URLs e portas conforme suas APIs estiverem configuradas
- Se alguma API não estiver rodando, você pode comentar ou remover a linha correspondente

### 4. Verificar configuração (Opcional)

Execute o script de verificação para checar se tudo está configurado:

```bash
npm run check
```

Este script verifica:
- ✅ Arquivos essenciais
- ✅ Variáveis de ambiente
- ✅ Conectividade com as APIs

### 5. Verificar se as APIs estão rodando

Antes de iniciar o front-end, certifique-se de que as APIs estão rodando:

#### Testar API de Usuários (porta 8001):
```bash
curl http://localhost:8001/api/health
# ou no navegador: http://localhost:8001/api/health
```

#### Testar API de Estudantes (porta 8002):
```bash
curl http://localhost:8002/api/health
# ou no navegador: http://localhost:8002/api/health
```

### 6. Iniciar o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto será iniciado em: **http://localhost:3000**

### 7. Acessar a aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## 🧪 Testar a Integração

### 1. Testar Login

1. Acesse: `http://localhost:3000/login`
2. Use credenciais válidas:
   - **Email ou Student ID**: (ex: `student@example.com` ou `ST2025000001`)
   - **Senha**: (sua senha)
3. Após login bem-sucedido, você será redirecionado para `/estudante/dashboard`

### 2. Verificar Dashboard

Após fazer login, você deve ver:
- Seu perfil no cartão de estudante
- Matrículas (se houver)
- Menu de navegação funcionando

### 3. Verificar Perfil

Acesse: `http://localhost:3000/estudante/perfil`

Você deve ver:
- Seus dados pessoais
- QR Code para acesso ao campus
- Informações do curso (se matriculado)

## 🔧 Solução de Problemas

### Erro: "Cannot connect to API"

**Causa:** As APIs não estão rodando ou as URLs estão incorretas.

**Solução:**
1. Verifique se as APIs estão rodando nas portas corretas
2. Confirme as URLs no arquivo `.env.local`
3. Teste as APIs manualmente usando `curl` ou Postman

### Erro: "401 Unauthorized"

**Causa:** Token expirado ou inválido.

**Solução:**
1. Faça logout e login novamente
2. Limpe o localStorage do navegador:
   ```javascript
   // No console do navegador (F12)
   localStorage.clear()
   ```

### Erro: "Network Error" ou "CORS"

**Causa:** Problema de CORS nas APIs.

**Solução:**
1. Verifique se as APIs permitem requisições do front-end
2. Configure CORS nas APIs Laravel para aceitar `http://localhost:3000`

### Página em branco após login

**Causa:** Erro ao carregar dados do estudante.

**Solução:**
1. Abra o console do navegador (F12) e verifique erros
2. Verifique se a API de estudantes está respondendo corretamente
3. Confirme que o token está sendo enviado nas requisições

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção

# Linting
npm run lint         # Verifica erros de código
```

## 🗂️ Estrutura de Arquivos Importantes

```
portal-estudante/
├── .env.local              # Variáveis de ambiente (criar você)
├── src/
│   ├── config/
│   │   └── api.ts          # Configuração das URLs das APIs
│   ├── services/
│   │   ├── apiClient.ts    # Cliente HTTP base
│   │   ├── authService.ts  # Serviço de autenticação
│   │   └── studentService.ts # Serviço do estudante
│   ├── contexts/
│   │   └── AuthContext.tsx # Contexto de autenticação
│   └── app/
│       ├── login/          # Página de login
│       └── estudante/      # Páginas do estudante
└── INTEGRACAO_API.md       # Documentação da integração
```

## 🔐 Credenciais de Teste

Se você criou contas de teste, use-as para login. Caso contrário, você precisará:

1. Criar uma conta através da API de registro
2. Ou usar credenciais existentes no banco de dados

## 📚 Próximos Passos

Após conseguir rodar o projeto:

1. ✅ Testar todas as funcionalidades
2. ✅ Verificar integração com todas as APIs
3. ✅ Testar upload de documentos
4. ✅ Testar criação de matrículas
5. ✅ Verificar tratamento de erros

## 🆘 Ajuda Adicional

Se encontrar problemas:

1. Verifique os logs do console do navegador (F12)
2. Verifique os logs das APIs
3. Confirme que todas as dependências foram instaladas
4. Verifique a versão do Node.js: `node --version` (deve ser 18+)

---

**Boa sorte! 🚀**

