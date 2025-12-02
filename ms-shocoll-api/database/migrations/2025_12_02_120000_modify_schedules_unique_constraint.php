<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Remover a constraint antiga
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropUnique('unique_schedule_slot');
        });
        
        // Tornar day_of_week nullable (para exames)
        // Usar DB::statement porque change() pode não funcionar bem com enum
        DB::statement('ALTER TABLE schedules MODIFY day_of_week ENUM("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday") NULL');
        
        // Tornar start_time e end_time nullable também (para exames que podem não ter hora específica)
        DB::statement('ALTER TABLE schedules MODIFY start_time TIME NULL');
        DB::statement('ALTER TABLE schedules MODIFY end_time TIME NULL');
        
        // Criar constraints únicas separadas para aulas e exames
        // Incluindo 'type' para evitar conflitos entre os dois tipos
        Schema::table('schedules', function (Blueprint $table) {
            // Índice único para aulas: class_id + day_of_week + start_time + room + type
            // Isso garante que não haja duas aulas na mesma turma, dia, hora e sala
            $table->unique(['class_id', 'day_of_week', 'start_time', 'room', 'type'], 'unique_class_schedule');
            
            // Índice único para exames: class_id + exam_date + start_time + room + type
            // Isso garante que não haja dois exames na mesma turma, data, hora e sala
            $table->unique(['class_id', 'exam_date', 'start_time', 'room', 'type'], 'unique_exam_schedule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remover as novas constraints
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropUnique('unique_class_schedule');
            $table->dropUnique('unique_exam_schedule');
        });
        
        // Restaurar a constraint antiga
        Schema::table('schedules', function (Blueprint $table) {
            $table->unique(['class_id', 'day_of_week', 'start_time', 'room'], 'unique_schedule_slot');
        });
        
        // Tornar campos não nullable novamente
        DB::statement('ALTER TABLE schedules MODIFY day_of_week ENUM("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday") NOT NULL');
        DB::statement('ALTER TABLE schedules MODIFY start_time TIME NOT NULL');
        DB::statement('ALTER TABLE schedules MODIFY end_time TIME NOT NULL');
    }
};

