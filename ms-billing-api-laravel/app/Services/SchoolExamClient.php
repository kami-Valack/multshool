<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SchoolExamClient
{
    /**
     * @return array{success: bool, exam?: array, error?: string, status?: int}
     */
    public function getAdmissionExam(string $admissionExamId): array
    {
        $url = config('services.school_api.url')."/student/admission-exams/{$admissionExamId}";
        $secret = config('services.school_api.secret');

        $response = Http::withHeaders(['X-API-Secret' => $secret])
            ->acceptJson()
            ->timeout(20)
            ->get($url);

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? 'Exame não encontrado',
                'status' => $response->status(),
            ];
        }

        $exam = $response->json('exam');
        if (!$exam) {
            return ['success' => false, 'error' => 'Resposta inválida da school API', 'status' => 502];
        }

        return ['success' => true, 'exam' => $exam];
    }

    /**
     * @return array{success: bool, error?: string, status?: int}
     */
    public function confirmExamFeePayment(
        string $studentId,
        string $studentEmail,
        string $studentName,
        string $admissionExamId,
        ?string $paymentReference = null
    ): array {
        $url = config('services.school_api.url').'/student/exam-registrations/confirm-fee-payment';
        $secret = config('services.school_api.secret');

        $response = Http::withHeaders(['X-API-Secret' => $secret])
            ->acceptJson()
            ->timeout(20)
            ->post($url, array_filter([
                'student_id' => $studentId,
                'student_email' => $studentEmail,
                'student_name' => $studentName,
                'admission_exam_id' => $admissionExamId,
                'payment_reference' => $paymentReference,
            ]));

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? $response->body(),
                'status' => $response->status(),
            ];
        }

        return ['success' => true];
    }
}
