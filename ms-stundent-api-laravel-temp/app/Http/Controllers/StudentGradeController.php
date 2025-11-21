<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentGradeController extends Controller
{
    /**
     * Get grades for a specific student by student ID (for API Secret access)
     */
    public function getGradesByStudentId(Request $request, string $studentId): JsonResponse
    {
        $student = User::where('student_id', $studentId)
            ->orWhere('id', $studentId)
            ->firstOrFail();
        
        $grades = Grade::where('student_id', $student->id)
            ->orderBy('year', 'desc')
            ->orderBy('semester', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'student' => [
                'id' => $student->id,
                'student_id' => $student->student_id,
                'name' => $student->name,
                'email' => $student->email,
            ],
            'grades' => $grades,
        ]);
    }
}

