import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { isPending, isError, error, data: wishlistBlogs, refetch } = useQuery({
        queryKey: ['wishlistBlogs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return res.data;
        }, enabled: !!user,
    });

    return { isPending, isError, error, wishlistBlogs, refetch }
};

export default useWishlist;