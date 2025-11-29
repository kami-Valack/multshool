# 📋 Regras de Negócio - Sistema Multishol

Este documento descreve todas as regras de negócio aplicadas no sistema de gestão educacional.

---

## 🔐 1. AUTENTICAÇÃO E AUTORIZAÇÃO

### 1.1. Registro de Usuários

#### 1.1.1. Estudantes
- **Endpoint**: `POST /api/auth/register` (ms-users-api-laravel)
- **Regras**:
  - Email deve ser único no sistema
  - Senha deve ter no mínimo 8 caracteres
  - Role é sempre `student` (não pode ser alterada)
  - `student_id` é gerado automaticamente no formato: `ST{ANO}{6 dígitos}` (ex: ST2025000001)
  - Email não é verificado automaticamente (exceto se `AUTO_VERIFY_EMAILS=true`)
  - Usuário é criado com `is_active = true`

#### 1.1.2. Escolas
- **Endpoint**: `POST /api/auth/register-school` (ms-users-api-laravel)
- **Regras**:
  - Email deve ser único no sistema
  - Senha deve ter no mínimo 8 caracteres
  - Role é sempre `school` (não pode ser alterada)
  - **`institution_type` é obrigatório** e deve ser `'medio'` ou `'superior'`
    - `'medio'`: Para escolas de ensino médio
    - `'superior'`: Para instituições de ensino superior
  - Email não é verificado automaticamente (exceto se `AUTO_VERIFY_EMAILS=true`)
  - Usuário é criado com `is_active = true`
  - Ao ser criada, a escola é replicada para `ms-shocoll-api` com `status = 'pending'` e `institution_type` preservado
  - Escola **NÃO** pode acessar o sistema até ser aprovada por um administrador

#### 1.1.3. Docentes
- **Endpoint**: `POST /api/auth/register-teacher` (ms-users-api-laravel)
- **Regras**:
  - Email deve ser único no sistema
  - Senha deve ter no mínimo 8 caracteres
  - Role é sempre `teacher` (não pode ser alterada)
  - Email não é verificado automaticamente (exceto se `AUTO_VERIFY_EMAILS=true`)
  - Usuário é criado com `is_active = true`
  - Ao ser criado, o docente é replicado para `ms-shocoll-api` com `status = null` (docentes não têm status de aprovação)

#### 1.1.4. Administradores
- **Endpoint**: `POST /api/auth/register-admin` (ms-admin-system)
- **Regras**:
  - Apenas `super_admin` pode criar novos administradores
  - Role pode ser `admin` ou `super_admin`
  - Senha deve ter no mínimo 6 caracteres
  - Email deve ser único

### 1.2. Verificação de Email

#### 1.2.1. Modo Produção
- Email de verificação é enviado via RabbitMQ
- Token de verificação expira em 24 horas
- Usuário deve acessar o link no email para verificar
- Após verificação, eventos são emitidos:
  - `user.verified` → Replica usuário para serviços necessários
  - `school.create` → Apenas para escolas

#### 1.2.2. Modo Desenvolvimento (`AUTO_VERIFY_EMAILS=true`)
- Email é verificado automaticamente
- Eventos são emitidos imediatamente
- Docentes são replicados diretamente via HTTP (fallback)

### 1.3. Login e Tokens JWT

- **Endpoint**: `POST /api/auth/login` (ms-users-api-laravel)
- **Regras**:
  - Login pode ser feito com email ou `student_id` (apenas para estudantes)
  - Retorna `accessToken` (expira em 1 hora) e `refreshToken` (expira em 30 dias)
  - Token contém: `sub` (user ID), `email`, `student_id` (se aplicável), `role`
  - Usuário deve estar ativo (`is_active = true`)
  - Email deve estar verificado (exceto em desenvolvimento)

### 1.4. Controle de Acesso por Role

#### 1.4.1. Estudantes
- Podem acessar: `ms-stundent-api-laravel-temp`
- Podem: criar matrículas, inscrever-se em exames, visualizar seus dados

#### 1.4.2. Escolas
- Podem acessar: `ms-shocoll-api` (apenas se aprovadas)
- Requisitos para acesso:
  - Token JWT válido
  - Role = `school`
  - Status = `approved`
  - Perfil completo (ver seção 2.1)
- Podem: gerenciar cursos, exames, matrículas, vincular alunos a docentes

#### 1.4.3. Docentes
- Podem acessar: `ms-shocoll-api` (endpoints `/api/teacher/*`)
- Requisitos para acesso:
  - Token JWT válido
  - Role = `teacher`
  - Usuário deve existir no banco local (`ms-shocoll-api`)
- Podem: visualizar alunos vinculados, ver notas, criar acompanhamentos

#### 1.4.4. Administradores
- Podem acessar: `ms-admin-system`
- `super_admin`: pode criar outros admins
- Podem: aprovar/rejeitar escolas, visualizar todas as escolas

---

## 🏫 2. GESTÃO DE ESCOLAS

### 2.1. Perfil Completo da Escola

#### 2.1.1. Campos Obrigatórios
A escola **DEVE** preencher todos os campos abaixo antes de realizar qualquer atividade:

1. **Nome completo** (`name`)
2. **Acrônimo** (`acronym`)
3. **Logotipo** (`logo_path`) - Upload de arquivo
4. **2 Fotografias** (`photos`) - Array com pelo menos 2 fotos
5. **1 Vídeo de apresentação** (`presentation_video_path`) - Upload de arquivo
6. **Descrição** (`description`)
7. **Ano de fundação** (`founded_year`) - Número inteiro
8. **Localização** (`location_map_url`) - Link do Google Maps
9. **Número de telefone** (`phone_number`)
10. **E-mails de contato** (`contact_emails`) - Array com pelo menos 1 email

#### 2.1.2. Validação de Perfil
- **Endpoint de verificação**: `GET /api/profile/check-completion`
- **Middleware**: `RequireCompleteProfile`
- **Regras**:
  - Escolas com perfil incompleto **NÃO** podem acessar rotas protegidas
  - Rotas de perfil (`/api/profile/*`) são sempre acessíveis para permitir atualização
  - Retorna lista de campos faltantes e percentual de conclusão

### 2.2. Aprovação de Escolas

#### 2.2.1. Status da Escola
- **`pending`**: Escola aguardando aprovação (padrão ao ser criada)
- **`approved`**: Escola aprovada e pode acessar o sistema
- **`rejected`**: Escola rejeitada (não pode acessar)

#### 2.2.2. Processo de Aprovação
- Apenas administradores podem aprovar/rejeitar escolas
- Ao aprovar:
  - `status` → `approved`
  - `approved_at` → data/hora atual
  - `rejection_reason` → `null`
- Ao rejeitar:
  - `status` → `rejected`
  - `rejection_reason` → motivo da rejeição (opcional)
  - `approved_at` → `null`

#### 2.2.3. Bloqueio de Acesso
- Escolas com `status != 'approved'` **NÃO** podem acessar `ms-shocoll-api`
- Middleware `AuthenticateApi` verifica status antes de permitir acesso

---

## 📚 3. GESTÃO DE CURSOS

### 3.1. Sistema Educacional Angolano

O sistema segue as regras do ensino angolano com dois níveis principais:

#### 3.1.1. Ensino Médio
- **Duração**: Sempre **9 meses** (fixo)
- **Estrutura**: Classes (10ª, 11ª, 12ª, 13ª)
- **Propina**: Estudante paga **9 meses de propina mensal**
- **Campos obrigatórios**:
  - `education_level` = `'medio'`
  - `class_level` = `10`, `11`, `12` ou `13`
  - `monthly_tuition` = Propina mensal em Kz (Kwanzas)
- **Cálculo de propina total**: `monthly_tuition × 9`

#### 3.1.2. Ensino Superior
- **Duração**: Variável (definida pela escola)
- **Estrutura**: Anos (1º Ano, 2º Ano, 3º Ano, etc.)
- **Propina**: Mensalidade por ano
- **Campos obrigatórios**:
  - `education_level` = `'superior'`
  - `year_level` = Ano do curso (1, 2, 3, etc.)
  - `monthly_tuition` = Propina mensal em Kz (Kwanzas)
  - `duration_months` = Duração em meses (opcional, pode variar)

### 3.2. Criação de Cursos

- **Endpoint**: `POST /api/courses` (ms-shocoll-api)
- **Regras**:
  - Apenas escolas aprovadas com perfil completo podem criar cursos
  - Curso é vinculado automaticamente à escola que o cria (`school_id`)
  - Campos obrigatórios: `name`, `education_level`, `monthly_tuition`
  - **Para ensino médio**: `class_level` obrigatório (10, 11, 12 ou 13)
  - **Para ensino superior**: `year_level` obrigatório (≥ 1)
  - Campos opcionais: `description`, `code`, `price`, `faculty`, `image_path`
  - Curso é criado com `is_active = true`
  - **Duração automática**: Ensino médio sempre tem `duration_months = 9`

### 3.3. Validações de Cursos

- ✅ Ensino médio: `class_level` deve ser 10, 11, 12 ou 13
- ✅ Ensino médio: `duration_months` é sempre 9 (automático)
- ✅ Ensino superior: `year_level` deve ser ≥ 1
- ✅ `monthly_tuition` é obrigatório e deve ser ≥ 0
- ✅ `education_level` deve ser `'medio'` ou `'superior'`
- ❌ Ensino médio não pode ter `year_level`
- ❌ Ensino superior não pode ter `class_level`

### 3.4. Disciplinas/Cadeiras dos Cursos

- **Endpoint**: `POST /api/courses/{courseId}/subjects`
- **Regras**:
  - Apenas a escola dona do curso pode gerenciar disciplinas
  - Campos obrigatórios: `name`, `description`, `code`
  - Campos opcionais: `semester`, `trimester`, `credits`, `workload_hours`, `is_optional`, `order`
  - Disciplinas podem ser organizadas por semestre ou trimestre

### 3.5. Upload de Imagem do Curso

- **Endpoint**: `POST /api/courses/{id}/upload-image`
- **Regras**:
  - Apenas a escola dona do curso pode fazer upload
  - Arquivo é armazenado em `storage/app/public/courses/`
  - URL pública: `asset('storage/courses/{filename}')`

---

## 📝 4. MATRÍCULAS E EXAMES

### 4.1. Matrículas em Cursos

#### 4.1.1. Criação de Matrícula
- **Endpoint**: `POST /api/student/enrollments` (ms-stundent-api-laravel-temp → ms-shocoll-api)
- **Regras**:
  - Estudante não pode se matricular duas vezes no mesmo curso (constraint única)
  - Curso deve estar ativo (`is_active = true`)
  - Matrícula é criada com `status = 'pending'`
  - Campos obrigatórios: `course_id`, `student_id`, `student_email`, `student_name`
  - Campo opcional: `admission_exam_id` (se a matrícula está vinculada a um exame)

#### 4.1.2. Aprovação/Rejeição de Matrícula
- **Endpoint**: `POST /api/enrollments/{enrollmentId}/approve` ou `/reject`
- **Regras**:
  - Apenas a escola dona do curso pode aprovar/rejeitar
  - Ao aprovar:
    - `status` → `approved`
    - `approved_at` → data/hora atual
  - Ao rejeitar:
    - `status` → `rejected`
    - `rejection_reason` → motivo (opcional)
    - `rejected_at` → data/hora atual

### 4.2. Exames de Admissão

#### 4.2.1. Criação de Exame
- **Endpoint**: `POST /api/courses/{courseId}/admission-exams`
- **Regras**:
  - Apenas a escola dona do curso pode criar exames
  - Campos obrigatórios: `name`, `description`, `exam_date`
  - Campos opcionais: `registration_deadline`, `max_candidates`, `is_active`
  - Exame é criado com `is_active = true`

#### 4.2.2. Inscrição em Exame
- **Endpoint**: `POST /api/student/exam-registrations`
- **Regras**:
  - Estudante não pode se inscrever duas vezes no mesmo exame
  - Exame deve estar ativo (`is_active = true`)
  - Se `registration_deadline` existe, não pode estar expirado
  - Se `max_candidates` existe, não pode ter atingido o limite
  - Inscrição é criada com `status = 'registered'`

#### 4.2.3. Aprovação/Rejeição de Candidato
- **Endpoint**: `POST /api/exam-registrations/{registrationId}/approve` ou `/reject`
- **Regras**:
  - Apenas a escola dona do curso pode aprovar/rejeitar
  - Ao aprovar, candidato pode ser vinculado a uma matrícula

---

## 👨‍🏫 5. GESTÃO DE DOCENTES E ALUNOS

### 5.1. Vínculo Aluno-Docente

#### 5.1.1. Criação de Vínculo
- **Endpoint**: `POST /api/teachers/{teacherId}/students/{studentId}` (ms-shocoll-api)
- **Regras**:
  - Apenas escolas podem criar vínculos
  - Docente deve existir e ter role `teacher`
  - Aluno deve existir e ter role `student`
  - Não pode haver vínculo duplicado ativo (constraint única)
  - Se vínculo inativo existe, ele é reativado ao invés de criar novo
  - `school_id` é sempre a escola que está fazendo a requisição
  - Campos opcionais: `course_id`, `is_active` (padrão: `true`)

#### 5.1.2. Listagem de Vínculos
- **Por docente**: `GET /api/teachers/{teacherId}/students`
- **Por aluno**: `GET /api/students/{studentId}/teachers`
- **Regras**:
  - Apenas escolas podem listar
  - Retorna apenas vínculos da escola que está fazendo a requisição

#### 5.1.3. Desvincular
- **Endpoint**: `DELETE /api/teachers/{teacherId}/students/{studentId}`
- **Regras**:
  - Apenas escolas podem desvincular
  - Vínculo não é deletado, apenas desativado (`is_active = false`)
  - Mantém histórico para auditoria

### 5.2. Acompanhamento de Alunos por Docentes

#### 5.2.1. Criar Acompanhamento
- **Endpoint**: `POST /api/teacher/students/{studentId}/follow-ups`
- **Regras**:
  - Apenas docentes podem criar acompanhamentos
  - Docente deve ter vínculo ativo com o aluno
  - Campos obrigatórios: `title`, `description`, `follow_up_date`
  - Campos opcionais: `type` (academic, behavioral, attendance, other), `status` (positive, neutral, concern), `course_id`
  - `school_id` e `course_id` são preenchidos automaticamente do vínculo

#### 5.2.2. Listar Acompanhamentos
- **Endpoint**: `GET /api/teacher/students/{studentId}/follow-ups`
- **Regras**:
  - Apenas docentes podem listar
  - Docente deve ter vínculo ativo com o aluno
  - Retorna ordenado por data (mais recente primeiro)

### 5.3. Visualização de Notas

- **Endpoint**: `GET /api/teacher/students/{studentId}/grades`
- **Regras**:
  - Apenas docentes podem visualizar
  - Docente deve ter vínculo ativo com o aluno
  - Notas são buscadas do `ms-stundent-api-laravel-temp` via API interna
  - Requer autenticação via API Secret

---

## 🔄 6. REPLICAÇÃO DE USUÁRIOS

### 6.1. Replicação de Escolas

- **Quando**: Após verificação de email (evento `school.create`)
- **Como**: Via RabbitMQ (exchange `user_events`, routing key `school.create`)
- **Onde**: `ms-shocoll-api`
- **Regras**:
  - Escola é criada com `status = 'pending'`
  - `status` é obrigatório para escolas (não pode ser `null`)

### 6.2. Replicação de Docentes

- **Quando**: Após verificação de email (evento `user.verified`)
- **Como**: Via RabbitMQ ou HTTP direto (fallback)
- **Onde**: `ms-shocoll-api`
- **Regras**:
  - Docente é criado com `status = null` (docentes não têm status de aprovação)
  - Se `AUTO_VERIFY_EMAILS=true`, replicação é feita imediatamente via HTTP

### 6.3. Consumer RabbitMQ

- **Comando**: `php artisan rabbitmq:consume-user-events` (ms-shocoll-api)
- **Regras**:
  - Processa eventos `user.verified` e `school.create`
  - Apenas replica usuários com role `school` ou `teacher`
  - Se usuário já existe, atualiza dados
  - Se usuário não existe, cria novo

---

## 📧 7. SISTEMA DE MENSAGENS

### 7.1. Envio de Emails

- **Serviço**: `ms-message-api-laravel`
- **Como**: Via RabbitMQ (exchange `email_events`)
- **Tipos de Email**:
  - Verificação de conta
  - Reset de senha
  - Notificações gerais

### 7.2. Eventos de Email

- **Verificação**: Enviado ao criar conta (exceto se `AUTO_VERIFY_EMAILS=true`)
- **Reset de Senha**: Enviado ao solicitar recuperação
- **Templates**: Definidos no serviço de mensagens

---

## 🔒 8. SEGURANÇA E VALIDAÇÕES

### 8.1. Validação de Dados

- **Email**: Deve ser único, formato válido
- **Senha**: Mínimo 8 caracteres (estudantes/escolas/docentes), mínimo 6 (admins)
- **UUID**: Todos os IDs são UUIDs (não incrementais)
- **Foreign Keys**: Relacionamentos validados no banco de dados

### 8.2. Middleware de Segurança

- **AuthenticateApi**: Valida JWT, verifica role, status e perfil completo (escolas)
- **AuthenticateTeacher**: Valida JWT e role `teacher`
- **AuthenticateApiSecret**: Valida secret para comunicação entre serviços
- **RequireCompleteProfile**: Bloqueia acesso se perfil incompleto

### 8.3. Constraints de Banco de Dados

- **Unicidade**:
  - Email único por usuário
  - Um estudante por curso (matrícula)
  - Um estudante por exame (inscrição)
  - Um vínculo único por par docente-aluno
- **Integridade Referencial**:
  - Foreign keys com `onDelete('cascade')` ou `onDelete('set null')`
  - Índices para performance

---

## 🎯 9. REGRAS ESPECIAIS

### 9.1. Modo Desenvolvimento

- **Variável**: `AUTO_VERIFY_EMAILS=true`
- **Efeitos**:
  - Emails são verificados automaticamente
  - Eventos são emitidos imediatamente
  - Docentes são replicados via HTTP (fallback)
  - Não envia emails reais

### 9.2. Geração de IDs

- **Usuários**: UUID v4
- **Estudantes**: `ST{ANO}{6 dígitos}` (ex: ST2025000001)
- **Todos os modelos**: UUID v4 (cursos, exames, matrículas, etc.)

### 9.3. Soft Delete vs Hard Delete

- **Vínculos Aluno-Docente**: Soft delete (`is_active = false`)
- **Matrículas**: Hard delete (pode ser cancelada)
- **Exames**: Hard delete (pode ser removido)
- **Usuários**: Hard delete (mas com cascade em relacionamentos)

### 9.4. Upload de Arquivos

- **Armazenamento**: `storage/app/public/`
- **Tipos**:
  - Logo: `storage/app/public/logos/`
  - Fotos: `storage/app/public/photos/`
  - Vídeo: `storage/app/public/videos/`
  - Imagem de curso: `storage/app/public/courses/`
- **Acesso**: Via `asset()` helper (URL pública)

---

## 📊 10. FLUXOS PRINCIPAIS

### 10.1. Fluxo de Registro de Escola

1. Escola se registra em `ms-users-api-laravel`
2. Email de verificação é enviado (ou verificado automaticamente)
3. Evento `school.create` é emitido
4. Escola é replicada para `ms-shocoll-api` com `status = 'pending'`
5. Administrador aprova escola
6. Escola pode acessar sistema (após completar perfil)

### 10.2. Fluxo de Matrícula

1. Estudante se matricula em curso via `ms-stundent-api-laravel-temp`
2. Matrícula é criada em `ms-shocoll-api` com `status = 'pending'`
3. Escola visualiza matrícula pendente
4. Escola aprova ou rejeita
5. Se aprovada, estudante está matriculado

### 10.3. Fluxo de Vínculo Aluno-Docente

1. Escola vincula aluno a docente via `POST /api/teachers/{teacherId}/students/{studentId}`
2. Vínculo é criado com `is_active = true`
3. Docente pode visualizar aluno em `/api/teacher/students`
4. Docente pode criar acompanhamentos e visualizar notas

---

## ⚠️ 11. VALIDAÇÕES E RESTRIÇÕES

### 11.1. Validações de Negócio

- ✅ Email único por usuário
- ✅ Estudante não pode se matricular duas vezes no mesmo curso
- ✅ Estudante não pode se inscrever duas vezes no mesmo exame
- ✅ Docente não pode ter o mesmo aluno vinculado duas vezes
- ✅ Escola deve estar aprovada para acessar sistema
- ✅ Escola deve ter perfil completo para realizar atividades
- ✅ Curso deve estar ativo para matrícula/inscrição
- ✅ Exame deve estar ativo e dentro do prazo para inscrição
- ✅ Docente deve ter vínculo ativo para acessar dados do aluno

### 11.2. Restrições de Acesso

- ❌ Escolas `pending` ou `rejected` não podem acessar `ms-shocoll-api`
- ❌ Escolas com perfil incompleto não podem criar cursos/exames
- ❌ Docentes só podem acessar alunos vinculados
- ❌ Apenas escola dona pode gerenciar seus cursos/exames
- ❌ Apenas escola pode vincular/desvincular alunos a docentes

---

## 📝 12. OBSERVAÇÕES IMPORTANTES

1. **Status de Docentes**: Docentes não têm status de aprovação (`status = null`), apenas escolas têm
2. **Replicação**: Usuários são replicados entre serviços via RabbitMQ ou HTTP
3. **Perfil Completo**: É obrigatório para escolas realizarem atividades, mas não para atualizar perfil
4. **Histórico**: Vínculos aluno-docente mantêm histórico (soft delete)
5. **UUIDs**: Todos os IDs são UUIDs para evitar conflitos entre serviços
6. **JWT**: Tokens são válidos em todos os serviços (SSO - Single Sign-On)

---

**Última atualização**: 2025-01-21

