<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Auth;
// use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
// use App\Models\User;
// use Illuminate\Foundation\Auth\User;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    // use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    // public function login(LoginRequest $request)
    // {

    //     $credentials = $request->validated();
    //     if (!Auth::attempt($credentials)) {
    //         return response([
    //             'message' => 'Provided email or password is incorrect'
    //         ], 422);
    //     }
    //     $user = Auth::user();
    //     $token = $user->createToken('main')->plainTextToken;
    //     return response(compact('user', 'token'));
    // }

    // public function signup(SignupRequest $request)
    // {
    //     $data = $request->validated();
    //     $user = User::create([
    //         'name' => $data['name'],
    //         'email' => $data['email'],
    //         'password' => bcrypt($data['password'])
    //     ]);
    //     $token = $user->createToken('main')->plainTextToken;
    //     return  response(compact('user', 'token'));
    // }

    // public function logout(Request $request)
    // {
    //     /** @var User $user */
    //     $user = $request->user();
    //     $user->currentAccessToken()->delete();
    //     // return ($user);
    //     return response('', 204);
    // }
}