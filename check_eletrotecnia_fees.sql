-- Query para verificar propinas do curso de Eletrotecnia
-- Execute no banco de dados ms-stundent-api-laravel-temp

-- 1. Verificar se há fees com course_id
SELECT 
    COUNT(*) as total_fees,
    COUNT(DISTINCT course_id) as total_courses,
    COUNT(DISTINCT student_id) as total_students
FROM fees
WHERE course_id IS NOT NULL;

-- 2. Listar todos os course_ids únicos e quantas fees cada um tem
SELECT 
    course_id,
    COUNT(*) as total_fees,
    COUNT(DISTINCT DATE_FORMAT(due_date, '%Y-%m')) as total_meses,
    MIN(due_date) as primeira_propina,
    MAX(due_date) as ultima_propina
FROM fees
WHERE course_id IS NOT NULL
GROUP BY course_id
ORDER BY total_fees DESC;

-- 3. Para um course_id específico (substitua pelo ID do curso de Eletrotecnia)
-- Exemplo: c021da95-46b4-4b90-866b-906fc8b710a1
SELECT 
    course_id,
    COUNT(*) as total_fees,
    COUNT(DISTINCT DATE_FORMAT(due_date, '%Y-%m')) as total_meses_unicos,
    GROUP_CONCAT(DISTINCT DATE_FORMAT(due_date, '%Y-%m') ORDER BY due_date SEPARATOR ', ') as meses,
    MIN(due_date) as primeira_propina,
    MAX(due_date) as ultima_propina,
    SUM(amount) as valor_total
FROM fees
WHERE course_id = 'c021da95-46b4-4b90-866b-906fc8b710a1'
GROUP BY course_id;

-- 4. Detalhes das fees por mês para o curso de Eletrotecnia
SELECT 
    DATE_FORMAT(due_date, '%Y-%m') as mes,
    COUNT(*) as quantidade_propinas,
    SUM(amount) as valor_total_mes,
    MIN(amount) as valor_minimo,
    MAX(amount) as valor_maximo
FROM fees
WHERE course_id = 'c021da95-46b4-4b90-866b-906fc8b710a1'
GROUP BY DATE_FORMAT(due_date, '%Y-%m')
ORDER BY mes;

-- 5. Listar todas as fees do curso de Eletrotecnia
SELECT 
    id,
    student_id,
    course_id,
    amount,
    due_date,
    status,
    description,
    created_at
FROM fees
WHERE course_id = 'c021da95-46b4-4b90-866b-906fc8b710a1'
ORDER BY due_date;

