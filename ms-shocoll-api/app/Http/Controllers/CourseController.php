<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Courses",
 *     description="Endpoints para gerenciamento de cursos"
 * )
 */
class CourseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses",
     *     summary="Listar cursos da escola",
     *     description="Retorna todos os cursos da escola autenticada",
     *     operationId="listCourses",
     *     tags={"Courses"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="is_active",
     *         in="query",
     *         description="Filtrar por status ativo",
     *         required=false,
     *         @OA\Schema(type="boolean")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de cursos",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="courses", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $query = Course::where('school_id', $school->id);
        
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }
        
        $courses = $query->get();
        
        return response()->json([
            'status' => 'success',
            'courses' => $courses,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/courses",
     *     summary="Criar novo curso",
     *     description="Cria um novo curso para a escola autenticada",
     *     operationId="createCourse",
     *     tags={"Courses"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Engenharia de Software"),
     *             @OA\Property(property="description", type="string", example="Curso completo de engenharia"),
     *             @OA\Property(property="code", type="string", example="ES001"),
     *             @OA\Property(property="duration_months", type="integer", example=48),
     *             @OA\Property(property="price", type="number", format="float", example=500.00),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Curso criado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'nullable|string|max:50',
            'education_level' => 'required|in:medio,superior',
            'class_level' => 'required_if:education_level,medio|nullable|integer|in:10,11,12,13',
            'year_level' => 'required_if:education_level,superior|nullable|integer|min:1',
            'duration_months' => 'nullable|integer|min:1',
            'price' => 'nullable|numeric|min:0',
            'monthly_tuition' => 'required|numeric|min:0',
            'is_active' => 'nullable|boolean',
            'faculty' => 'nullable|string|max:255',
        ], [
            'education_level.required' => 'O nível de ensino é obrigatório (medio ou superior)',
            'education_level.in' => 'O nível de ensino deve ser "medio" ou "superior"',
            'class_level.required_if' => 'A classe é obrigatória para ensino médio (10, 11, 12 ou 13)',
            'class_level.in' => 'A classe do ensino médio deve ser 10, 11, 12 ou 13',
            'year_level.required_if' => 'O ano é obrigatório para ensino superior',
            'year_level.min' => 'O ano do ensino superior deve ser pelo menos 1',
            'monthly_tuition.required' => 'A propina mensal é obrigatória',
            'monthly_tuition.min' => 'A propina mensal deve ser maior ou igual a zero',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $school = $request->user();

        // Regras do ensino angolano
        $data = [
            'school_id' => $school->id,
            'name' => $request->name,
            'description' => $request->description,
            'code' => $request->code,
            'education_level' => $request->education_level,
            'monthly_tuition' => $request->monthly_tuition,
            'price' => $request->price,
            'is_active' => $request->is_active ?? true,
            'faculty' => $request->faculty,
        ];

        // Ensino médio: sempre 9 meses, class_level obrigatório
        if ($request->education_level === Course::EDUCATION_LEVEL_MEDIO) {
            $data['duration_months'] = 9; // Fixo para ensino médio angolano
            $data['class_level'] = $request->class_level;
            $data['year_level'] = null;
        }
        
        // Ensino superior: year_level obrigatório
        if ($request->education_level === Course::EDUCATION_LEVEL_SUPERIOR) {
            $data['year_level'] = $request->year_level;
            $data['class_level'] = null;
            $data['duration_months'] = $request->duration_months; // Pode variar
        }

        $course = Course::create($data);

        // Calcular propina total
        $totalTuition = $course->getTotalTuition();

        return response()->json([
            'status' => 'success',
            'message' => 'Curso criado com sucesso',
            'course' => $course->load('school'),
            'tuition_info' => [
                'monthly_tuition' => $course->monthly_tuition,
                'total_tuition' => $totalTuition,
                'duration_months' => $course->duration_months,
                'formatted_class' => $course->getFormattedClassLevel(),
                'formatted_year' => $course->getFormattedYearLevel(),
            ],
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/courses/{id}",
     *     summary="Obter detalhes de um curso",
     *     description="Retorna os detalhes de um curso específico",
     *     operationId="getCourse",
     *     tags={"Courses"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do curso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Curso não encontrado"
     *     )
     * )
     */
    public function show(Request $request, string $id): JsonResponse
    {
        // Se não houver usuário autenticado (rota admin), buscar sem filtro de escola
        if (!$request->user()) {
            $course = Course::with('admissionExams', 'school')
                ->findOrFail($id);
        } else {
            $school = $request->user();
            $course = Course::where('school_id', $school->id)
                ->with(['admissionExams', 'subjects'])
                ->findOrFail($id);
        }

        // Adicionar URL da imagem se existir
        if ($course->image_path) {
            $course->image_url = asset('storage/' . $course->image_path);
        }
        
        // Calcular propina total
        $totalTuition = $course->getTotalTuition();

        return response()->json([
            'status' => 'success',
            'course' => $course,
            'tuition_info' => [
                'monthly_tuition' => $course->monthly_tuition,
                'total_tuition' => $totalTuition,
                'duration_months' => $course->duration_months,
                'formatted_class' => $course->getFormattedClassLevel(),
                'formatted_year' => $course->getFormattedYearLevel(),
                'education_level' => $course->education_level,
            ],
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/courses/{id}",
     *     summary="Atualizar curso",
     *     description="Atualiza um curso existente",
     *     operationId="updateCourse",
     *     tags={"Courses"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="code", type="string"),
     *             @OA\Property(property="duration_months", type="integer"),
     *             @OA\Property(property="price", type="number"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Curso atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Curso não encontrado"
     *     )
     * )
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'nullable|string|max:50',
            'education_level' => 'sometimes|required|in:medio,superior',
            'class_level' => 'required_if:education_level,medio|nullable|integer|in:10,11,12,13',
            'year_level' => 'required_if:education_level,superior|nullable|integer|min:1',
            'duration_months' => 'nullable|integer|min:1',
            'price' => 'nullable|numeric|min:0',
            'monthly_tuition' => 'nullable|numeric|min:0',
            'is_active' => 'nullable|boolean',
            'faculty' => 'nullable|string|max:255',
        ], [
            'education_level.required' => 'O nível de ensino é obrigatório (medio ou superior)',
            'education_level.in' => 'O nível de ensino deve ser "medio" ou "superior"',
            'class_level.required_if' => 'A classe é obrigatória para ensino médio (10, 11, 12 ou 13)',
            'class_level.in' => 'A classe do ensino médio deve ser 10, 11, 12 ou 13',
            'year_level.required_if' => 'O ano é obrigatório para ensino superior',
            'year_level.min' => 'O ano do ensino superior deve ser pelo menos 1',
            'monthly_tuition.min' => 'A propina mensal deve ser maior ou igual a zero',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($id);
        
        $updateData = $request->only([
            'name',
            'description',
            'code',
            'price',
            'is_active',
            'faculty',
            'monthly_tuition',
        ]);

        // Se education_level está sendo atualizado
        if ($request->has('education_level')) {
            $updateData['education_level'] = $request->education_level;
            
            // Ensino médio: sempre 9 meses, class_level obrigatório
            if ($request->education_level === Course::EDUCATION_LEVEL_MEDIO) {
                $updateData['duration_months'] = 9;
                $updateData['class_level'] = $request->class_level;
                $updateData['year_level'] = null;
            }
            
            // Ensino superior: year_level obrigatório
            if ($request->education_level === Course::EDUCATION_LEVEL_SUPERIOR) {
                $updateData['year_level'] = $request->year_level;
                $updateData['class_level'] = null;
                if ($request->has('duration_months')) {
                    $updateData['duration_months'] = $request->duration_months;
                }
            }
        } else {
            // Se não está mudando education_level, aplicar regras baseadas no nível atual
            if ($course->isMedio()) {
                // Ensino médio: sempre 9 meses
                $updateData['duration_months'] = 9;
                if ($request->has('class_level')) {
                    $updateData['class_level'] = $request->class_level;
                }
                $updateData['year_level'] = null;
            } elseif ($course->isSuperior()) {
                if ($request->has('year_level')) {
                    $updateData['year_level'] = $request->year_level;
                }
                $updateData['class_level'] = null;
                if ($request->has('duration_months')) {
                    $updateData['duration_months'] = $request->duration_months;
                }
            }
        }
        
        $course->update($updateData);
        
        // Calcular propina total
        $totalTuition = $course->getTotalTuition();

        return response()->json([
            'status' => 'success',
            'message' => 'Curso atualizado com sucesso',
            'course' => $course->load('school'),
            'tuition_info' => [
                'monthly_tuition' => $course->monthly_tuition,
                'total_tuition' => $totalTuition,
                'duration_months' => $course->duration_months,
                'formatted_class' => $course->getFormattedClassLevel(),
                'formatted_year' => $course->getFormattedYearLevel(),
            ],
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/courses/{id}",
     *     summary="Deletar curso",
     *     description="Deleta um curso (soft delete ou desativa)",
     *     operationId="deleteCourse",
     *     tags={"Courses"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Curso deletado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Curso não encontrado"
     *     )
     * )
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($id);
        
        // Desativar ao invés de deletar para manter histórico
        $course->update(['is_active' => false]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Curso desativado com sucesso',
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/courses/{id}/upload-image",
     *     summary="Upload de imagem do curso",
     *     description="Faz upload da imagem do curso",
     *     operationId="uploadCourseImage",
     *     tags={"Courses"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="image", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Imagem enviada com sucesso"
     *     )
     * )
     */
    public function uploadImage(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        $school = $request->user();
        $course = Course::where('school_id', $school->id)->findOrFail($id);
        
        if ($course->image_path) {
            Storage::disk('public')->delete($course->image_path);
        }

        $path = $request->file('image')->store('courses/' . $course->id . '/images', 'public');
        $course->image_path = $path;
        $course->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Imagem enviada com sucesso',
            'image_url' => asset('storage/' . $path),
        ]);
    }
}

