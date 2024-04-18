<?php

use App\Http\Controllers\Admin\OrganizationController;
use App\Http\Controllers\Admin\ParticipantController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Organization\CampaignController;
use App\Http\Controllers\Participant\BloodRequestController;
use App\Http\Controllers\Participant\CampaignController as ParticipantCampaignController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('refresh', 'refresh');
    Route::post('logout', 'logout')->middleware('auth:api');
    Route::post('password/email', 'sendPasswordResetLink');
    Route::post('password/reset', 'resetPassword');
});

Route::controller(CampaignController::class)->group(function () {
    Route::get('campaigns', 'index');
    Route::post('campaigns', 'store');
    Route::get('campaigns/{campaign}/participants', 'participants');
    Route::put('campaigns/{campaign}', 'update');
    Route::delete('campaigns/{campaign}', 'destroy');
})->middleware('auth:api');

Route::controller(OrganizationController::class)->group(function () {
    Route::get('organizations', 'index');
    Route::post('organizations', 'store');
    Route::get('organizations/{organization}', 'show');
    Route::put('organizations/{organization}', 'update');
    Route::delete('organizations/{organization}', 'destroy');
})->middleware('auth:api');

Route::controller(ParticipantController::class)->group(function () {
    Route::get('participants', 'index');
    Route::get('participants/{participant}', 'show');
    Route::put('participants/{participant}', 'update');
    Route::delete('participants/{participant}', 'destroy');
})->middleware('auth:api');

Route::controller(BloodRequestController::class)->group(function () {
    Route::get('blood-requests', 'index');
    Route::post('blood-requests', 'store');
    Route::put('blood-requests/{bloodRequest}/open', 'open');
    Route::put('blood-requests/{bloodRequest}/close', 'close');
    Route::delete('blood-requests/{bloodRequest}', 'destroy');
})->middleware('auth:api');

Route::controller(HomeController::class)->group(function () {
    Route::get('blood-requests/all', 'bloodRequests');
    Route::get('campaigns/all', 'campaigns');
    Route::get('campaigns/search', 'searchCampaigns');
    Route::get('stats', 'stats')->middleware('auth:api');
});

Route::controller(ParticipantCampaignController::class)->group(function () {
    Route::post('campaigns/{campaign}/participate', 'participate');
})->middleware('auth:api');
