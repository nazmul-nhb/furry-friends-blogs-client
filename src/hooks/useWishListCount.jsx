import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useWishlistCount = () => {
    const axiosPublic = useAxiosPublic();
    const { user, userLoading } = useAuth();

    const { data: wishlistCount = 0, refetch: countRefetch } = useQuery({
        queryKey: ['wishlistCount', user?.email, userLoading],
        enabled: !!user?.email && !userLoading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlist-count?email=${user?.email}`);
            return res.data?.wishlistCount;
        }
    });

    return { wishlistCount, countRefetch }
};

export default useWishlistCount;