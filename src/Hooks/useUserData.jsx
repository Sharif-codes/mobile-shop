
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";



const useUserData = () => {
    // const {user,loading}= useAuth();
    // const axiosPublic= useAxiosPublic()
    // const [userData,setUserData]= useState({})
    // useEffect(()=>{
    //     const fetchUserData= async ()=>{
        
    //             const res= await axiosPublic.get(`/user/${user?.email}`)
    //             setUserData(res?.data)
    //     }
    //     if(user?.email)
    //         {
    //             fetchUserData()
    //         }
    // },[user, loading, axiosPublic])
    // return userData;

     const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: userData, isPending: userLoading, refetch } = useQuery({
        queryKey: [user?.email, "userData"],
        queryFn: async () => {
            const res= await axiosPublic.get(`/user/${user?.email}`)
            return res.data;
        }
    })
    return [userData, userLoading, refetch];
};

export default useUserData;