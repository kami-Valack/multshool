<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_registrations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('admission_exam_id');
            $table->uuid('student_id'); // ID do estudante (vem do ms-users-api)
            $table->string('student_email'); // Email do estudante (para referência)
            $table->string('student_name'); // Nome do estudante (para referência)
            $table->enum('status', ['registered', 'completed', 'passed', 'failed'])->default('registered');
            $table->decimal('score', 5, 2)->nullable(); // Nota do exame (0-100)
            $table->text('notes')->nullable(); // Observações da escola
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->foreign('admission_exam_id')->references('id')->on('admission_exams')->onDelete('cascade');
            $table->index('admission_exam_id');
            $table->index('student_id');
            $table->index('status');
            $table->unique(['admission_exam_id', 'student_id']); // Um estudante só pode se inscrever uma vez por exame
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_registrations');
    }
};

