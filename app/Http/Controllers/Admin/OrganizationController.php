<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class OrganizationController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            abort_if(Gate::denies('manage-organizations'), Response::HTTP_FORBIDDEN, '403 Forbidden');
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organisations = User::organizations()
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($organisations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request)
    {
        $attributes = $request->validated();
        $attributes['role'] = User::ROLE_ORGANIZATION;
        $user = User::create($attributes);
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $organization)
    {
        $organization->load('campaigns');
        return response()->json($organization);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizationRequest $request, User $organization)
    {
        $attributes = $request->validated();
        $organization->update($attributes);
        return response()->json($organization);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $organization)
    {
        $organization->delete();
        return response()->json(null, 204);
    }
}
