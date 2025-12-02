<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Course;
use App\Models\CourseSubject;
use App\Models\SchoolClass;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    /**
     * Lista todos os horários da escola
     * Filtra automaticamente por school_id do usuário autenticado
     */
    public function index(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $query = Schedule::where('school_id', $school->id)
            ->with(['course', 'subject', 'class']);
        
        // Filtros opcionais
        if ($request->has('class_id') && $request->class_id) {
            $query->where('class_id', $request->class_id);
        }
        
        if ($request->has('class_name') && $request->class_name) {
            $query->where('class_name', $request->class_name);
        }
        
        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
        }
        
        if ($request->has('subject_id') && $request->subject_id) {
            $query->where('subject_id', $request->subject_id);
        }
        
        if ($request->has('teacher_id') && $request->teacher_id) {
            $query->where('teacher_id', $request->teacher_id);
        }
        
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }
        
        if ($request->has('day_of_week') && $request->day_of_week) {
            $query->where('day_of_week', $request->day_of_week);
        }
        
        if ($request->has('academic_year') && $request->academic_year) {
            $query->where('academic_year', $request->academic_year);
        }
        
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        } else {
            $query->where('is_active', true);
        }
        
        $schedules = $query->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();
        
        // Formatar resposta
        $formattedSchedules = $schedules->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'class_id' => $schedule->class_id,
                'class_name' => $schedule->class_name,
                'course_id' => $schedule->course_id,
                'course' => $schedule->course ? [
                    'id' => $schedule->course->id,
                    'name' => $schedule->course->name,
                ] : null,
                'subject_id' => $schedule->subject_id,
                'subject' => $schedule->subject ? [
                    'id' => $schedule->subject->id,
                    'name' => $schedule->subject->name,
                    'code' => $schedule->subject->code,
                ] : null,
                'teacher_id' => $schedule->teacher_id,
                'day_of_week' => $schedule->day_of_week,
                'day_of_week_portuguese' => $schedule->day_of_week_portuguese,
                'start_time' => $schedule->start_time->format('H:i'),
                'end_time' => $schedule->end_time->format('H:i'),
                'room' => $schedule->room,
                'type' => $schedule->type,
                'exam_type' => $schedule->exam_type,
                'exam_type_portuguese' => $schedule->exam_type_portuguese,
                'exam_date' => $schedule->exam_date ? $schedule->exam_date->format('Y-m-d') : null,
                'academic_year' => $schedule->academic_year,
                'semester' => $schedule->semester,
                'is_active' => $schedule->is_active,
                'created_at' => $schedule->created_at,
                'updated_at' => $schedule->updated_at,
            ];
        });
        
        return response()->json([
            'status' => 'success',
            'schedules' => $formattedSchedules,
        ]);
    }

    /**
     * Lista horários para um estudante (via API Secret)
     * Filtra por class_id, class_name ou course_id passados como parâmetros
     */
    public function indexForStudent(Request $request): JsonResponse
    {
        Log::info('Buscando horários para estudante', [
            'filters' => $request->all(),
        ]);
        
        $query = Schedule::query()
            ->with(['course', 'subject', 'class'])
            ->where('is_active', true);
        
        // Se não especificar tipo, retornar tanto aulas quanto exames
        // Se especificar type=exam, retornar apenas exames
        // Se especificar type=class, retornar apenas aulas
        if ($request->has('type')) {
            $query->where('type', $request->type);
        } else {
            // Por padrão, retornar apenas aulas (para manter compatibilidade)
            $query->where('type', 'class');
        }
        
        // Filtros opcionais
        if ($request->has('class_id') && $request->class_id) {
            $query->where(function($q) use ($request) {
                $q->where('class_id', $request->class_id)
                  ->orWhereHas('class', function($subQ) use ($request) {
                      $subQ->where('id', $request->class_id);
                  });
            });
            Log::info('Filtro aplicado: class_id', ['class_id' => $request->class_id]);
        }
        
        if ($request->has('class_name') && $request->class_name) {
            // Busca case-insensitive e remove espaços extras
            $className = trim($request->class_name);
            $query->where(function($q) use ($className) {
                $q->whereRaw('LOWER(TRIM(class_name)) = ?', [strtolower($className)])
                  ->orWhereHas('class', function($subQ) use ($className) {
                      $subQ->whereRaw('LOWER(TRIM(name)) = ?', [strtolower($className)]);
                  });
            });
            Log::info('Filtro aplicado: class_name', ['class_name' => $className]);
        }
        
        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
            Log::info('Filtro aplicado: course_id', ['course_id' => $request->course_id]);
        }
        
        // Se não houver filtros, retornar vazio (não retornar todos os horários)
        // EXCEÇÃO: Para exames, podemos buscar por course_id se não houver class_name/class_id
        if (!$request->has('class_id') && !$request->has('class_name') && !$request->has('course_id')) {
            Log::warning('Nenhum filtro fornecido para buscar horários do estudante', [
                'type' => $request->input('type', 'class'),
            ]);
            return response()->json([
                'status' => 'success',
                'schedules' => [],
            ]);
        }
        
        // Para exames, se não tiver class_name mas tiver course_id, buscar por course_id
        if ($request->has('type') && $request->type === 'exam' && !$request->has('class_name') && !$request->has('class_id') && $request->has('course_id')) {
            Log::info('Buscando exames por course_id (sem filtro de turma)', [
                'course_id' => $request->course_id,
            ]);
        }

        // Ordenar: exames por exam_date, aulas por day_of_week e start_time
        if ($request->has('type') && $request->type === 'exam') {
            $schedules = $query->orderBy('exam_date')->orderBy('start_time')->get();
        } else {
            $schedules = $query->orderBy('day_of_week')->orderBy('start_time')->get();
        }
        
        Log::info('Horários encontrados', [
            'count' => $schedules->count(),
            'type' => $request->input('type', 'class'),
            'filters' => $request->all(),
            'sample_schedules' => $schedules->take(3)->map(function($s) {
                return [
                    'id' => $s->id,
                    'type' => $s->type,
                    'exam_date' => $s->exam_date,
                    'class_name' => $s->class_name,
                    'course_id' => $s->course_id,
                    'subject_name' => $s->subject->name ?? null,
                ];
            }),
        ]);

        // Formatar resposta
        $formattedSchedules = $schedules->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'class_id' => $schedule->class_id,
                'class_name' => $schedule->class_name,
                'course_id' => $schedule->course_id,
                'course_name' => $schedule->course ? $schedule->course->name : null,
                'course' => $schedule->course ? [
                    'id' => $schedule->course->id,
                    'name' => $schedule->course->name,
                ] : null,
                'subject_id' => $schedule->subject_id,
                'subject_name' => $schedule->subject ? $schedule->subject->name : null,
                'subject' => $schedule->subject ? [
                    'id' => $schedule->subject->id,
                    'name' => $schedule->subject->name,
                    'code' => $schedule->subject->code,
                ] : null,
                'teacher_id' => $schedule->teacher_id,
                'day_of_week' => $schedule->day_of_week,
                'day_of_week_portuguese' => $schedule->day_of_week_portuguese ?? null,
                'start_time' => $schedule->start_time ? $schedule->start_time->format('H:i') : null,
                'end_time' => $schedule->end_time ? $schedule->end_time->format('H:i') : null,
                'room' => $schedule->room,
                'type' => $schedule->type,
                'exam_type' => $schedule->exam_type,
                'exam_type_portuguese' => $schedule->exam_type_portuguese ?? null,
                'exam_date' => $schedule->exam_date ? $schedule->exam_date->format('Y-m-d') : null,
                'academic_year' => $schedule->academic_year,
                'semester' => $schedule->semester,
                'is_active' => $schedule->is_active,
                'created_at' => $schedule->created_at,
                'updated_at' => $schedule->updated_at,
            ];
        });
        
        Log::info('Retornando horários formatados', [
            'count' => $formattedSchedules->count(),
            'type' => $request->input('type', 'class'),
        ]);
        
        return response()->json([
            'status' => 'success',
            'schedules' => $formattedSchedules,
        ]);
    }

    /**
     * Cria um novo horário
     */
    public function store(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $validator = Validator::make($request->all(), [
            'class_id' => 'nullable|exists:classes,id',
            'class_name' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'subject_id' => 'nullable|required_if:type,class|exists:course_subjects,id',
            'teacher_id' => 'nullable|string',
            'day_of_week' => 'nullable|required_if:type,class|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'nullable|required_if:type,class|date_format:H:i',
            'end_time' => 'nullable|required_if:type,class|date_format:H:i|after:start_time',
            'room' => 'nullable|string|max:255',
            'type' => 'required|in:class,exam',
            'exam_type' => 'nullable|required_if:type,exam|in:test,final_exam,recovery_exam,practical_exam,oral_exam',
            'exam_date' => 'nullable|required_if:type,exam|date',
            'academic_year' => 'required|string|max:255',
            'semester' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Verificar se o curso pertence à escola
        $course = Course::where('id', $request->course_id)
            ->where('school_id', $school->id)
            ->firstOrFail();
        
        // Verificar se a disciplina pertence ao curso (apenas se fornecida)
        if ($request->subject_id) {
            $subject = CourseSubject::where('id', $request->subject_id)
                ->where('course_id', $request->course_id)
                ->firstOrFail();
        }
        
        // Se class_id foi fornecido, verificar se pertence à escola
        if ($request->class_id) {
            $class = SchoolClass::where('id', $request->class_id)
                ->where('school_id', $school->id)
                ->firstOrFail();
        }
        
        // Verificar conflitos de horário apenas para aulas (não para exames)
        if ($request->type === 'class') {
            $conflict = Schedule::where('school_id', $school->id)
                ->where('type', 'class')
                ->where('class_id', $request->class_id)
                ->where('day_of_week', $request->day_of_week)
                ->where('start_time', $request->start_time)
                ->where('room', $request->room)
                ->where('is_active', true)
                ->first();
            
            if ($conflict) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Já existe um horário neste mesmo dia, hora e sala para esta turma.',
                ], 409);
            }
        } else {
            // Para exames, verificar conflitos por data, hora e sala (se fornecidos)
            if ($request->exam_date && $request->start_time && $request->room) {
                $conflict = Schedule::where('school_id', $school->id)
                    ->where('type', 'exam')
                    ->where('class_id', $request->class_id)
                    ->where('exam_date', $request->exam_date)
                    ->where('start_time', $request->start_time)
                    ->where('room', $request->room)
                    ->where('is_active', true)
                    ->first();
                
                if ($conflict) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Já existe um exame nesta mesma data, hora e sala para esta turma.',
                    ], 409);
                }
            }
        }
        
        try {
            $scheduleData = [
                'school_id' => $school->id,
                'class_id' => $request->class_id,
                'class_name' => $request->class_name,
                'course_id' => $request->course_id,
                'teacher_id' => $request->teacher_id,
                'type' => $request->type,
                'exam_type' => $request->exam_type,
                'exam_date' => $request->exam_date,
                'academic_year' => $request->academic_year,
                'semester' => $request->semester,
                'is_active' => $request->has('is_active') ? $request->boolean('is_active') : true,
            ];
            
            // Adicionar subject_id apenas se fornecido
            if ($request->has('subject_id') && $request->subject_id) {
                $scheduleData['subject_id'] = $request->subject_id;
            }
            
            // Campos específicos para aulas
            if ($request->type === 'class') {
                $scheduleData['day_of_week'] = $request->day_of_week;
                $scheduleData['start_time'] = $request->start_time;
                $scheduleData['end_time'] = $request->end_time;
            } else {
                // Para exames, NÃO incluir day_of_week (deve ser NULL)
                // start_time e end_time são opcionais mas podem ser fornecidos
                if ($request->has('start_time') && $request->start_time) {
                    $scheduleData['start_time'] = $request->start_time;
                }
                if ($request->has('end_time') && $request->end_time) {
                    $scheduleData['end_time'] = $request->end_time;
                }
                // Garantir que day_of_week seja NULL para exames
                $scheduleData['day_of_week'] = null;
            }
            
            // Campos opcionais
            if ($request->has('room') && $request->room) {
                $scheduleData['room'] = $request->room;
            }
            
            $schedule = Schedule::create($scheduleData);
            
            Log::info('Horário criado', [
                'schedule_id' => $schedule->id,
                'type' => $schedule->type,
                'exam_date' => $schedule->exam_date,
                'class_name' => $schedule->class_name,
                'course_id' => $schedule->course_id,
            ]);
            
            $schedule->load(['course', 'subject', 'class']);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Horário criado com sucesso',
                'schedule' => [
                    'id' => $schedule->id,
                    'class_id' => $schedule->class_id,
                    'class_name' => $schedule->class_name,
                    'course_id' => $schedule->course_id,
                    'course' => $schedule->course ? [
                        'id' => $schedule->course->id,
                        'name' => $schedule->course->name,
                    ] : null,
                    'subject_id' => $schedule->subject_id,
                    'subject' => $schedule->subject ? [
                        'id' => $schedule->subject->id,
                        'name' => $schedule->subject->name,
                        'code' => $schedule->subject->code,
                    ] : null,
                    'teacher_id' => $schedule->teacher_id,
                    'day_of_week' => $schedule->day_of_week,
                    'day_of_week_portuguese' => $schedule->day_of_week_portuguese,
                    'start_time' => $schedule->start_time ? $schedule->start_time->format('H:i') : null,
                    'end_time' => $schedule->end_time ? $schedule->end_time->format('H:i') : null,
                    'room' => $schedule->room,
                    'type' => $schedule->type,
                    'exam_type' => $schedule->exam_type,
                    'exam_type_portuguese' => $schedule->exam_type_portuguese,
                    'exam_date' => $schedule->exam_date ? $schedule->exam_date->format('Y-m-d') : null,
                    'academic_year' => $schedule->academic_year,
                    'semester' => $schedule->semester,
                    'is_active' => $schedule->is_active,
                    'created_at' => $schedule->created_at,
                    'updated_at' => $schedule->updated_at,
                ],
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar horário', [
                'school_id' => $school->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
                'type' => $request->type ?? 'unknown',
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar horário: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Obtém um horário específico
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $schedule = Schedule::where('school_id', $school->id)
            ->with(['course', 'subject', 'class'])
            ->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'schedule' => [
                'id' => $schedule->id,
                'class_id' => $schedule->class_id,
                'class_name' => $schedule->class_name,
                'course_id' => $schedule->course_id,
                'course' => $schedule->course ? [
                    'id' => $schedule->course->id,
                    'name' => $schedule->course->name,
                ] : null,
                'subject_id' => $schedule->subject_id,
                'subject' => $schedule->subject ? [
                    'id' => $schedule->subject->id,
                    'name' => $schedule->subject->name,
                    'code' => $schedule->subject->code,
                ] : null,
                'teacher_id' => $schedule->teacher_id,
                'day_of_week' => $schedule->day_of_week,
                'day_of_week_portuguese' => $schedule->day_of_week_portuguese,
                'start_time' => $schedule->start_time->format('H:i'),
                'end_time' => $schedule->end_time->format('H:i'),
                'room' => $schedule->room,
                'type' => $schedule->type,
                'exam_type' => $schedule->exam_type,
                'exam_type_portuguese' => $schedule->exam_type_portuguese,
                'exam_date' => $schedule->exam_date ? $schedule->exam_date->format('Y-m-d') : null,
                'academic_year' => $schedule->academic_year,
                'semester' => $schedule->semester,
                'is_active' => $schedule->is_active,
                'created_at' => $schedule->created_at,
                'updated_at' => $schedule->updated_at,
            ],
        ]);
    }

    /**
     * Atualiza um horário
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $schedule = Schedule::where('school_id', $school->id)
            ->findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'class_id' => 'nullable|exists:classes,id',
            'class_name' => 'sometimes|string|max:255',
            'course_id' => 'sometimes|exists:courses,id',
            'subject_id' => 'sometimes|exists:course_subjects,id',
            'teacher_id' => 'nullable|string',
            'day_of_week' => 'sometimes|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i|after:start_time',
            'room' => 'nullable|string|max:255',
            'type' => 'sometimes|in:class,exam',
            'exam_type' => 'nullable|required_if:type,exam|in:test,final_exam,recovery_exam,practical_exam,oral_exam',
            'exam_date' => 'nullable|required_if:type,exam|date',
            'academic_year' => 'sometimes|string|max:255',
            'semester' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Verificar conflitos de horário (excluindo o próprio horário)
        if ($request->has('class_id') || $request->has('day_of_week') || $request->has('start_time') || $request->has('room')) {
            $conflict = Schedule::where('school_id', $school->id)
                ->where('id', '!=', $id)
                ->where('class_id', $request->input('class_id', $schedule->class_id))
                ->where('day_of_week', $request->input('day_of_week', $schedule->day_of_week))
                ->where('start_time', $request->input('start_time', $schedule->start_time->format('H:i')))
                ->where('room', $request->input('room', $schedule->room))
                ->where('is_active', true)
                ->first();
            
            if ($conflict) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Já existe um horário neste mesmo dia, hora e sala para esta turma.',
                ], 409);
            }
        }
        
        try {
            $schedule->update($request->only([
                'class_id',
                'class_name',
                'course_id',
                'subject_id',
                'teacher_id',
                'day_of_week',
                'start_time',
                'end_time',
                'room',
                'type',
                'exam_type',
                'exam_date',
                'academic_year',
                'semester',
                'is_active',
            ]));
            
            $schedule->load(['course', 'subject', 'class']);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Horário atualizado com sucesso',
                'schedule' => [
                    'id' => $schedule->id,
                    'class_id' => $schedule->class_id,
                    'class_name' => $schedule->class_name,
                    'course_id' => $schedule->course_id,
                    'course' => $schedule->course ? [
                        'id' => $schedule->course->id,
                        'name' => $schedule->course->name,
                    ] : null,
                    'subject_id' => $schedule->subject_id,
                    'subject' => $schedule->subject ? [
                        'id' => $schedule->subject->id,
                        'name' => $schedule->subject->name,
                        'code' => $schedule->subject->code,
                    ] : null,
                    'teacher_id' => $schedule->teacher_id,
                    'day_of_week' => $schedule->day_of_week,
                    'day_of_week_portuguese' => $schedule->day_of_week_portuguese,
                    'start_time' => $schedule->start_time->format('H:i'),
                    'end_time' => $schedule->end_time->format('H:i'),
                    'room' => $schedule->room,
                    'type' => $schedule->type,
                    'exam_type' => $schedule->exam_type,
                    'exam_type_portuguese' => $schedule->exam_type_portuguese,
                    'exam_date' => $schedule->exam_date ? $schedule->exam_date->format('Y-m-d') : null,
                    'academic_year' => $schedule->academic_year,
                    'semester' => $schedule->semester,
                    'is_active' => $schedule->is_active,
                    'created_at' => $schedule->created_at,
                    'updated_at' => $schedule->updated_at,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar horário', [
                'school_id' => $school->id,
                'schedule_id' => $id,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar horário',
            ], 500);
        }
    }

    /**
     * Remove um horário
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $schedule = Schedule::where('school_id', $school->id)
            ->findOrFail($id);
        
        try {
            $schedule->delete();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Horário removido com sucesso',
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao remover horário', [
                'school_id' => $school->id,
                'schedule_id' => $id,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao remover horário',
            ], 500);
        }
    }
}
