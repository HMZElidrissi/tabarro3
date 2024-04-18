<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateParticipantRequest;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class ParticipantController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            abort_if(Gate::denies('manage-participants'), Response::HTTP_FORBIDDEN, '403 Forbidden');
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = User::participants()->get();
        return response()->json($participants);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $participant)
    {
        return response()->json($participant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParticipantRequest $request, User $participant)
    {
        $attributes = $request->validated();
        $participant->update($attributes);
        return response()->json($participant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $participant)
    {
        $participant->delete();
        return response()->json(null, 204);
    }
}
