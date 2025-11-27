# 🚀 Início Rápido - Portal Estudante

## Comandos Rápidos

### 1. Instalar e Configurar

```bash
# Entrar no diretório
cd portal-estudante

# Instalar dependências
npm install

# Criar arquivo de ambiente
echo "NEXT_PUBLIC_USERS_API_URL=http://localhost:8001/api
NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8002/api
NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8003/api" > .env.local
```

### 2. Rodar o Projeto

```bash
npm run dev
```

### 3. Acessar

Abra no navegador: **http://localhost:3000**

## ⚠️ Antes de Começar

Certifique-se de que as APIs estão rodando:

- ✅ API de Usuários: `http://localhost:8001/api/health`
- ✅ API de Estudantes: `http://localhost:8002/api/health`

## 🧪 Teste Rápido

1. Acesse: `http://localhost:3000/login`
2. Faça login com suas credenciais
3. Você será redirecionado para o dashboard

## ✅ Verificar Configuração

Execute o script de verificação:

```bash
npm run check
```

## 📖 Documentação Completa

Para mais detalhes, consulte: `README_SETUP.md`

