import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useFeaturedProduct = () => {
    const [allProducts,setAllProducts]= useState([])

    const axiosPublic= useAxiosPublic()
    useEffect(()=>{
            const fetchAllUsers= async ()=>{
            
                    const res= await axiosPublic.get("/getFeaturedProducts")
                    setAllProducts(res?.data)
            }
                
                    fetchAllUsers()
                
        },[axiosPublic])
        return allProducts;
};

export default useFeaturedProduct;