import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from 'moment';
import Comments from "../../components/Comments/Comments";

const BlogDetails = () => {
    const { id } = useParams();

    const { isPending, isError, error, data: blog } = useQuery({
        queryKey: ['blog'],
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

    const { blog_title, category, image, short_description, posted_on, posted_by } = blog;
    const formattedDate = moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A');

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            Details for: {blog_title}

            <Comments blog={blog}></Comments>
        </section>
    );
};

export default BlogDetails;