import React, { useState } from 'react'
import './auth.css';
import axios from "axios";
import Swal from "sweetalert2"
import {useNavigate} from 'react-router-dom'
const Register = () => {
     const [name , setName] = useState("");
     const [email , setEmail] = useState("");
     const [password , setPassword] = useState("");
     const [error , setError] = useState([]);
     const navigate = useNavigate();

     const handleSubmit = async(e) => {
          e.preventDefault()
          const data = {
               name ,
               email,
               password
          }

          await axios.post("/api/register",data)
               .then(res => {
                    if(res.data.status === 200){
                         Swal.fire({
                              icon : "success",
                              title : "تبریک میگم",
                              text : res.data.message,
                              showConfirmButton: true,
                              confirmButtonText: "تایید کن",
                              timer : 5000
                         })
                         navigate("/login")
                    }else{
                         setError(res.data.validation_errors)
                    }
               console.log(res);
                    
               })
               .catch(err => {
                    console.log(err);
               })



     }
  return (
    <div className="auth register">
         <div className="container">
              <div className="row align-items-center min-vh-100 auth-res">
                   <div className="col-lg-4 col-md-6 bg-dark py-4 rounded">
                        <div className="text-center text-white">
                             <h2 className="fw-bold mb-5 auth-title">
                                  ثبت نام کنید
                             </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                             <div className="form-group mt-3">
                                  <label htmlFor="" className="text-white mb-2">نام شما</label>
                                  <input type="text" className="form-control"
                                  name="name"
                                  onChange={(e)=> setName(e.target.value)}
                                  />
                                  {
                                   error && <small className='text-danger mt-4'>{error.name}</small>
                                  }
                             </div>
                             <div className="form-group mt-3">
                                  <label htmlFor="" className="text-white mb-2">ایمیل</label>
                                  <input type="email" className="form-control"
                                  name="email"
                                  onChange={(e)=> setEmail(e.target.value)}
                                  />
                                  {
                                   error && <small className='text-danger mt-4'>{error.email}</small>
                                  }
                             </div>
                             <div className="form-group mt-3">
                                  <label htmlFor="" className="text-white mb-2">پسوورد</label>
                                  <input type="password" className="form-control"
                                  name="password"
                                  onChange={(e)=> setPassword(e.target.value)}
                                   />
                                   {
                                   error && <small className='text-danger mt-4'>{error.password}</small>
                                  }
                             </div>
                             <div className="form-group mt-4">
                                  <button type='submit' className="btn btn-success w-100">ثبت نام</button>
                             </div>
                        </form>
                   </div>
              </div>
         </div>
    </div>
  )
}

export default Register