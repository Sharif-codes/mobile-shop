import axios from "axios";



const axiosPublic= axios.create({
    baseURL: 'https://digi-store-sharif-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};
export default useAxiosPublic;