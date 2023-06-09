import { useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./creat"
const Create = () => {
    const [image , setImage] = useState([])
    const [title , setTitle] = useState()
    const [description , setDescription] = useState()
    const [error , setError] = useState([])

    const user_id = localStorage.getItem("user_id")
    const navigate = useNavigate()
    
    const HandleSubmit = async(e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("image" , image)
        formdata.append("title" , title)
        formdata.append("description" , description)
        formdata.append("user_id" , user_id)
        await axios.post("/api/blog" , formdata)
        .then ((res)=>{
            if(res.data.status === 200){
                Swal.fire({
                    icon : "success",
                    title : "تبریک میگم",
                    text : res.data.message,
                    showConfirmButton: true,
                    confirmButtonText: "تایید کن",
                    timer : 5000
               })
               navigate("/")
            }else{
                setError(res.data.errors)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return ( <>
        <div className="blog-post">
            <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center">
                <div className="post-title text-center">
                    <h2 className="mb-5 mt-5 fw-bold fs-1 text-white">حرف دلتو بزن</h2>
                </div>
                <div className="row justift-content-center py-5">
                    <div className="col-lg-4 bg-dark rounded py-">
                        <div className="post-content">
                            <form onSubmit={HandleSubmit} >
                                <div className="form-group mt-3">
                                    <label className="text-white mb-2">انتخاب عکس</label>
                                    <input type="file" className="form-control"  name="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    {
                                      error &&  <small className="text-danger pt-2">{error.image}</small>
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    <label className="text-white mb-2"> عنوان</label>
                                    <input type="text" className="form-control mb-1" 
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {
                                      error &&  <small className="text-danger pt-2">{error.title}</small>
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    <label className="text-white mb-2">متن </label>
                                   <textarea className="form-control mb-1"  cols="30" rows="10"
                                   name="description"
                                   onChange={(e) => setDescription(e.target.value)}
                                   ></textarea>
                                   {
                                      error &&  <small className="text-danger pt-2">{error.description}</small>
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    <button type="submit" className="btn btn-success w-100 mt-4 ">ارسال پست</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default Create;