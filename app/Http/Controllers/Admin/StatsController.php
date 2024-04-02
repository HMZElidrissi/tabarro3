<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        $numberOfParticipants = User::participants()->count();
        $numberOfOrganizations = User::organizations()->count();
        $numberOfCampaigns = Campaign::all()->count();
        return response()->json([
            'participants' => $numberOfParticipants,
            'organizations' => $numberOfOrganizations,
            'campaigns' => $numberOfCampaigns,
        ]);
    }
}
