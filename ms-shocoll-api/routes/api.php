<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/health', [\App\Http\Controllers\HealthController::class, 'index']);

// Admin routes (require API Secret)
Route::middleware([\App\Http\Middleware\AuthenticateApiSecret::class])->prefix('admin')->group(function () {
    Route::get('/schools', [\App\Http\Controllers\Admin\SchoolController::class, 'index']);
    Route::get('/schools/{id}', [\App\Http\Controllers\Admin\SchoolController::class, 'show']);
    Route::get('/schools/{id}/courses', [\App\Http\Controllers\Admin\SchoolController::class, 'courses']);
    Route::post('/schools/{id}/approve', [\App\Http\Controllers\Admin\SchoolController::class, 'approve']);
    Route::post('/schools/{id}/reject', [\App\Http\Controllers\Admin\SchoolController::class, 'reject']);
    
    // Replicação de docentes
    Route::post('/teachers/replicate', [\App\Http\Controllers\Admin\TeacherReplicationController::class, 'replicate']);
    
    // Admin routes for courses and exams
    Route::get('/courses/{id}', [\App\Http\Controllers\CourseController::class, 'show']);
    Route::get('/courses/{id}/admission-exams', [\App\Http\Controllers\AdmissionExamController::class, 'index']);
    Route::get('/courses/{id}/subjects', [\App\Http\Controllers\CourseSubjectController::class, 'indexPublic']);
    
    // Admin routes for payments
    Route::get('/payments', [\App\Http\Controllers\Admin\PaymentController::class, 'index']);
    Route::get('/payments/{id}', [\App\Http\Controllers\Admin\PaymentController::class, 'show']);
});

// Protected routes (require JWT authentication and school role and approved status)
// O middleware AuthenticateApi já verifica se é role 'school', mas podemos adicionar role:school para garantir
Route::middleware([\App\Http\Middleware\AuthenticateApi::class, 'role:school'])->group(function () {
    // Rotas de perfil - NÃO requerem perfil completo (permitem atualizar)
    Route::get('/me', [\App\Http\Controllers\ProfileController::class, 'me']);
    Route::get('/profile/check-completion', [\App\Http\Controllers\ProfileController::class, 'checkCompletion']);
    Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update']);
    Route::post('/profile/upload-logo', [\App\Http\Controllers\ProfileController::class, 'uploadLogo']);
    Route::post('/profile/upload-photos', [\App\Http\Controllers\ProfileController::class, 'uploadPhotos']);
    Route::post('/profile/upload-video', [\App\Http\Controllers\ProfileController::class, 'uploadVideo']);

    // Todas as outras rotas requerem perfil completo
    Route::middleware([\App\Http\Middleware\RequireCompleteProfile::class])->group(function () {
    // Cursos
    Route::apiResource('courses', \App\Http\Controllers\CourseController::class);
        Route::post('/courses/{id}/upload-image', [\App\Http\Controllers\CourseController::class, 'uploadImage']);
        
        // Cadeiras/Disciplinas dos Cursos
        Route::prefix('courses/{courseId}')->group(function () {
            Route::apiResource('subjects', \App\Http\Controllers\CourseSubjectController::class);
        });
    
    // Exames de Admissão
    Route::prefix('courses/{courseId}')->group(function () {
        Route::apiResource('admission-exams', \App\Http\Controllers\AdmissionExamController::class);
        Route::get('/admission-exams/{examId}/registrations', [\App\Http\Controllers\AdmissionExamController::class, 'registrations']);
    });
    
    // Gerenciamento de Matrículas
    Route::prefix('courses/{courseId}')->group(function () {
        Route::get('/enrollments', [\App\Http\Controllers\EnrollmentManagementController::class, 'index']);
    });
    
    Route::prefix('enrollments')->group(function () {
        Route::put('/{enrollmentId}', [\App\Http\Controllers\EnrollmentManagementController::class, 'update']);
        Route::post('/{enrollmentId}/approve', [\App\Http\Controllers\EnrollmentManagementController::class, 'approve']);
        Route::post('/{enrollmentId}/reject', [\App\Http\Controllers\EnrollmentManagementController::class, 'reject']);
    });
    
    // Gerenciamento de Candidatos em Exames
    Route::prefix('exam-registrations')->group(function () {
        Route::post('/{registrationId}/approve', [\App\Http\Controllers\EnrollmentManagementController::class, 'approveExamCandidate']);
        Route::post('/{registrationId}/reject', [\App\Http\Controllers\EnrollmentManagementController::class, 'rejectExamCandidate']);
    });
    
    // Gerenciamento de Professores
    Route::apiResource('teachers', \App\Http\Controllers\TeacherManagementController::class);
    
    // Gerenciamento de Vínculos Professor-Aluno
    Route::prefix('teachers')->group(function () {
        Route::post('/{teacherId}/students/{studentId}', [\App\Http\Controllers\SchoolTeacherStudentController::class, 'link']);
        Route::get('/{teacherId}/students', [\App\Http\Controllers\SchoolTeacherStudentController::class, 'listStudents']);
        Route::delete('/{teacherId}/students/{studentId}', [\App\Http\Controllers\SchoolTeacherStudentController::class, 'unlink']);
    });
    
    // Gerenciamento de Atribuições de Professores a Turmas
    Route::prefix('teacher-assignments')->group(function () {
        Route::get('/', [\App\Http\Controllers\TeacherClassAssignmentController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\TeacherClassAssignmentController::class, 'store']);
        Route::post('/bulk', [\App\Http\Controllers\TeacherClassAssignmentController::class, 'bulkStore']);
        Route::get('/{id}', [\App\Http\Controllers\TeacherClassAssignmentController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\TeacherClassAssignmentController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\TeacherClassAssignmentController::class, 'destroy']);
    });
    
    // Gerenciamento de Turmas (Classes)
    Route::apiResource('classes', \App\Http\Controllers\ClassController::class);
    
    // Gerenciamento de Horários
    Route::apiResource('schedules', \App\Http\Controllers\ScheduleController::class);
    
    Route::prefix('students')->group(function () {
        Route::get('/{studentId}/teachers', [\App\Http\Controllers\SchoolTeacherStudentController::class, 'listTeachers']);
    });
    });
});

// Teacher routes (require JWT authentication and teacher role)
Route::middleware([\App\Http\Middleware\AuthenticateTeacher::class])->prefix('teacher')->group(function () {
    Route::get('/me', [\App\Http\Controllers\TeacherController::class, 'me']);
    Route::get('/students', [\App\Http\Controllers\TeacherController::class, 'students']);
    Route::get('/students/{studentId}/grades', [\App\Http\Controllers\TeacherController::class, 'studentGrades']);
    Route::get('/students/{studentId}/follow-ups', [\App\Http\Controllers\TeacherController::class, 'followUps']);
    Route::post('/students/{studentId}/follow-ups', [\App\Http\Controllers\TeacherController::class, 'createFollowUp']);
});

// Student routes (require API Secret)
Route::middleware([\App\Http\Middleware\AuthenticateApiSecret::class])->prefix('student')->group(function () {
    Route::apiResource('enrollments', \App\Http\Controllers\Student\EnrollmentController::class)->only(['index', 'store']);
    Route::apiResource('exam-registrations', \App\Http\Controllers\Student\ExamRegistrationController::class)->only(['index', 'store']);
    // Horários do estudante - busca por class_id das matrículas
    Route::get('/schedules', [\App\Http\Controllers\ScheduleController::class, 'indexForStudent']);
    
    // Payment routes (require API Secret)
    Route::post('/payments/generate-token', [\App\Http\Controllers\Student\PaymentController::class, 'generatePurchaseToken']);
    Route::get('/payments/check-status', [\App\Http\Controllers\Student\PaymentController::class, 'checkStatus']);
});

// Student payment routes (NO API Secret required)
Route::prefix('student')->group(function () {
    Route::get('/payments/check-by-course', [\App\Http\Controllers\Student\PaymentController::class, 'getByStudentAndCourse']);
});

// GPO Callback (public route - no authentication required)
Route::post('/payments/gpo-callback', [\App\Http\Controllers\Student\PaymentController::class, 'callback']);

