import { Helmet } from "react-helmet-async";
import catLoading from '../../assets/blue-cat.svg';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Blog from "../../components/Blog/Blog";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Wishlist = () => {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { isPending, isError, error, data: wishlistBlogs, refetch } = useQuery({
        queryKey: ['wishlistBlogs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return res.data;
        }, enabled: true,
    });

    // console.log(wishlistBlogs);

    useEffect(() => {
        if (wishlistBlogs) {
            const wishlistBlogIDs = wishlistBlogs?.map(wished => wished.blog_id);
            // console.log(wishlistBlogIDs);
            axios.post(`https://furry-friends-server-nhb.vercel.app/wishlist-blogs?`, [...wishlistBlogIDs])
                .then(res => {
                    // console.log(res.data);
                    setBlogs(res.data);
                    refetch();
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [refetch, wishlistBlogs])

    // Delete Wishlist Item one by one
    const handleDeleteWishlist = (id) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `Remove the Blog from Your Wishlist?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#2a7947',
            confirmButtonText: 'Yes, Remove It!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://furry-friends-server-nhb.vercel.app/wishlist/${id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Removed!',
                                'Blog Removed from Wishlist!',
                                'success'
                            )
                            toast.success('Blog Removed from Wishlist!')
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        })
    }

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
                <title>Wishlist - Furry Friends Blogs</title>
            </Helmet>
            <h3 className="text-center text-furry font-bold text-3xl mb-8">{user.displayName}&rsquo;s Wishlist </h3>
            <p className="mx-auto w-4/5 md:w-3/5 text-center font-semibold mb-8">Read the Blogs You kept in your Wishlist for Reading Later.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    blogs?.map(blog => <Blog
                        key={blog._id}
                        blog={blog}
                        wishlist={true}
                        handleDeleteWishlist={handleDeleteWishlist}
                    ></Blog>)
                }
            </div>
        </section>
    );
};

export default Wishlist;