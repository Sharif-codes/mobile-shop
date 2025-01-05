import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useFeaturedProduct = () => {
    const [allProducts,setAllProducts]= useState([])
    const {user}=useAuth()
    const axiosPublic= useAxiosPublic()
    useEffect(()=>{
            const fetchAllUsers= async ()=>{
            
                    const res= await axiosPublic.get("/getFeaturedProducts")
                    setAllProducts(res?.data)
            }
                
                    fetchAllUsers()
                
        },[user, axiosPublic])
        return allProducts;
};

export default useFeaturedProduct;