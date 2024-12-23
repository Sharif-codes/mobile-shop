import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useAllUser = () => {
  const {user}= useAuth()
    const axiosPublic= useAxiosPublic()
    const [allUsers,setAllUsers]= useState({})
    useEffect(()=>{
        const fetchAllUsers= async ()=>{
        
                const res= await axiosPublic.get("/getAllUser")
                setAllUsers(res?.data)
        }
        if(user?.email)
            {
                fetchAllUsers()
            }
    },[user, axiosPublic])
    return allUsers;
};

export default useAllUser;