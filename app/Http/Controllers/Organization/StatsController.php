<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        $numberOfCampaigns = auth()->user()->campaigns()->count();
        return response()->json([
            'campaigns' => $numberOfCampaigns,
        ]);
    }
}
