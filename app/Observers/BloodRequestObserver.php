<?php

namespace App\Observers;

use App\Models\BloodRequest;
use App\Models\User;
use App\Notifications\UrgentBloodRequestNotification;
use Illuminate\Support\Facades\Notification;

class BloodRequestObserver
{
    /**
     * Handle the BloodRequest "created" event.
     */
    public function created(BloodRequest $bloodRequest): void
    {
        $blood_group = $bloodRequest->blood_group;
        $city = $bloodRequest->city;

        // Queue the job to send notifications
        dispatch(function () use ($blood_group, $city, $bloodRequest) {
            $users = User::where('blood_group', $blood_group)
                ->where('city', $city)
                ->get();

            Notification::send($users, new UrgentBloodRequestNotification($bloodRequest));
        })->onQueue('notifications');
    }
}
