<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Contas demo com UUIDs fixos (partilhados com ms-student e ms-school).
 * Password de todas: Senha123!
 */
class DemoAccountsSeeder extends Seeder
{
    public const PASSWORD = 'Senha123!';

    public const SCHOOL_MEDIO_ID = '11111111-1111-1111-1111-111111111101';
    public const SCHOOL_SUPERIOR_ID = '11111111-1111-1111-1111-111111111102';

    public const TEACHER_MEDIO_1_ID = '22222222-2222-2222-2222-222222222201';
    public const TEACHER_MEDIO_2_ID = '22222222-2222-2222-2222-222222222202';
    public const TEACHER_SUPERIOR_1_ID = '22222222-2222-2222-2222-222222222203';

    public const STUDENT_1_ID = '33333333-3333-3333-3333-333333333301';
    public const STUDENT_2_ID = '33333333-3333-3333-3333-333333333302';
    public const STUDENT_3_ID = '33333333-3333-3333-3333-333333333303';

    public function run(): void
    {
        $password = Hash::make(self::PASSWORD);

        $this->upsert([
            'id' => self::SCHOOL_MEDIO_ID,
            'name' => 'Instituto Médio Politécnico de Luanda',
            'email' => 'escola.medio@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_SCHOOL,
            'institution_type' => 'medio',
            'phone' => '+244900000101',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::SCHOOL_SUPERIOR_ID,
            'name' => 'Universidade Demo Agostinho Neto',
            'email' => 'escola.superior@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_SCHOOL,
            'institution_type' => 'superior',
            'phone' => '+244900000102',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::TEACHER_MEDIO_1_ID,
            'name' => 'Prof. António Silva',
            'email' => 'prof.antonio@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_TEACHER,
            'school_id' => self::SCHOOL_MEDIO_ID,
            'department' => 'Informática',
            'position' => 'Professor',
            'contract_type' => 'efectivo',
            'phone' => '+244900000201',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::TEACHER_MEDIO_2_ID,
            'name' => 'Prof. Maria Fernandes',
            'email' => 'prof.maria@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_TEACHER,
            'school_id' => self::SCHOOL_MEDIO_ID,
            'department' => 'Electrotecnia',
            'position' => 'Professora',
            'contract_type' => 'efectivo',
            'phone' => '+244900000202',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::TEACHER_SUPERIOR_1_ID,
            'name' => 'Dr. João Mendes',
            'email' => 'prof.joao@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_TEACHER,
            'school_id' => self::SCHOOL_SUPERIOR_ID,
            'department' => 'Engenharia Informática',
            'position' => 'Docente',
            'contract_type' => 'efectivo',
            'phone' => '+244900000203',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::STUDENT_1_ID,
            'student_id' => 'ST2026000001',
            'name' => 'Carlos Eduardo Neto',
            'email' => 'aluno.carlos@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_STUDENT,
            'phone' => '+244900000301',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::STUDENT_2_ID,
            'student_id' => 'ST2026000002',
            'name' => 'Ana Paula Costa',
            'email' => 'aluno.ana@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_STUDENT,
            'phone' => '+244900000302',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->upsert([
            'id' => self::STUDENT_3_ID,
            'student_id' => 'ST2026000003',
            'name' => 'Pedro Miguel Santos',
            'email' => 'aluno.pedro@demo.multshool.ao',
            'password' => $password,
            'role' => User::ROLE_STUDENT,
            'phone' => '+244900000303',
            'email_verified' => true,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $this->command?->info('Demo accounts seeded (password: '.self::PASSWORD.')');
        $this->command?->table(
            ['Role', 'Email'],
            [
                ['school/medio', 'escola.medio@demo.multshool.ao'],
                ['school/superior', 'escola.superior@demo.multshool.ao'],
                ['teacher', 'prof.antonio@demo.multshool.ao'],
                ['teacher', 'prof.maria@demo.multshool.ao'],
                ['teacher', 'prof.joao@demo.multshool.ao'],
                ['student', 'aluno.carlos@demo.multshool.ao'],
                ['student', 'aluno.ana@demo.multshool.ao'],
                ['student', 'aluno.pedro@demo.multshool.ao'],
            ]
        );
    }

    private function upsert(array $data): void
    {
        $existing = User::find($data['id']) ?? User::where('email', $data['email'])->first();

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
