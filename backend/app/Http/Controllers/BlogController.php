<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index(){
        $blog = Blog::with('user')->orderBy('id', 'desc')->get();

        return response()->json([
            'status'=>200,
            'blog'=>$blog,
        ]);
    }

    public function userId($user_id){
        return Blog::with('user')->where("user_id", 'like', '%'.$user_id.'%')->get();
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(),[

            'title'=>'required|max:200',
            'description'=>'required|max:2000',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{
            $blog = new Blog;
            $blog->title = $request->input('title');
            $blog->description = $request->input('description');
            $blog->user_id = $request->input('user_id');
            if($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().".".$extension;
                $file->move('uploads/blog/',$filename);
                $blog->image = $filename;
            }
            $blog->save();
            return response()->json([
                'status'=>200,
                'message'=>'پست با موفقیت افزوده شد',
            ]);

        }
    }

    public function detailBlog($id){
        $blog = Blog::with('user')->findOrFail($id);
//        $comment = Comment::with('user')->where('blog_id', $id)->get();
        return response()->json([
            'blog'=>$blog,
//            'comment'=>$comment
        ]);
    }


    public function edit($id){
        $blog = Blog::findOrFail($id);
        return $blog;
    }


    public function update(Request $request,$id){

        $validator = Validator::make($request->all(),[
            'title'=>'required|max:200',
            'description'=>'required|max:2000',
//            'image'=>'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{
            $blog = Blog::findOrFail($id);

            $file = $request->file('image');
            $image = '';
            if(!empty($file)){
                if(file_exists('uploads/blog/'.$blog->image)){
                    unlink('uploads/blog/'.$blog->image);
                }
                $image= time().".".$file->getClientOriginalExtension();
                $file->move('uploads/blog',$image);
            }else{
                $image=$blog->image;
            }


            $blog->update([
                'title'=> $request->title,
                'description'=>$request->description,
                'image'=>$image,
            ]);
            return response()->json([
                'status'=>200,
                'message'=>'پست با موفقیت افزوده شد',
            ]);

        }
    }


    public function destroy($id){
        $blog = Blog::findOrFail($id);
        $blogImage = $blog->image;
        if(file_exists('uploads/blog/'.$blogImage)){
            unlink('uploads/blog/'.$blogImage);
        }
        $blog->destroy($id);
        return response()->json([
            'status'=> 200,
            'message'=> 'پست شما با موفقیت حذف شد.'
        ]);
    }


    public function search($key){
        return Blog::with('user')->where('title','Like',"%$key%")->get();
    }
}
