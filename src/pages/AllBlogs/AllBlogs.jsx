import { Helmet } from "react-helmet-async";

const AllBlogs = () => {
    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>All Blogs - Furry Friends</title>
            </Helmet>
            All Blogs
        </section>
    );
};

export default AllBlogs;