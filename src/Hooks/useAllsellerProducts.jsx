import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useAllsellerProducts = () => {
    // const {user,loading}= useAuth();
    // const axiosPublic= useAxiosPublic()
    // const [allProducts,setAllProducts]= useState({})
    // useEffect(()=>{
    //     const fetchSellerProducts= async ()=>{
        
    //             const res= await axiosPublic.get(`/getSellerProducts/${user?.email}`)
    //             setAllProducts(res?.data)
    //     }
    //     if(user?.email)
    //         {
    //             fetchSellerProducts()
    //         }
    // },[user, loading, axiosPublic])
    // return allProducts;

    const axiosPublic= useAxiosPublic()
    const {user}= useAuth()
    const {data: allSellerProducts, isPending: productLoading}= useQuery({
     queryKey: [user?.email, "allProducts"],
     queryFn: async()=>{
         const res= await axiosPublic.get(`/getSellerProducts/${user?.email}`)
         console.log(res.data)
         return res.data
     }
    })
    return [allSellerProducts,productLoading];
};

export default useAllsellerProducts;