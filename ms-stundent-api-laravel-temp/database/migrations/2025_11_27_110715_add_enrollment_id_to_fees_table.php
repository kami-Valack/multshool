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
        // A coluna enrollment_id já existe na migration create_fees_table
        // Esta migration é apenas para garantir compatibilidade
        // Se a coluna já existe, não faz nada
        if (!Schema::hasColumn('fees', 'enrollment_id')) {
            Schema::table('fees', function (Blueprint $table) {
                $table->uuid('enrollment_id')->nullable()->after('student_id');
                $table->index('enrollment_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Não remover a coluna se ela foi criada na migration original
        // Apenas remover se foi criada por esta migration
        // Como a coluna já existe na migration original, não fazemos nada aqui
    }
};
