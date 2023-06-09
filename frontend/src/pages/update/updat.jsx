import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Update = () => {
     const [data, setData]= useState([]);
     const [image, setImage]= useState();
     const [title, setTitle]= useState();
     const [description, setDescription]= useState();
     const navigate = useNavigate();
     const {id} = useParams();
    

     useEffect(()=>{
          const handleData = async()=>{
              await axios.get(`/api/blog/edit/${id}`)
              .then(res => {
                   setData(res.data);
                   setImage(res.data.image)
                   setTitle(res.data.title)
                   setDescription(res.data.description)
              })
          }
          handleData()
     },[])
     const handleSubmit = async(e) => {
          e.preventDefault()
          let formData = new FormData()
          formData.append("image" , image)
          formData.append("title" , title)
          formData.append("description" , description)
          await axios.post(`/api/blog/update/${id}` , formData)
          .then(res => {
               if(res.data.status === 200){
                    Swal.fire({
                        icon : "success",
                        title : "تبریک میگم",
                        text : res.data.message,
                        showConfirmButton: true,
                        confirmButtonText: "پست با موفقیت آپدیت شد",
                        timer : 5000
                   })
               navigate("/blog/myblog")
               }
          }).catch((err)=>{
               console.log(err);
          })
     }

  return (
     <div className='blog-post'>
         <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center">
              <div className="post-title text-center">
                   <h2 className="mb-5 mt-5 fw-bold fs-1 text-white">ویرایش پست</h2>
              </div>
              <div className="row justify-content-center py-5">
                   <div className="col-lg-4 bg-dark rounded py-3">
                        <div className="post-content">
                             <form onSubmit={handleSubmit} encType="multipart/form-data">
                                  <div className="form-group mt-3">
                                       <label className='mb-2 text-white'>انتخاب عکس</label>
                                       <input 
                                       type="file"
                                        className='form-control mb-1'
                                        name='image'
                                        onChange={(e)=> setImage(e.target.files[0])}
                                        />
                                        <p>
                                             <img
                                              src={`http://localhost:8000/uploads/blog/${data.image}`}
                                              width="150"
                                              className='mt-2'
                                              alt="" /></p>
                                        {/* {
                                             error &&
                                             <small className='text-danger mt-2'>{error.image}</small>
                                        } */}
                                  </div>
                                  <div className="form-group mt-3">
                                       <label className='mb-2 text-white'>عنوان</label>
                                       <input 
                                       type="text"
                                        className='form-control mb-1'
                                        name='title'
                                        defaultValue={data.title}
                                        onChange={(e)=> setTitle(e.target.value)}
                                        />
                                          {/* {
                                             error &&
                                             <small className='text-danger mt-2'>{error.title}</small>
                                        } */}
                                  </div>
                                  <div className="form-group mt-3">
                                       <label className='mb-2 text-white'>متن</label>
                                       <textarea 
                                       className='form-control mb-1'
                                       name='description'
                                       defaultValue={data.description}
                                       onChange={(e)=> setDescription(e.target.value)}
                                       ></textarea>
                                         {/* {
                                             error &&
                                             <small className='text-danger mt-2'>{error.description}</small>
                                        } */}
                                  </div>
                                  <div className="form-group mt-3">
                                       <button className='btn btn-success w-100 mt-4' type='submit'>ارسال پست</button>
                                  </div>
                             </form>
                        </div>
                   </div>
              </div>
         </div>
    </div>
  )
}

export default Update