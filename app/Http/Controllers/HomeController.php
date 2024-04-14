<?php

namespace App\Http\Controllers;

use App\Models\BloodRequest;

class HomeController extends Controller
{
    public function bloodRequests()
    {
        $bloodRequests = BloodRequest::with('user')->where('status', 'open')->get();
        return response()->json($bloodRequests);
    }
}
