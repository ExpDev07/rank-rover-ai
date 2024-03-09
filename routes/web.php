<?php

use App\Http\Controllers\AppContentController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
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

// login
Route::get('/login', [LoginController::class, 'render']);
Route::post('/login', [LoginController::class, 'submit']);

// registration
Route::get('/register', [RegisterController::class, 'render']);
Route::post('/register', [RegisterController::class, 'render']);

// app
Route::get('/app', [AppController::class, 'render']);
Route::post('/app', [AppController::class, 'submit']);

Route::get('/app/{app:slug}', [AppContentController::class, 'render']);
Route::post('/app/{app:slug}/content', [AppContentController::class, 'submit']);

