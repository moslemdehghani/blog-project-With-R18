import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillEmojiNeutralFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import swal from "sweetalert2";
import "./myBlog.css";
const MyBlog = () => {

     const [data, setData] = useState([]);
     useEffect(()=> {
          loadData()
     }, [])

     const handleDelete = async(id)=> {
          await axios.delete(`/api/blog/${id}`)
          .then(res => {
               if(res.data.status === 200){
                    swal.fire({
                         icon: "success",
                         title: "تبریک میگم!",
                         text: res.data.message,
                         showConfirmButton: true,
                         confirmButtonText: "تایید!",
                         timer: 5000,
                       });
                       loadData()
               }
          })
     }

     const loadData = async ()=> {
          let id = JSON.parse(localStorage.getItem("user_id"));
          await axios.get("/api/blog/"+id)
          .then(res => {
               setData(res.data)
          })
     }

  return (
     <div className='home'>
     <div className="home-img"></div>
     <div className="container py-5">
          <h1 className="fw-bold home-title">از همه جا با ما باش</h1>
          <div className="row mt-5">
             {
                  data.map(post => {
                       return (
                          <div className="col-lg-4 col-md-6 mt-4" key={post.id}>
                          <div className="blog-item shadow">
                               <div className="blog-item-img">
                               <img src={`http://localhost:8000/uploads/blog/${post.image}`} alt="" className='w-100 blog-img' />
                              <div className="blog-tool">
                                 
                                   <span className='edit'>
                                        <Link to={"/blog/update/"+post.id}>
                                        <BsFillEmojiLaughingFill />
                                        </Link>
                                   </span>
                                   <span className='trash' onClick={()=> handleDelete(post.id)}>
                                        <BsFillEmojiNeutralFill />
                                   </span>
                              </div>
                               </div>
                               <div className="blog-item-text p-3">
                                    <div className="author border-bottm pb-2">
                                         <h6 className='fw-bold'>{post.title}</h6>
                                         <small className='fw-bold text-muted'>نویسنده :  {post.user.name}</small>
                                    </div>
                                    <Link className='btn btn-dark d-block w-100 mt-4' to={`/blogdetails/${post.id}`}>مشاهده</Link>
                               </div>
                          </div>
                     </div>
                       )
                  })
             }
          </div>
     </div>
</div>
  )
}

export default MyBlog