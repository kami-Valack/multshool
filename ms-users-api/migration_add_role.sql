-- Migration para adicionar coluna role aos usuários existentes
-- Execute este script no banco de dados PostgreSQL

-- Adicionar coluna role se não existir
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'student';

-- Atualizar todos os usuários existentes que não têm role definida
UPDATE users 
SET role = 'student' 
WHERE role IS NULL OR role = '';

-- Garantir que a coluna não aceite NULL
ALTER TABLE users 
ALTER COLUMN role SET DEFAULT 'student',
ALTER COLUMN role SET NOT NULL;


