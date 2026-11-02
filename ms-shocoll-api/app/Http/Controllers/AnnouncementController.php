<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'title' => "{$req}|string|max:255",
            'body' => "{$req}|string",
            'audience' => 'sometimes|in:all,students,teachers,staff',
            'is_published' => 'sometimes|boolean',
            'published_at' => 'nullable|date',
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $query = Announcement::where('school_id', $request->user()->id);

        if ($request->filled('audience')) {
            $query->where('audience', $request->audience);
        }
        if ($request->filled('is_published')) {
            $query->where('is_published', filter_var($request->is_published, FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json([
            'status' => 'success',
            'announcements' => $query->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::where('school_id', $request->user()->id)->findOrFail($id);

        return response()->json(['status' => 'success', 'announcement' => $announcement]);
    }

    public function store(Request $request): JsonResponse
    {
        $school = $request->user();
        $data = $this->validated($request, $this->rules());

        if (!empty($data['is_published']) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $announcement = Announcement::create($data + [
            'school_id' => $school->id,
            'created_by' => $school->id,
        ]);

        $this->logActivity($request, 'announcement.created', 'announcement', $announcement->id, [
            'title' => $announcement->title,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comunicado criado com sucesso',
            'announcement' => $announcement->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::where('school_id', $request->user()->id)->findOrFail($id);

        $data = $this->validated($request, $this->rules(true));

        // Primeira publicação define published_at
        if (!empty($data['is_published']) && !$announcement->published_at && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $announcement->update($data);

        $this->logActivity($request, 'announcement.updated', 'announcement', $announcement->id, [
            'title' => $announcement->title,
            'is_published' => $announcement->is_published,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comunicado atualizado com sucesso',
            'announcement' => $announcement->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $announcement = Announcement::where('school_id', $request->user()->id)->findOrFail($id);
        $announcement->delete();

        $this->logActivity($request, 'announcement.deleted', 'announcement', $id, [
            'title' => $announcement->title,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comunicado removido com sucesso',
        ]);
    }
}
