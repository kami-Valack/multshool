<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teacher_students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('teacher_id'); // ID do docente (usuário com role teacher)
            $table->uuid('student_id'); // ID do estudante
            $table->uuid('school_id'); // ID da escola (para garantir que docente e aluno são da mesma escola)
            $table->uuid('course_id')->nullable(); // Curso relacionado (opcional)
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Foreign keys
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('set null');
            
            // Índices
            $table->index('teacher_id');
            $table->index('student_id');
            $table->index('school_id');
            $table->index('course_id');
            
            // Garantir que um docente não tenha o mesmo aluno duplicado
            $table->unique(['teacher_id', 'student_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacher_students');
    }
};

