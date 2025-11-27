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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'course_id')) {
                $table->uuid('course_id')->nullable()->after('school_id');
                $table->index('course_id');
            }
            // Adicionar campos adicionais para professores
            if (!Schema::hasColumn('users', 'department')) {
                $table->string('department')->nullable()->after('phone');
            }
            if (!Schema::hasColumn('users', 'position')) {
                $table->string('position')->nullable()->after('department'); // Cargo
            }
            if (!Schema::hasColumn('users', 'contract_type')) {
                $table->string('contract_type')->nullable()->after('position'); // Tipo de contrato
            }
            if (!Schema::hasColumn('users', 'address')) {
                $table->string('address')->nullable()->after('contract_type'); // Morada
            }
            if (!Schema::hasColumn('users', 'id_card')) {
                $table->string('id_card')->nullable()->after('address'); // Bilhete de Identidade
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'course_id')) {
                $table->dropIndex(['course_id']);
                $table->dropColumn('course_id');
            }
            if (Schema::hasColumn('users', 'department')) {
                $table->dropColumn('department');
            }
            if (Schema::hasColumn('users', 'position')) {
                $table->dropColumn('position');
            }
            if (Schema::hasColumn('users', 'contract_type')) {
                $table->dropColumn('contract_type');
            }
            if (Schema::hasColumn('users', 'address')) {
                $table->dropColumn('address');
            }
            if (Schema::hasColumn('users', 'id_card')) {
                $table->dropColumn('id_card');
            }
        });
    }
};
