<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($id)
    {
        $comment = Comment::with('user')->where('blog_id', $id)->get();
        return $comment;
    }

    public function store(Request $request)
    {
        Comment::create([
            'description' => $request->description,
            'user_id' => $request->user_id,
            'blog_id' => $request->blog_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'نظر با موفقیت ارسال شد.'
        ]);
    }
}
