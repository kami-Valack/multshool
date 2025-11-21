<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Nome completo da Instituição (já existe como 'name', mas vamos manter)
            // Acrónimo
            $table->string('acronym')->nullable()->after('name');
            
            // Logotipo
            $table->string('logo_path')->nullable()->after('acronym');
            
            // 2 Fotografias da instituição (vamos usar JSON para armazenar array de paths)
            $table->json('photos')->nullable()->after('logo_path');
            
            // 1 vídeo de apresentação
            $table->string('presentation_video_path')->nullable()->after('photos');
            
            // Descrição
            $table->text('description')->nullable()->after('presentation_video_path');
            
            // Ano de fundação
            $table->integer('founded_year')->nullable()->after('description');
            
            // Localização (link do Google maps)
            $table->string('location_map_url')->nullable()->after('founded_year');
            
            // Número total de estudantes
            $table->integer('total_students')->nullable()->default(0)->after('location_map_url');
            
            // Número de Telefone
            $table->string('phone_number')->nullable()->after('total_students');
            
            // e-mails (vamos usar JSON para múltiplos emails)
            $table->json('contact_emails')->nullable()->after('phone_number');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'acronym',
                'logo_path',
                'photos',
                'presentation_video_path',
                'description',
                'founded_year',
                'location_map_url',
                'total_students',
                'phone_number',
                'contact_emails',
            ]);
        });
    }
};

