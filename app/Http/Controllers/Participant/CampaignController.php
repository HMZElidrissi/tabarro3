<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Campaign;

class CampaignController extends Controller
{
    public function participate(Campaign $campaign)
    {
        $campaign->participants()->attach(auth()->user()->id);
        return response()->json($campaign);
    }
}
