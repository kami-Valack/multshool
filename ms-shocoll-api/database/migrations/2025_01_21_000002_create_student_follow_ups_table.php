<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_follow_ups', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('teacher_id'); // Docente que fez o acompanhamento
            $table->uuid('student_id'); // Estudante acompanhado
            $table->uuid('school_id'); // Escola
            $table->uuid('course_id')->nullable(); // Curso relacionado (opcional)
            $table->string('title'); // Título do acompanhamento
            $table->text('description'); // Descrição detalhada
            $table->enum('type', ['academic', 'behavioral', 'attendance', 'other'])->default('academic');
            $table->enum('status', ['positive', 'neutral', 'concern'])->default('neutral');
            $table->date('follow_up_date'); // Data do acompanhamento
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
            $table->index('follow_up_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_follow_ups');
    }
};

