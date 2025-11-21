<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_exams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('course_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('status', ['scheduled', 'marked'])->default('scheduled');
            $table->dateTime('exam_date')->nullable();
            $table->dateTime('registration_deadline')->nullable();
            $table->integer('max_candidates')->nullable();
            $table->decimal('exam_fee', 10, 2)->nullable();
            $table->text('instructions')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->index('course_id');
            $table->index('status');
            $table->index('exam_date');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_exams');
    }
};


