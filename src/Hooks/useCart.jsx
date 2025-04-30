import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCart = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: cart, isPending: cartLoading, refetch } = useQuery({
        queryKey: [user?.email, "cart"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getCartItem/${user?.email}`)
        
            return res.data;
        }
    })
    return [cart, cartLoading,refetch];
}

export default useCart;