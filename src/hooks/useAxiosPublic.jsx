import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://furry-friends-server-nhb.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;