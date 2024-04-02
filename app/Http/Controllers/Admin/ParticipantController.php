<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateParticipantRequest;
use App\Models\User;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = User::participants()->get();
        return response()->json($participants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
