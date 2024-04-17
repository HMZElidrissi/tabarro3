<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Notifications\CampaignParticipationNotification;

class CampaignController extends Controller
{
    public function participate(Campaign $campaign)
    {
        $campaign->participants()->attach(auth()->user()->id);
        $participant = auth()->user();
        $organization = $campaign->organization;
        $organization->notify(new CampaignParticipationNotification($participant, $campaign));
        return response()->json($campaign);
    }
}
