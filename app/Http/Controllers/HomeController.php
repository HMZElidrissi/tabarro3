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
        $bloodRequests = BloodRequest::with('user')
            ->where('status', 'open')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($bloodRequests);
    }

    public function searchCampaigns(Request $request)
    {
        $campaigns = Campaign::with('organization')
            ->where('end_time', '>', now())
            ->where(function ($query) use ($request) {
                $query->where('location', 'ILIKE', "%$request->search%")
                    ->orWhere('description', 'ILIKE', "%$request->search%");
            })
            ->orderBy('start_time', 'desc')
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
            $campaignWithMostParticipants = Campaign::where('organization_id', $userId)
                ->withCount('participants')
                ->orderBy('participants_count', 'desc')
                ->first();

            $campaignWithMostParticipantsName = $campaignWithMostParticipants ? $campaignWithMostParticipants->name : 'No campaign found';

            $campaignWithLeastParticipants = Campaign::where('organization_id', $userId)
                ->withCount('participants')
                ->orderBy('participants_count', 'asc')
                ->first();

            $campaignWithLeastParticipantsName = $campaignWithLeastParticipants ? $campaignWithLeastParticipants->name : 'No campaign found';
            return response()->json([
                'campaigns' => $numberOfCampaigns,
                'most_participated_campaign' => $campaignWithMostParticipantsName,
                'least_participated_campaign' => $campaignWithLeastParticipantsName,
            ]);
        }
    }

    public function campaigns()
    {
        $campaigns = Campaign::with('organization')
            ->where('end_time', '>', now())
            ->orderBy('start_time', 'desc')
            ->get();
        if (auth()->user()) {
            $campaigns = $campaigns->map(function ($campaign) {
                $campaign->is_participating = $campaign->participants->contains(auth()->user());
                return $campaign;
            });
        }
        return response()->json($campaigns);
    }
}
