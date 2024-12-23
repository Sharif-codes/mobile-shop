import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useUserData = () => {
    const {user,loading}= useAuth();
    const axiosPublic= useAxiosPublic()
    const [userData,setUserData]= useState({})
    useEffect(()=>{
        const fetchUserData= async ()=>{
        
                const res= await axiosPublic.get(`/user/${user?.email}`)
                setUserData(res?.data)
        }
        if(user?.email)
            {
                fetchUserData()
            }
    },[user, loading, axiosPublic])
    return userData;
};

export default useUserData;