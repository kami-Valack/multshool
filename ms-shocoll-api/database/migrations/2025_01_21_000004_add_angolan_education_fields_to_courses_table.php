<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // Nível de ensino (médio ou superior)
            $table->enum('education_level', ['medio', 'superior'])->nullable()->after('code');
            
            // Para ensino médio: classe (10ª, 11ª, 12ª, 13ª)
            $table->integer('class_level')->nullable()->after('education_level');
            
            // Para ensino superior: ano (1º, 2º, 3º, etc.)
            $table->integer('year_level')->nullable()->after('class_level');
            
            // Propina mensal (em Kz - Kwanzas)
            $table->decimal('monthly_tuition', 10, 2)->nullable()->after('price');
            
            // Índices
            $table->index('education_level');
            $table->index('class_level');
            $table->index('year_level');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropIndex(['education_level']);
            $table->dropIndex(['class_level']);
            $table->dropIndex(['year_level']);
            $table->dropColumn(['education_level', 'class_level', 'year_level', 'monthly_tuition']);
        });
    }
};

