<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBloodRequestRequest;
use App\Models\BloodRequest;

class BloodRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bloodRequests = BloodRequest::where('user_id', auth()->user()->id)->get();
        return response()->json($bloodRequests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBloodRequestRequest $request)
    {
        $attributes = $request->validated();
        $attributes['user_id'] = auth()->user()->id;
        $bloodRequest = BloodRequest::create($attributes);
        return response()->json($bloodRequest, 201);
    }

    /**
     * Close the specified blood request.
     */
    public function close(BloodRequest $bloodRequest)
    {
        $bloodRequest->update(['status' => 'closed']);
        return response()->json($bloodRequest);
    }

    /**
     * Open the specified blood request.
     */
    public function open(BloodRequest $bloodRequest)
    {
        $bloodRequest->update(['status' => 'open']);
        return response()->json($bloodRequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BloodRequest $bloodRequest)
    {
        $bloodRequest->delete();
        return response()->json(null, 204);
    }
}
