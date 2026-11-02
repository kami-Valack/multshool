<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_intents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('student_id');
            $table->uuid('fee_id');
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3)->default('AOA');
            $table->string('description')->nullable();
            $table->string('status')->default('draft');
            $table->string('receipt_number')->nullable()->unique();
            $table->timestamp('paid_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index('student_id');
            $table->index('fee_id');
            $table->index(['student_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_intents');
    }
};
