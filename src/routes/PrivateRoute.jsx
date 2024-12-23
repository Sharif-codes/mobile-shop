import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import spinner from "../components/spinner/spinner"
import toast from "react-hot-toast";

const PrivateRoute = ({children}) => {
    const {user,loading}= useAuth()
    const location= useLocation()
    if (loading) {
        
        return spinner
        
    }
    if(!user){
        toast.error("you have to login first!")
    }
    if(user)
    {
        return children
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;