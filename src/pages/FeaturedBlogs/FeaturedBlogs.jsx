import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import catLoading from '../../assets/blue-cat.svg';

const FeaturedBlogs = () => {
    const { isPending, isError, error, data: featuredBlogs } = useQuery({
        queryKey: ['featuredBlogs'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/featured-blogs`);
            return res.data;
        }
    })

    console.log(featuredBlogs);

    if (isPending) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <img src={catLoading} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <span>Error: {error.message}</span>
            </div>
        )
    }

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Featured Blogs - Furry Friends</title>
            </Helmet>
            Featured Blogs
        </section>
    );
};

export default FeaturedBlogs;