<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('manage-participants', function ($user) {
            return $user->role === User::ROLE_ADMIN;
        });

        Gate::define('manage-organizations', function ($user) {
            return $user->role === User::ROLE_ADMIN;
        });

        Gate::define('manage-campaigns', function ($user) {
            return $user->role === User::ROLE_ORGANIZATION;
        });

        Gate::define('view-statistics', function ($user) {
            return in_array($user->role, [User::ROLE_ADMIN, User::ROLE_ORGANIZATION]);
        });

        Gate::define('manage-blood-requests', function ($user) {
            return $user->role === User::ROLE_PARTICIPANT;
        });

        Gate::define('participate-in-campaign', function ($user) {
            return $user->role === User::ROLE_PARTICIPANT;
        });

        $this->registerPolicies();
    }
}
