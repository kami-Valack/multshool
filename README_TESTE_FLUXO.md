# 🧪 Script de Teste Completo - Sistema Multishol

## 📋 Descrição

O script `testar_fluxo_completo.php` testa todo o fluxo do sistema, incluindo:

1. ✅ Registro de usuários (estudante, escola, docente)
2. ✅ Login e autenticação
3. ✅ Verificação de perfil da escola
4. ✅ Criação de cursos (ensino médio e superior) com regras angolanas
5. ✅ Matrículas
6. ✅ Vínculo aluno-docente
7. ✅ Acompanhamentos por docentes

## 🚀 Como Usar

### Pré-requisitos

1. Todos os serviços devem estar rodando:
   - `ms-users-api-laravel` (porta 8000)
   - `ms-shocoll-api` (porta 8003)
   - `ms-stundent-api-laravel-temp` (porta 8001)

2. RabbitMQ deve estar rodando (para replicação de usuários)

3. Banco de dados configurado e migrations executadas

4. Variável de ambiente `AUTO_VERIFY_EMAILS=true` (opcional, para desenvolvimento)

### Executar o Script

```bash
php testar_fluxo_completo.php
```

### Configuração

Se necessário, ajuste as URLs no início do script:

```php
$usersApiUrl = 'http://localhost:8000';
$schoolApiUrl = 'http://localhost:8003';
$studentApiUrl = 'http://localhost:8001';
```

Para matrículas, configure o `API_SECRET`:

```bash
export API_SECRET="seu-secret-aqui"
```

Ou edite o script na linha:
```php
["X-API-Secret: " . getenv('API_SECRET') ?: 'seu-secret-aqui', ...]
```

## 📊 O que o Script Testa

### 1. Registro de Usuários
- Cria um estudante
- Cria uma escola
- Cria um docente

### 2. Login
- Login do estudante
- Login da escola
- Login do docente

### 3. Perfil da Escola
- Verifica se o perfil está completo
- Mostra campos faltantes

### 4. Criação de Cursos

#### Ensino Médio
- Cria curso de 10ª Classe
- Valida duração fixa de 9 meses
- Calcula propina total (9 × propina mensal)

#### Ensino Superior
- Cria curso de 1º Ano
- Valida ano obrigatório
- Mostra propina mensal

### 5. Matrículas
- Estudante se matricula no curso de ensino médio
- Matrícula fica com status `pending`

### 6. Vínculo Aluno-Docente
- Escola vincula aluno ao docente
- Valida criação do vínculo

### 7. Acesso do Docente
- Docente visualiza seus alunos
- Docente cria acompanhamento

## ⚠️ Observações

1. **Escola precisa ser aprovada**: A escola criada precisa ser aprovada por um administrador antes de poder criar cursos
2. **Perfil completo**: A escola precisa completar o perfil antes de criar cursos
3. **Replicação**: Usuários são replicados via RabbitMQ, pode levar alguns segundos
4. **Matrículas**: Requer `API_SECRET` configurado para comunicação entre serviços

## 🔍 Saída do Script

O script mostra:
- ✅ Sucessos em verde
- ❌ Erros em vermelho
- ⚠️ Avisos em amarelo
- ℹ️ Informações em azul
- 🔵 Passos em ciano

## 📝 Exemplo de Saída

```
═══════════════════════════════════════════════════════════════
🧪 TESTE COMPLETO DO SISTEMA MULTISHOL
═══════════════════════════════════════════════════════════════

1️⃣  REGISTRO DE USUÁRIOS
✅ Estudante registrado: joao.silva@teste.com
✅ Escola registrada: escola.teste@ist.ao
✅ Docente registrado: prof.carlos@teste.com

2️⃣  LOGIN E AUTENTICAÇÃO
✅ Login do estudante realizado com sucesso
✅ Login da escola realizado com sucesso
✅ Login do docente realizado com sucesso

4️⃣  CRIAÇÃO DE CURSOS (ENSINO ANGOLANO)
✅ Curso de ensino médio criado!
   Duração: 9 meses (fixo para ensino médio)
   Classe: 10ª Classe
   Propina mensal: 5000 Kz
   Propina total (9 meses): 45000 Kz
```

## 🐛 Troubleshooting

### Erro: "Escola não encontrada no banco local"
- Verifique se o RabbitMQ consumer está rodando
- Execute: `cd ms-shocoll-api && php artisan rabbitmq:consume-user-events`

### Erro: "Acesso negado. Sua escola ainda não foi aprovada"
- Aprove a escola no sistema administrativo
- Ou atualize diretamente no banco: `UPDATE users SET status = 'approved' WHERE email = 'escola.teste@ist.ao'`

### Erro: "Perfil incompleto"
- Complete o perfil da escola via API
- Ou use o endpoint `/api/profile/check-completion` para ver campos faltantes

### Erro: "API_SECRET inválido"
- Configure a variável de ambiente `API_SECRET`
- Ou edite o script com o secret correto

## 📚 Próximos Passos Após o Teste

1. Aprovar a escola no sistema administrativo
2. Completar o perfil da escola
3. Aprovar matrículas pendentes
4. Testar visualização de notas (requer integração completa)
5. Testar exames de admissão
6. Testar gerenciamento de disciplinas

