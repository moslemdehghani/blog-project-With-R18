<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=> 'required|max:200',
            'email'=> 'required|email|max:200|unique:users,email',
            'password'=> 'required|min:8',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'user_id'=>$user->id,
                'token'=>$token,
                'message'=> 'ٍثبت نام شما با موفقیت انجام شد.'
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required',
            'password'=>'required',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'ایمیل یا پسوورد صحیح نیست'
                ]);
            }else{
                if($user->role_as == 1){
                    $role = 'admin';
                    $token =   $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else{
                    $role = '';
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
                }
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'user_id'=>$user->id,
                    'token'=>$token,
                    'message'=> 'ٍورود با موفقیت انجام شد.',
                    'role'=> $role,
                ]);
            }
        }
    }
}
