<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\SchoolEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SchoolEventController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'title' => "{$req}|string|max:255",
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'starts_at' => "{$req}|date",
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'price' => 'sometimes|numeric|min:0',
            'is_published' => 'sometimes|boolean',
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $events = SchoolEvent::where('school_id', $request->user()->id)
            ->withCount('registrations')
            ->orderBy('starts_at')
            ->get();

        return response()->json([
            'status' => 'success',
            'events' => $events,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, $this->rules());
        $event = SchoolEvent::create($data + [
            'school_id' => $request->user()->id,
            'price' => $data['price'] ?? 0,
            'is_published' => $data['is_published'] ?? true,
        ]);

        $this->logActivity($request, 'event.created', 'school_event', $event->id, [
            'title' => $event->title,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Evento criado',
            'event' => $event,
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $event = SchoolEvent::where('school_id', $request->user()->id)->findOrFail($id);
        $event->update($this->validated($request, $this->rules(true)));

        return response()->json([
            'status' => 'success',
            'event' => $event->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $event = SchoolEvent::where('school_id', $request->user()->id)->findOrFail($id);
        $event->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Evento eliminado',
        ]);
    }
}
