import { Helmet } from "react-helmet-async";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";
import Slider from "../../components/Slider/Slider";
import Newsletter from "../../components/Newsletter/Newsletter";
import FAQs from "../../components/FAQs/FAQs";
import PetTips from "../../components/PetTips/PetTips";

const Home = () => {

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Home - Furry Friends Blogs</title>
            </Helmet>
            <h3 className="text-center text-furry font-bold max-[430px]:text-lg text-2xl md:text-6xl">Welcome to Furry Friends Blogs</h3>
            <p className="mx-auto w-4/5 md:w-3/5 text-center font-semibold mb-6 md:mt-6 max-[430px]:text-sm text-lg md:text-2xl">The Home of Pet Lovers who enjoy writing and reading blogs about pets!</p>
            <Slider />
            <RecentBlogs />
            <PetTips/>
            <FAQs/>
            <Newsletter />
        </section>
    );
};

export default Home;
