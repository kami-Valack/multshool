<?php

namespace App\Services;

use App\Models\AdmissionExam;
use App\Models\Course;
use App\Models\ExamRegistration;

class AdmissionExamFeeService
{
    /**
     * Exames activos do curso com taxa obrigatória (> 0).
     */
    public function requiredPaidExamsForCourse(string $courseId)
    {
        return AdmissionExam::where('course_id', $courseId)
            ->where('is_active', true)
            ->whereNotNull('exam_fee')
            ->where('exam_fee', '>', 0)
            ->orderBy('exam_date')
            ->get();
    }

    public function studentHasPaidExamFee(string $studentId, string $admissionExamId): bool
    {
        return ExamRegistration::where('student_id', $studentId)
            ->where('admission_exam_id', $admissionExamId)
            ->where('fee_paid', true)
            ->exists();
    }

    /**
     * @return array{required: bool, paid: bool, admission_exam_id: ?string, exam_fee: ?float, exams: array}
     */
    public function paymentStatusForStudent(string $courseId, string $studentId): array
    {
        $requiredExams = $this->requiredPaidExamsForCourse($courseId);

        if ($requiredExams->isEmpty()) {
            return [
                'required' => false,
                'paid' => true,
                'admission_exam_id' => null,
                'exam_fee' => null,
                'exams' => [],
            ];
        }

        $examsPayload = $requiredExams->map(function (AdmissionExam $exam) use ($studentId) {
            $paid = $this->studentHasPaidExamFee($studentId, $exam->id);

            return [
                'id' => $exam->id,
                'name' => $exam->name,
                'exam_fee' => (float) $exam->exam_fee,
                'exam_date' => $exam->exam_date?->toIso8601String(),
                'registration_deadline' => $exam->registration_deadline?->toIso8601String(),
                'fee_paid' => $paid,
            ];
        })->values()->all();

        $anyPaid = collect($examsPayload)->contains(fn ($e) => $e['fee_paid']);
        $firstUnpaid = collect($examsPayload)->first(fn ($e) => !$e['fee_paid']);

        return [
            'required' => true,
            'paid' => $anyPaid,
            'admission_exam_id' => $anyPaid
                ? (collect($examsPayload)->first(fn ($e) => $e['fee_paid'])['id'] ?? null)
                : ($firstUnpaid['id'] ?? $requiredExams->first()->id),
            'exam_fee' => $firstUnpaid['exam_fee'] ?? (float) $requiredExams->first()->exam_fee,
            'exams' => $examsPayload,
        ];
    }

    public function assertEnrollmentAllowed(Course $course, string $studentId, ?string $admissionExamId): ?string
    {
        $requiredExams = $this->requiredPaidExamsForCourse($course->id);

        if ($requiredExams->isEmpty()) {
            return null;
        }

        if ($requiredExams->count() === 1) {
            $admissionExamId = $admissionExamId ?? $requiredExams->first()->id;
        } elseif (!$admissionExamId) {
            return 'Selecione o exame de admissão e pague a taxa antes de se matricular.';
        }

        $exam = $requiredExams->firstWhere('id', $admissionExamId);
        if (!$exam) {
            return 'Exame de admissão inválido para este curso.';
        }

        if (!$this->studentHasPaidExamFee($studentId, $admissionExamId)) {
            return 'Pague a taxa de exame de admissão antes de se matricular neste curso.';
        }

        return null;
    }

    public function confirmExamFeePayment(
        string $studentId,
        string $studentEmail,
        string $studentName,
        string $admissionExamId,
        ?string $paymentReference = null
    ): ExamRegistration {
        $exam = AdmissionExam::findOrFail($admissionExamId);

        $registration = ExamRegistration::firstOrNew([
            'admission_exam_id' => $admissionExamId,
            'student_id' => $studentId,
        ]);

        if (!$registration->exists) {
            $registration->student_email = $studentEmail;
            $registration->student_name = $studentName;
            $registration->status = ExamRegistration::STATUS_REGISTERED;
        }

        $registration->fee_paid = true;
        $registration->fee_paid_at = now();
        if ($paymentReference) {
            $registration->payment_reference = $paymentReference;
        }
        $registration->save();

        return $registration->load(['admissionExam.course']);
    }
}
