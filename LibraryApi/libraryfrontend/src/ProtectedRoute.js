import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import AuthorizeService from "./Components/Authorization/AuthorizeService";


const ProtectedRoute=({roles})=>{
    //console.log(AuthorizationAccess);
    const [user, setUser] = useState(AuthorizeService.GetAccessToken());
    return roles?.includes((AuthorizeService.GetAccessToken())?.roleName) ?
    <Outlet/> :
        user ?
        <Navigate to="/" replace/>
        :
        <Navigate to="/Authorization/Login" replace/>;
}
export default ProtectedRoute;