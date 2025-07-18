import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useSellerSoldProducts = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const token = localStorage.getItem('access-token')

    const { data: sellerSoldProduct, isPending: soldProductLoading, refetch } = useQuery({
        queryKey: [user?.email, "sellerSoldProduct"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/sellerSoldProductStats/${user?.email}`,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
           
            return res.data;
        }
    })

    return [sellerSoldProduct, soldProductLoading, refetch];

};

export default useSellerSoldProducts;