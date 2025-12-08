<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('course_id');
            $table->uuid('student_id');
            $table->string('student_email');
            $table->string('student_name');
            $table->string('reference')->unique(); // Referência única da transação (máx. 15 dígitos)
            $table->decimal('amount', 10, 2); // Montante da compra
            $table->string('gpo_purchase_token')->nullable(); // Token de compra retornado pelo GPO
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'cancelled'])->default('pending');
            $table->text('gpo_response')->nullable(); // Resposta completa do callback do GPO (JSON)
            $table->string('gpo_transaction_id')->nullable(); // ID da transação do GPO
            $table->timestamp('paid_at')->nullable(); // Data/hora do pagamento confirmado
            $table->text('failure_reason')->nullable(); // Motivo da falha, se houver
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->index('course_id');
            $table->index('student_id');
            $table->index('status');
            $table->index('reference');
            $table->index('gpo_purchase_token');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};

