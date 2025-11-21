<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadDocumentsRequest;
use App\Models\Document;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(
 *     name="Documents",
 *     description="Endpoints para gerenciamento de documentos do estudante"
 * )
 */
class StudentDocumentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/documents/upload",
     *     summary="Upload de documentos do estudante (primeiro acesso)",
     *     description="Faz upload dos documentos obrigatórios: BI, Foto Tipo Passe e Habilitação Literária",
     *     operationId="uploadDocuments",
     *     tags={"Documents"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"bi", "foto_tipo", "habilitacao_literaria"},
     *                 @OA\Property(
     *                     property="bi",
     *                     type="string",
     *                     format="binary",
     *                     description="Bilhete de Identidade (PDF, JPG, JPEG, PNG - máx. 5MB)"
     *                 ),
     *                 @OA\Property(
     *                     property="foto_tipo",
     *                     type="string",
     *                     format="binary",
     *                     description="Foto Tipo Passe (JPG, JPEG, PNG - máx. 2MB)"
     *                 ),
     *                 @OA\Property(
     *                     property="habilitacao_literaria",
     *                     type="string",
     *                     format="binary",
     *                     description="Habilitação Literária (PDF, JPG, JPEG, PNG - máx. 5MB)"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Documentos enviados com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Documentos enviados com sucesso."),
     *             @OA\Property(
     *                 property="documents",
     *                 type="object",
     *                 @OA\Property(
     *                     property="bi",
     *                     type="object",
     *                     @OA\Property(property="id", type="string", example="uuid")
     *                 ),
     *                 @OA\Property(
     *                     property="foto_tipo",
     *                     type="object",
     *                     @OA\Property(property="id", type="string", example="uuid")
     *                 ),
     *                 @OA\Property(
     *                     property="habilitacao_literaria",
     *                     type="object",
     *                     @OA\Property(property="id", type="string", example="uuid")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Documentos já foram enviados",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Documentos já foram enviados. Use a rota de atualização para substituir documentos.")
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
     *         response=422,
     *         description="Erro de validação",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="O documento BI é obrigatório."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function upload(UploadDocumentsRequest $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Verificar se já possui documentos
            $existingDocuments = Document::where('user_id', $user->id)->count();
            if ($existingDocuments > 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Documentos já foram enviados. Use a rota de atualização para substituir documentos.',
                ], Response::HTTP_BAD_REQUEST);
            }

            $uploadedDocuments = [];

            // Upload BI
            if ($request->hasFile('bi')) {
                $document = $this->uploadDocument($user->id, Document::TYPE_BI, $request->file('bi'));
                $uploadedDocuments['bi'] = [
                    'id' => $document->id,
                ];
            }

            // Upload Foto Tipo
            if ($request->hasFile('foto_tipo')) {
                $document = $this->uploadDocument($user->id, Document::TYPE_FOTO_TIPO, $request->file('foto_tipo'));
                $uploadedDocuments['foto_tipo'] = [
                    'id' => $document->id,
                ];
            }

            // Upload Habilitação Literária
            if ($request->hasFile('habilitacao_literaria')) {
                $document = $this->uploadDocument($user->id, Document::TYPE_HABILITACAO_LITERARIA, $request->file('habilitacao_literaria'));
                $uploadedDocuments['habilitacao_literaria'] = [
                    'id' => $document->id,
                ];
            }

            Log::info('Documentos enviados pelo estudante', [
                'user_id' => $user->id,
                'student_id' => $user->student_id,
                'documents' => array_keys($uploadedDocuments),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Documentos enviados com sucesso.',
                'documents' => $uploadedDocuments,
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error('Erro ao fazer upload de documentos', [
                'user_id' => $request->user()->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer upload dos documentos: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Upload a single document.
     */
    private function uploadDocument(string $userId, string $documentType, $file): Document
    {
        // Gerar nome único para o arquivo
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::uuid() . '.' . $extension;
        $directory = "documents/{$userId}";
        $filePath = "{$directory}/{$fileName}";

        // Salvar arquivo
        $path = $file->storeAs($directory, $fileName, 'public');

        // Criar registro no banco
        $document = Document::create([
            'user_id' => $userId,
            'document_type' => $documentType,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);

        return $document;
    }

    /**
     * @OA\Get(
     *     path="/api/documents",
     *     summary="Listar documentos do estudante",
     *     description="Retorna todos os documentos enviados pelo estudante autenticado",
     *     operationId="listDocuments",
     *     tags={"Documents"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de documentos",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="documents",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="string", example="uuid"),
     *                     @OA\Property(property="type", type="string", example="bi"),
     *                     @OA\Property(property="file_name", type="string", example="bi.pdf"),
     *                     @OA\Property(property="uploaded_at", type="string", format="date-time"),
     *                     @OA\Property(property="file_url", type="string", example="http://localhost:8001/storage/documents/user-id/file.pdf")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            $documents = Document::where('user_id', $user->id)
                ->get()
                ->map(function ($document) {
                    return [
                        'id' => $document->id,
                        'type' => $document->document_type,
                        'file_name' => $document->file_name,
                        'uploaded_at' => $document->uploaded_at->toIso8601String(),
                        'file_url' => $document->getFileUrl(),
                    ];
                });

            return response()->json([
                'status' => 'success',
                'documents' => $documents,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar documentos', [
                'user_id' => $request->user()->id ?? null,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar documentos: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/documents/check-first-access",
     *     summary="Verificar primeiro acesso",
     *     description="Verifica se o estudante precisa fazer upload de documentos (primeiro acesso)",
     *     operationId="checkFirstAccess",
     *     tags={"Documents"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Status do primeiro acesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="first_access", type="boolean", example=true),
     *             @OA\Property(property="has_all_documents", type="boolean", example=false),
     *             @OA\Property(
     *                 property="missing_documents",
     *                 type="array",
     *                 @OA\Items(type="string", example="bi")
     *             ),
     *             @OA\Property(property="documents_count", type="integer", example=0),
     *             @OA\Property(property="required_count", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado"
     *     )
     * )
     */
    public function checkFirstAccess(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            $documents = Document::where('user_id', $user->id)->get();
            $requiredTypes = Document::getAllowedTypes();
            
            $missingDocuments = [];
            $hasAllDocuments = true;

            foreach ($requiredTypes as $type) {
                $document = $documents->firstWhere('document_type', $type);
                if (!$document) {
                    $missingDocuments[] = $type;
                    $hasAllDocuments = false;
                }
            }

            return response()->json([
                'status' => 'success',
                'first_access' => !$hasAllDocuments,
                'has_all_documents' => $hasAllDocuments,
                'missing_documents' => $missingDocuments,
                'documents_count' => $documents->count(),
                'required_count' => count($requiredTypes),
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Erro ao verificar primeiro acesso', [
                'user_id' => $request->user()->id ?? null,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao verificar primeiro acesso: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
