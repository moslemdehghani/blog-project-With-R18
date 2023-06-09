import { Navigate, Outlet } from "react-router-dom";

const AuthCheck = () => {
    return localStorage.getItem("user_id") ? <Navigate to="/" /> : <Outlet />
}
 
export default AuthCheck;