import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:4000'
    })
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    })


    axiosSecure.interceptors.response.use((response) => {
        return response
    }, async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            logOut()
            navigate('/login')
        }

    })
    return axiosSecure;

};

export default useAxiosSecure;