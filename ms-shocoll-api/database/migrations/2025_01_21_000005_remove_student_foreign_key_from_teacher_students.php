<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('teacher_students', function (Blueprint $table) {
            // Remover a foreign key constraint de student_id
            // Alunos não são replicados para ms-shocoll-api, então não podemos ter FK
            // O nome da constraint pode variar, então tentamos diferentes formatos
            try {
                $table->dropForeign(['student_id']);
            } catch (\Exception $e) {
                // Tentar com nome explícito da constraint
                try {
                    $table->dropForeign('teacher_students_student_id_foreign');
                } catch (\Exception $e2) {
                    // Se ainda falhar, tentar descobrir o nome real da constraint
                    // No MySQL, o nome pode ser diferente
                    \DB::statement('ALTER TABLE teacher_students DROP FOREIGN KEY teacher_students_student_id_foreign');
                }
            }
        });
    }

    public function down(): void
    {
        Schema::table('teacher_students', function (Blueprint $table) {
            // Re-adicionar a foreign key (não será executado se alunos não existirem)
            // Esta operação pode falhar se alunos não existirem no banco
            try {
                $table->foreign('student_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');
            } catch (\Exception $e) {
                // Ignorar erro se a constraint não puder ser criada
            }
        });
    }
};

