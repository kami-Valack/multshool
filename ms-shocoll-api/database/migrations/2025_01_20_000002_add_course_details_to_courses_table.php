<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // Faculdade (para instituições de ensino superior)
            $table->string('faculty')->nullable()->after('description');
            
            // Imagem do curso
            $table->string('image_path')->nullable()->after('faculty');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn([
                'faculty',
                'image_path',
            ]);
        });
    }
};

