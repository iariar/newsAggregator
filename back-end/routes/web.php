<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\Data;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        // var_dump($request);
        return Auth::user(); // Access the authenticated user using Auth facade
    });
    Route::post('/save', [Data::class, 'save']);
});

Route::get('/getArticles', [Data::class, 'fetchArticles']);


Route::get('/', function () {
    return view('welcome');
});

Route::post('/test', function () {
    return "hello";
});
Route::get('/phpinfo', function () {
    phpinfo();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login'])->name('login');