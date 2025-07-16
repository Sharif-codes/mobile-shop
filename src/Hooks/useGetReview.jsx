import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetReview = () => {

    const axiosPublic = useAxiosPublic()

    const { data: reviews, isPending: isReviewLoading } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const res = await axiosPublic.get("/get-reviews")
            console.log(res.data)
            return res.data;
        }
    })
    return [reviews, isReviewLoading];
};

export default useGetReview;