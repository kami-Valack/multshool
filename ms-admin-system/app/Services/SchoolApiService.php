<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SchoolApiService
{
    private string $baseUrl;
    private string $apiSecret;

    public function __construct()
    {
        $this->baseUrl = config('services.school_api.url', 'http://localhost:8003/api');
        $this->apiSecret = config('services.school_api.secret', '');
    }

    /**
     * List all schools with optional status filter.
     */
    public function listSchools(?string $status = null): array
    {
        try {
            $url = "{$this->baseUrl}/admin/schools";
            $params = $status ? ['status' => $status] : [];

            $response = Http::withHeaders([
                'X-API-Secret' => $this->apiSecret,
            ])->get($url, $params);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Erro ao listar escolas', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao listar escolas',
            ];
        } catch (\Exception $e) {
            Log::error('Exceção ao listar escolas', [
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao conectar com o serviço de escolas: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Get school details by ID.
     */
    public function getSchool(string $id): array
    {
        try {
            $url = "{$this->baseUrl}/admin/schools/{$id}";

            $response = Http::withHeaders([
                'X-API-Secret' => $this->apiSecret,
            ])->get($url);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Erro ao obter escola', [
                'school_id' => $id,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao obter escola',
            ];
        } catch (\Exception $e) {
            Log::error('Exceção ao obter escola', [
                'school_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao conectar com o serviço de escolas: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Approve a school.
     */
    public function approveSchool(string $id): array
    {
        try {
            $url = "{$this->baseUrl}/admin/schools/{$id}/approve";

            $response = Http::withHeaders([
                'X-API-Secret' => $this->apiSecret,
            ])->post($url);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Erro ao aprovar escola', [
                'school_id' => $id,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao aprovar escola',
            ];
        } catch (\Exception $e) {
            Log::error('Exceção ao aprovar escola', [
                'school_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao conectar com o serviço de escolas: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Reject a school.
     */
    public function rejectSchool(string $id, ?string $reason = null): array
    {
        try {
            $url = "{$this->baseUrl}/admin/schools/{$id}/reject";
            $data = $reason ? ['reason' => $reason] : [];

            $response = Http::withHeaders([
                'X-API-Secret' => $this->apiSecret,
            ])->post($url, $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Erro ao rejeitar escola', [
                'school_id' => $id,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao rejeitar escola',
            ];
        } catch (\Exception $e) {
            Log::error('Exceção ao rejeitar escola', [
                'school_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Erro ao conectar com o serviço de escolas: ' . $e->getMessage(),
            ];
        }
    }
}

