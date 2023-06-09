import React, { useState } from 'react'
import './auth.css';
import axios from "axios";
import Swal from "sweetalert2"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
const Login = () => {
     const navigate = useNavigate()
     const [email , setEmail] = useState("")
     const [password ,setPassword] = useState("")
     const [error , setError] = useState([]);


     const handleSubmit = async(e) => {
          e.preventDefault()
          const data = {
               email,
               password
          }
         await axios.get("/sanctum/csrf-cookie").then (respons => {
          axios.post ("/api/login" , data)
          .then(res => {
               if(res.data.status === 200){
                    Cookies.set("Cookie" , res.data.token);
                    localStorage.setItem("user_name", res.data.username);
                    localStorage.setItem("user_id", res.data.user_id);
                    Swal.fire({
                         icon : "success",
                         title : "تبریک میگم",
                         text : res.data.message,
                         showConfirmButton: true,
                         confirmButtonText: "تایید کن",
                         timer : 5000
                    })
                    navigate("/")
               }
               else if(res.data.status === 401){
                    Swal.fire({
                         icon : "warning",
                         title : "خطا دارید ",
                         text : res.data.message,
                         showConfirmButton: true,
                         confirmButtonText: "تایید کن",
                         timer : 5000
                    })
               }
               else{
                    setError(res.data.validation_errors)
               }
          })
          .catch(err => {
               console.log(err);
          })

          })
     }

  return (
     <div className="auth login">
         <div className="container">
              <div className="row align-items-center min-vh-100 auth-res">
                   <div className="col-lg-4 col-md-6 bg-dark py-4 rounded">
                        <div className="text-center text-white">
                             <h2 className="fw-bold mb-5 auth-title">
                                 ورود به حساب کاربری
                             </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                             <div className="form-group mt-3">
                                  <label htmlFor="" className="text-white mb-2">ایمیل شما</label>
                                  <input type="text" className="form-control"
                                  name="email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  />
                                   {
                                   error && <small className='text-danger mt-4'>{error.email}</small>
                                  } 
                             </div>
                         
                             <div className="form-group mt-3">
                                  <label htmlFor="" className="text-white mb-2">پسوورد</label>
                                  <input type="password" className="form-control"
                                  name="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  />
                                   {
                                   error && <small className='text-danger mt-4'>{error.password}</small>
                                  }
                             </div>
                             <div className="form-group mt-4">
                                  <button type='submit' className="btn btn-success w-100">ورود</button>
                             </div>
                        </form>
                   </div>
              </div>
         </div>
    </div>
  )
}

export default Login