import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useAllsellerProducts = () => {
    const {user,loading}= useAuth();
    const axiosPublic= useAxiosPublic()
    const [allProducts,setAllProducts]= useState({})
    useEffect(()=>{
        const fetchSellerProducts= async ()=>{
        
                const res= await axiosPublic.get(`/getSellerProducts/${user?.email}`)
                setAllProducts(res?.data)
        }
        if(user?.email)
            {
                fetchSellerProducts()
            }
    },[user, loading, axiosPublic])
    return allProducts;
};

export default useAllsellerProducts;