<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Organization\CampaignController;
use App\Http\Controllers\Admin\OrganizationController;
use App\Http\Controllers\Admin\ParticipantController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::controller(CampaignController::class)->group(function () {
    Route::get('campaigns', 'index');
    Route::post('campaigns', 'store');
    Route::get('campaigns/{campaign}', 'show');
    Route::put('campaigns/{campaign}', 'update');
    Route::delete('campaigns/{campaign}', 'destroy');
});

Route::controller(OrganizationController::class)->group(function () {
    Route::get('organizations', 'index');
    Route::post('organizations', 'store');
    Route::get('organizations/{organization}', 'show');
    Route::put('organizations/{organization}', 'update');
    Route::delete('organizations/{organization}', 'destroy');
});

Route::controller(ParticipantController::class)->group(function () {
    Route::get('participants', 'index');
    Route::post('participants', 'store');
    Route::get('participants/{participant}', 'show');
    Route::put('participants/{participant}', 'update');
    Route::delete('participants/{participant}', 'destroy');
});
