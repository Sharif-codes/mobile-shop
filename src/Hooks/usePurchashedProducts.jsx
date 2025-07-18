import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const usePurchashedProducts = () => {
    const token = localStorage.getItem('access-token')
   const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: buyerProducts, isPending: productLoading } = useQuery({
        queryKey: [user?.email, "buyererProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/buyerProducts/${user?.email}`,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
            return res.data;
        }
    })
    return [buyerProducts, productLoading];
};

export default usePurchashedProducts;