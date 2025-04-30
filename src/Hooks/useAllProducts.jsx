import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

    const useAllProducts = () => {
        const token= localStorage.getItem('access-token');
        const axiosPublic= useAxiosPublic();
        const {data: allProducts, isPending: productLoading}= useQuery({
         queryKey: ["allProducts"],
         queryFn: async()=>{
             const res= await axiosPublic.get(`/getAllProducts`,null,{
                headers: {
                    authorization: `Bearer ${token}`
                }
             })
             console.log(res.data)
             return res.data;
         }
        })
          return [allProducts,productLoading];
};

export default useAllProducts;