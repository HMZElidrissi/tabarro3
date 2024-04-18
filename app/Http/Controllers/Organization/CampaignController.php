<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Models\Campaign;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class CampaignController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            abort_if(Gate::denies('manage-campaigns'), Response::HTTP_FORBIDDEN, '403 Forbidden');
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $campaigns = Campaign::where('organization_id', auth()->user()->id)->orderBy('id', 'desc')->get();
        return response()->json($campaigns);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCampaignRequest $request)
    {
        $attributes = $request->validated();
        $attributes['organization_id'] = auth()->user()->id;
        $campaign = Campaign::create($attributes);
        return response()->json($campaign, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        $attributes = $request->validated();
        $campaign->update($attributes);
        return response()->json($campaign);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();
        return response()->json(null, 204);
    }

    /**
     * Display the participants of the specified campaign.
     */
    public function participants(Campaign $campaign)
    {
        $participants = $campaign->participants;
        return response()->json($participants);
    }
}
