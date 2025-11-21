<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AdmissionExam;
use App\Models\ExamRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamRegistrationController extends Controller
{
    /**
     * List exam registrations for a student.
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|uuid',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $registrations = ExamRegistration::where('student_id', $request->student_id)
            ->with(['admissionExam.course'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'registrations' => $registrations,
        ]);
    }

    /**
     * Create exam registration for a student.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|uuid',
            'student_email' => 'required|email',
            'student_name' => 'required|string',
            'admission_exam_id' => 'required|uuid|exists:admission_exams,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $exam = AdmissionExam::findOrFail($request->admission_exam_id);

        // Verificar se já existe inscrição
        $existing = ExamRegistration::where('admission_exam_id', $request->admission_exam_id)
            ->where('student_id', $request->student_id)
            ->first();

        if ($existing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Você já está inscrito neste exame',
            ], 409);
        }

        // Verificar se o exame está ativo
        if (!$exam->is_active) {
            return response()->json([
                'status' => 'error',
                'message' => 'Este exame não está disponível para inscrição',
            ], 400);
        }

        // Verificar prazo de inscrição
        if ($exam->registration_deadline && now()->greaterThan($exam->registration_deadline)) {
            return response()->json([
                'status' => 'error',
                'message' => 'O prazo de inscrição para este exame já expirou',
            ], 400);
        }

        // Verificar número máximo de candidatos
        if ($exam->max_candidates) {
            $currentRegistrations = ExamRegistration::where('admission_exam_id', $exam->id)->count();
            if ($currentRegistrations >= $exam->max_candidates) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Número máximo de candidatos atingido',
                ], 400);
            }
        }

        $registration = ExamRegistration::create([
            'admission_exam_id' => $request->admission_exam_id,
            'student_id' => $request->student_id,
            'student_email' => $request->student_email,
            'student_name' => $request->student_name,
            'status' => ExamRegistration::STATUS_REGISTERED,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Inscrição realizada com sucesso',
            'registration' => $registration->load(['admissionExam.course']),
        ], 201);
    }
}

