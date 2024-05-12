import { Helmet } from "react-helmet-async";
import catLoading from '../../assets/blue-cat.svg';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Blog from "../../components/Blog/Blog";

const Wishlist = () => {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const { isPending, isError, error, data: wishlistBlogs, refetch } = useQuery({
        queryKey: ['wishlistBlogs'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/wishlist?email=${user.email}`);
            return res.data;
        },
        enabled: true, 
    });

    console.log(wishlistBlogs);

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (wishlistBlogs) {
            const wishlistBlogIDs = wishlistBlogs?.map(wished => wished.blog_id);
            console.log(wishlistBlogIDs);
            axios.post(`http://localhost:5000/wishlist-blogs?`, [...wishlistBlogIDs])
                .then(res => {
                    console.log(res.data);
                    setBlogs(res.data);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [wishlistBlogs])

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
                <title>Wishlist - Furry Friends</title>
            </Helmet>
            Wishlist
            <div className="grid lg:grid-cols-2 gap-6">
                {
                    blogs?.map(blog => <Blog
                        key={blog._id}
                        blog={blog}
                    ></Blog>)
                }
            </div>
        </section>
    );
};

export default Wishlist;