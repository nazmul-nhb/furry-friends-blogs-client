import { Helmet } from "react-helmet-async";

const FeaturedBlogs = () => {
    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Featured Blogs - Furry Friends</title>
            </Helmet>
            Featured Blogs
        </section>
    );
};

export default FeaturedBlogs;