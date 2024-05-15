import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import Comments from "../../components/Comments/Comments";
import { Helmet } from "react-helmet-async";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import catLoading from '../../assets/blue-cat.svg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { isPending, isError, error, data: blog } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/blogs/${id}`);
            return res.data;
        },
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

    const { blog_title, category, image, short_description, long_description, posted_on, posted_by, blogger_email, blogger_photo } = blog;
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
                    <img className="w-12 h-12 rounded-full p-[2px] border" src={blogger_photo} alt={posted_by} />
                    <div className="leading-4 flex flex-col gap-1">
                        <p className="font-kreonSerif">Posted by <span className="font-semibold text-blue-950">{posted_by}</span></p>
                        <p className="text-gray-500">{formattedDate}</p>
                    </div>
                </figure>
                <h3 className="text-furry text-xl font-semibold"><span className="text-black">Posted in Category: </span>{category}</h3>
            </div>
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
                            buttonText={'Go Back'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'}
                            className={'my-2 border px-4 py-1 font-bold text-xl'}
                        ></Button>
                        {
                            user.email === blogger_email && <Link to={`/update-blog/${id}`}><Button
                                buttonText={'Update Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'}
                                className={'my-2 border px-4 py-1 font-bold text-xl'}
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