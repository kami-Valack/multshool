<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ClassStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'class_id',
        'enrollment_id',
        'student_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($classStudent) {
            if (empty($classStudent->id)) {
                $classStudent->id = (string) Str::uuid();
            }
        });

        // Quando um estudante é adicionado a uma turma, atualizar o Enrollment com o nome da turma
        // e completar outros dados do estudante se necessário
        static::created(function ($classStudent) {
            $enrollment = $classStudent->enrollment;
            $class = $classStudent->class;
            
            if ($enrollment && $class) {
                // Preparar dados para atualização
                $updateData = [
                    'class' => $class->name,
                ];
                
                // Buscar dados completos do estudante no ms-student-api para completar dados faltantes
                try {
                    $studentApiUrl = config('services.student_api.url', env('STUDENT_API_URL', 'http://localhost:8001/api'));
                    $studentApiSecret = config('services.student_api.secret', env('STUDENT_API_SECRET', ''));
                    
                    if ($studentApiSecret && $enrollment->student_id) {
                        $studentResponse = \Illuminate\Support\Facades\Http::withHeaders([
                            'X-API-Secret' => $studentApiSecret,
                        ])->get("{$studentApiUrl}/student/{$enrollment->student_id}");
                        
                        if ($studentResponse->successful()) {
                            $studentData = $studentResponse->json();
                            $student = $studentData['user'] ?? $studentData['student'] ?? $studentData;
                            
                            // Completar dados faltantes no Enrollment com dados do estudante
                            if (empty($enrollment->student_name) && !empty($student['name'])) {
                                $updateData['student_name'] = $student['name'];
                            }
                            
                            if (empty($enrollment->student_email) && !empty($student['email'])) {
                                $updateData['student_email'] = $student['email'];
                            }
                            
                            // Nota: student_phone pode não estar disponível no ms-student-api
                            // Se necessário, pode ser adicionado posteriormente
                        }
                    }
                } catch (\Exception $e) {
                    // Log do erro mas não falhar a operação
                    \Illuminate\Support\Facades\Log::warning('Erro ao buscar dados do estudante para completar Enrollment', [
                        'enrollment_id' => $enrollment->id,
                        'student_id' => $enrollment->student_id,
                        'error' => $e->getMessage(),
                    ]);
                }
                
                // Atualizar o Enrollment com os dados completados
                $enrollment->update($updateData);
                
                // Log para debug
                \Illuminate\Support\Facades\Log::info('Estudante adicionado à turma - Enrollment atualizado', [
                    'enrollment_id' => $enrollment->id,
                    'student_id' => $enrollment->student_id,
                    'class_name' => $class->name,
                    'class_id' => $class->id,
                    'updated_fields' => array_keys($updateData),
                ]);
            }
        });

        // Quando um estudante é removido de uma turma, limpar o campo 'class' se não estiver em outra turma
        static::deleted(function ($classStudent) {
            $enrollment = $classStudent->enrollment;
            
            if ($enrollment) {
                // Verificar se o estudante ainda está em alguma outra turma
                $otherClasses = self::where('enrollment_id', $enrollment->id)
                    ->where('id', '!=', $classStudent->id)
                    ->exists();
                
                if (!$otherClasses) {
                    // Se não estiver em nenhuma outra turma, limpar o campo 'class'
                    $enrollment->update([
                        'class' => null,
                    ]);
                } else {
                    // Se estiver em outra turma, atualizar com o nome da primeira turma encontrada
                    $otherClassStudent = self::where('enrollment_id', $enrollment->id)
                        ->where('id', '!=', $classStudent->id)
                        ->with('class')
                        ->first();
                    
                    if ($otherClassStudent && $otherClassStudent->class) {
                        $enrollment->update([
                            'class' => $otherClassStudent->class->name,
                        ]);
                    }
                }
            }
        });
    }

    /**
     * Get the class.
     */
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the enrollment.
     */
    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }
}
