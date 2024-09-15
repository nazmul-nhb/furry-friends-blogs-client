import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
// import axios from "axios";

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();

    const {
		isLoading: isWishlistLoading,
		isError,
		error,
		data: wishlistBlogs,
		refetch,
	} = useQuery({
		queryKey: ["wishlistBlogs", user?.email, userLoading],
		enabled: !!user?.email && !userLoading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
			return res.data;
		},
	});

    return { isWishlistLoading, isError, error, wishlistBlogs, refetch }
};

export default useWishlist;