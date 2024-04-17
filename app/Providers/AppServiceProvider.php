<?php

namespace App\Providers;

use App\Models\BloodRequest;
use App\Observers\BloodRequestObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        BloodRequest::observe(BloodRequestObserver::class);
    }
}
