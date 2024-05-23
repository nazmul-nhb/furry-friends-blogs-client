import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import axios from "axios";

const useWishlist = () => {
    // const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();

    const { isPending, isError, error, data: wishlistBlogs, refetch } = useQuery({
        queryKey: ['wishlistBlogs', user?.email, userLoading],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/wishlist?email=${user?.email}`);
            return res.data;
        }, enabled: !!user?.email && !userLoading,
    });

    return { isPending, isError, error, wishlistBlogs, refetch }
};

export default useWishlist;