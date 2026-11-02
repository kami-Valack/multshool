<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_references', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('payment_intent_id');
            $table->string('provider')->default('facipay');
            $table->unsignedBigInteger('id_fp_referencia')->nullable();
            $table->string('nu_referencia')->nullable();
            $table->string('entidade')->nullable();
            $table->decimal('vl_referencia', 12, 2);
            $table->string('tp_fp_referencia')->default('PER');
            $table->json('raw_request')->nullable();
            $table->json('raw_response')->nullable();
            $table->timestamp('issued_at')->nullable();
            $table->timestamps();

            $table->foreign('payment_intent_id')
                ->references('id')
                ->on('payment_intents')
                ->onDelete('cascade');
            $table->index('payment_intent_id');
            $table->index('nu_referencia');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_references');
    }
};
