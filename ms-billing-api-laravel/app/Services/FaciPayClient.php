<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class FaciPayClient
{
    public function isMock(): bool
    {
        return (bool) config('facipay.mock');
    }

    /**
     * @return array{success: bool, data?: array, error?: string, status?: int}
     */
    public function createReference(string $description, float $amount, string $type = 'PER'): array
    {
        if ($this->isMock()) {
            $nu = '9'.str_pad((string) random_int(0, 99999999), 8, '0', STR_PAD_LEFT);

            return [
                'success' => true,
                'data' => [
                    'idFpReferencia' => random_int(10000, 99999),
                    'nuReferencia' => $nu,
                    'entidade' => config('facipay.default_entity'),
                    'vlReferencia' => $amount,
                    'tpFpReferencia' => $type,
                    'mock' => true,
                ],
            ];
        }

        $baseUrl = config('facipay.base_url');
        $apiKey = config('facipay.api_key');

        if (!$baseUrl || !$apiKey) {
            return ['success' => false, 'error' => 'FACI_API_BASE_URL ou FACI_API_KEY não configurados', 'status' => 500];
        }

        $body = [
            'dsReferencia' => $description,
            'vlReferencia' => $amount,
            'tpFpReferencia' => $type,
        ];

        $response = Http::withHeaders(['X-API-Key' => $apiKey])
            ->acceptJson()
            ->timeout(30)
            ->post("{$baseUrl}/api/reference/", $body);

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? $response->body(),
                'status' => $response->status(),
                'data' => $response->json(),
            ];
        }

        $payload = $response->json();
        if (!is_array($payload)) {
            $payload = [];
        }

        return [
            'success' => true,
            'data' => $this->normalizeReferenceResponse($this->unwrapGpoPayload($payload), $amount, $type),
        ];
    }

    /**
     * @return array{success: bool, paid?: bool, data?: array, error?: string, status?: int}
     */
    public function getReferenceStatus(?string $nuReferencia = null, ?int $idFpReferencia = null): array
    {
        if ($this->isMock()) {
            $paid = $nuReferencia && str_ends_with($nuReferencia, '1');

            return [
                'success' => true,
                'paid' => $paid,
                'data' => [
                    'paid' => $paid,
                    'nuReferencia' => $nuReferencia,
                    'mock' => true,
                    'hint' => 'Em mock, referências terminadas em 1 simulam pagamento confirmado.',
                ],
            ];
        }

        $baseUrl = config('facipay.base_url');
        $apiKey = config('facipay.api_key');

        if (!$baseUrl || !$apiKey) {
            return ['success' => false, 'error' => 'FACI não configurado', 'status' => 500];
        }

        if (!$nuReferencia && !$idFpReferencia) {
            return ['success' => false, 'error' => 'nuReferencia ou idFpReferencia obrigatório', 'status' => 422];
        }

        $query = array_filter([
            'nuReferencia' => $nuReferencia,
            'idFpReferencia' => $idFpReferencia,
        ]);

        $response = Http::withHeaders(['X-API-Key' => $apiKey])
            ->acceptJson()
            ->timeout(30)
            ->get("{$baseUrl}/api/reference/status/", $query);

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? $response->body(),
                'status' => $response->status(),
            ];
        }

        $payload = $response->json();
        if (!is_array($payload)) {
            $payload = [];
        }
        $data = $this->unwrapGpoPayload($payload);
        $paid = (bool) ($data['paid'] ?? $data['pago'] ?? $payload['paid'] ?? false);

        return ['success' => true, 'paid' => $paid, 'data' => array_merge($payload, $data)];
    }

    /**
     * GPO at gpo.drip.infinityfree.me wraps payloads in { "result": { ... } }.
     */
    private function unwrapGpoPayload(array $payload): array
    {
        if (isset($payload['result']) && is_array($payload['result'])) {
            return $payload['result'];
        }

        return $payload;
    }

    private function normalizeReferenceResponse(array $data, float $amount, string $type): array
    {
        return [
            'idFpReferencia' => $data['idFpReferencia'] ?? $data['id_fp_referencia'] ?? null,
            'nuReferencia' => (string) ($data['nuReferencia'] ?? $data['nu_referencia'] ?? ''),
            'entidade' => (string) ($data['entidade'] ?? $data['nuEntidade'] ?? config('facipay.default_entity')),
            'vlReferencia' => $data['vlReferencia'] ?? $data['vl_referencia'] ?? $amount,
            'tpFpReferencia' => $data['tpFpReferencia'] ?? $type,
        ];
    }

    public function generateReceiptNumber(): string
    {
        return 'RC-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));
    }
}
