<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id'); // ID da escola
            $table->uuid('course_id'); // ID do curso
            $table->string('name'); // Nome da turma (ex: "1ºAno-A")
            $table->integer('semester'); // Semestre (1, 2, 3, etc.)
            $table->string('academic_year'); // Ano letivo (ex: "2024/2025")
            $table->enum('status', ['active', 'completed'])->default('active'); // Estado: Ativa ou Concluída
            $table->integer('max_students')->nullable(); // Limite de estudantes
            $table->timestamps();

            // Foreign keys
            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            
            // Índices
            $table->index('school_id');
            $table->index('course_id');
            $table->index('status');
            $table->index('academic_year');
            
            // Garantir que não haja turmas duplicadas no mesmo curso, semestre e ano letivo
            $table->unique(['course_id', 'name', 'academic_year'], 'unique_class_name');
        });

        // Tabela pivot para relacionar estudantes com turmas
        Schema::create('class_students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('class_id'); // ID da turma
            $table->uuid('enrollment_id'); // ID da matrícula (enrollment)
            $table->uuid('student_id'); // ID do estudante (para referência rápida)
            $table->timestamps();

            // Foreign keys
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('enrollment_id')->references('id')->on('enrollments')->onDelete('cascade');
            
            // Índices
            $table->index('class_id');
            $table->index('enrollment_id');
            $table->index('student_id');
            
            // Garantir que um estudante não esteja duplicado na mesma turma
            $table->unique(['class_id', 'enrollment_id'], 'unique_class_student');
        });

        // Tabela pivot para relacionar disciplinas com turmas
        Schema::create('class_subjects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('class_id'); // ID da turma
            $table->uuid('subject_id'); // ID da disciplina (course_subjects)
            $table->timestamps();

            // Foreign keys
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('course_subjects')->onDelete('cascade');
            
            // Índices
            $table->index('class_id');
            $table->index('subject_id');
            
            // Garantir que uma disciplina não esteja duplicada na mesma turma
            $table->unique(['class_id', 'subject_id'], 'unique_class_subject');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_subjects');
        Schema::dropIfExists('class_students');
        Schema::dropIfExists('classes');
    }
};
