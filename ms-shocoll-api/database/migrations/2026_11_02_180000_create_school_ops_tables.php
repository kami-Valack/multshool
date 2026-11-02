<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tuition_plans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('name');
            $table->enum('period', ['mensal', 'trimestral', 'semestral', 'anual']);
            $table->decimal('total_amount', 12, 2);
            $table->integer('installments');
            $table->string('currency')->default('AOA');
            $table->decimal('discount_percent', 5, 2)->nullable();
            $table->decimal('late_fee_percent', 5, 2)->nullable();
            $table->decimal('late_fee_fixed', 12, 2)->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->json('course_ids')->nullable();
            $table->json('class_ids')->nullable();
            $table->json('academic_years')->nullable();
            $table->json('student_types')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
            $table->index('is_active');
        });

        Schema::create('additional_fees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('name');
            $table->decimal('amount', 12, 2);
            $table->string('currency')->default('AOA');
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
        });

        Schema::create('fee_charges', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->uuid('student_id')->nullable();
            $table->string('student_name');
            $table->string('student_number')->nullable();
            $table->string('course_name')->nullable();
            $table->string('class_name')->nullable();
            $table->uuid('tuition_plan_id')->nullable();
            $table->string('description');
            $table->decimal('amount', 12, 2);
            $table->date('due_date');
            $table->enum('status', ['pending', 'paid', 'overdue', 'waived'])->default('pending');
            $table->enum('kind', ['tuition', 'fine', 'fee', 'other'])->default('tuition');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
            $table->index('student_id');
            $table->index('tuition_plan_id');
            $table->index(['school_id', 'status']);
            $table->index(['school_id', 'due_date']);
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('receipt_number');
            $table->uuid('student_id')->nullable();
            $table->string('student_name');
            $table->string('course_name')->nullable();
            $table->string('class_name')->nullable();
            $table->uuid('fee_charge_id')->nullable();
            $table->string('type'); // propina|exame|declaracao|outro
            $table->decimal('amount', 12, 2);
            $table->string('method'); // cash|transferencia|multicaixa|online|outro
            $table->enum('status', ['paid', 'pending', 'failed', 'refunded'])->default('paid');
            $table->date('paid_at');
            $table->text('notes')->nullable();
            $table->string('proof_path')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
            $table->index('student_id');
            $table->index('fee_charge_id');
            $table->index(['school_id', 'paid_at']);
            $table->index(['school_id', 'receipt_number']);
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('number');
            $table->enum('doc_type', ['fatura', 'recibo']);
            $table->uuid('student_id')->nullable();
            $table->string('student_name');
            $table->string('student_nif')->nullable();
            $table->date('issue_date');
            $table->date('due_date')->nullable();
            $table->json('items');
            $table->decimal('subtotal', 12, 2);
            $table->decimal('total', 12, 2);
            $table->enum('status', ['pendente', 'pago', 'cancelado', 'atrasado'])->default('pendente');
            $table->string('payment_method')->nullable();
            $table->text('qr_data')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
            $table->index('student_id');
            $table->index(['school_id', 'number']);
            $table->index(['school_id', 'status']);
        });

        Schema::create('announcements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('title');
            $table->text('body');
            $table->enum('audience', ['all', 'students', 'teachers', 'staff'])->default('all');
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->uuid('created_by')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
            $table->index(['school_id', 'is_published']);
        });

        Schema::create('activity_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->uuid('actor_id')->nullable();
            $table->string('actor_name')->nullable();
            $table->string('action');
            $table->string('entity_type')->nullable();
            $table->string('entity_id')->nullable();
            $table->json('meta')->nullable();
            $table->string('ip')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['school_id', 'created_at']);
        });

        Schema::create('school_permission_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('permissions');
            $table->boolean('is_system')->default(false);
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('school_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_permission_profiles');
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('announcements');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('fee_charges');
        Schema::dropIfExists('additional_fees');
        Schema::dropIfExists('tuition_plans');
    }
};
