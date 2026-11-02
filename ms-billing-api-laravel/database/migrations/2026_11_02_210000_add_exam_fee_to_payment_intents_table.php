<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payment_intents', function (Blueprint $table) {
            $table->string('payable_type')->default('fee')->after('student_id');
            $table->uuid('admission_exam_id')->nullable()->after('fee_id');
            $table->uuid('course_id')->nullable()->after('admission_exam_id');

            $table->index('admission_exam_id');
            $table->index('payable_type');
        });

        DB::statement('ALTER TABLE payment_intents MODIFY fee_id CHAR(36) NULL');
    }

    public function down(): void
    {
        Schema::table('payment_intents', function (Blueprint $table) {
            $table->dropIndex(['admission_exam_id']);
            $table->dropIndex(['payable_type']);
            $table->dropColumn(['payable_type', 'admission_exam_id', 'course_id']);
        });

        DB::statement('ALTER TABLE payment_intents MODIFY fee_id CHAR(36) NOT NULL');
    }
};
