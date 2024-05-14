import { Helmet } from "react-helmet-async";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";
import Slider from "../../components/Slider/Slider";

const Home = () => {
    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Home - Furry Friends Blogs</title>
            </Helmet>
            <h3 className="text-center font-bold text-3xl md:text-4xl">Welcome to Furry Friends Blogs</h3>
            <p className="mx-auto w-4/5 md:w-3/5 text-center font-semibold mb-6 text-lg">The Home of Pet Lovers who enjoy writing about pets!</p>
            <Slider />
            <RecentBlogs />
        </section>
    );
};

export default Home;
