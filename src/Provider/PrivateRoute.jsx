import React, { use } from "react";
import { AuthContex } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
const PrivateRoute = ({children}) =>{
    const {user,loading} = use(AuthContex);
    const location = useLocation();
    if (loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(user && user?.email){
    return children;
    }
    return <Navigate state={location.pathname} to="/auth/Login"></Navigate>

};

export default PrivateRoute;