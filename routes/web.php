<?php

use App\Http\Controllers\AppContentController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\HomeController;
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

// app
Route::get('/app', [AppController::class, 'render']);
Route::post('/app', [AppController::class, 'submit']);

Route::get('/app/{app:slug}', [AppContentController::class, 'render']);
Route::post('/app/{app:slug}/content', [AppContentController::class, 'submit']);

