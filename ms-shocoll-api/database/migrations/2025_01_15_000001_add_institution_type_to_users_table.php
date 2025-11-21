<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'institution_type')) {
                // Adicionar após is_active se status não existir, caso contrário após status
                if (Schema::hasColumn('users', 'status')) {
                    $table->enum('institution_type', ['superior', 'medio'])->nullable()->after('status');
                } else {
                    $table->enum('institution_type', ['superior', 'medio'])->nullable()->after('is_active');
                }
                $table->index('institution_type');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'institution_type')) {
                $table->dropIndex(['institution_type']);
                $table->dropColumn('institution_type');
            }
        });
    }
};


