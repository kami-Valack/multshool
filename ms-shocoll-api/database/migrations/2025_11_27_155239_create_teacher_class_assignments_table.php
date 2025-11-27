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
        Schema::create('teacher_class_assignments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('teacher_id'); // ID do professor (users table no ms-users-api)
            $table->uuid('school_id'); // ID da escola (para garantir que professor pertence à escola)
            $table->uuid('course_id'); // ID do curso
            $table->uuid('subject_id'); // ID da disciplina (course_subjects)
            $table->string('class'); // Código da turma (ex: EI-202)
            $table->integer('workload_hours'); // Carga horária em horas
            $table->enum('assignment_type', ['principal', 'substituto'])->default('principal');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Foreign keys
            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('course_subjects')->onDelete('cascade');
            
            // Índices
            $table->index('teacher_id');
            $table->index('school_id');
            $table->index('course_id');
            $table->index('subject_id');
            $table->index('class');
            $table->index('is_active');
            
            // Garantir que não haja duplicatas: mesmo professor, curso, disciplina e turma
            $table->unique(['teacher_id', 'course_id', 'subject_id', 'class'], 'unique_teacher_assignment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_class_assignments');
    }
};
