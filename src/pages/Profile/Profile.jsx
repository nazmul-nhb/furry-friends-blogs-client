import useAuth from "../../hooks/useAuth";
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import catLoading from '../../assets/blue-cat.svg';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Blog from "../../components/Blog/Blog";
import rain from '../../assets/rain.svg';
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import Button from "../../components/Button/Button";

const Profile = () => {
    const { user } = useAuth();
    const { isPending, isError, error, data: usersBlogs } = useQuery({
        queryKey: ['usersBlogs', user],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/blogs?currentUser=${user.email}`);
            return res.data;
        }
    })

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
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4 space-y-6">
            <Helmet>
                <title>Profile : {user.displayName} - Furry Friends Blogs</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row justify-between gap-6 items-center mb-8 lg:mb-16">
                <div className="w-full lg:w-2/3 flex-1 bg-gradient-to-l from-[#829ae8fa] to-[#7690e5fa] flex flex-col gap-6 p-6 shadow-lg shadow-[#3c3939]">
                    <div className="flex flex-col lg:flex-row gap-2 items-center md:justify-start justify-center my-4">
                        <img className="border p-1 border-furry w-24 md:w-36 h-24 md:h-36" src={user.photoURL} alt={user.displayName} title={user.displayName} />
                        <div className="flex flex-col justify-center items-center md:items-start md:justify-start gap-3">
                            <h4 className="text-lg md:text-2xl font-bold">{user.displayName}</h4>
                            <h4 className="font-semibold flex items-center">{user.email} {user.emailVerified ? <MdVerified className="text-green-800" title="Verified!" /> : <VscUnverified className="text-red-800" title="Not Verified!" />}</h4>
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
                <div className="w-full lg:w-1/3 border lg:border-0 border-furry p-2 lg:text-left justify-between flex flex-col items-center gap-2">
                    <h3 className="text-furry font-jokeyOneSans text-3xl">You have Posted {usersBlogs?.length} {usersBlogs?.length > 0 ? 'Blogs' : 'Blog'}!</h3>
                    <Link to={`/add-blog`}><Button buttonText={'Add A New Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'} className={'my-2 border px-4 py-1 font-bold text-xl'}></Button></Link>
                </div>
            </div>

            {
                usersBlogs?.length <= 0 ? <div className="flex flex-col items-center justify-center text-furry font-jokeyOneSans text-2xl md:text-4xl gap-4">
                    <img src={rain} alt="Raining..." />
                    <p>You haven&rsquo;t Posted Any Blog Yet!</p>
                    <Link to={`/add-blog`}><Button buttonText={'Add A Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'} className={'my-2 border px-4 py-1 font-bold text-xl'}></Button></Link>
                </div>
                    : <div>
                        <h3 className="text-furry font-jokeyOneSans text-3xl">Your Blogs:</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                usersBlogs?.map(blog => <Blog
                                    key={blog._id}
                                    blog={blog}
                                    profile={true}
                                ></Blog>)
                            }
                        </div>
                    </div>
            }
        </section>
    );
};

export default Profile;