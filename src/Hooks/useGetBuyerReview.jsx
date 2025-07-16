import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useUserData from "./useUserData";


const useGetBuyerReview = () => {
    const axiosPublic = useAxiosPublic();
     const { user } = useAuth();
    const token = localStorage.getItem('access-token')
    const { data: reviews, isPending: reviewLoading, refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getReviews/${user.email}`,{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            return res.data;
        }
    })
    return [reviews, reviewLoading, refetch];
};

export default useGetBuyerReview;