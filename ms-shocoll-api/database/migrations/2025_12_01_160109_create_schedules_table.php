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
        Schema::create('schedules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id'); // ID da escola
            $table->uuid('class_id')->nullable(); // ID da turma (classes table)
            $table->uuid('course_id'); // ID do curso
            $table->uuid('subject_id'); // ID da disciplina (course_subjects)
            $table->uuid('teacher_id')->nullable(); // ID do professor (users table no ms-users-api)
            $table->string('class_name'); // Nome da turma (ex: "EI-1A") - para referência rápida
            $table->enum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']); // Dia da semana
            $table->time('start_time'); // Hora de início
            $table->time('end_time'); // Hora de fim
            $table->string('room')->nullable(); // Sala/ambiente
            $table->enum('type', ['class', 'exam'])->default('class'); // Tipo: aula ou prova
            $table->enum('exam_type', ['test', 'final_exam', 'recovery_exam', 'practical_exam', 'oral_exam'])->nullable(); // Tipo de prova (se type = exam)
            $table->date('exam_date')->nullable(); // Data da prova (se type = exam)
            $table->string('academic_year'); // Ano letivo (ex: "2024/2025")
            $table->integer('semester')->nullable(); // Semestre (1, 2, etc)
            $table->boolean('is_active')->default(true); // Se está ativo
            $table->timestamps();

            // Foreign keys
            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('course_subjects')->onDelete('cascade');
            
            // Índices
            $table->index('school_id');
            $table->index('class_id');
            $table->index('course_id');
            $table->index('subject_id');
            $table->index('teacher_id');
            $table->index('class_name');
            $table->index('day_of_week');
            $table->index('type');
            $table->index('academic_year');
            $table->index('is_active');
            
            // Garantir que não haja conflitos de horário: mesma turma, dia, hora e sala
            $table->unique(['class_id', 'day_of_week', 'start_time', 'room'], 'unique_schedule_slot');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
