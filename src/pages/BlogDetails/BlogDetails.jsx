import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import Comments from "../../components/Comments/Comments";
import { Helmet } from "react-helmet-async";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import catLoading from '../../assets/blue-cat.svg';

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

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
                <title>{blog_title} - Furry Friends</title>
            </Helmet>

            <h3 className="font-kreonSerif text-4xl font-black leading-snug mb-2">{blog_title}</h3>
            <figure className="flex gap-2 items-center mb-2">
                <img className="w-12 h-12 rounded-full p-[2px] border" src={blogger_photo} alt={posted_by} />
                <div className="leading-4">
                    <p>Posted by {posted_by}</p>
                    <p>{formattedDate}</p>
                </div>
            </figure>

            <figure>
                <img className="w-96" src={image} alt={blog_title} />
            </figure>
            <h3>{category}</h3>
            <h3>{short_description}</h3>
            <p>{long_description}</p>
            <hr className="mt-6" />
            {
                user.email === blogger_email && <Link to={`/update-blog/${id}`}><Button
                    buttonText={'Update Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'midnightblue'}
                    className={'my-2 border rounded-3xl px-4 py-1 font-bold text-xl'}
                ></Button></Link>
            }
            <Comments blog={blog}></Comments>
        </section>
    );
};

export default BlogDetails;