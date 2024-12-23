import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useBuyer = () => {
    const axiosSecure= useAxiosSecure()
    const {user}= useAuth()
    const {data: isBuyer, isPending: isBuyerLoading}= useQuery({
     queryKey: [user?.email, "isBuyer"],
     queryFn: async()=>{
         const res= await axiosSecure.get(`/user/buyer/${user?.email}`)
         console.log(res.data)
         return res.data?.buyer
     }
    })
    return [isBuyer,isBuyerLoading]
};

export default useBuyer;