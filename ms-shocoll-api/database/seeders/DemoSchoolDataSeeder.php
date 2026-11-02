<?php

namespace Database\Seeders;

use App\Models\AdmissionExam;
use App\Models\ClassStudent;
use App\Models\ClassSubject;
use App\Models\Course;
use App\Models\CourseSubject;
use App\Models\Enrollment;
use App\Models\Schedule;
use App\Models\SchoolClass;
use App\Models\TeacherClassAssignment;
use App\Models\TeacherStudent;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Dados académicos demo. UUIDs alinhados com ms-users / ms-student.
 */
class DemoSchoolDataSeeder extends Seeder
{
    public const SCHOOL_MEDIO_ID = '11111111-1111-1111-1111-111111111101';
    public const SCHOOL_SUPERIOR_ID = '11111111-1111-1111-1111-111111111102';

    public const TEACHER_MEDIO_1_ID = '22222222-2222-2222-2222-222222222201';
    public const TEACHER_MEDIO_2_ID = '22222222-2222-2222-2222-222222222202';
    public const TEACHER_SUPERIOR_1_ID = '22222222-2222-2222-2222-222222222203';

    public const STUDENT_1_ID = '33333333-3333-3333-3333-333333333301';
    public const STUDENT_2_ID = '33333333-3333-3333-3333-333333333302';
    public const STUDENT_3_ID = '33333333-3333-3333-3333-333333333303';

    public const COURSE_MEDIO_INFO_ID = '44444444-4444-4444-4444-444444444401';
    public const COURSE_MEDIO_ELET_ID = '44444444-4444-4444-4444-444444444402';
    public const COURSE_SUP_INFO_ID = '44444444-4444-4444-4444-444444444403';

    public const SUBJECT_PROG_ID = '55555555-5555-5555-5555-555555555501';
    public const SUBJECT_REDES_ID = '55555555-5555-5555-5555-555555555502';
    public const SUBJECT_ELET_ID = '55555555-5555-5555-5555-555555555503';
    public const SUBJECT_ALG_ID = '55555555-5555-5555-5555-555555555504';
    public const SUBJECT_BD_ID = '55555555-5555-5555-5555-555555555505';

    public const EXAM_MEDIO_ID = '66666666-6666-6666-6666-666666666601';
    public const EXAM_SUP_ID = '66666666-6666-6666-6666-666666666602';

    public const ENROLL_1_ID = '77777777-7777-7777-7777-777777777701';
    public const ENROLL_2_ID = '77777777-7777-7777-7777-777777777702';
    public const ENROLL_3_ID = '77777777-7777-7777-7777-777777777703';

    public const CLASS_MEDIO_ID = '88888888-8888-8888-8888-888888888801';
    public const CLASS_SUP_ID = '88888888-8888-8888-8888-888888888802';

    public function run(): void
    {
        $this->seedSchoolsAndTeachers();
        $this->seedCoursesAndSubjects();
        $this->seedExams();
        $this->seedEnrollments();
        $this->seedClasses();
        $this->seedAssignmentsAndSchedules();

        $this->command?->info('Demo school academic data seeded.');
    }

    private function seedSchoolsAndTeachers(): void
    {
        $this->upsertUser([
            'id' => self::SCHOOL_MEDIO_ID,
            'name' => 'Instituto Médio Politécnico de Luanda',
            'email' => 'escola.medio@demo.multshool.ao',
            'role' => User::ROLE_SCHOOL,
            'institution_type' => 'medio',
            'status' => User::STATUS_APPROVED,
            'approved_at' => now(),
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
            'acronym' => 'IMPL',
            'logo_path' => 'demo/logos/impl.png',
            'photos' => ['demo/photos/impl-1.jpg', 'demo/photos/impl-2.jpg'],
            'presentation_video_path' => 'demo/videos/impl.mp4',
            'description' => 'Instituto médio técnico demo com cursos de Informática e Electrotecnia.',
            'founded_year' => 1998,
            'location_map_url' => 'https://maps.google.com/?q=Luanda',
            'total_students' => 1200,
            'phone_number' => '+244900000101',
            'contact_emails' => ['contacto@impl.demo.ao'],
        ]);

        $this->upsertUser([
            'id' => self::SCHOOL_SUPERIOR_ID,
            'name' => 'Universidade Demo Agostinho Neto',
            'email' => 'escola.superior@demo.multshool.ao',
            'role' => User::ROLE_SCHOOL,
            'institution_type' => 'superior',
            'status' => User::STATUS_APPROVED,
            'approved_at' => now(),
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
            'acronym' => 'UDAN',
            'logo_path' => 'demo/logos/udan.png',
            'photos' => ['demo/photos/udan-1.jpg', 'demo/photos/udan-2.jpg'],
            'presentation_video_path' => 'demo/videos/udan.mp4',
            'description' => 'Universidade demo com Engenharia Informática.',
            'founded_year' => 1962,
            'location_map_url' => 'https://maps.google.com/?q=Luanda+Universidade',
            'total_students' => 8500,
            'phone_number' => '+244900000102',
            'contact_emails' => ['secretaria@udan.demo.ao'],
        ]);

        foreach ([
            [self::TEACHER_MEDIO_1_ID, 'Prof. António Silva', 'prof.antonio@demo.multshool.ao'],
            [self::TEACHER_MEDIO_2_ID, 'Prof. Maria Fernandes', 'prof.maria@demo.multshool.ao'],
            [self::TEACHER_SUPERIOR_1_ID, 'Dr. João Mendes', 'prof.joao@demo.multshool.ao'],
        ] as [$id, $name, $email]) {
            $this->upsertUser([
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'role' => User::ROLE_TEACHER,
                'status' => null,
                'email_verified' => true,
                'email_verified_at' => now(),
                'is_active' => true,
            ]);
        }
    }

    private function seedCoursesAndSubjects(): void
    {
        Course::updateOrCreate(
            ['id' => self::COURSE_MEDIO_INFO_ID],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'name' => 'Informática de Gestão',
                'description' => 'Curso técnico médio de Informática (12ª classe).',
                'code' => 'INF-12',
                'education_level' => Course::EDUCATION_LEVEL_MEDIO,
                'class_level' => 12,
                'duration_months' => 9,
                'price' => 0,
                'monthly_tuition' => 25000,
                'is_active' => true,
                'faculty' => 'Tecnologia',
            ]
        );

        Course::updateOrCreate(
            ['id' => self::COURSE_MEDIO_ELET_ID],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'name' => 'Electrotecnia',
                'description' => 'Curso técnico médio de Electrotecnia (11ª classe).',
                'code' => 'ELT-11',
                'education_level' => Course::EDUCATION_LEVEL_MEDIO,
                'class_level' => 11,
                'duration_months' => 9,
                'price' => 0,
                'monthly_tuition' => 22000,
                'is_active' => true,
                'faculty' => 'Engenharia',
            ]
        );

        Course::updateOrCreate(
            ['id' => self::COURSE_SUP_INFO_ID],
            [
                'school_id' => self::SCHOOL_SUPERIOR_ID,
                'name' => 'Engenharia Informática',
                'description' => 'Licenciatura em Engenharia Informática — 1º ano.',
                'code' => 'LEI-1',
                'education_level' => Course::EDUCATION_LEVEL_SUPERIOR,
                'year_level' => 1,
                'duration_months' => 48,
                'price' => 150000,
                'monthly_tuition' => 45000,
                'is_active' => true,
                'faculty' => 'Engenharia',
            ]
        );

        $subjects = [
            [self::SUBJECT_PROG_ID, self::COURSE_MEDIO_INFO_ID, 'Programação', 'PROG-12', 1, 1],
            [self::SUBJECT_REDES_ID, self::COURSE_MEDIO_INFO_ID, 'Redes de Computadores', 'RED-12', 1, 2],
            [self::SUBJECT_ELET_ID, self::COURSE_MEDIO_ELET_ID, 'Circuitos Eléctricos', 'CIR-11', 1, 1],
            [self::SUBJECT_ALG_ID, self::COURSE_SUP_INFO_ID, 'Algoritmos e Estruturas de Dados', 'AED-1', 1, 1],
            [self::SUBJECT_BD_ID, self::COURSE_SUP_INFO_ID, 'Bases de Dados', 'BD-1', 1, 2],
        ];

        foreach ($subjects as [$id, $courseId, $name, $code, $semester, $order]) {
            CourseSubject::updateOrCreate(
                ['id' => $id],
                [
                    'course_id' => $courseId,
                    'name' => $name,
                    'description' => "Disciplina demo: {$name}",
                    'code' => $code,
                    'semester' => $semester,
                    'credits' => 6,
                    'hours' => 60,
                    'is_optional' => false,
                    'order' => $order,
                ]
            );
        }
    }

    private function seedExams(): void
    {
        AdmissionExam::updateOrCreate(
            ['id' => self::EXAM_MEDIO_ID],
            [
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'name' => 'Exame de Admissão — Informática 2026',
                'description' => 'Prova escrita de lógica e matemática.',
                'status' => 'scheduled',
                'exam_date' => now()->addDays(30),
                'registration_deadline' => now()->addDays(20),
                'max_candidates' => 100,
                'exam_fee' => 5000,
                'instructions' => 'Levar BI e material de escrita.',
                'is_active' => true,
            ]
        );

        AdmissionExam::updateOrCreate(
            ['id' => self::EXAM_SUP_ID],
            [
                'course_id' => self::COURSE_SUP_INFO_ID,
                'name' => 'Exame de Admissão — LEI 2026',
                'description' => 'Prova de matemática e raciocínio.',
                'status' => 'scheduled',
                'exam_date' => now()->addDays(45),
                'registration_deadline' => now()->addDays(30),
                'max_candidates' => 200,
                'exam_fee' => 10000,
                'instructions' => 'Chegar 30 minutos antes.',
                'is_active' => true,
            ]
        );
    }

    private function seedEnrollments(): void
    {
        Enrollment::updateOrCreate(
            ['id' => self::ENROLL_1_ID],
            [
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'student_id' => self::STUDENT_1_ID,
                'student_email' => 'aluno.carlos@demo.multshool.ao',
                'student_name' => 'Carlos Eduardo Neto',
                'student_phone' => '+244900000301',
                'status' => Enrollment::STATUS_APPROVED,
                'exam_passed' => true,
                'approved_at' => now()->subDays(5),
                'class' => 'Turma A',
            ]
        );

        Enrollment::updateOrCreate(
            ['id' => self::ENROLL_2_ID],
            [
                'course_id' => self::COURSE_MEDIO_ELET_ID,
                'student_id' => self::STUDENT_2_ID,
                'student_email' => 'aluno.ana@demo.multshool.ao',
                'student_name' => 'Ana Paula Costa',
                'student_phone' => '+244900000302',
                'status' => Enrollment::STATUS_APPROVED,
                'exam_passed' => true,
                'approved_at' => now()->subDays(3),
                'class' => 'Turma A',
            ]
        );

        Enrollment::updateOrCreate(
            ['id' => self::ENROLL_3_ID],
            [
                'course_id' => self::COURSE_SUP_INFO_ID,
                'student_id' => self::STUDENT_3_ID,
                'student_email' => 'aluno.pedro@demo.multshool.ao',
                'student_name' => 'Pedro Miguel Santos',
                'student_phone' => '+244900000303',
                'status' => Enrollment::STATUS_PENDING,
                'admission_exam_id' => self::EXAM_SUP_ID,
                'exam_passed' => false,
            ]
        );

        TeacherStudent::updateOrCreate(
            [
                'teacher_id' => self::TEACHER_MEDIO_1_ID,
                'student_id' => self::STUDENT_1_ID,
            ],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'is_active' => true,
            ]
        );
    }

    private function seedClasses(): void
    {
        SchoolClass::updateOrCreate(
            ['id' => self::CLASS_MEDIO_ID],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'name' => 'Turma A',
                'semester' => 1,
                'academic_year' => '2026',
                'status' => SchoolClass::STATUS_ACTIVE,
                'max_students' => 40,
            ]
        );

        SchoolClass::updateOrCreate(
            ['id' => self::CLASS_SUP_ID],
            [
                'school_id' => self::SCHOOL_SUPERIOR_ID,
                'course_id' => self::COURSE_SUP_INFO_ID,
                'name' => 'Turma LEI-1A',
                'semester' => 1,
                'academic_year' => '2026',
                'status' => SchoolClass::STATUS_ACTIVE,
                'max_students' => 50,
            ]
        );

        ClassSubject::updateOrCreate(
            [
                'class_id' => self::CLASS_MEDIO_ID,
                'subject_id' => self::SUBJECT_PROG_ID,
            ],
            []
        );
        ClassSubject::updateOrCreate(
            [
                'class_id' => self::CLASS_MEDIO_ID,
                'subject_id' => self::SUBJECT_REDES_ID,
            ],
            []
        );
        ClassSubject::updateOrCreate(
            [
                'class_id' => self::CLASS_SUP_ID,
                'subject_id' => self::SUBJECT_ALG_ID,
            ],
            []
        );

        ClassStudent::updateOrCreate(
            [
                'class_id' => self::CLASS_MEDIO_ID,
                'enrollment_id' => self::ENROLL_1_ID,
            ],
            [
                'student_id' => self::STUDENT_1_ID,
            ]
        );
    }

    private function seedAssignmentsAndSchedules(): void
    {
        TeacherClassAssignment::updateOrCreate(
            [
                'teacher_id' => self::TEACHER_MEDIO_1_ID,
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'subject_id' => self::SUBJECT_PROG_ID,
                'class' => 'Turma A',
            ],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'workload_hours' => 12,
                'assignment_type' => 'principal',
                'is_active' => true,
            ]
        );

        TeacherClassAssignment::updateOrCreate(
            [
                'teacher_id' => self::TEACHER_SUPERIOR_1_ID,
                'course_id' => self::COURSE_SUP_INFO_ID,
                'subject_id' => self::SUBJECT_ALG_ID,
                'class' => 'Turma LEI-1A',
            ],
            [
                'school_id' => self::SCHOOL_SUPERIOR_ID,
                'workload_hours' => 8,
                'assignment_type' => 'principal',
                'is_active' => true,
            ]
        );

        Schedule::updateOrCreate(
            [
                'class_id' => self::CLASS_MEDIO_ID,
                'day_of_week' => 'monday',
                'start_time' => '08:00:00',
                'room' => 'Lab 1',
                'type' => 'class',
            ],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'subject_id' => self::SUBJECT_PROG_ID,
                'class_name' => 'Turma A',
                'teacher_id' => self::TEACHER_MEDIO_1_ID,
                'end_time' => '09:30:00',
                'academic_year' => '2026',
                'semester' => 1,
                'is_active' => true,
            ]
        );

        Schedule::updateOrCreate(
            [
                'class_id' => self::CLASS_MEDIO_ID,
                'day_of_week' => 'wednesday',
                'start_time' => '10:00:00',
                'room' => 'Lab 2',
                'type' => 'class',
            ],
            [
                'school_id' => self::SCHOOL_MEDIO_ID,
                'course_id' => self::COURSE_MEDIO_INFO_ID,
                'subject_id' => self::SUBJECT_REDES_ID,
                'class_name' => 'Turma A',
                'teacher_id' => self::TEACHER_MEDIO_1_ID,
                'end_time' => '11:30:00',
                'academic_year' => '2026',
                'semester' => 1,
                'is_active' => true,
            ]
        );

        Schedule::updateOrCreate(
            [
                'class_id' => self::CLASS_SUP_ID,
                'exam_date' => now()->addDays(60)->toDateString(),
                'start_time' => '09:00:00',
                'room' => 'Anfiteatro A',
                'type' => 'exam',
            ],
            [
                'school_id' => self::SCHOOL_SUPERIOR_ID,
                'course_id' => self::COURSE_SUP_INFO_ID,
                'subject_id' => self::SUBJECT_ALG_ID,
                'class_name' => 'Turma LEI-1A',
                'teacher_id' => self::TEACHER_SUPERIOR_1_ID,
                'day_of_week' => null,
                'exam_type' => 'test',
                'end_time' => '11:00:00',
                'academic_year' => '2026',
                'semester' => 1,
                'is_active' => true,
            ]
        );
    }

    private function upsertUser(array $data): void
    {
        $existing = User::find($data['id']);
        if ($existing) {
            $existing->forceFill(collect($data)->except('id')->all())->save();
            return;
        }

        $user = new User();
        $user->forceFill($data);
        $user->id = $data['id'];
        $user->save();
    }
}
