<?php

namespace App\Http\Controllers;

use App\Models\BloodRequest;
use App\Models\Campaign;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function bloodRequests()
    {
        $bloodRequests = BloodRequest::with('user')->where('status', 'open')->get();
        return response()->json($bloodRequests);
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

    public function searchCampaigns(Request $request)
    {
        $campaigns = Campaign::with('organization')
            ->where('name', 'like', "%$request->search%")
            ->orWhere('location', 'like', "%$request->search%")
            ->orWhere('description', 'like', "%$request->search%")
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
