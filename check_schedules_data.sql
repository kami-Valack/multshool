-- Script SQL para verificar dados de horários e matrículas
-- Execute no banco de dados do ms-shocoll-api

-- 1. Verificar matrículas aprovadas e suas turmas
SELECT 
    e.id as enrollment_id,
    e.student_id,
    e.course_id,
    e.status,
    e.class as enrollment_class,
    cs.id as class_student_id,
    cs.class_id,
    c.name as class_name_from_relation,
    COUNT(s.id) as schedules_count
FROM enrollments e
LEFT JOIN class_students cs ON cs.enrollment_id = e.id
LEFT JOIN classes c ON c.id = cs.class_id
LEFT JOIN schedules s ON (
    (s.class_id = c.id OR s.class_name = e.class OR s.class_name = c.name)
    AND s.is_active = 1 
    AND s.type = 'class'
)
WHERE e.status = 'approved'
GROUP BY e.id, e.student_id, e.course_id, e.status, e.class, cs.id, cs.class_id, c.name
ORDER BY e.student_id;

-- 2. Verificar horários existentes
SELECT 
    s.id,
    s.class_id,
    s.class_name,
    s.course_id,
    s.day_of_week,
    s.start_time,
    s.end_time,
    s.is_active,
    s.type,
    c.name as class_name_from_table
FROM schedules s
LEFT JOIN classes c ON c.id = s.class_id
WHERE s.is_active = 1 AND s.type = 'class'
ORDER BY s.class_name, s.day_of_week, s.start_time;

-- 3. Verificar correspondência exata
SELECT 
    e.id as enrollment_id,
    e.student_id,
    e.class as enrollment_class,
    s.id as schedule_id,
    s.class_name as schedule_class_name,
    CASE 
        WHEN LOWER(TRIM(e.class)) = LOWER(TRIM(s.class_name)) THEN 'MATCH'
        ELSE 'NO MATCH'
    END as match_status
FROM enrollments e
CROSS JOIN schedules s
WHERE e.status = 'approved'
    AND e.class IS NOT NULL
    AND s.is_active = 1
    AND s.type = 'class'
    AND LOWER(TRIM(e.class)) = LOWER(TRIM(s.class_name))
ORDER BY e.student_id;

-- 4. Verificar alunos sem horários (PROBLEMA)
SELECT 
    e.id as enrollment_id,
    e.student_id,
    e.class as enrollment_class,
    cs.class_id,
    c.name as class_name_from_relation,
    COUNT(s.id) as schedules_count
FROM enrollments e
LEFT JOIN class_students cs ON cs.enrollment_id = e.id
LEFT JOIN classes c ON c.id = cs.class_id
LEFT JOIN schedules s ON (
    (s.class_id = c.id OR LOWER(TRIM(s.class_name)) = LOWER(TRIM(COALESCE(e.class, c.name, ''))))
    AND s.is_active = 1 
    AND s.type = 'class'
)
WHERE e.status = 'approved'
GROUP BY e.id, e.student_id, e.class, cs.class_id, c.name
HAVING COUNT(s.id) = 0
ORDER BY e.student_id;

