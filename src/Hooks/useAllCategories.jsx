import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllCategories = () => {
    const axiosPublic= useAxiosPublic()
        const {data: allCategories, isPending: categoryLoading, refetch}= useQuery({
         queryKey: ["allCategories"],
         queryFn: async()=>{
             const res= await axiosPublic.get("/getAllCategories")
             return res.data;
         }
        })
          return [allCategories,categoryLoading, refetch];
};

export default useAllCategories;