<?php

namespace App\Http\Controllers;

use App\Models\TeacherStudent;
use App\Models\StudentFollowUp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;

/**
 * @OA\Tag(
 *     name="Teacher",
 *     description="Endpoints para docentes gerenciarem seus alunos"
 * )
 */
class TeacherController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/teacher/me",
     *     summary="Perfil do docente",
     *     description="Retorna os dados do docente autenticado",
     *     operationId="getTeacherProfile",
     *     tags={"Teacher"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil do docente"
     *     )
     * )
     */
    public function me(Request $request): JsonResponse
    {
        $teacher = $request->user();
        
        $studentsCount = TeacherStudent::where('teacher_id', $teacher->id)
            ->where('is_active', true)
            ->count();
        
        return response()->json([
            'status' => 'success',
            'teacher' => [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'email' => $teacher->email,
                'role' => $teacher->role,
                'students_count' => $studentsCount,
            ],
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/teacher/students",
     *     summary="Listar alunos do docente",
     *     description="Retorna todos os alunos vinculados ao docente",
     *     operationId="listTeacherStudents",
     *     tags={"Teacher"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de alunos"
     *     )
     * )
     */
    public function students(Request $request): JsonResponse
    {
        $teacher = $request->user();
        
        $teacherStudents = TeacherStudent::where('teacher_id', $teacher->id)
            ->where('is_active', true)
            ->with(['student', 'course', 'school'])
            ->get();
        
        $students = $teacherStudents->map(function ($ts) {
            // Aluno pode não existir no banco local
            if ($ts->student) {
                return [
                    'id' => $ts->student->id,
                    'name' => $ts->student->name,
                    'email' => $ts->student->email,
                    'student_id' => $ts->student->student_id ?? null,
                    'course' => $ts->course ? [
                        'id' => $ts->course->id,
                        'name' => $ts->course->name,
                    ] : null,
                    'school' => [
                        'id' => $ts->school->id,
                        'name' => $ts->school->name,
                    ],
                ];
            } else {
                // Aluno não está no banco local
                return [
                    'id' => $ts->student_id,
                    'name' => 'Aluno não encontrado no banco local',
                    'email' => 'N/A',
                    'note' => 'Dados do aluno serão buscados do ms-users-api quando necessário',
                    'course' => $ts->course ? [
                        'id' => $ts->course->id,
                        'name' => $ts->course->name,
                    ] : null,
                    'school' => [
                        'id' => $ts->school->id,
                        'name' => $ts->school->name,
                    ],
                ];
            }
        });
        
        return response()->json([
            'status' => 'success',
            'students' => $students,
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/teacher/students/{studentId}/grades",
     *     summary="Visualizar notas do aluno",
     *     description="Retorna todas as notas de um aluno específico",
     *     operationId="getStudentGrades",
     *     tags={"Teacher"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="studentId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Notas do aluno"
     *     )
     * )
     */
    public function studentGrades(Request $request, string $studentId): JsonResponse
    {
        $teacher = $request->user();
        
        // Verificar se o docente tem acesso a este aluno
        $teacherStudent = TeacherStudent::where('teacher_id', $teacher->id)
            ->where('student_id', $studentId)
            ->where('is_active', true)
            ->firstOrFail();
        
        // Buscar notas do aluno via API de estudantes
        $studentApiUrl = env('STUDENT_API_URL', 'http://localhost:8001');
        $studentApiSecret = env('STUDENT_API_SECRET', env('API_SECRET', ''));
        
        try {
            // Tentar buscar por student_id primeiro, depois por id
            $studentIdentifier = ($teacherStudent->student && $teacherStudent->student->student_id) 
                ? $teacherStudent->student->student_id 
                : $studentId;
            
            $response = Http::withHeaders([
                'X-API-Secret' => $studentApiSecret,
            ])->get("{$studentApiUrl}/api/student/{$studentIdentifier}/grades");
            
            if ($response->successful()) {
                $data = $response->json();
                $studentData = $teacherStudent->student ? [
                    'id' => $teacherStudent->student->id,
                    'name' => $teacherStudent->student->name,
                    'email' => $teacherStudent->student->email,
                    'student_id' => $teacherStudent->student->student_id ?? null,
                ] : [
                    'id' => $teacherStudent->student_id,
                    'name' => 'Aluno não encontrado no banco local',
                    'email' => 'N/A',
                    'note' => 'Dados do aluno serão buscados do ms-users-api quando necessário',
                ];
                
                return response()->json([
                    'status' => 'success',
                    'student' => $studentData,
                    'grades' => $data['grades'] ?? [],
                ]);
            }
        } catch (\Exception $e) {
            // Se não conseguir buscar da API, retornar erro
        }
        
        return response()->json([
            'status' => 'error',
            'message' => 'Não foi possível buscar as notas do aluno',
        ], 500);
    }

    /**
     * @OA\Get(
     *     path="/api/teacher/students/{studentId}/follow-ups",
     *     summary="Listar acompanhamentos do aluno",
     *     description="Retorna todos os acompanhamentos feitos pelo docente para um aluno",
     *     operationId="listStudentFollowUps",
     *     tags={"Teacher"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de acompanhamentos"
     *     )
     * )
     */
    public function followUps(Request $request, string $studentId): JsonResponse
    {
        $teacher = $request->user();
        
        // Verificar se o docente tem acesso a este aluno
        $teacherStudent = TeacherStudent::where('teacher_id', $teacher->id)
            ->where('student_id', $studentId)
            ->where('is_active', true)
            ->firstOrFail();
        
        $followUps = StudentFollowUp::where('teacher_id', $teacher->id)
            ->where('student_id', $studentId)
            ->with('course')
            ->orderBy('follow_up_date', 'desc')
            ->get();
        
        $studentData = $teacherStudent->student ? [
            'id' => $teacherStudent->student->id,
            'name' => $teacherStudent->student->name,
        ] : [
            'id' => $teacherStudent->student_id,
            'name' => 'Aluno não encontrado no banco local',
        ];
        
        return response()->json([
            'status' => 'success',
            'student' => $studentData,
            'follow_ups' => $followUps,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/teacher/students/{studentId}/follow-ups",
     *     summary="Criar acompanhamento do aluno",
     *     description="Cria um novo acompanhamento para o aluno",
     *     operationId="createFollowUp",
     *     tags={"Teacher"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "description", "follow_up_date"},
     *             @OA\Property(property="title", type="string", example="Acompanhamento de desempenho"),
     *             @OA\Property(property="description", type="string", example="Aluno apresentou melhoria significativa"),
     *             @OA\Property(property="type", type="string", enum={"academic", "behavioral", "attendance", "other"}, example="academic"),
     *             @OA\Property(property="status", type="string", enum={"positive", "neutral", "concern"}, example="positive"),
     *             @OA\Property(property="follow_up_date", type="string", format="date", example="2025-01-21"),
     *             @OA\Property(property="course_id", type="string", format="uuid", example="uuid")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Acompanhamento criado com sucesso"
     *     )
     * )
     */
    public function createFollowUp(Request $request, string $studentId): JsonResponse
    {
        $teacher = $request->user();
        
        // Verificar se o docente tem acesso a este aluno
        $teacherStudent = TeacherStudent::where('teacher_id', $teacher->id)
            ->where('student_id', $studentId)
            ->where('is_active', true)
            ->firstOrFail();
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'nullable|in:academic,behavioral,attendance,other',
            'status' => 'nullable|in:positive,neutral,concern',
            'follow_up_date' => 'required|date',
            'course_id' => 'nullable|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $followUp = StudentFollowUp::create([
            'teacher_id' => $teacher->id,
            'student_id' => $studentId,
            'school_id' => $teacherStudent->school_id,
            'course_id' => $request->course_id ?? $teacherStudent->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type ?? StudentFollowUp::TYPE_ACADEMIC,
            'status' => $request->status ?? StudentFollowUp::STATUS_NEUTRAL,
            'follow_up_date' => $request->follow_up_date,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Acompanhamento criado com sucesso',
            'follow_up' => $followUp->load('course'),
        ], 201);
    }
}

