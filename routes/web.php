<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SearchController;

Route::get('/', function () {
    return Inertia::render('Welcome', []);
});

Route::post('/api/search', [SearchController::class, 'search']);
Route::get('/api/history', [SearchController::class, 'getHistory']);

require __DIR__ . '/auth.php';
