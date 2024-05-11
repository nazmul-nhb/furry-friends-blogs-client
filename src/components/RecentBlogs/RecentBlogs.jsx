import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import catLoading from '../../assets/blue-cat.svg';
import Blog from "../Blog/Blog";

const RecentBlogs = () => {
    const { isPending, isError, error, data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/blogs?size=4&sortBy=desc`);
            return res.data;
        }
    })

    console.log(blogs);

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
        <section>
            <div className="grid grid-cols-2 gap-6">
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

export default RecentBlogs;