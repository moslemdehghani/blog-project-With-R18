import Navbar from "./components/navbar/Navbar";
import Login from "./components/auth/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from "./components/auth/Register";
import axios from "axios";
import Create from "./components/blog/creat";
import Home from "./pages/Home";
import BlogDetails from "./components/blogDetail/blogDetail";
import MyBlog from "./pages/myBlog/myBlog";
import Update from "./pages/update/updat";
import AuthCheck from "./components/authCheck/authCheck";
import Search from "./pages/serach/search";
import Protected from "./components/authCheck/Protected";
import PageNotFound from "./components/pagNotFound/pageNotFound";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept" ]= "application/json";
axios.defaults.withCredentials = true ;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthCheck />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Protected />}>
        <Route path="/create" element={<Create />} />
        <Route path="/blog/myblog" element={<MyBlog />} />
        <Route path="/blog/update/:id" element={<Update />} />
      </Route>
        
        <Route path="/search" element={<Search />} />
        <Route path="/blogdetail/:id" element={<BlogDetails />} />
        <Route path="+" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
