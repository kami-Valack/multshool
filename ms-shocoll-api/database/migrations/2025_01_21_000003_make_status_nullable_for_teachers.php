<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Verificar se a coluna status existe antes de modificá-la
            if (Schema::hasColumn('users', 'status')) {
                // Tornar status nullable (docentes não precisam de status, apenas escolas)
                $table->string('status')->nullable()->change();
            } else {
                // Se não existe, criar como nullable (será criada antes por outra migration)
                // Esta migration apenas garante que seja nullable
                $table->string('status')->nullable()->after('is_active');
                $table->text('rejection_reason')->nullable()->after('status');
                $table->timestamp('approved_at')->nullable()->after('rejection_reason');
                $table->index('status');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Verificar se a coluna status existe antes de modificá-la
            if (Schema::hasColumn('users', 'status')) {
                // Reverter para não nullable com default
                $table->string('status')->default('pending')->nullable(false)->change();
            }
        });
    }
};

