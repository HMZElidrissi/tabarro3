<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Notifications\CampaignParticipationNotification;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class CampaignController extends Controller
{
    public function participate(Campaign $campaign)
    {
        abort_if(Gate::denies('participate-in-campaign'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $campaign->participants()->attach(auth()->user()->id);
        $participant = auth()->user();
        $organization = $campaign->organization;
        $organization->notify(new CampaignParticipationNotification($participant, $campaign));
        return response()->json($campaign);
    }
}
