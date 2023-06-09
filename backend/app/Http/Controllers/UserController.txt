<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(),
            [
                'name' => 'required|max:200',
                'email' => 'required|email|max:200|unique:users,email',
                'password' => 'required|min:8',
            ]);
        if ($validation->fails()) {
            return response()->json([
                'validation_errors' => $validation->messages(),
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            return response()->json([
                'status' => 200,
                'user_id' => $user->id,
                'email' => $user->email,
                'message' => 'ٍثبت نام شما با موفقیت انجام شد.'
            ]);
        }

    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),

            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=> 401,
                    'message'=>'ایمیل یا پسوورد صحیح نیست'
                ]);
            } else {
                if ($user->is_Admin == 1) {
                    $role = 'مدیر';
                } else {
                    $role = '';
                }
                return response()->json([
                    'status' => 200,
                    'email' => $user->email,
                    'user_id'=> $user->id,
                    'message' => 'ٍورود با موفقیت انجام شد.',
                    'is_Admin' => $role,
                ]);
            }
        }
    }
}
