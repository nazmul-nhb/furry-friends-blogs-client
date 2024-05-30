import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
import pacman from '../../assets/red-pacman.svg';
import Blog from "../Blog/Blog";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import SectionInfo from "../SectionInfo/SectionInfo";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const RecentBlogs = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, isError, error, data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs?size=6&sort=-1`);
            return res.data;
        }
    })

    // console.log(blogs);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <span className="text-red-700">{error.message}</span>
                <img src={pacman} alt="Error!" />
            </div>
        )
    }

    return (
        <section className="my-8 md:my-16 flex flex-col justify-center items-center gap-4">
            <SectionInfo
                heading={"Recent Blog Posts"}
                info={"Explore our recent blogs about pets. You can add it to your Wishlist for reading it later!"}
            />

            {isPending && (
                <div className="flex items-center justify-center">
                    <img className="w-24 md:w-36 h-24 md:h-36" src={loadingRipple} alt="Loading..." />
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {
                    blogs?.map(blog => (
                        <Blog key={blog._id} blog={blog} />
                    ))
                }
            </div>

            <Link className="mt-6" to={'/all-blogs'}><Button className={'border px-4 md:px-6 py-1 md:py-2 rounded-3xl font-bold text-lg md:text-2xl'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Explore All Blogs'}></Button></Link>
        </section>
    );
};

export default RecentBlogs;