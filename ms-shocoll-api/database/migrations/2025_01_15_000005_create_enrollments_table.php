<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('course_id');
            $table->uuid('student_id'); // ID do estudante (vem do ms-users-api)
            $table->string('student_email'); // Email do estudante (para referência)
            $table->string('student_name'); // Nome do estudante (para referência)
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->uuid('admission_exam_id')->nullable(); // Exame de admissão relacionado
            $table->boolean('exam_passed')->nullable(); // Se passou no exame
            $table->text('rejection_reason')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('admission_exam_id')->references('id')->on('admission_exams')->onDelete('set null');
            $table->index('course_id');
            $table->index('student_id');
            $table->index('status');
            $table->unique(['course_id', 'student_id']); // Um estudante só pode se matricular uma vez por curso
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};

