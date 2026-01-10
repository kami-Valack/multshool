# 📚 Documentação Completa do Sistema Multishol

**Versão:** 1.0.0  
**Data:** Janeiro 2025  
**Status:** Em Produção/Desenvolvimento

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Microserviços Backend](#microserviços-backend)
4. [Frontends](#frontends)
5. [Scripts e Ferramentas](#scripts-e-ferramentas)
6. [Configuração e Instalação](#configuração-e-instalação)
7. [APIs e Endpoints](#apis-e-endpoints)
8. [Autenticação e Segurança](#autenticação-e-segurança)
9. [Comunicação Entre Serviços](#comunicação-entre-serviços)
10. [Banco de Dados](#banco-de-dados)
11. [Deployment](#deployment)

---

## 🎯 Visão Geral

O **Sistema Multishol** é uma plataforma completa de gestão acadêmica e pagamentos online desenvolvida em arquitetura de microserviços. O sistema permite:

- **Gestão de Usuários**: Criação e gerenciamento de estudantes, escolas, professores e administradores
- **Gestão Acadêmica**: Cursos, matrículas, turmas, horários, exames e disciplinas
- **Gestão Financeira**: Propinas, pagamentos online, recibos e histórico financeiro
- **Portal do Estudante**: Interface completa para estudantes visualizarem e gerenciarem seus dados
- **Portal Administrativo**: Interface para escolas gerenciarem cursos, matrículas e professores
- **Painel Administrativo**: Interface para administradores aprovarem escolas e gerenciar o sistema

### Tecnologias Principais

- **Backend**: Laravel (PHP 8.1+), Node.js/TypeScript
- **Frontend**: Next.js 14, React 18, TypeScript
- **Banco de Dados**: PostgreSQL/MySQL
- **Mensageria**: RabbitMQ
- **Autenticação**: JWT (JSON Web Tokens)
- **Documentação**: Swagger/OpenAPI (L5-Swagger)

---

## 🏗️ Arquitetura do Sistema

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DO SISTEMA                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│ Portal Estudante │         │ Sistema Akaedem  │
│   (Next.js)      │         │   (Next.js)      │
│   Porta: 3001    │         │   Porta: 3000    │
└────────┬─────────┘         └────────┬─────────┘
         │                              │
         │                              │
    ┌────┴──────────────────────────────┴────┐
    │         APIs REST (Laravel/Node.js)      │
    └─────────────────────────────────────────┘
         │
    ┌────┴────────────────────────────────────┐
    │  Microserviços (Portas 8000-8003)       │
    │  - MS Users API (8000)                  │
    │  - MS Student API (8001)                │
    │  - MS Admin System (8002)               │
    │  - MS School API (8003)                 │
    └─────────────────────────────────────────┘
         │
    ┌────┴────────────────────────────────────┐
    │  Serviços Auxiliares                    │
    │  - RabbitMQ (Mensageria)                │
    │  - PostgreSQL/MySQL (Databases)         │
    │  - GPO (Gateway de Pagamentos)          │
    └─────────────────────────────────────────┘
```

### Componentes Principais

#### 1. **Camada de Frontend**
- **Portal do Estudante** (Porta 3001): Interface para estudantes
- **Sistema Akaedem MS** (Porta 3000): Interface administrativa para escolas

#### 2. **Camada de APIs**
- **MS Users API** (Porta 8000): Autenticação e gerenciamento de usuários
- **MS Student API** (Porta 8001): Gestão de dados de estudantes
- **MS Admin System** (Porta 8002): Administração central do sistema
- **MS School API** (Porta 8003): Gestão completa da escola

#### 3. **Camada de Dados**
- **Bancos de Dados**: Cada microserviço pode ter seu próprio banco
- **RabbitMQ**: Mensageria para comunicação assíncrona entre serviços

---

## 🔧 Microserviços Backend

### 1. MS Users API (Porta 8000)

**Tecnologia:** Laravel PHP  
**Diretório:** `ms-users-api-laravel/`  
**Responsabilidade:** Autenticação e gerenciamento de usuários

#### Funcionalidades

- ✅ **Autenticação JWT**
  - Registro de estudantes, escolas e professores
  - Login com tokens JWT
  - Refresh tokens
  - Logout e logout global
  - Verificação de email
  - Recuperação de senha

- ✅ **Gerenciamento de Usuários**
  - CRUD completo de usuários
  - Perfis: student, school, teacher, admin
  - Ativação/desativação de contas
  - Validação de email obrigatória

- ✅ **API Secret para Comunicação Inter-serviços**
  - Middleware de autenticação entre microserviços
  - Gerenciamento de professores via API

#### Endpoints Principais

```
POST   /api/auth/register              - Registrar estudante
POST   /api/auth/register-school       - Registrar escola
POST   /api/auth/register-teacher      - Registrar professor
POST   /api/auth/login                 - Login
POST   /api/auth/refresh-token         - Renovar token
POST   /api/auth/logout                - Logout
POST   /api/auth/verify-email          - Verificar email
POST   /api/auth/password-reset/request - Solicitar reset de senha
POST   /api/auth/password-reset/reset  - Resetar senha
GET    /api/auth/me                    - Obter perfil do usuário
```

#### Estrutura de Diretórios

```
ms-users-api-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── AuthController.php
│   │   ├── Middleware/
│   │   │   └── AuthenticateApiSecret.php
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── EmailVerificationToken.php
│   │   └── RefreshToken.php
│   └── Services/
│       └── RabbitMQUserEventService.php
├── database/
│   └── migrations/
├── routes/
│   └── api.php
└── config/
```

---

### 2. MS Student API (Porta 8001)

**Tecnologia:** Laravel PHP  
**Diretório:** `ms-stundent-api-laravel-temp/`  
**Responsabilidade:** Gestão de estudantes e seus dados

#### Funcionalidades

- ✅ **Perfil do Estudante**
  - Visualização de perfil completo
  - Verificação de documentos obrigatórios
  - Status de primeiro acesso

- ✅ **Documentos**
  - Upload de documentos
  - Verificação de documentos obrigatórios
  - Listagem de documentos enviados
  - Validação de primeiro acesso

- ✅ **Matrículas**
  - Listagem de matrículas do estudante
  - Criação de novas matrículas
  - Status de aprovação/rejeição

- ✅ **Inscrições em Exames**
  - Listagem de inscrições
  - Criação de novas inscrições em exames de admissão

- ✅ **Propinas (Fees)**
  - Listagem de propinas do estudante
  - Geração automática de propinas baseada em cursos
  - Resumo de propinas (total, meses, por curso)
  - Geração sob demanda (não depende de aprovação de matrícula)

- ✅ **Horários e Calendários**
  - Listagem de horários de aulas
  - Listagem de exames (calendário)
  - Filtros por tipo (class/exam)
  - Ordenação por data/horário

- ✅ **Integração com RabbitMQ**
  - Consumer de eventos de usuários
  - Sincronização de dados entre serviços

#### Endpoints Principais

```
GET    /api/me                         - Perfil do estudante
GET    /api/documents                  - Listar documentos
POST   /api/documents/upload           - Upload de documento
GET    /api/documents/check-first-access - Verificar primeiro acesso
GET    /api/enrollments                - Listar matrículas
POST   /api/enrollments                - Criar matrícula
GET    /api/exam-registrations         - Listar inscrições em exames
POST   /api/exam-registrations         - Inscrever em exame
GET    /api/fees                       - Listar propinas
GET    /api/schedules                  - Listar horários (type=class|exam)
GET    /api/institutions               - Listar instituições
GET    /api/courses/{id}               - Detalhes do curso
```

---

### 3. MS School API (Porta 8003)

**Tecnologia:** Laravel PHP  
**Diretório:** `ms-shocoll-api/`  
**Responsabilidade:** Gestão completa da escola e operações acadêmicas

#### Funcionalidades

- ✅ **Perfil da Escola**
  - Visualização e atualização de perfil
  - Upload de logo, fotos e vídeo
  - Verificação de perfil completo
  - Middleware de perfil completo obrigatório

- ✅ **Gerenciamento de Cursos**
  - CRUD completo de cursos
  - Upload de imagem do curso
  - Listagem de cursos da escola
  - Visualização pública de cursos

- ✅ **Cadeiras/Disciplinas**
  - CRUD de disciplinas por curso
  - Associação de disciplinas a cursos
  - Listagem de disciplinas

- ✅ **Exames de Admissão**
  - CRUD de exames de admissão
  - Gerenciamento de inscrições
  - Aprovação/rejeição de candidatos
  - Listagem de registros de exames

- ✅ **Gerenciamento de Matrículas**
  - Listagem de matrículas por curso
  - Aprovação/rejeição de matrículas
  - Atualização de status de matrícula
  - Visualização de detalhes

- ✅ **Gerenciamento de Professores**
  - CRUD completo de professores
  - Vinculação de professores a estudantes
  - Listagem de professores da escola
  - Desvinculação de professores

- ✅ **Atribuições de Professores**
  - Atribuição de professores a turmas
  - Atribuição em massa (bulk)
  - Gerenciamento de atribuições
  - Listagem de atribuições

- ✅ **Gerenciamento de Turmas (Classes)**
  - CRUD completo de turmas
  - Associação de turmas a cursos
  - Listagem de turmas

- ✅ **Gerenciamento de Horários**
  - CRUD de horários de aulas
  - CRUD de exames
  - Detecção de conflitos de horário
  - Suporte para aulas regulares e exames
  - Constraints únicos para evitar duplicatas

- ✅ **Integração com RabbitMQ**
  - Consumer de eventos
  - Sincronização de dados

#### Endpoints Principais

```
GET    /api/me                         - Perfil da escola
GET    /api/profile/check-completion   - Verificar perfil completo
PUT    /api/profile                    - Atualizar perfil
POST   /api/profile/upload-logo        - Upload de logo
POST   /api/profile/upload-photos      - Upload de fotos
POST   /api/profile/upload-video       - Upload de vídeo

GET    /api/courses                    - Listar cursos
POST   /api/courses                    - Criar curso
GET    /api/courses/{id}               - Detalhes do curso
PUT    /api/courses/{id}               - Atualizar curso
DELETE /api/courses/{id}               - Deletar curso
POST   /api/courses/{id}/upload-image  - Upload de imagem do curso

GET    /api/courses/{courseId}/subjects - Listar disciplinas
POST   /api/courses/{courseId}/subjects - Criar disciplina
PUT    /api/courses/{courseId}/subjects/{id} - Atualizar disciplina
DELETE /api/courses/{courseId}/subjects/{id} - Deletar disciplina

GET    /api/courses/{courseId}/admission-exams - Listar exames
POST   /api/courses/{courseId}/admission-exams - Criar exame
GET    /api/courses/{courseId}/admission-exams/{examId}/registrations - Inscrições

GET    /api/courses/{courseId}/enrollments - Listar matrículas
PUT    /api/enrollments/{enrollmentId} - Atualizar matrícula
POST   /api/enrollments/{enrollmentId}/approve - Aprovar matrícula
POST   /api/enrollments/{enrollmentId}/reject - Rejeitar matrícula

GET    /api/teachers                   - Listar professores
POST   /api/teachers                   - Criar professor
GET    /api/teachers/{id}              - Detalhes do professor
PUT    /api/teachers/{id}              - Atualizar professor
DELETE /api/teachers/{id}              - Deletar professor
POST   /api/teachers/{teacherId}/students/{studentId} - Vincular estudante
GET    /api/teachers/{teacherId}/students - Listar estudantes do professor
DELETE /api/teachers/{teacherId}/students/{studentId} - Desvincular estudante

GET    /api/teacher-assignments        - Listar atribuições
POST   /api/teacher-assignments        - Criar atribuição
POST   /api/teacher-assignments/bulk   - Criar atribuições em massa
GET    /api/teacher-assignments/{id}   - Detalhes da atribuição
PUT    /api/teacher-assignments/{id}   - Atualizar atribuição
DELETE /api/teacher-assignments/{id}   - Deletar atribuição

GET    /api/classes                    - Listar turmas
POST   /api/classes                    - Criar turma
GET    /api/classes/{id}               - Detalhes da turma
PUT    /api/classes/{id}               - Atualizar turma
DELETE /api/classes/{id}               - Deletar turma

GET    /api/schedules                  - Listar horários
POST   /api/schedules                  - Criar horário
GET    /api/schedules/{id}             - Detalhes do horário
PUT    /api/schedules/{id}             - Atualizar horário
DELETE /api/schedules/{id}             - Deletar horário
```

---

### 4. MS Admin System (Porta 8002)

**Tecnologia:** Laravel PHP  
**Diretório:** `ms-admin-system/`  
**Responsabilidade:** Administração central do sistema

#### Funcionalidades

- ✅ **Autenticação de Administradores**
  - Login de administradores
  - JWT authentication
  - Perfil do administrador

- ✅ **Gerenciamento de Escolas**
  - Listagem de todas as escolas
  - Visualização de detalhes
  - Aprovação/rejeição de escolas
  - Visualização de cursos por escola

- ✅ **Replicação de Docentes**
  - Replicação de professores entre serviços
  - Sincronização de dados

#### Endpoints Principais

```
POST   /api/auth/login                 - Login de administrador
GET    /api/me                         - Perfil do administrador
GET    /api/schools                    - Listar todas as escolas
GET    /api/schools/{id}               - Detalhes da escola
POST   /api/schools/{id}/approve       - Aprovar escola
POST   /api/schools/{id}/reject        - Rejeitar escola
GET    /api/schools/{id}/courses       - Cursos da escola
POST   /api/teachers/replicate         - Replicar professor
```

---

## 🎨 Frontends

### 1. Portal do Estudante (Porta 3001)

**Tecnologia:** Next.js 14, React 18, TypeScript, Styled Components  
**Diretório:** `portal-estudante/`

#### Funcionalidades Implementadas

##### **Autenticação e Perfil**
- ✅ Login e registro
- ✅ Recuperação de senha
- ✅ Perfil do estudante
- ✅ Upload de documentos
- ✅ Verificação de primeiro acesso

##### **Dashboard do Estudante**
- ✅ Visão geral do estudante
- ✅ Cards informativos
- ✅ Acesso rápido a funcionalidades

##### **Gestão de Cursos**
- ✅ Visualização de cursos disponíveis
- ✅ Detalhes do curso
- ✅ Matrícula em cursos
- ✅ Status de matrícula

##### **Calendários e Horários**
- ✅ Calendário de exames (integração completa)
- ✅ Horários de aulas
- ✅ Filtros por data
- ✅ Visualização por tipo (aulas/exames)
- ✅ Cores por tipo de exame

##### **Propinas e Pagamentos**
- ✅ Listagem de propinas
- ✅ Visualização de propinas por curso
- ✅ Resumo de propinas (total, meses)
- ✅ Interface de pagamento (GPO)
- ✅ Múltiplos métodos de pagamento:
  - Cartão de crédito
  - QR Code
  - Referência bancária
  - Transferência bancária
- ✅ Histórico de pagamentos
- ✅ Recibos de pagamento
- ✅ Carteira digital
- ✅ Recarga de carteira
- ✅ Transferências
- ✅ Créditos SMS

##### **Documentos**
- ✅ Upload de documentos
- ✅ Verificação de documentos obrigatórios
- ✅ Status de documentos

##### **Exames**
- ✅ Inscrição em exames de admissão
- ✅ Visualização de notas de exames
- ✅ Histórico de exames

##### **Outras Funcionalidades**
- ✅ Multibot (chat/assistente)
- ✅ Serviços disponíveis
- ✅ Movimentos financeiros
- ✅ Exploração de instituições

#### Páginas Principais

```
/login                                - Página de login
/registo                              - Página de registro
/reset                                - Recuperação de senha
/estudante/dashboard                  - Dashboard principal
/estudante/perfil                     - Perfil do estudante
/estudante/cartoes/credito/propinas   - Propinas
/estudante/cartoes/credito/pagamentos - Pagamentos
/estudante/cartoes/estudante/curso/calendarios - Calendários
/estudante/cartoes/estudante/curso/horarios - Horários
/estudante/cartoes/estudante/curso/notas - Notas
/candidato/exame_acesso               - Exames de acesso
/candidato/documentos                 - Documentos
```

---

### 2. Sistema Akaedem MS (Porta 3000)

**Tecnologia:** Next.js 14, React 18, TypeScript, Tailwind CSS  
**Diretório:** `sistema-akaedem-ms/`

#### Funcionalidades Implementadas

##### **Autenticação**
- ✅ Login de administradores
- ✅ Login de escolas
- ✅ Perfil de administrador

##### **Módulo Administrativo**
- ✅ Dashboard administrativo
- ✅ Gerenciamento de escolas
- ✅ Aprovação/rejeição de escolas

##### **Módulo Acadêmico**
- ✅ **Gerenciamento de Cursos**
  - CRUD completo
  - Upload de imagens
  - Visualização de cursos

- ✅ **Gerenciamento de Matrículas**
  - Listagem de matrículas
  - Aprovação/rejeição
  - Filtros e busca

- ✅ **Gerenciamento de Turmas**
  - CRUD de turmas
  - Associação a cursos

- ✅ **Gerenciamento de Horários**
  - Criação de horários
  - Visualização de horários
  - Gerenciamento de exames

- ✅ **Candidaturas**
  - Visualização de candidaturas
  - Gerenciamento de candidatos

- ✅ **Certificação**
  - Emissão de certificados
  - Histórico de emissões
  - Reemissão de documentos

##### **Módulo de Docentes**
- ✅ Gerenciamento de professores
- ✅ Atribuição a turmas
- ✅ Relatórios de docentes
- ✅ Visualização de estudantes por professor

##### **Módulo de Estudantes**
- ✅ Gerenciamento de estudantes
- ✅ Transferências
- ✅ Histórico acadêmico

##### **Módulo Financeiro**
- ✅ **Propinas**
  - Gerenciamento de propinas
  - Visualização de débitos
  - Histórico de pagamentos

- ✅ **Pagamentos**
  - Visualização de pagamentos
  - Status de pagamentos
  - Filtros e relatórios

- ✅ **Recibos**
  - Geração de recibos
  - Visualização de recibos
  - Download de PDFs
  - Preview de recibos

- ✅ **Débitos e Multas**
  - Gerenciamento de débitos
  - Aplicação de multas

- ✅ **Relatórios Financeiros**
  - Relatórios de receitas
  - Relatórios de pagamentos
  - Estatísticas financeiras

##### **Relatórios**
- ✅ Relatórios gerais
- ✅ Relatórios de assistência
- ✅ Estatísticas acadêmicas

#### Páginas Principais

```
/admin                                 - Dashboard administrativo
/admin/academica/cursos                - Gestão de cursos
/admin/academica/matriculas            - Gestão de matrículas
/admin/academica/turmas                - Gestão de turmas
/admin/academica/horarios              - Gestão de horários
/admin/academica/candidaturas          - Candidaturas
/admin/academica/certificacao          - Certificação
/admin/docentes/gerir                  - Gestão de docentes
/admin/docentes/turmas                 - Atribuições de docentes
/admin/estudantes/gerir                - Gestão de estudantes
/admin/financeiro/propinas             - Gestão de propinas
/admin/financeiro/pagamentos           - Gestão de pagamentos
/admin/financeiro/recibos              - Gestão de recibos
/admin/financeiro/relatorios           - Relatórios financeiros
/admin/relatorios/gerais               - Relatórios gerais
```

---

## 🛠️ Scripts e Ferramentas

### Scripts de Inicialização

#### 1. `start_all_apis.py`

**Descrição:** Script principal para iniciar todos os serviços do projeto em paralelo.

**Funcionalidades:**
- ✅ Verifica e instala dependências (Composer e npm)
- ✅ Limpa cache de todas as APIs Laravel
- ✅ Gera chaves de aplicação
- ✅ Executa migrations
- ✅ Verifica e inicia RabbitMQ via Docker
- ✅ Inicia todas as APIs Laravel
- ✅ Inicia consumers RabbitMQ
- ✅ Inicia todos os frontends Next.js
- ✅ Monitora processos e exibe erros

**Uso:**
```bash
python start_all_apis.py
```

**Configuração de APIs:**
- MS Users API - Porta 8000
- MS Student API - Porta 8001 (com consumer RabbitMQ)
- MS Admin System - Porta 8002
- MS School API - Porta 8003 (com consumer RabbitMQ)

**Configuração de Frontends:**
- Portal Estudante - Porta 3001
- Sistema Akaedem MS - Porta 3000

#### 2. Scripts Individuais

- `start_ms_users_api.py` - Inicia apenas MS Users API
- `start_ms_student_api.py` - Inicia apenas MS Student API
- `start_ms_admin_system.py` - Inicia apenas MS Admin System
- `start_ms_school_api.py` - Inicia apenas MS School API

### Scripts PHP Utilitários

#### 1. `aprovar_todas_instituicoes.php`

**Descrição:** Aprova todas as instituições pendentes via API Admin.

**Uso:**
```bash
php aprovar_todas_instituicoes.php
```

**Funcionalidades:**
- Faz login como administrador
- Lista todas as escolas
- Filtra escolas pendentes
- Aprova todas as escolas pendentes
- Exibe resumo do processo

**Configuração:**
```php
$baseUrl = 'https://paymente.reduaneamin.ct.ws/admin/api';
$email = 'admin';
$password = 'admin';
```

#### 2. `aprovar_matriculas.php`

**Descrição:** Login de escola e aprovação de todas as matrículas pendentes.

**Uso:**
```bash
php aprovar_matriculas.php
```

**Funcionalidades:**
- Faz login como escola
- Lista todos os cursos da escola
- Busca matrículas pendentes por curso
- Aprova todas as matrículas pendentes
- Exibe resumo do processo

**Configuração:**
```php
$usersApiUrl = 'http://localhost:8000/api';
$schoolApiUrl = 'http://localhost:8003/api';
$email = 'escola@example.com';
$password = 'senha';
```

#### 3. `criar_cursos_escola.php`

**Descrição:** Cria cursos para uma escola específica.

**Uso:**
```bash
php criar_cursos_escola.php
```

### Scripts Python Utilitários

#### 1. `criar_contas_e_obter_tokens.py`

**Descrição:** Cria contas de estudante e escola e obtém tokens JWT.

**Uso:**
```bash
python criar_contas_e_obter_tokens.py
```

**Funcionalidades:**
- ✅ Verifica se a API está rodando
- ✅ Cria conta de estudante
- ✅ Verifica email do estudante
- ✅ Obtém token JWT do estudante
- ✅ Cria conta de escola
- ✅ Verifica email da escola
- ✅ Obtém token JWT da escola
- ✅ Salva tokens em arquivo JSON (`tokens_contas.json`)

**Dependências:**
- Script PHP: `ms-users-api-laravel/obter_token_verificacao.php`

**Configuração:**
```python
USERS_API_URL = "https://paymente.reduaneamin.ct.ws/users/api/"
```

**Arquivo de Saída:**
```json
{
  "estudante": {
    "token": "...",
    "refresh_token": "...",
    "user": {...},
    "email": "...",
    "password": "...",
    "role": "student"
  },
  "escola": {
    "token": "...",
    "refresh_token": "...",
    "user": {...},
    "email": "...",
    "password": "...",
    "role": "school"
  },
  "criado_em": "2025-01-05T..."
}
```

### Interfaces Web Auxiliares

#### 1. `painel_admin.html`

**Descrição:** Interface web para painel administrativo de aprovação de escolas.

**Funcionalidades:**
- ✅ Login de administrador
- ✅ Dashboard com estatísticas
- ✅ Listagem de escolas com filtros
- ✅ Visualização de detalhes
- ✅ Aprovação/rejeição de escolas
- ✅ Interface moderna e responsiva

**Uso:**
Abrir o arquivo HTML em um navegador.

**Configuração:**
```javascript
let apiUrl = 'https://paymente.reduaneamin.ct.ws/admin/api';
```

#### 2. `registrar_escolas_professores.html`

**Descrição:** Interface web para registro de escolas e professores.

**Funcionalidades:**
- ✅ Registro de escolas
- ✅ Registro de professores
- ✅ Interface com abas
- ✅ Validação de formulários
- ✅ Exibição de respostas da API

**Uso:**
Abrir o arquivo HTML em um navegador.

**Configuração:**
```javascript
let apiUrl = 'https://paymente.reduaneamin.ct.ws/users/api';
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- **PHP** 8.1 ou superior
- **Node.js** 18+ (20.9.0+ para Sistema Akaedem MS)
- **Composer** (gerenciador de dependências PHP)
- **npm** ou **yarn** (gerenciador de pacotes Node.js)
- **PostgreSQL** ou **MySQL** (banco de dados)
- **RabbitMQ** (mensageria - pode usar Docker)
- **Docker** (opcional, para RabbitMQ)

### Instalação

#### 1. Clone o Repositório

```bash
git clone <repository-url>
cd multishol
```

#### 2. Configurar Bancos de Dados

Para cada microserviço Laravel, configure o arquivo `.env`:

```env
DB_CONNECTION=pgsql  # ou mysql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nome_do_banco
DB_USERNAME=usuario
DB_PASSWORD=senha
```

#### 3. Configurar RabbitMQ

**Opção 1: Docker (Recomendado)**

```bash
docker-compose up -d rabbitmq
```

Isso iniciará o RabbitMQ na porta 5672 (AMQP) e 15672 (Management UI).

**Opção 2: Instalação Manual**

Siga a documentação oficial do RabbitMQ.

**Configuração no .env:**
```env
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin123
RABBITMQ_VHOST=/
```

#### 4. Instalar Dependências

**Backend (Laravel):**

Para cada microserviço Laravel:

```bash
cd ms-users-api-laravel
composer install
php artisan key:generate
php artisan migrate

cd ../ms-stundent-api-laravel-temp
composer install
php artisan key:generate
php artisan migrate

cd ../ms-admin-system
composer install
php artisan key:generate
php artisan migrate

cd ../ms-shocoll-api
composer install
php artisan key:generate
php artisan migrate
```

**Frontend:**

```bash
cd portal-estudante
npm install

cd ../sistema-akaedem-ms
npm install
```

#### 5. Configurar Variáveis de Ambiente

Cada serviço precisa de seu próprio arquivo `.env`. Exemplos:

**MS Users API (.env):**
```env
APP_NAME="MS Users API"
APP_URL=http://localhost:8000
JWT_SECRET=seu_jwt_secret_aqui
JWT_TTL=60

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ms_users
DB_USERNAME=usuario
DB_PASSWORD=senha

RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin123

API_SECRET=sua_chave_secreta_para_comunicacao_interservicos
```

**Portal Estudante (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8001/api
NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8003/api
```

### Inicialização

#### Inicialização Automática (Recomendado)

```bash
python start_all_apis.py
```

Este script irá:
1. Verificar dependências
2. Limpar cache
3. Executar migrations
4. Iniciar RabbitMQ (se via Docker)
5. Iniciar todas as APIs
6. Iniciar todos os frontends

#### Inicialização Manual

**Backend:**

```bash
# Terminal 1 - MS Users API
cd ms-users-api-laravel
php artisan serve --port=8000

# Terminal 2 - MS Student API
cd ms-stundent-api-laravel-temp
php artisan serve --port=8001
php artisan rabbitmq:consume-user-events

# Terminal 3 - MS Admin System
cd ms-admin-system
php artisan serve --port=8002

# Terminal 4 - MS School API
cd ms-shocoll-api
php artisan serve --port=8003
php artisan rabbitmq:consume-events
```

**Frontend:**

```bash
# Terminal 5 - Portal Estudante
cd portal-estudante
npm run dev  # Porta 3001

# Terminal 6 - Sistema Akaedem
cd sistema-akaedem-ms
npm run dev  # Porta 3000
```

### Verificação

Após iniciar os serviços, verifique:

- **MS Users API**: http://localhost:8000/api/documentation
- **MS Student API**: http://localhost:8001/api/documentation
- **MS Admin System**: http://localhost:8002/api/documentation
- **MS School API**: http://localhost:8003/api/documentation
- **Portal Estudante**: http://localhost:3001
- **Sistema Akaedem**: http://localhost:3000
- **RabbitMQ Management**: http://localhost:15672 (admin/admin123)

---

## 🔐 Autenticação e Segurança

### JWT (JSON Web Tokens)

O sistema usa JWT para autenticação. Todos os tokens são gerados pelo **MS Users API** e podem ser usados em outros serviços.

#### Fluxo de Autenticação

1. **Registro/Login**: Cliente faz registro ou login no MS Users API
2. **Geração de Token**: MS Users API gera um token JWT
3. **Uso do Token**: Cliente usa o token no header `Authorization: Bearer <token>`
4. **Validação**: Cada microserviço valida o token usando o mesmo `JWT_SECRET`

#### Estrutura do Token

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "student|school|teacher|admin",
  "iat": 1234567890,
  "exp": 1234571490
}
```

#### Refresh Tokens

O sistema suporta refresh tokens para renovar tokens expirados:

```bash
POST /api/auth/refresh-token
Authorization: Bearer <refresh_token>
```

### API Secret (Comunicação Inter-serviços)

Para comunicação entre microserviços, é usado um API Secret:

**Header:**
```
X-API-Secret: sua_chave_secreta
```

**Middleware:** `AuthenticateApiSecret`

### Segurança de Senhas

- Senhas são hasheadas usando **bcrypt**
- Senha mínima: 8 caracteres
- Validação de força de senha (opcional)

### Verificação de Email

- Todos os usuários devem verificar seu email após registro
- Token de verificação enviado por email (ou obtido via script PHP)
- Endpoint: `POST /api/auth/verify-email`

### Rate Limiting

Proteção contra abuso implementada via middleware Laravel:
```php
Route::middleware('throttle:10,1')->group(...)
```

---

## 📡 Comunicação Entre Serviços

### RabbitMQ (Mensageria)

O sistema usa RabbitMQ para comunicação assíncrona entre serviços.

#### Filas Principais

1. **user.events**: Eventos de criação/atualização de usuários
2. **school.events**: Eventos relacionados a escolas

#### Eventos Enviados

**MS Users API → Outros Serviços:**
- `user.created`: Quando um usuário é criado
- `user.updated`: Quando um usuário é atualizado
- `user.deleted`: Quando um usuário é deletado

#### Consumers

**MS Student API:**
- Consumer: `rabbitmq:consume-user-events`
- Ação: Sincroniza dados de estudantes

**MS School API:**
- Consumer: `rabbitmq:consume-events`
- Ação: Sincroniza dados relacionados a escolas

### Comunicação HTTP (Síncrona)

Microserviços também se comunicam via HTTP quando necessário:

**Exemplo: MS School API → MS Users API**
```php
$response = Http::withHeaders([
    'X-API-Secret' => config('services.api_secret'),
])->get('http://localhost:8000/api/users/' . $userId);
```

---

## 💾 Banco de Dados

### Estrutura de Dados

Cada microserviço pode ter seu próprio banco de dados ou compartilhar um banco com prefixos de tabela.

#### Tabelas Principais

**MS Users API:**
- `users`: Usuários do sistema
- `email_verification_tokens`: Tokens de verificação de email
- `password_reset_tokens`: Tokens de reset de senha
- `refresh_tokens`: Tokens de refresh JWT

**MS Student API:**
- `students`: Dados de estudantes
- `documents`: Documentos de estudantes
- `enrollments`: Matrículas
- `exam_registrations`: Inscrições em exames
- `fees`: Propinas
- `schedules`: Horários (consultados do MS School API)

**MS School API:**
- `schools`: Dados de escolas
- `courses`: Cursos
- `subjects`: Disciplinas
- `classes`: Turmas
- `enrollments`: Matrículas
- `teachers`: Professores
- `teacher_class_assignments`: Atribuições de professores
- `schedules`: Horários de aulas e exames
- `admission_exams`: Exames de admissão

**MS Admin System:**
- `users`: Administradores
- `schools`: Cache/consulta de escolas (via MS Users API)

### Migrations

Para executar migrations em cada serviço:

```bash
php artisan migrate
```

Para criar novas migrations:

```bash
php artisan make:migration nome_da_migration
```

---

## 🚀 Deployment

### Produção

**URLs de Produção:**

- **MS Users API**: https://paymente.reduaneamin.ct.ws/users/api/
- **MS Student API**: https://paymente.reduaneamin.ct.ws/student/api/
- **MS Admin System**: https://paymente.reduaneamin.ct.ws/admin/api/
- **MS School API**: https://paymente.reduaneamin.ct.ws/school/api/

### Configuração de Produção

1. **Variáveis de Ambiente:**
   - Definir `APP_ENV=production`
   - Usar `APP_DEBUG=false`
   - Configurar URLs de produção

2. **Otimizações:**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Supervisor (para consumers):**
   Configurar supervisor para manter consumers RabbitMQ rodando.

### Docker

O projeto inclui `docker-compose.yml` para RabbitMQ:

```bash
docker-compose up -d rabbitmq
```

---

## 📝 Documentação Adicional

### Documentações Especializadas

1. **DOCUMENTACOES_APIS.md**: Lista de URLs de documentação Swagger/OpenAPI
2. **README_GPO_PAGAMENTOS.md**: Guia completo de implementação do Gateway de Pagamento Online
3. **RESUMO_EXECUTIVO_PROJETO.md**: Resumo executivo do projeto

### Documentação Swagger

Cada API Laravel possui documentação Swagger acessível em:
- `/api/documentation` (Laravel com L5-Swagger)

### Exemplos de Uso

Consulte os scripts utilitários para exemplos práticos de uso das APIs:
- `aprovar_todas_instituicoes.php`
- `aprovar_matriculas.php`
- `criar_contas_e_obter_tokens.py`

---

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão com RabbitMQ

**Problema:** Consumer não inicia ou dá erro de conexão.

**Solução:**
```bash
# Verificar se RabbitMQ está rodando
docker ps | grep rabbitmq

# Iniciar RabbitMQ via Docker
docker-compose up -d rabbitmq

# Verificar configurações no .env
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

#### 2. Token JWT Inválido Entre Serviços

**Problema:** Token válido em um serviço mas inválido em outro.

**Solução:**
- Verificar se todos os serviços usam o mesmo `JWT_SECRET`
- Verificar se o token não expirou
- Verificar formato do header: `Authorization: Bearer <token>`

#### 3. Erro de Migrations

**Problema:** Erro ao executar migrations.

**Solução:**
```bash
# Limpar cache
php artisan config:clear
php artisan cache:clear

# Executar migrations novamente
php artisan migrate --force
```

#### 4. Frontend não Conecta com API

**Problema:** Erro de CORS ou conexão recusada.

**Solução:**
- Verificar URL da API no `.env.local` do frontend
- Verificar se a API está rodando
- Verificar configurações de CORS no backend Laravel

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação Swagger de cada API
2. Revise os scripts de exemplo
3. Verifique os logs em `storage/logs/`

---

## 📅 Changelog

### Versão 1.0.0 (Janeiro 2025)

- ✅ Documentação completa criada
- ✅ Todas as APIs documentadas
- ✅ Scripts utilitários documentados
- ✅ Guias de instalação e configuração

---

**Última Atualização:** Janeiro 2025  
**Mantido por:** Equipe de Desenvolvimento Multishol
