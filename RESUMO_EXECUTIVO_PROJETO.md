# 📊 Resumo Executivo - Sistema de Gestão Acadêmica e Pagamentos

**Data:** Dezembro 2025  
**Versão:** 1.0.0  
**Status:** Em Produção/Desenvolvimento

---

## 🎯 Visão Geral

Sistema completo de gestão acadêmica e pagamentos online, desenvolvido em arquitetura de microserviços, com dois portais frontend (Estudante e Administração Escolar) e integração com gateway de pagamentos (GPO).

### Arquitetura Geral

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
    │  - MS Users API                         │
    │  - MS Student API                       │
    │  - MS School API                       │
    │  - MS Admin System                      │
    └─────────────────────────────────────────┘
         │
    ┌────┴────────────────────────────────────┐
    │  Serviços Auxiliares                    │
    │  - RabbitMQ (Mensageria)                │
    │  - PostgreSQL/MySQL (Databases)        │
    │  - GPO (Gateway de Pagamentos)         │
    └─────────────────────────────────────────┘
```

---

## 🏗️ Microserviços Backend

### 1. **MS Users API** (Porta 8000)
**Tecnologia:** Laravel PHP  
**Responsabilidade:** Autenticação e gerenciamento de usuários

#### Funcionalidades Implementadas:
- ✅ **Autenticação JWT**
  - Registro de usuários (estudantes, escolas, professores)
  - Login com JWT tokens
  - Refresh token
  - Logout e logout global
  - Verificação de email
  - Recuperação de senha (reset password)

- ✅ **Gerenciamento de Usuários**
  - CRUD de usuários
  - Perfis de usuário (student, school, teacher, admin)
  - Ativação/desativação de contas
  - Validação de email

- ✅ **API Secret para Comunicação Inter-serviços**
  - Middleware de autenticação entre microserviços
  - Gerenciamento de professores via API

#### Endpoints Principais:
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
POST   /api/auth/verify-email
POST   /api/auth/password-reset/request
POST   /api/auth/password-reset/reset
GET    /api/auth/me
POST   /api/auth/register-school
POST   /api/auth/register-teacher
```

---

### 2. **MS Student API** (Porta 8001)
**Tecnologia:** Laravel PHP  
**Responsabilidade:** Gestão de estudantes e seus dados

#### Funcionalidades Implementadas:
- ✅ **Perfil do Estudante**
  - Visualização de perfil completo
  - Verificação de documentos obrigatórios
  - Status de primeiro acesso

- ✅ **Documentos do Estudante**
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

#### Endpoints Principais:
```
GET    /api/me
GET    /api/documents
POST   /api/documents/upload
GET    /api/documents/check-first-access
GET    /api/enrollments
POST   /api/enrollments
GET    /api/exam-registrations
POST   /api/exam-registrations
GET    /api/fees
GET    /api/schedules?type=class|exam
GET    /api/institutions
GET    /api/courses/{id}
```

---

### 3. **MS School API** (Porta 8003)
**Tecnologia:** Laravel PHP  
**Responsabilidade:** Gestão completa da escola e operações acadêmicas

#### Funcionalidades Implementadas:
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

#### Endpoints Principais:
```
GET    /api/me
GET    /api/profile/check-completion
PUT    /api/profile
POST   /api/profile/upload-logo
POST   /api/profile/upload-photos
POST   /api/profile/upload-video

GET    /api/courses
POST   /api/courses
GET    /api/courses/{id}
PUT    /api/courses/{id}
DELETE /api/courses/{id}
POST   /api/courses/{id}/upload-image

GET    /api/courses/{courseId}/subjects
POST   /api/courses/{courseId}/subjects
PUT    /api/courses/{courseId}/subjects/{id}
DELETE /api/courses/{courseId}/subjects/{id}

GET    /api/courses/{courseId}/admission-exams
POST   /api/courses/{courseId}/admission-exams
GET    /api/courses/{courseId}/admission-exams/{examId}/registrations

GET    /api/courses/{courseId}/enrollments
PUT    /api/enrollments/{enrollmentId}
POST   /api/enrollments/{enrollmentId}/approve
POST   /api/enrollments/{enrollmentId}/reject

GET    /api/teachers
POST   /api/teachers
GET    /api/teachers/{id}
PUT    /api/teachers/{id}
DELETE /api/teachers/{id}
POST   /api/teachers/{teacherId}/students/{studentId}
GET    /api/teachers/{teacherId}/students
DELETE /api/teachers/{teacherId}/students/{studentId}

GET    /api/teacher-assignments
POST   /api/teacher-assignments
POST   /api/teacher-assignments/bulk
GET    /api/teacher-assignments/{id}
PUT    /api/teacher-assignments/{id}
DELETE /api/teacher-assignments/{id}

GET    /api/classes
POST   /api/classes
GET    /api/classes/{id}
PUT    /api/classes/{id}
DELETE /api/classes/{id}

GET    /api/schedules
POST   /api/schedules
GET    /api/schedules/{id}
PUT    /api/schedules/{id}
DELETE /api/schedules/{id}
```

---

### 4. **MS Admin System** (Porta 8002)
**Tecnologia:** Laravel PHP  
**Responsabilidade:** Administração central do sistema

#### Funcionalidades Implementadas:
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

#### Endpoints Principais:
```
POST   /api/auth/login
GET    /api/me
GET    /api/schools
GET    /api/schools/{id}
POST   /api/schools/{id}/approve
POST   /api/schools/{id}/reject
GET    /api/schools/{id}/courses
POST   /api/teachers/replicate
```

---

### 5. **MS Message API** (Opcional)
**Tecnologia:** Node.js/TypeScript  
**Responsabilidade:** Envio de mensagens (Email/SMS)

#### Funcionalidades:
- ✅ Estrutura base implementada
- ⚠️ Integração completa pendente

---

## 🎨 Frontends

### 1. **Portal do Estudante** (Porta 3001)
**Tecnologia:** Next.js 14, React, TypeScript, Styled Components

#### Funcionalidades Implementadas:

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

#### Páginas Principais:
```
/login
/registo
/reset
/estudante/dashboard
/estudante/perfil
/estudante/cartoes/credito/propinas
/estudante/cartoes/credito/pagamentos
/estudante/cartoes/estudante/curso/calendarios
/estudante/cartoes/estudante/curso/horarios
/estudante/cartoes/estudante/curso/notas
/candidato/exame_acesso
/candidato/documentos
```

---

### 2. **Sistema Akaedem MS** (Porta 3000)
**Tecnologia:** Next.js 14, React, TypeScript, Tailwind CSS

#### Funcionalidades Implementadas:

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

#### Páginas Principais:
```
/admin
/admin/academica/cursos
/admin/academica/matriculas
/admin/academica/turmas
/admin/academica/horarios
/admin/academica/candidaturas
/admin/academica/certificacao
/admin/docentes/gerir
/admin/docentes/turmas
/admin/estudantes/gerir
/admin/financeiro/propinas
/admin/financeiro/pagamentos
/admin/financeiro/recibos
/admin/financeiro/relatorios
/admin/relatorios/gerais
```

---

## 💳 Sistema de Pagamentos (GPO)

### Funcionalidades Implementadas:

#### **Backend (Documentação Completa)**
- ✅ Arquitetura de gateway de pagamento
- ✅ Estrutura de dados para transações
- ✅ Integração com gateways externos (Stripe, PayPal)
- ✅ Sistema de webhooks
- ✅ Verificação de assinatura de webhook
- ✅ Processamento de confirmações
- ✅ Notificações de pagamento

#### **Frontend**
- ✅ Interface de pagamento
- ✅ Múltiplos métodos de pagamento
- ✅ QR Code para pagamento
- ✅ Referência bancária
- ✅ Histórico de transações
- ✅ Recibos digitais
- ✅ Confirmação de pagamento

#### **Documentação**
- ✅ Guia completo de implementação GPO (`README_GPO_PAGAMENTOS.md`)
- ✅ Exemplos de código
- ✅ Fluxos de pagamento
- ✅ Boas práticas de segurança

---

## 🔗 Integrações e Comunicação

### **RabbitMQ (Mensageria)**
- ✅ Configuração de filas
- ✅ Consumers implementados
- ✅ Sincronização de eventos entre serviços
- ✅ Eventos de usuários

### **API Secret (Inter-serviços)**
- ✅ Middleware de autenticação entre serviços
- ✅ Comunicação segura entre microserviços
- ✅ Validação de requisições inter-serviços

### **JWT Authentication**
- ✅ Tokens JWT para autenticação
- ✅ Refresh tokens
- ✅ Validação de tokens
- ✅ Logout e invalidação de tokens

---

## 📊 Estrutura de Dados

### **Principais Entidades:**

#### **Usuários**
- Users (estudantes, escolas, professores, admins)
- Perfis de usuário
- Documentos de estudantes

#### **Acadêmico**
- Courses (Cursos)
- Subjects (Disciplinas)
- Classes (Turmas)
- Schedules (Horários - Aulas e Exames)
- Enrollments (Matrículas)
- Exam Registrations (Inscrições em Exames)
- Admission Exams (Exames de Admissão)

#### **Financeiro**
- Fees (Propinas)
- Transactions (Transações de Pagamento)
- Payment Methods (Métodos de Pagamento)

#### **Gestão**
- Schools (Escolas)
- Teachers (Professores)
- Teacher Assignments (Atribuições)
- Teacher-Student Links (Vínculos)

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **Laravel PHP** (Microserviços principais)
- **Node.js/TypeScript** (MS Users API, MS Message API)
- **PostgreSQL/MySQL** (Bancos de dados)
- **RabbitMQ** (Mensageria)

### **Frontend**
- **Next.js 14** (Framework React)
- **React 18** (Biblioteca UI)
- **TypeScript** (Tipagem estática)
- **Styled Components** (Portal Estudante)
- **Tailwind CSS** (Sistema Akaedem)
- **React Query/TanStack Query** (Gerenciamento de estado)

### **Autenticação e Segurança**
- **JWT** (JSON Web Tokens)
- **API Secret** (Comunicação inter-serviços)
- **Bcrypt** (Hash de senhas)
- **Rate Limiting** (Proteção contra abuso)

### **Ferramentas de Desenvolvimento**
- **Docker** (Containerização)
- **Git** (Controle de versão)
- **Swagger/OpenAPI** (Documentação de API)

---

## 📈 Status de Implementação

### ✅ **Completamente Implementado**
- Autenticação e autorização
- Gerenciamento de usuários
- Gerenciamento de cursos
- Gerenciamento de matrículas
- Gerenciamento de horários (aulas e exames)
- Gerenciamento de propinas
- Sistema de documentos
- Portal do estudante (funcionalidades principais)
- Sistema administrativo (funcionalidades principais)
- Integração RabbitMQ
- Comunicação inter-serviços

### ⚠️ **Parcialmente Implementado**
- Sistema de pagamentos (documentação completa, integração com gateway pendente)
- Sistema de mensagens (estrutura base)
- Relatórios avançados
- Notificações em tempo real

### 🔄 **Em Desenvolvimento**
- Integração completa com gateway de pagamentos
- Sistema de notificações push
- Dashboard analítico avançado
- Exportação de relatórios

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- PHP 8.1+
- Node.js 18+
- PostgreSQL/MySQL
- RabbitMQ
- Composer
- npm/yarn

### **Inicialização Automática**
```bash
# Iniciar todos os serviços
python start_all_apis.py
```

### **Inicialização Manual**
```bash
# MS Users API
cd ms-users-api-laravel
php artisan serve --port=8000

# MS Student API
cd ms-stundent-api-laravel-temp
php artisan serve --port=8001
php artisan rabbitmq:consume-user-events

# MS Admin System
cd ms-admin-system
php artisan serve --port=8002

# MS School API
cd ms-shocoll-api
php artisan serve --port=8003
php artisan rabbitmq:consume-events

# Portal Estudante
cd portal-estudante
npm run dev  # Porta 3001

# Sistema Akaedem
cd sistema-akaedem-ms
npm run dev  # Porta 3000
```

---

## 📝 Documentação Adicional

- **README_GPO_PAGAMENTOS.md**: Guia completo de implementação do Gateway de Pagamento Online
- **Swagger/OpenAPI**: Documentação de APIs disponível em `/api-docs` de cada serviço

---

## 🎯 Próximos Passos

1. **Completar Integração GPO**
   - Integração real com gateway de pagamentos
   - Testes end-to-end de pagamentos
   - Implementação de webhooks

2. **Melhorias de Performance**
   - Cache de consultas frequentes
   - Otimização de queries
   - CDN para assets estáticos

3. **Funcionalidades Adicionais**
   - Sistema de notificações push
   - Chat em tempo real
   - Videochamadas para aulas online
   - Sistema de avaliações e notas

4. **Testes e Qualidade**
   - Testes unitários
   - Testes de integração
   - Testes end-to-end
   - Cobertura de código

5. **DevOps**
   - CI/CD pipeline
   - Deploy automatizado
   - Monitoramento e logging
   - Backup automatizado

---

## 👥 Equipe e Contato

**Desenvolvido por:** Equipe de Desenvolvimento  
**Data de Criação:** 2025  
**Última Atualização:** Dezembro 2025

---

**Nota:** Este documento reflete o estado atual do projeto. Para informações mais detalhadas sobre funcionalidades específicas, consulte a documentação técnica de cada microserviço.
