<?php

namespace App\Http\Controllers;

use App\Models\BloodRequest;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function bloodRequests()
    {
        $bloodRequests = BloodRequest::with('user')->where('status', 'open')->get();
        return response()->json($bloodRequests);
    }

    public function searchCampaigns(Request $request)
    {
        $campaigns = Campaign::with('organization')
            ->where('name', 'ILIKE', "%$request->search%")
            ->orWhere('location', 'ILIKE', "%$request->search%")
            ->orWhere('description', 'ILIKE', "%$request->search%")
            ->get();
        if (auth()->user()) {
            $campaigns = $campaigns->map(function ($campaign) {
                $campaign->is_participating = $campaign->participants->contains(auth()->user());
                return $campaign;
            });
        }
        return response()->json($campaigns);
    }

    public function stats()
    {
        if (auth()->user()->role === User::ROLE_ADMIN) {
            $numberOfParticipants = User::participants()->count();
            $numberOfOrganizations = User::organizations()->count();
            $numberOfCampaigns = Campaign::all()->count();
            return response()->json([
                'participants' => $numberOfParticipants,
                'organizations' => $numberOfOrganizations,
                'campaigns' => $numberOfCampaigns,
            ]);
        } else {
            $userId = auth()->user()->id;
            $numberOfCampaigns = Campaign::where('organization_id', $userId)->count();
            $campaignWithMostParticipants = Campaign::where('organization_id',
                $userId)->withCount('participants')->orderBy('participants_count',
                'desc')->first()->name;
            $campaignWithLeastParticipants = Campaign::where('organization_id',
                $userId)->withCount('participants')->orderBy('participants_count',
                'asc')->first()->name;
            return response()->json([
                'campaigns' => $numberOfCampaigns,
                'most_participated_campaign' => $campaignWithMostParticipants,
                'least_participated_campaign' => $campaignWithLeastParticipants,
            ]);
        }
    }

    public function campaigns()
    {
        $campaigns = Campaign::with('organization')->get();
        if (auth()->user()) {
            $campaigns = $campaigns->map(function ($campaign) {
                $campaign->is_participating = $campaign->participants->contains(auth()->user());
                return $campaign;
            });
        }
        return response()->json($campaigns);
    }
}
