import { Helmet } from "react-helmet-async";
import RecentBlogs from "../../components/RecentBlogs/RecentBlogs";
import Slider from "../../components/Slider/Slider";
import Newsletter from "../../components/Newsletter/Newsletter";
import FAQs from "../../components/FAQs/FAQs";
import PetTips from "../../components/PetTips/PetTips";
import { useTypewriter } from "react-simple-typewriter";
import SectionInfo from "../../components/SectionInfo/SectionInfo";
import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator";

const Home = () => {

    const [text] = useTypewriter({
        words: [`Welcome to Furry Friends Blogs`],
        loop: 1,
    })

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <ScrollIndicator/>
            <Helmet>
                <title>Home - Furry Friends Blogs</title>
            </Helmet>
            <SectionInfo
                heading={text}
                info={"The Home of Pet Lovers who enjoy writing and reading about pets!"}
            />
            <Slider />
            <hr className="mt-8 md:mt-16" />
            <RecentBlogs />
            <hr />
            <PetTips />
            <hr />
            <FAQs />
            <hr />
            <Newsletter />
        </section>
    );
};

export default Home;
