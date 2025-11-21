<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * @OA\Tag(
 *     name="Profile",
 *     description="Endpoints relacionados ao perfil da escola"
 * )
 */
class ProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/me",
     *     summary="Obter perfil da escola autenticada",
     *     description="Retorna os dados da escola autenticada",
     *     operationId="getProfile",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil da escola",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", example="uuid"),
     *                 @OA\Property(property="email", type="string", example="escola@example.com"),
     *                 @OA\Property(property="name", type="string", example="Escola Exemplo"),
     *                 @OA\Property(property="role", type="string", example="school"),
     *                 @OA\Property(property="email_verified", type="boolean", example=true),
     *                 @OA\Property(property="is_active", type="boolean", example=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Token não fornecido ou inválido")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Acesso negado - apenas escolas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Acesso negado. Apenas escolas podem acessar este serviço.")
     *         )
     *     )
     * )
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'acronym' => $user->acronym,
                'role' => $user->role,
                'email_verified' => $user->email_verified,
                'is_active' => $user->is_active,
                'institution_type' => $user->institution_type,
                'logo_path' => $user->logo_path ? asset('storage/' . $user->logo_path) : null,
                'photos' => $user->photos ? array_map(function($photo) {
                    return asset('storage/' . $photo);
                }, $user->photos) : [],
                'presentation_video_path' => $user->presentation_video_path ? asset('storage/' . $user->presentation_video_path) : null,
                'description' => $user->description,
                'founded_year' => $user->founded_year,
                'location_map_url' => $user->location_map_url,
                'total_students' => $user->total_students,
                'phone_number' => $user->phone_number,
                'contact_emails' => $user->contact_emails ?? [],
                'status' => $user->status,
            ],
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/profile/check-completion",
     *     summary="Verificar status de completude do perfil",
     *     description="Verifica se o perfil da escola está completo e retorna os campos faltantes",
     *     operationId="checkProfileCompletion",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Status do perfil",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="is_complete", type="boolean", example=false),
     *             @OA\Property(property="missing_fields", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="completion_percentage", type="integer", example=60)
     *         )
     *     )
     * )
     */
    public function checkCompletion(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $isComplete = $user->hasCompleteProfile();
        $missingFields = $user->getMissingProfileFields();
        
        // Calcular percentual de completude
        $requiredFields = [
            'name',
            'acronym',
            'logo_path',
            'photos',
            'presentation_video_path',
            'description',
            'founded_year',
            'location_map_url',
            'phone_number',
            'contact_emails',
        ];
        
        $totalFields = count($requiredFields);
        $completedFields = $totalFields - count($missingFields);
        $completionPercentage = $totalFields > 0 ? round(($completedFields / $totalFields) * 100) : 0;
        
        return response()->json([
            'status' => 'success',
            'is_complete' => $isComplete,
            'missing_fields' => $missingFields,
            'completion_percentage' => $completionPercentage,
            'message' => $isComplete 
                ? 'Perfil completo! Você pode realizar todas as atividades.' 
                : 'É obrigatório preencher todos os dados da instituição antes de realizar qualquer atividade.',
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/profile",
     *     summary="Atualizar perfil da escola",
     *     description="Atualiza os dados do perfil da escola autenticada",
     *     operationId="updateProfile",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="name", type="string", example="Universidade Exemplo"),
     *                 @OA\Property(property="acronym", type="string", example="UEX"),
     *                 @OA\Property(property="description", type="string", example="Descrição da instituição"),
     *                 @OA\Property(property="founded_year", type="integer", example=1990),
     *                 @OA\Property(property="location_map_url", type="string", example="https://maps.google.com/..."),
     *                 @OA\Property(property="total_students", type="integer", example=5000),
     *                 @OA\Property(property="phone_number", type="string", example="+244 923 456 789"),
     *                 @OA\Property(property="contact_emails", type="array", @OA\Items(type="string"), example={"contato@example.com", "info@example.com"})
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Perfil atualizado com sucesso"
     *     )
     * )
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'acronym' => 'sometimes|string|max:50',
            'description' => 'sometimes|string|max:5000',
            'founded_year' => 'sometimes|integer|min:1000|max:' . date('Y'),
            'location_map_url' => 'sometimes|url|max:500',
            'total_students' => 'sometimes|integer|min:0',
            'phone_number' => 'sometimes|string|max:50',
            'contact_emails' => 'sometimes|array',
            'contact_emails.*' => 'email|max:255',
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Perfil atualizado com sucesso',
            'user' => $user->fresh(),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/profile/upload-logo",
     *     summary="Upload do logotipo da instituição",
     *     description="Faz upload do logotipo da instituição",
     *     operationId="uploadLogo",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="logo", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Logotipo enviado com sucesso"
     *     )
     * )
     */
    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = $request->user();
        
        if ($user->logo_path) {
            Storage::disk('public')->delete($user->logo_path);
        }

        $path = $request->file('logo')->store('institutions/' . $user->id . '/logo', 'public');
        $user->logo_path = $path;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Logotipo enviado com sucesso',
            'logo_url' => asset('storage/' . $path),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/profile/upload-photos",
     *     summary="Upload de fotografias da instituição",
     *     description="Faz upload de até 2 fotografias da instituição",
     *     operationId="uploadPhotos",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="photos[]", type="array", @OA\Items(type="string", format="binary"))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Fotografias enviadas com sucesso"
     *     )
     * )
     */
    public function uploadPhotos(Request $request): JsonResponse
    {
        $request->validate([
            'photos' => 'required|array|min:1|max:2',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        $user = $request->user();
        
        // Deletar fotos antigas se existirem
        if ($user->photos) {
            foreach ($user->photos as $oldPhoto) {
                Storage::disk('public')->delete($oldPhoto);
            }
        }

        $photos = [];
        foreach ($request->file('photos') as $photo) {
            $path = $photo->store('institutions/' . $user->id . '/photos', 'public');
            $photos[] = $path;
        }

        $user->photos = $photos;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Fotografias enviadas com sucesso',
            'photos' => array_map(function($photo) {
                return asset('storage/' . $photo);
            }, $photos),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/profile/upload-video",
     *     summary="Upload de vídeo de apresentação",
     *     description="Faz upload do vídeo de apresentação da instituição",
     *     operationId="uploadVideo",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="video", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Vídeo enviado com sucesso"
     *     )
     * )
     */
    public function uploadVideo(Request $request): JsonResponse
    {
        $request->validate([
            'video' => 'required|mimes:mp4,avi,mov,wmv,flv,webm|max:102400', // 100MB max
        ]);

        $user = $request->user();
        
        if ($user->presentation_video_path) {
            Storage::disk('public')->delete($user->presentation_video_path);
        }

        $path = $request->file('video')->store('institutions/' . $user->id . '/video', 'public');
        $user->presentation_video_path = $path;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Vídeo enviado com sucesso',
            'video_url' => asset('storage/' . $path),
        ]);
    }
}

