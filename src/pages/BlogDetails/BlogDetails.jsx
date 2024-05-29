import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import Comments from "../../components/Comments/Comments";
import { Helmet } from "react-helmet-async";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
import pacman from '../../assets/red-pacman.svg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { MdAccessTime, MdOutlineUpdate, MdPets } from "react-icons/md";
import { PiBirdFill, PiCatFill, PiDogFill, PiRabbitFill } from "react-icons/pi";
import { GiFrog } from "react-icons/gi";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import { IoChevronBackCircleOutline } from "react-icons/io5";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showPostUpdateTime, setShowPostUpdateTime] = useState(false);
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { isPending, isError, error, data: blog } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`);
            return res.data;
        }
    })

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

    const { blog_title, category, image, short_description, long_description, posted_on, posted_by, blogger_email, blogger_photo, updated_on } = blog;
    const formattedDate = moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A');

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{blog_title} - Furry Friends Blogs</title>
            </Helmet>

            <h3 className="font-kreonSerif text-2xl md:text-4xl font-black leading-snug mb-2">{blog_title}</h3>
            {/* Blogger Info */}
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <figure className="flex gap-2 items-center mb-2">
                    <img className="w-12 h-12 rounded-full p-[2px] border" title={blogger_email} src={blogger_photo} alt={posted_by} />
                    <div className="leading-4 flex flex-col gap-1">
                        <p className="font-kreonSerif">Posted by <span className="font-semibold text-furry">
                            {
                                user?.email === blogger_email ? 'You' : posted_by
                            }
                        </span></p>
                        {
                            updated_on ? <Tooltip anchorSelect=".post-update-time" place="top">
                                Updated on: {moment(updated_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}
                            </Tooltip>
                                : <Tooltip anchorSelect=".post-update-time" place="top">
                                    Posted on: {moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}
                                </Tooltip>
                        }
                        <p onClick={() => setShowPostUpdateTime(!showPostUpdateTime)} className="text-gray-500 cursor-pointer post-update-time flex items-center gap-1"><MdAccessTime /> {formattedDate}</p>
                    </div>
                </figure>
                <h3 className="font-kreonSerif text-xl font-semibold flex items-center gap-1">Posted in <MdPets />Category:  <span className="flex text-furry tracking-wider items-center gap-1">
                    {
                        <span className='flex items-center gap-1'>{
                            category === "Cats" ? <PiCatFill />
                                : category === "Dogs" ? <PiDogFill />
                                    : category === "Birds" ? <PiBirdFill />
                                        : category === "Rabbits" ? <PiRabbitFill />
                                            : <GiFrog />}{category}
                        </span>
                    }
                </span></h3>
            </div>
            {
                showPostUpdateTime && updated_on && <h5 className="md:ml-14 md:-mt-3 text-gray-500 flex items-center gap-1"><MdOutlineUpdate /> {moment(updated_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h5>
            }
            <hr className="mb-6 mt-2" />
            {/* Blog Image & Short Description */}
            <div className="flex flex-col xl:flex-row gap-6 mb-6">
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img className="cursor-pointer w-full xl:w-[640px] p-2 border" src={image} alt={blog_title} />
                    </PhotoView>
                </PhotoProvider>
                <div className="flex flex-col gap-1 md:gap-6">
                    <h3 className="text-xl font-kreonSerif text-justify">{short_description}</h3>
                    <div className="flex justify-between">
                        <Button onClick={() => navigate(-1)}
                            buttonText={'Go Back'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'} icon={<IoChevronBackCircleOutline />}
                            className={'my-2 border px-3 py-1 font-bold  text-lg md:text-xl flex items-center gap-2'}
                        ></Button>
                        {
                            user.email === blogger_email && <Link to={`/update-blog/${id}`}><Button
                                buttonText={'Update Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'} icon={<LuFileEdit />}
                                className={'my-2 border px-3 py-1 font-bold text-lg md:text-xl flex items-center gap-2'}
                            ></Button></Link>
                        }
                    </div>
                </div>
            </div >
            {/* Blog Post/Long Description */}
            <p className="text-lg first-letter:text-6xl first-letter:font-bold f first-letter:mr-2 first-letter:float-left first-letter:font-kreonSerif text-justify">{long_description}</p>
            <hr className="my-6" />
            <Comments blog={blog}></Comments>
        </section >
    );
};

export default BlogDetails;