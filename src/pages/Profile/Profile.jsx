import useAuth from "../../hooks/useAuth";
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import loadingRipple from "../../assets/ripple-blue-thick.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Blog from "../../components/Blog/Blog";
import rain from '../../assets/rain.svg';
import pacman from '../../assets/red-pacman.svg';
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import cloud from "../../assets/cloud.svg";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

const Profile = () => {
    const { user } = useAuth();
    const [deleting, setDeleting] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { isPending, isError, error, data: usersBlogs, refetch } = useQuery({
        queryKey: ['usersBlogs', user],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/blogs?currentUser=${user.email}&sort=-1`);
            return res.data;
        }, enabled: true,
    })

    const handleDeleteBlog = (id, blog_title) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `Delete "${blog_title}" Permanently?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#2a7947',
            confirmButtonText: 'Yes, Delete It!'
        }).then((result) => {
            if (result.isConfirmed) {
                setDeleting(true);
                axiosSecure.delete(`/blog/${id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Removed!',
                                `Permanently Deleted "${blog_title}"!`,
                                'success'
                            )
                            toast.success('Permanently Deleted the Blog!');
                            setDeleting(false);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        })
    }

    if (deleting) {
        return (<div className="flex items-center justify-center">
            <img src={cloud} alt="Deleting..." />
        </div>
        )
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
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4 space-y-6">
            <Helmet>
                <title>Profile : {user.displayName} - Furry Friends Blogs</title>
            </Helmet>
            <div className="flex flex-col xl:flex-row justify-between gap-10 items-center mb-8 xl:mb-16">
                <div className="w-full lg:w-2/3 flex-1 border bg-gradient-to-l from-[#2e50bc62] to-[#033eff37]  border-furry flex flex-col gap-6 p-6 shadow-lg shadow-[#8689ee]">
                    <div className="flex flex-col lg:flex-row gap-2 items-center md:justify-start justify-center my-4">
                        <Tooltip anchorSelect=".user-name" place="top">
                            {user.displayName}
                        </Tooltip>
                        <Tooltip anchorSelect=".user-email" place="bottom">
                            {user.email}
                        </Tooltip>
                        <img className="user-name user-email border p-1 border-furry w-24 md:w-36 h-24 md:h-36" src={user.photoURL} alt={user.displayName} />
                        <div className="flex flex-col justify-center items-center md:items-start md:justify-start gap-3">
                            <h4 className="text-lg md:text-2xl font-bold">{user.displayName}</h4>
                            <Tooltip anchorSelect=".verification-status" place="top">
                                {user.emailVerified ? "Verified!" : "Not Verified!"}
                            </Tooltip>
                            <h4 className="verification-status font-semibold flex items-center gap-1">{user.email} {user.emailVerified ? <MdVerified className="text-furry" /> : <VscUnverified className="text-red-700" />}</h4>
                            <div className="flex flex-col items-center md:flex-row gap-1 md:text-xl">
                                <h4 className="font-semibold">Account Created on:</h4>
                                <h4>{moment(user.metadata.creationTime).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h4>
                            </div>
                            <div className="flex flex-col items-center md:flex-row gap-1 md:text-xl">
                                <h4 className="font-semibold">Last Login Time:</h4>
                                <h4>{moment(user.metadata.lastSignInTime).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* User's Total Blog Count */}
                <div className={`w-full lg:w-1/3 bg-gradient-to-l from-[#2e50bc62] to-[#033eff37] border border-furry shadow-lg shadow-[#8689ee] p-4 justify-between ${usersBlogs?.length > 0 ? 'flex flex-col items-center' : 'hidden'} gap-2 text-center`}>
                    <h3 className="text-furry font-kreonSerif text-xl md:text-2xl">You have Posted {usersBlogs?.length} {usersBlogs?.length > 1 ? 'Blogs' : 'Blog'} So Far!</h3>
                    <Link to={`/add-blog`}><Button buttonText={'Add A New Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'} className={'my-2 border px-4 py-1 font-bold text-xl'}></Button></Link>
                </div>
            </div>

            {
                usersBlogs?.length <= 0 ? <div className="flex flex-col items-center justify-center text-furry font-kreonSerif max-[430px]:text-xl text-2xl md:text-4xl gap-4">
                    <img src={rain} alt="Raining..." />
                    <p>You haven&rsquo;t Posted Any Blog Yet!</p>
                    <Link to={`/add-blog`}><Button buttonText={'Add A Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'} className={'my-2 border px-4 py-1 font-bold text-xl'}></Button></Link>
                </div>
                    : <div>
                        <h3 className="text-furry font-kreonSerif text-2xl md:text-3xl mb-6">Your Blogs:</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                usersBlogs?.map(blog => <Blog
                                    key={blog._id}
                                    blog={blog}
                                    profile={true}
                                    handleDeleteBlog={handleDeleteBlog}
                                ></Blog>)
                            }
                        </div>
                    </div>
            }
        </section>
    );
};

export default Profile;