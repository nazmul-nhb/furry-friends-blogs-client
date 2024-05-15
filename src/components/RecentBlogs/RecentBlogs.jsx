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
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/blogs?size=6&sort=-1`);
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
            <h3 className="text-center font-bold text-3xl md:text-4xl">Recent Blog Posts</h3>
            <p className="mx-auto w-4/5 md:w-3/5 text-center font-semibold mb-6 text-lg">Explore our recent blogs about pets. You can add it to your Wishlist for reading it later! <br /> Click &ldquo;Show All Blogs&rdquo; to Explore all the blogs! </p>
            <div className="grid lg:grid-cols-2 gap-6">
                {
                    blogs?.map(blog => <Blog
                        key={blog._id}
                        blog={blog}
                    ></Blog>)
                }
            </div>
            <Link to={'/all-blogs'}><Button className={'border px-6 py-2 rounded-3xl font-bold text-2xl'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Show All Blogs'}></Button></Link>
        </section>
    );
};

export default RecentBlogs;