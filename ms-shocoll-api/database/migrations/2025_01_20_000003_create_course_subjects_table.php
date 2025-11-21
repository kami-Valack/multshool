<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_subjects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('course_id');
            $table->string('name'); // Nome da cadeira/disciplina
            $table->text('description')->nullable();
            $table->string('code')->nullable(); // Código da disciplina
            $table->integer('semester')->nullable(); // Semestre (1, 2, 3, etc.)
            $table->integer('trimester')->nullable(); // Trimestre (1, 2, 3, 4) - para cursos por trimestre
            $table->integer('credits')->nullable(); // Créditos da disciplina
            $table->integer('hours')->nullable(); // Carga horária
            $table->boolean('is_optional')->default(false); // Se é disciplina optativa
            $table->integer('order')->default(0); // Ordem de exibição
            $table->timestamps();

            // Foreign key
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            
            // Índices
            $table->index('course_id');
            $table->index(['course_id', 'semester']);
            $table->index(['course_id', 'trimester']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_subjects');
    }
};

