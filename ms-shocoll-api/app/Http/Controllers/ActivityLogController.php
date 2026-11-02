<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ActivityLog::where('school_id', $request->user()->id);

        foreach (['action', 'entity_type', 'entity_id', 'actor_id'] as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('created_at', '<=', $request->to);
        }

        $limit = min(max((int) $request->input('limit', 100), 1), 500);

        return response()->json([
            'status' => 'success',
            'activity_logs' => $query->orderBy('created_at', 'desc')->limit($limit)->get(),
        ]);
    }
}
