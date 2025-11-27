<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->string('class')->nullable()->after('student_name'); // Turma do estudante
            $table->string('student_phone')->nullable()->after('class'); // Telefone do estudante
        });
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropColumn(['class', 'student_phone']);
        });
    }
};

