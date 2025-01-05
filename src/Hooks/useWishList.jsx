import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useWishList = () => {
    const axiosPublic= useAxiosPublic()
    const {user}= useAuth()
    const {data: wishlist, isPending: wishlistLoading,refetch }= useQuery({
     queryKey: [user?.email, "wishlist"],
     queryFn: async()=>{
         const res= await axiosPublic.get(`/getWishList/${user?.email}`)
         console.log(res.data)
         return res.data
     }
    })
    return [wishlist, wishlistLoading,refetch];
};

export default useWishList;