<?php

use App\Http\Controllers\ContentController;
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
Route::post('/apps', [AppController::class, 'handleCreate']);
Route::get('/apps', [AppController::class, 'renderIndex']);
Route::get('/app', [AppController::class, 'renderShow']);

// content
Route::post('/app/content', [ContentController::class, 'handleCreate']);
Route::get('/app/content', [ContentController::class, 'renderIndex']);
Route::get('/app/content/{id}', [ContentController::class, 'renderShow']);
Route::post('/app/content/{id}/change', [ContentController::class, '¨handleChange']);

