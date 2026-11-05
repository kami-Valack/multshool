<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\ExamRegistration;
use App\Models\SchoolEvent;
use App\Models\SchoolEventRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentEventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $studentId = (string) $request->query('student_id', '');
        if ($studentId === '') {
            return response()->json(['status' => 'error', 'message' => 'student_id é obrigatório'], 422);
        }

        $schoolIds = $this->schoolIdsForStudent($studentId);
        if ($schoolIds->isEmpty()) {
            return response()->json(['status' => 'success', 'events' => []]);
        }

        $events = SchoolEvent::whereIn('school_id', $schoolIds)
            ->where('is_published', true)
            ->orderBy('starts_at')
            ->get();

        $registrations = SchoolEventRegistration::where('student_id', $studentId)
            ->whereIn('event_id', $events->pluck('id'))
            ->get()
            ->keyBy('event_id');

        $payload = $events->map(function (SchoolEvent $event) use ($registrations) {
            $registration = $registrations->get($event->id);

            return $this->format($event, $registration);
        });

        return response()->json([
            'status' => 'success',
            'events' => $payload,
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $event = SchoolEvent::where('is_published', true)->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'event' => [
                'id' => $event->id,
                'school_id' => $event->school_id,
                'title' => $event->title,
                'description' => $event->description,
                'location' => $event->location,
                'starts_at' => $event->starts_at?->toIso8601String(),
                'ends_at' => $event->ends_at?->toIso8601String(),
                'price' => (float) $event->price,
                'is_published' => $event->is_published,
            ],
        ]);
    }

    public function register(Request $request, string $id): JsonResponse
    {
        $data = $request->validate([
            'student_id' => 'required|uuid',
            'student_name' => 'nullable|string|max:255',
            'student_email' => 'nullable|string|max:255',
        ]);

        $event = SchoolEvent::where('is_published', true)->findOrFail($id);
        if ((float) $event->price > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Este evento é pago. Conclua o pagamento para se inscrever.',
            ], 422);
        }

        $registration = SchoolEventRegistration::updateOrCreate(
            ['event_id' => $event->id, 'student_id' => $data['student_id']],
            [
                'student_name' => $data['student_name'] ?? null,
                'student_email' => $data['student_email'] ?? null,
                'status' => SchoolEventRegistration::STATUS_REGISTERED,
            ]
        );

        return response()->json([
            'status' => 'success',
            'event' => $this->format($event, $registration),
        ]);
    }

    public function confirmPayment(Request $request, string $id): JsonResponse
    {
        $data = $request->validate([
            'student_id' => 'required|uuid',
            'student_name' => 'nullable|string|max:255',
            'student_email' => 'nullable|string|max:255',
            'payment_reference' => 'nullable|string|max:100',
        ]);

        $event = SchoolEvent::findOrFail($id);
        $registration = SchoolEventRegistration::updateOrCreate(
            ['event_id' => $event->id, 'student_id' => $data['student_id']],
            [
                'student_name' => $data['student_name'] ?? null,
                'student_email' => $data['student_email'] ?? null,
                'status' => SchoolEventRegistration::STATUS_PAID,
                'paid_at' => now(),
                'payment_reference' => $data['payment_reference'] ?? null,
            ]
        );

        return response()->json([
            'status' => 'success',
            'event' => $this->format($event, $registration),
        ]);
    }

    private function schoolIdsForStudent(string $studentId)
    {
        $fromEnrollments = Enrollment::where('student_id', $studentId)
            ->with('course:id,school_id')
            ->get()
            ->pluck('course.school_id');

        $fromExams = ExamRegistration::where('student_id', $studentId)
            ->with('admissionExam.course:id,school_id')
            ->get()
            ->map(fn ($registration) => $registration->admissionExam?->course?->school_id);

        return $fromEnrollments->merge($fromExams)->filter()->unique()->values();
    }

    private function format(SchoolEvent $event, ?SchoolEventRegistration $registration): array
    {
        $price = (float) $event->price;
        $paid = $registration?->status === SchoolEventRegistration::STATUS_PAID;
        $registered = $registration !== null;

        return [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'location' => $event->location,
            'starts_at' => $event->starts_at?->toIso8601String(),
            'ends_at' => $event->ends_at?->toIso8601String(),
            'price' => $price,
            'is_free' => $price <= 0,
            'registered' => $registered,
            'paid' => $paid || ($price <= 0 && $registered),
        ];
    }
}
