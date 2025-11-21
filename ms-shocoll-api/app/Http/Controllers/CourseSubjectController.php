<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseSubject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Course Subjects",
 *     description="Endpoints para gerenciamento de cadeiras/disciplinas dos cursos"
 * )
 */
class CourseSubjectController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses/{courseId}/subjects",
     *     summary="Listar cadeiras de um curso",
     *     description="Retorna todas as cadeiras/disciplinas de um curso",
     *     operationId="listCourseSubjects",
     *     tags={"Course Subjects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="semester",
     *         in="query",
     *         description="Filtrar por semestre",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="trimester",
     *         in="query",
     *         description="Filtrar por trimestre",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de cadeiras"
     *     )
     * )
     */
    public function index(Request $request, string $courseId): JsonResponse
    {
        $school = $request->user();
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        
        $query = CourseSubject::where('course_id', $courseId);
        
        if ($request->has('semester')) {
            $query->where('semester', $request->semester);
        }
        
        if ($request->has('trimester')) {
            $query->where('trimester', $request->trimester);
        }
        
        $subjects = $query->orderBy('order')->get();
        
        return response()->json([
            'status' => 'success',
            'subjects' => $subjects,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/courses/{courseId}/subjects",
     *     summary="Criar nova cadeira",
     *     description="Cria uma nova cadeira/disciplina para um curso",
     *     operationId="createCourseSubject",
     *     tags={"Course Subjects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Programação I"),
     *             @OA\Property(property="description", type="string", example="Introdução à programação"),
     *             @OA\Property(property="code", type="string", example="PROG101"),
     *             @OA\Property(property="semester", type="integer", example=1),
     *             @OA\Property(property="trimester", type="integer", example=1),
     *             @OA\Property(property="credits", type="integer", example=4),
     *             @OA\Property(property="hours", type="integer", example=60),
     *             @OA\Property(property="is_optional", type="boolean", example=false),
     *             @OA\Property(property="order", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Cadeira criada com sucesso"
     *     )
     * )
     */
    public function store(Request $request, string $courseId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'nullable|string|max:50',
            'semester' => 'nullable|integer|min:1',
            'trimester' => 'nullable|integer|min:1|max:4',
            'credits' => 'nullable|integer|min:0',
            'hours' => 'nullable|integer|min:0',
            'is_optional' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $school = $request->user();
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);

        $subject = CourseSubject::create([
            'course_id' => $courseId,
            'name' => $request->name,
            'description' => $request->description,
            'code' => $request->code,
            'semester' => $request->semester,
            'trimester' => $request->trimester,
            'credits' => $request->credits,
            'hours' => $request->hours,
            'is_optional' => $request->is_optional ?? false,
            'order' => $request->order ?? 0,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cadeira criada com sucesso',
            'subject' => $subject,
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/courses/{courseId}/subjects/{subjectId}",
     *     summary="Atualizar cadeira",
     *     description="Atualiza uma cadeira existente",
     *     operationId="updateCourseSubject",
     *     tags={"Course Subjects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Cadeira atualizada com sucesso"
     *     )
     * )
     */
    public function update(Request $request, string $courseId, string $subjectId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'nullable|string|max:50',
            'semester' => 'nullable|integer|min:1',
            'trimester' => 'nullable|integer|min:1|max:4',
            'credits' => 'nullable|integer|min:0',
            'hours' => 'nullable|integer|min:0',
            'is_optional' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $school = $request->user();
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        $subject = CourseSubject::where('course_id', $courseId)->findOrFail($subjectId);

        $subject->update($request->only([
            'name',
            'description',
            'code',
            'semester',
            'trimester',
            'credits',
            'hours',
            'is_optional',
            'order',
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'Cadeira atualizada com sucesso',
            'subject' => $subject,
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/courses/{courseId}/subjects/{subjectId}",
     *     summary="Deletar cadeira",
     *     description="Deleta uma cadeira",
     *     operationId="deleteCourseSubject",
     *     tags={"Course Subjects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Cadeira deletada com sucesso"
     *     )
     * )
     */
    public function destroy(Request $request, string $courseId, string $subjectId): JsonResponse
    {
        $school = $request->user();
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        $subject = CourseSubject::where('course_id', $courseId)->findOrFail($subjectId);

        $subject->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Cadeira deletada com sucesso',
        ]);
    }
}

