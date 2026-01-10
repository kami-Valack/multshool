# 📚 Lista de Documentações das APIs

Este documento contém todas as URLs de documentação (Swagger/OpenAPI) das APIs do sistema Multishol.

---

## 🔐 APIs Laravel (L5-Swagger)

Todas as APIs Laravel usam **L5-Swagger** e a rota padrão é: `/api/documentation`

### 1. MS Users API (Laravel)
**Porta:** 8000  
**Rota de Documentação:** `/api/documentation`

**Local:**
```
http://localhost:8000/api/documentation
```

**Produção:**
```
https://paymente.reduaneamin.ct.ws/users/api/documentation
```

**Descrição:** API de gerenciamento de usuários (estudantes, escolas, professores)

---

### 2. MS Student API (Laravel)
**Porta:** 8001  
**Rota de Documentação:** `/api/documentation`

**Local:**
```
http://localhost:8001/api/documentation
```

**Produção:**
```
https://paymente.reduaneamin.ct.ws/student/api/documentation
```

**Descrição:** API de gerenciamento de estudantes e matrículas

---

### 3. MS Admin System (Laravel)
**Porta:** 8002  
**Rota de Documentação:** `/api/documentation`

**Local:**
```
http://localhost:8002/api/documentation
```

**Produção:**
```
https://paymente.reduaneamin.ct.ws/admin/api/documentation
```

**Descrição:** API administrativa para aprovação de escolas e gerenciamento do sistema

---

### 4. MS School API (Laravel)
**Porta:** 8003  
**Rota de Documentação:** `/api/documentation`

**Local:**
```
http://localhost:8003/api/documentation
```

**Produção:**
```
https://paymente.reduaneamin.ct.ws/school/api/documentation
```

**Descrição:** API de gerenciamento de escolas, cursos, professores e alunos

---

## 🟢 API Node.js/TypeScript (Swagger UI)

### 5. MS Users API (Node.js/TypeScript)
**Porta:** 3000 (padrão)  
**Rota de Documentação:** `/api-docs`

**Local:**
```
http://localhost:3000/api-docs
```

**Produção:**
```
https://paymente.reduaneamin.ct.ws/users/api-docs
```

**Descrição:** API alternativa de usuários em Node.js/TypeScript

---

## 📋 Resumo Rápido

| API | Tipo | Porta Local | Rota Docs | URL Local |
|-----|------|-------------|-----------|-----------|
| MS Users API (Laravel) | Laravel | 8000 | `/api/documentation` | http://localhost:8000/api/documentation |
| MS Student API | Laravel | 8001 | `/api/documentation` | http://localhost:8001/api/documentation |
| MS Admin System | Laravel | 8002 | `/api/documentation` | http://localhost:8002/api/documentation |
| MS School API | Laravel | 8003 | `/api/documentation` | http://localhost:8003/api/documentation |
| MS Users API (Node.js) | Node.js | 3000 | `/api-docs` | http://localhost:3000/api-docs |

---

## 🔑 Autenticação

Todas as APIs requerem autenticação JWT para a maioria dos endpoints:

1. **Fazer login** no endpoint `/api/auth/login` (ou `/auth/login` dependendo da API)
2. **Obter o token JWT** da resposta
3. **Usar o token** no header: `Authorization: Bearer {token}`

### Credenciais de Teste

**MS Admin System:**
- Email: `admin`
- Senha: `admin`

**MS Users API:**
- Use o script `criar_contas_e_obter_tokens.py` para criar contas de teste

---

## 🚀 Como Acessar

### Localmente

1. Certifique-se de que as APIs estão rodando:
   ```bash
   python start_all_apis.py
   ```

2. Acesse a documentação no navegador usando as URLs acima

### Produção

Acesse diretamente as URLs de produção listadas acima.

---

## 📝 Notas

- Todas as documentações usam **Swagger UI** para interface interativa
- Você pode testar os endpoints diretamente pela interface do Swagger
- As documentações são geradas automaticamente a partir das anotações no código
- Para regenerar as documentações, execute:
  ```bash
  php artisan l5-swagger:generate
  ```
  (dentro do diretório de cada API Laravel)

---

## 🔗 URLs de Produção Completas

**MS Users API:**
- Base: `https://paymente.reduaneamin.ct.ws/users/api/`
- Docs: `https://paymente.reduaneamin.ct.ws/users/api/documentation`

**MS Student API:**
- Base: `https://paymente.reduaneamin.ct.ws/student/api/`
- Docs: `https://paymente.reduaneamin.ct.ws/student/api/documentation`

**MS Admin System:**
- Base: `https://paymente.reduaneamin.ct.ws/admin/api/`
- Docs: `https://paymente.reduaneamin.ct.ws/admin/api/documentation`

**MS School API:**
- Base: `https://paymente.reduaneamin.ct.ws/school/api/`
- Docs: `https://paymente.reduaneamin.ct.ws/school/api/documentation`

---

**Última atualização:** 2025-01-05
