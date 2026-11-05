<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StudentEventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->forward($request, 'get', '/student/events');
    }

    public function register(Request $request, string $id): JsonResponse
    {
        return $this->forward($request, 'post', "/student/events/{$id}/register");
    }

    private function forward(Request $request, string $method, string $path): JsonResponse
    {
        try {
            $student = $request->user();
            $schoolApiUrl = rtrim(config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api')), '/');
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            $pending = Http::withHeaders(['X-API-Secret' => $apiSecret])->acceptJson();
            $payload = [
                'student_id' => $student->id,
                'student_name' => $student->name,
                'student_email' => $student->email,
            ];

            $response = $method === 'get'
                ? $pending->get($schoolApiUrl.$path, ['student_id' => $student->id])
                : $pending->post($schoolApiUrl.$path, $payload);

            if (!$response->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $response->json('message') ?? 'Erro ao obter eventos',
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Erro ao contactar eventos da escola', ['error' => $e->getMessage()]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao obter eventos',
            ], 500);
        }
    }
}
