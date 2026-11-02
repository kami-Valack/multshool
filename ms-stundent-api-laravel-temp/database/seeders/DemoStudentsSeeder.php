<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Réplicas locais dos alunos demo (mesmos UUIDs do ms-users).
 * Sem password — login é no ms-users.
 */
class DemoStudentsSeeder extends Seeder
{
    public const STUDENT_1_ID = '33333333-3333-3333-3333-333333333301';
    public const STUDENT_2_ID = '33333333-3333-3333-3333-333333333302';
    public const STUDENT_3_ID = '33333333-3333-3333-3333-333333333303';

    public function run(): void
    {
        $students = [
            [
                'id' => self::STUDENT_1_ID,
                'student_id' => 'ST2026000001',
                'name' => 'Carlos Eduardo Neto',
                'email' => 'aluno.carlos@demo.multshool.ao',
            ],
            [
                'id' => self::STUDENT_2_ID,
                'student_id' => 'ST2026000002',
                'name' => 'Ana Paula Costa',
                'email' => 'aluno.ana@demo.multshool.ao',
            ],
            [
                'id' => self::STUDENT_3_ID,
                'student_id' => 'ST2026000003',
                'name' => 'Pedro Miguel Santos',
                'email' => 'aluno.pedro@demo.multshool.ao',
            ],
        ];

        foreach ($students as $data) {
            $user = User::find($data['id']);
            if (!$user) {
                $user = new User();
                $user->forceFill([
                    'id' => $data['id'],
                    'student_id' => $data['student_id'],
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'role' => User::ROLE_STUDENT,
                    'email_verified' => true,
                    'email_verified_at' => now(),
                    'is_active' => true,
                ]);
                $user->id = $data['id'];
                $user->save();
            } else {
                $user->forceFill([
                    'student_id' => $data['student_id'],
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'role' => User::ROLE_STUDENT,
                    'email_verified' => true,
                    'email_verified_at' => now(),
                    'is_active' => true,
                ])->save();
            }

            foreach (['bi', 'foto_tipo', 'habilitacao_literaria'] as $type) {
                Document::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'document_type' => $type,
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'file_name' => "demo_{$type}.pdf",
                        'file_path' => "demo/documents/{$user->id}/{$type}.pdf",
                        'mime_type' => 'application/pdf',
                        'file_size' => 1024,
                        'status' => Document::STATUS_APPROVED,
                        'reviewed_at' => now(),
                    ]
                );
            }
        }

        $this->command?->info('Demo students replicated locally with documents.');
    }
}
