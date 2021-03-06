<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/magic', [OrderController::class, 'create']);
Route::get('/magic', [OrderController::class, 'get']);
Route::patch('/magic', [OrderController::class, 'update']);
Route::delete('/magic/{id}', [OrderController::class, 'delete']);
