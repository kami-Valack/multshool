<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentGradeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $student = $request->user();
        $grades = Grade::where('student_id', $student->id)
            ->orderByDesc('updated_at')
            ->orderByDesc('year')
            ->get();

        return response()->json([
            'status' => 'success',
            'grades' => $grades->map(fn (Grade $grade) => $this->serialize($grade))->values(),
        ]);
    }

    /**
     * Get grades for a specific student by student ID (for API Secret access)
     */
    public function getGradesByStudentId(Request $request, string $studentId): JsonResponse
    {
        $student = User::where('student_id', $studentId)
            ->orWhere('id', $studentId)
            ->firstOrFail();
        
        $grades = Grade::where('student_id', $student->id)
            ->orderByDesc('updated_at')
            ->orderByDesc('year')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'student' => [
                'id' => $student->id,
                'student_id' => $student->student_id,
                'name' => $student->name,
                'email' => $student->email,
            ],
            'grades' => $grades->map(fn (Grade $grade) => $this->serialize($grade))->values(),
        ]);
    }

    private function serialize(Grade $grade): array
    {
        $subject = $grade->course_name;

        return [
            'id' => $grade->id,
            'student_id' => $grade->student_id,
            'course_id' => $grade->course_id,
            'course_name' => $grade->course_name,
            'subject' => $subject,
            'grade' => (float) $grade->grade,
            'year' => (int) $grade->year,
            'semester' => $grade->semester,
            'created_at' => $grade->created_at,
            'updated_at' => $grade->updated_at,
        ];
    }
}

