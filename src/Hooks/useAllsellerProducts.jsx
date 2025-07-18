import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useAllsellerProducts = () => {
    // const {user,loading}= useAuth();
    // const axiosPublic= useAxiosPublic()
    // const [allProducts,setAllProducts]= useState({})
    // useEffect(()=>{
    //     const fetchSellerProducts= async ()=>{

    //             const res= await axiosPublic.get(`/sellerProductStats/${user?.email}`)
    //             setAllProducts(res?.data)
    //     }
    //     if(user?.email)
    //         {
    //             fetchSellerProducts()
    //         }
    // },[user, loading, axiosPublic])
    // return allProducts;

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const token = localStorage.getItem('access-token')

    const { data: sellerProduct, isPending: productLoading, refetch } = useQuery({
        queryKey: [user?.email, "sellerProduct"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/sellerProductStats/${user?.email}`,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
            return res.data;
        }
    })
    return [sellerProduct, productLoading, refetch];

};

export default useAllsellerProducts;