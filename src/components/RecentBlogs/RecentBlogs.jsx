import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import catLoading from '../../assets/blue-cat.svg';
import Blog from "../Blog/Blog";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const RecentBlogs = () => {
    const { isPending, isError, error, data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/blogs?size=6&sort=-1`);
            return res.data;
        }
    })

    // console.log(blogs);

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
        <section className="my-16 flex flex-col justify-center items-center gap-6">
            <div className="grid lg:grid-cols-2 gap-6">
                {
                    blogs?.map(blog => <Blog
                        key={blog._id}
                        blog={blog}
                    ></Blog>)
                }
            </div>
            <Link to={'/all-blogs'}><Button className={'border px-6 py-2 rounded-3xl font-bold text-2xl'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Show All Blogs'}></Button></Link>
        </section>
    );
};

export default RecentBlogs;