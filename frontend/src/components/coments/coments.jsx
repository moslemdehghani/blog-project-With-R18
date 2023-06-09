import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import "./comment.css"
const Comments = () => {
     const [description, setDescription] = useState("")
     const [comments, setComments] = useState([])

     const reset = () => {
          setDescription("")
     }



     let user_id = JSON.parse(localStorage.getItem("user_id"));
     const { id } = useParams();

     useEffect(() => {
         
          getComment()
     }, [])


     const handleSubmit = async (e) => {
          e.preventDefault();
          const data = {
               description: description,
               blog_id: id,
               user_id: user_id
          }
          await axios.post("/api/comment", data).then(res => {
               if (res.data.status === 200) {
                    swal.fire({
                         icon: "success",
                         title: "تبریک میگم!",
                         text: res.data.message,
                         showConfirmButton: true,
                         confirmButtonText: "تایید!",
                    });
                    reset();
                    getComment()
               }
          }).catch((err)=>{
            console.log(err);
          })
     }

     const getComment = async () => {
          await axios.get("/api/comment-view/" + id)
               .then(res => {
                    setComments(res.data)
               })
     }
     return (
          <div className="comment">
            {
                user_id  ? <form onSubmit={handleSubmit}>
                <textarea name="description"
                     placeholder='نظر شما'
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                ></textarea>
                <button type='submit' className='btn btn-sm btn-success'>ارسال نظر</button>
           </form> : <h4>وارد حساب کاربری خود شوید</h4>
            }
               <div className="bg-white mt-5">
                {
                
                   comments &&  comments.map((comment) => {
                              const {id, user, description} = comment;
                              return (
                                   <div className="p-4 border shadow-sm mt-3" key={id}>
                                        <div className="author d-flex align-item-center">
                                             <small className='text-muted fw-bold mt-2'>{user.name}</small>
                                        </div>
                                        <h6 className='fw-bold mt-4'>{description}</h6>
                                   </div>
                              )
                         })
                         
              }
               </div>

              
          </div>
     )
}

export default Comments