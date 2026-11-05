<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['school_id', 'is_published']);
            $table->index('starts_at');
        });

        Schema::create('school_event_registrations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('event_id');
            $table->uuid('student_id');
            $table->string('student_name')->nullable();
            $table->string('student_email')->nullable();
            $table->string('status')->default('registered');
            $table->timestamp('paid_at')->nullable();
            $table->string('payment_reference')->nullable();
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('school_events')->onDelete('cascade');
            $table->unique(['event_id', 'student_id']);
            $table->index('student_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_event_registrations');
        Schema::dropIfExists('school_events');
    }
};
