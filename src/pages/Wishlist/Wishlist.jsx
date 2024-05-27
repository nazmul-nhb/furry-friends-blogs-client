import { Helmet } from "react-helmet-async";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
// import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Blog from "../../components/Blog/Blog";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import rain from '../../assets/rain.svg';
import pacman from '../../assets/red-pacman.svg';
import interwind from '../../assets/interwind-blue.svg';
import useWishlist from "../../hooks/useWishlist";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import SectionInfo from "../../components/SectionInfo/SectionInfo";

const Wishlist = () => {
    const { user } = useAuth();
    const [wishedBlogs, setWishedBlogs] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loadingData, setLoadingData] = useState(false);
    const { isPending, isError, error, wishlistBlogs, refetch } = useWishlist();
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    // console.log(wishlistBlogs);

    useEffect(() => {
        if (wishlistBlogs) {
            const wishlistBlogIDs = wishlistBlogs?.map(wished => wished.blog_id);
            // console.log(wishlistBlogIDs);
            setLoadingData(true);
            axiosSecure.post(`/wishlist-blogs?`, [...wishlistBlogIDs])
                .then(res => {
                    // console.log(res.data);
                    setWishedBlogs(res.data);
                    refetch();
                    setLoadingData(false);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [axiosSecure, refetch, wishlistBlogs])

    const deletedBlogCount = wishlistBlogs?.length - wishedBlogs?.length;
    const deletedBlogs = wishlistBlogs?.filter(blog1 => !wishedBlogs?.some(blog2 => blog1.blog_id === blog2._id));

    // Delete Wishlist Item one by one
    const handleDeleteWishlist = (id, blog_title) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `Remove "${blog_title}" from Your Wishlist?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#2a7947',
            confirmButtonText: 'Yes, Remove It!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingData(true);
                axiosSecure.delete(`/wishlist/${id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Removed!',
                                `"${blog_title}" Removed from Your Wishlist!`,
                                'success'
                            )
                            toast.success(`Blog Removed from Wishlist!`);
                            setLoadingData(false);
                            // setShowModal(false);
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
            <div className="flex items-center justify-center">
                <img src={loadingRipple} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <span className="text-red-700">{error.message}</span>
                <img src={pacman} alt="Error!" />
            </div>
        )
    }

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Wishlist - Furry Friends Blogs</title>
            </Helmet>

            <SectionInfo
                heading={`${user.displayName}’s Wishlist`}
                info={"Read the Blogs You kept in your Wishlist for Reading Later."}
            />

            {/* Show Loading Spinner */}
            {
                loadingData ?
                    < div className="flex items-center justify-center">
                        <img src={interwind} alt="Loading..." />
                    </div>
                    : wishlistBlogs?.length <= 0 ? <div className="flex flex-col items-center justify-center text-furry font-kreonSerif max-[430px]:text-xl text-2xl md:text-4xl gap-4">
                        <img src={rain} alt="Raining..." />
                        <p>Your Wishlist is Empty!</p>
                    </div>
                        : <div>
                            {/* Show Total Wishlist Blog Count */}
                            {
                                wishlistBlogs?.length > 0 && <h3 className="text-center text-furry font-kreonSerif font-bold max-[430px]:text-lg text-2xl md:text-3xl mb-4 md:mb-6">You have {wishlistBlogs?.length} {wishlistBlogs?.length > 1 ? 'Blogs' : 'Blog'} in Your Wishlist!</h3>
                            }
                            {/* Handling Deleted Blogs in Wishlist */}
                            {wishlistBlogs?.length > wishedBlogs?.length && <div>
                                <h3 className="text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">{deletedBlogCount} {deletedBlogCount > 1 ? 'Blogs were' : 'Blog was'} Deleted by the {deletedBlogCount > 1 ? 'Authors' : 'Author'}! <button className="hover:text-red-700 text-furry hover:opacity-80 transition-all duration-500 cursor-pointer" onClick={() => setShowModal(!showModal)}>View</button></h3>
                                {/* Deleted Blogs List */}
                                {showModal &&
                                    <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-6 bg-[#c5cce5f1] border shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-50 overflow-y-auto">
                                        <IoIosCloseCircle onClick={closeModal} className='absolute top-1 right-1 text-5xl text-red-700 hover:text-furry hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />
                                        <h3 className="text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">List of Deleted Blogs in Your Wishlist:</h3>
                                        {
                                            deletedBlogs?.map((blog, index) => <div className="animate__animated animate__headShake" key={blog._id}>
                                                <div className="flex gap-2 items-center justify-between max-[430px]:text-sm text-base md:text-lg font-kreonSerif text-furry">
                                                    <h3>{index + 1}.{blog.blog_title}</h3> <RiDeleteBin5Fill className="text-red-700 cursor-pointer hover:text-furry transition-all duration-500 text-3xl"
                                                        onClick={() => handleDeleteWishlist(blog.blog_id, blog.blog_title)} />
                                                </div>
                                                <hr className="my-2 border-t border-t-furry" />
                                            </div>)
                                        }
                                    </dialog>
                                }
                            </div>
                            }
                            {/* Wishlist Blogs */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    wishedBlogs?.map(blog => <Blog
                                        key={blog._id}
                                        blog={blog}
                                        wishlist={true}
                                        handleDeleteWishlist={handleDeleteWishlist}
                                    ></Blog>)
                                }
                            </div>
                        </div>
            }
        </section>
    );
};

export default Wishlist;