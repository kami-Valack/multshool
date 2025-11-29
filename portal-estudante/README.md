# Portal do Estudante - Multischool

Portal digital para estudantes gerirem documentos, exames, matrículas e muito mais.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- APIs do backend rodando (ver configuração abaixo)

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo .env.local
cp .env.example .env.local

# 3. Editar .env.local com as URLs das suas APIs
# NEXT_PUBLIC_USERS_API_URL=http://localhost:8001/api
# NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8002/api
# NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8003/api

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3001](http://localhost:3001)

## 📚 Documentação

- **[README_SETUP.md](./README_SETUP.md)** - Guia completo de configuração
- **[QUICK_START.md](./QUICK_START.md)** - Início rápido
- **[INTEGRACAO_API.md](./INTEGRACAO_API.md)** - Documentação da integração com APIs

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificar erros de código
```

## 🔧 Configuração

O projeto requer as seguintes APIs rodando:

- **ms-users-api-laravel** (porta 8001) - Autenticação
- **ms-stundent-api-laravel-temp** (porta 8002) - Dados do estudante
- **ms-shocoll-api** (porta 8003) - Dados da escola (opcional)

Configure as URLs no arquivo `.env.local`.

## 📖 Mais Informações

Consulte a documentação completa em `README_SETUP.md` para:
- Configuração detalhada
- Solução de problemas
- Testes e validação
- Estrutura do projeto
