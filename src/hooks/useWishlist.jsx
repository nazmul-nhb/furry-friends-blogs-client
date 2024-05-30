import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
// import axios from "axios";

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();

    const { isPending, isError, error, data: wishlistBlogs, refetch } = useQuery({
        queryKey: ['wishlistBlogs', user?.email, userLoading],
        enabled: !!user?.email && !userLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return res.data;
        }
    });

    return { isPending, isError, error, wishlistBlogs, refetch }
};

export default useWishlist;