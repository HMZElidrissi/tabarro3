<?php

namespace App\Observers;

use App\Models\BloodRequest;
use App\Models\User;
use App\Notifications\UrgentBloodRequestNotification;

class BloodRequestObserver
{
    /**
     * Handle the BloodRequest "created" event.
     */
    public function created(BloodRequest $bloodRequest): void
    {
        $blood_group = $bloodRequest->blood_group;
        $city = $bloodRequest->city;
        $users = User::where('blood_group', $blood_group)
            ->where('city', $city)
            ->get();

        foreach ($users as $user) {
            $user->notify(new UrgentBloodRequestNotification($bloodRequest));
        }
    }
}
