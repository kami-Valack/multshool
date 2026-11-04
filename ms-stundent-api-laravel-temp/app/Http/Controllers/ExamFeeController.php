<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExamFeeController extends Controller
{
    public function overview(Request $request): JsonResponse
    {
        try {
            $student = $request->user();
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($schoolApiUrl.'/student/exam-fees/overview', [
                'student_id' => $student->id,
            ]);

            if (!$response->successful()) {
                $errorData = $response->json();

                return response()->json([
                    'status' => 'error',
                    'message' => $errorData['message'] ?? 'Erro ao obter taxas de exame',
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Erro ao obter overview de taxas de exame', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao obter taxas de exame',
            ], 500);
        }
    }
}
