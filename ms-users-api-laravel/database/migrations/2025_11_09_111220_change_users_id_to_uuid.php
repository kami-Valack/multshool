<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Verificar se a tabela users existe
        if (!Schema::hasTable('users')) {
            // Se não existe, criar com UUID desde o início
            Schema::create('users', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('student_id')->unique()->nullable();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->boolean('email_verified')->default(false);
                $table->string('password');
                $table->string('role')->default('student');
                $table->boolean('is_active')->default(true);
                $table->rememberToken();
                $table->timestamps();

                $table->index('email');
                $table->index('student_id');
                $table->index('role');
            });
        } else {
            // Se existe, verificar se já é UUID
            $columnType = DB::select("SHOW COLUMNS FROM users WHERE Field = 'id'")[0]->Type ?? null;
            
            if (strpos($columnType, 'char') === false && strpos($columnType, 'varchar') === false) {
                // Ainda é bigint, precisa migrar
                $hasData = DB::table('users')->count() > 0;
                
                if ($hasData) {
                    // Se há dados, criar mapeamento de IDs antigos para novos UUIDs
                    $userMappings = [];
                    $users = DB::table('users')->get();
                    
                    foreach ($users as $user) {
                        $userMappings[$user->id] = (string) Str::uuid();
                    }
                    
                    // Remover foreign keys temporariamente
                    try {
                        Schema::table('refresh_tokens', function (Blueprint $table) {
                            $table->dropForeign(['user_id']);
                        });
                    } catch (\Exception $e) {
                        // Foreign key pode não existir
                    }
                    
                    try {
                        Schema::table('email_verification_tokens', function (Blueprint $table) {
                            $table->dropForeign(['user_id']);
                        });
                    } catch (\Exception $e) {
                        // Foreign key pode não existir
                    }
                    
                    try {
                        Schema::table('sessions', function (Blueprint $table) {
                            $table->dropForeign(['user_id']);
                        });
                    } catch (\Exception $e) {
                        // Foreign key pode não existir
                    }
                    
                    // Adicionar coluna uuid_temp
                    if (!Schema::hasColumn('users', 'uuid_temp')) {
                        Schema::table('users', function (Blueprint $table) {
                            $table->uuid('uuid_temp')->nullable()->after('id');
                        });
                    }
                    
                    // Atualizar users com novos UUIDs
                    foreach ($userMappings as $oldId => $newUuid) {
                        DB::table('users')
                            ->where('id', $oldId)
                            ->update(['uuid_temp' => $newUuid]);
                    }
                    
                    // Atualizar tabelas relacionadas
                    foreach ($userMappings as $oldId => $newUuid) {
                        DB::table('refresh_tokens')
                            ->where('user_id', $oldId)
                            ->update(['user_id' => $newUuid]);
                        
                        DB::table('email_verification_tokens')
                            ->where('user_id', $oldId)
                            ->update(['user_id' => $newUuid]);
                        
                        DB::table('sessions')
                            ->where('user_id', $oldId)
                            ->update(['user_id' => $newUuid]);
                    }
                    
                    // Remover primary key e coluna id antiga
                    DB::statement('ALTER TABLE users DROP PRIMARY KEY');
                    DB::statement('ALTER TABLE users DROP COLUMN id');
                    DB::statement('ALTER TABLE users CHANGE uuid_temp id CHAR(36) NOT NULL');
                    DB::statement('ALTER TABLE users ADD PRIMARY KEY (id)');
                    
                    // Alterar tipo das colunas user_id
                    Schema::table('refresh_tokens', function (Blueprint $table) {
                        $table->string('user_id', 36)->change();
                    });
                    
                    Schema::table('email_verification_tokens', function (Blueprint $table) {
                        $table->string('user_id', 36)->change();
                    });
                    
                    Schema::table('sessions', function (Blueprint $table) {
                        $table->string('user_id', 36)->nullable()->change();
                    });
                    
                    // Recriar foreign keys
                    Schema::table('refresh_tokens', function (Blueprint $table) {
                        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    });
                    
                    Schema::table('email_verification_tokens', function (Blueprint $table) {
                        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    });
                    
                    Schema::table('sessions', function (Blueprint $table) {
                        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    });
                } else {
                    // Sem dados, apenas alterar estrutura
                    DB::statement('ALTER TABLE users MODIFY id CHAR(36) NOT NULL');
                    
                    Schema::table('refresh_tokens', function (Blueprint $table) {
                        $table->dropForeign(['user_id']);
                        $table->string('user_id', 36)->change();
                        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    });
                    
                    Schema::table('email_verification_tokens', function (Blueprint $table) {
                        $table->dropForeign(['user_id']);
                        $table->string('user_id', 36)->change();
                        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    });
                    
                    Schema::table('sessions', function (Blueprint $table) {
                        $table->dropForeign(['user_id']);
                        $table->string('user_id', 36)->nullable()->change();
                        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                    });
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Esta migration não pode ser revertida facilmente
        throw new \Exception('Esta migration não pode ser revertida automaticamente.');
    }
};
