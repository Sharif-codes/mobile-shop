import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useSellerSoldProducts = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: sellerSoldProduct, isPending: soldProductLoading, refetch } = useQuery({
        queryKey: [user?.email, "sellerSoldProduct"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/sellerSoldProductStats/${user?.email}`)
           
            return res.data;
        }
    })

    return [sellerSoldProduct, soldProductLoading, refetch];

};

export default useSellerSoldProducts;