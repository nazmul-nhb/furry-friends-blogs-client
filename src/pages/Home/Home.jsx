import { Helmet } from "react-helmet-async";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";
import Slider from "../../components/Slider/Slider";


const Home = () => {


    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Home - Furry Friends</title>
            </Helmet>
            <Slider/>
            <RecentBlogs/>
        </section>
    );
};

export default Home;
