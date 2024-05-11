import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from 'moment';
import Comments from "../../components/Comments/Comments";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const { id } = useParams();

    const { isPending, isError, error, data: blog } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/blogs/${id}`);
            return res.data;
        }
    })

    if (isPending) {
        return (
            <div className="flex items-center justify-center space-x-2">
                .......
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

    const { blog_title, category, image, short_description, long_description, posted_on, posted_by } = blog;
    const formattedDate = moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A');

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{blog_title} - Furry Friends</title>
            </Helmet>

            <h3>{blog_title}</h3>

            <figure>
                <img className="w-96" src={image} alt={blog_title} />
            </figure>
            <h3>{category}</h3>
            <h3>{short_description}</h3>
            <p>{long_description}</p>
            <p>Posted by {posted_by} on {formattedDate}</p>

            <Comments blog={blog}></Comments>
        </section>
    );
};

export default BlogDetails;