<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::middleware(['auth:sanctum'])->group(function () {
//    Route::get('/checkingAuthenticated', function (){
//        return response()->json(['message'=>'You are in', 'status'=>200],200);
//    });

Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);


Route::post('blog',[\App\Http\Controllers\BlogController::class, 'store']);
Route::get('/view-blog',[\App\Http\Controllers\BlogController::class, 'index']);
Route::get('/detail-blog/{id}',[\App\Http\Controllers\BlogController::class, 'detailBlog']);
Route::delete('/blog/{id}', [\App\Http\Controllers\BlogController::class, 'destroy']);
Route::post('/blog/update/{id}', [\App\Http\Controllers\BlogController::class, 'update']);
Route::get('/blog/edit/{id}', [\App\Http\Controllers\BlogController::class, 'edit']);
Route::get('/search/{key}', [\App\Http\Controllers\BlogController::class, 'search']);

//myBlog
Route::get('/blog/{id}', [\App\Http\Controllers\BlogController::class, 'userId']);


//comment
Route::post('/comment', [\App\Http\Controllers\CommentController::class, 'store']);
Route::get('/comment-view/{id}', [\App\Http\Controllers\CommentController::class, 'index']);

