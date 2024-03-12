<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SubscriptionPlanController;
use App\Http\Controllers\ThankYouController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// website
Route::get('/', [HomeController::class, 'render']);
Route::get('/pricing', [PricingController::class, 'render']);

Route::middleware('guest')->group(function () {
    // login
    Route::get('/login', [LoginController::class, 'render']);
    Route::post('/login', [LoginController::class, 'handleLogin']);

    // registration
    Route::get('/register', [RegisterController::class, 'render']);
    Route::post('/register', [RegisterController::class, 'handleRegister']);
});

Route::middleware('auth')->group(function () {
    // logout
    Route::post('/logout', [LogoutController::class, 'handleLogout']);

    // subscription
    Route::get('/select-plan', [SubscriptionPlanController::class, 'render']);
    Route::get('/select-plan/{plan:key}/checkout', [SubscriptionPlanController::class, 'handleCheckout']);
    Route::post('/select-plan/{plan:key}/checkout', [SubscriptionPlanController::class, 'handleCheckout']);

    // thank you
    Route::get('/thank-you', [ThankYouController::class, 'render']);

    // app
    Route::post('/apps', [AppController::class, 'handleCreate']);
    Route::get('/apps', [AppController::class, 'renderIndex']);
    Route::put('/app/{app:slug}', [AppController::class, 'handleUpdate']);
    Route::get('/app/{app:slug}', [AppController::class, 'renderShow']);

    // content
    Route::post('/app/{app:slug}/content', [ContentController::class, 'handleCreate']);
    Route::get('/app/{app:slug}/content', [ContentController::class, 'renderIndex']);
    Route::get('/app/{app:slug}/content/{content:slug}', [ContentController::class, 'renderShow']);
    Route::post('/app/{app:slug}/content/{content:slug}/change', [ContentController::class, '¨handleChange']);
});

