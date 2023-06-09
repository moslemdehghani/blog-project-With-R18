import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
    return localStorage.getItem("user_id") ? <Outlet /> : <Navigate to="/" />;
}
 
export default Protected;