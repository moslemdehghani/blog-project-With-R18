import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
    const [data , setData] = useState([])

    async function  SearchBlog(searchValue){
        await axios.get("/api/search/"+searchValue)
        .then(res => {
            setData(res.data)
        })
    }
    
    return ( <>
    <div className="row py-5 justify-content-center">
        <div className="col-lg-4">
            <h4 className="text-center fw-bold border-bottom pb-3">جست و جو کنید</h4>
            <input
             type="text"
              placeholder="متن مورد نظر خود را وارد کنید"
               className="mt-3 form-control"
                onChange={(e) => SearchBlog(e.target.value)}
               />
        </div>
        <div className="col-lg-12 mt-5">
            <div className="row">
               {
                data && data.map((item) => {
                    return(
                        <div className="col-lg-4 col-md-4 mt">
                        <div className="blog-search shadow">
                            <img src={`http://127.0.0.1:8000/uploads/blog/${item.image}`} alt="" className="w-100 blog-img" />
                            <div className="blog-item-text p-3">
                                <div className="author border-bottom pb-2">
                                    <h6 className="fw-bold">{item.title}</h6>
                                    <small className="fw-bold text-muted">{item.user.name}</small>
                                </div>
                                <Link to={`/blogdetail/${item.id}`} className="btn btn-dark d-block w-100 mt-4">مشاهده</Link>
                            </div>
                        </div>
                        </div>
                    )
                })
               }
            </div>
        </div>
    </div>
    </> );
}
 
export default Search;