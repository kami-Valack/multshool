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
        // Criar tabela users com todas as colunas necessárias
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->boolean('email_verified')->default(false);
                $table->string('password')->nullable(); // Pode ser null se vier apenas do ms-users-api
                $table->string('role')->default('admin'); // admin, super_admin, etc.
                $table->boolean('is_active')->default(true);
                $table->rememberToken();
                $table->timestamps();

                $table->index('email');
                $table->index('role');
            });
        } else {
            // Adicionar colunas se a tabela já existe
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'email_verified')) {
                    $table->boolean('email_verified')->default(false)->after('email_verified_at');
                }
                if (!Schema::hasColumn('users', 'role')) {
                    $table->string('role')->default('admin')->after('password');
                }
                if (!Schema::hasColumn('users', 'is_active')) {
                    $table->boolean('is_active')->default(true)->after('role');
                }
            });
        }

        // Criar tabela password_reset_tokens
        if (!Schema::hasTable('password_reset_tokens')) {
            Schema::create('password_reset_tokens', function (Blueprint $table) {
                $table->string('email')->primary();
                $table->string('token');
                $table->timestamp('created_at')->nullable();
            });
        }

        // Criar tabela sessions
        if (!Schema::hasTable('sessions')) {
            Schema::create('sessions', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->uuid('user_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->longText('payload');
                $table->integer('last_activity')->index();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
