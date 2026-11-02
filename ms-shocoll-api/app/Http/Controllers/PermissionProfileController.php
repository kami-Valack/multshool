<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\SchoolPermissionProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionProfileController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'name' => "{$req}|string|max:255",
            'description' => 'nullable|string',
            'permissions' => "{$req}|array",
            'permissions.*' => 'string|max:100',
        ];
    }

    /**
     * Perfis predefinidos criados na primeira listagem.
     */
    private function defaultProfiles(): array
    {
        return [
            [
                'name' => 'Administrador',
                'description' => 'Acesso total ao sistema',
                'permissions' => ['*'],
            ],
            [
                'name' => 'Financeiro',
                'description' => 'Gestão financeira (propinas, pagamentos, faturas)',
                'permissions' => ['finance.*'],
            ],
            [
                'name' => 'Secretaria',
                'description' => 'Gestão de alunos, matrículas e comunicados',
                'permissions' => ['students.*', 'enrollments.*', 'announcements.*'],
            ],
        ];
    }

    private function seedDefaults(string $schoolId): void
    {
        foreach ($this->defaultProfiles() as $profile) {
            SchoolPermissionProfile::create($profile + [
                'school_id' => $schoolId,
                'is_system' => true,
            ]);
        }
    }

    public function index(Request $request): JsonResponse
    {
        $schoolId = $request->user()->id;

        if (!SchoolPermissionProfile::where('school_id', $schoolId)->exists()) {
            $this->seedDefaults($schoolId);
        }

        return response()->json([
            'status' => 'success',
            'permission_profiles' => SchoolPermissionProfile::where('school_id', $schoolId)
                ->orderByDesc('is_system')
                ->orderBy('created_at')
                ->get(),
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $profile = SchoolPermissionProfile::where('school_id', $request->user()->id)->findOrFail($id);

        return response()->json(['status' => 'success', 'permission_profile' => $profile]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, $this->rules());

        $profile = SchoolPermissionProfile::create($data + [
            'school_id' => $request->user()->id,
            'is_system' => false,
        ]);

        $this->logActivity($request, 'permission_profile.created', 'permission_profile', $profile->id, [
            'name' => $profile->name,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Perfil de permissões criado com sucesso',
            'permission_profile' => $profile->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $profile = SchoolPermissionProfile::where('school_id', $request->user()->id)->findOrFail($id);

        $profile->update($this->validated($request, $this->rules(true)));

        $this->logActivity($request, 'permission_profile.updated', 'permission_profile', $profile->id, [
            'name' => $profile->name,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Perfil de permissões atualizado com sucesso',
            'permission_profile' => $profile->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $profile = SchoolPermissionProfile::where('school_id', $request->user()->id)->findOrFail($id);

        if ($profile->is_system) {
            return response()->json([
                'status' => 'error',
                'message' => 'Perfis de sistema não podem ser removidos',
            ], 403);
        }

        $profile->delete();

        $this->logActivity($request, 'permission_profile.deleted', 'permission_profile', $id, [
            'name' => $profile->name,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Perfil de permissões removido com sucesso',
        ]);
    }
}
