<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('admission_exams', function (Blueprint $table) {
            if (!Schema::hasColumn('admission_exams', 'exam_link')) {
                $table->string('exam_link')->nullable()->after('instructions');
            }
        });
    }

    public function down(): void
    {
        Schema::table('admission_exams', function (Blueprint $table) {
            if (Schema::hasColumn('admission_exams', 'exam_link')) {
                $table->dropColumn('exam_link');
            }
        });
    }
};

