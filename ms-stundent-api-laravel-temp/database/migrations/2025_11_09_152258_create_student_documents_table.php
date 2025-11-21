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
        Schema::create('student_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id'); // ID do estudante
            $table->string('document_type'); // 'bi', 'foto_tipo', 'habilitacao_literaria'
            $table->string('file_path'); // Caminho do arquivo
            $table->string('file_name'); // Nome original do arquivo
            $table->string('mime_type')->nullable(); // Tipo MIME do arquivo
            $table->unsignedBigInteger('file_size')->nullable(); // Tamanho em bytes
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->text('rejection_reason')->nullable(); // Motivo da rejeição
            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            // Foreign key
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
            // Índices
            $table->index('user_id');
            $table->index('document_type');
            $table->index('status');
            
            // Garantir que cada tipo de documento seja único por usuário
            $table->unique(['user_id', 'document_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_documents');
    }
};
