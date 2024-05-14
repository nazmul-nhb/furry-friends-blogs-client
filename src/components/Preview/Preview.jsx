import PropTypes from 'prop-types';

const Preview = ({ previewBlog }) => {
    const { blog_title, category, image, short_description, long_description } = previewBlog;

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <h3 className="font-kreonSerif text-2xl md:text-4xl font-black leading-snug mb-2">{blog_title}</h3>
            {/* Blogger Info */}
                <h3 className="text-[#1e40ad] text-xl font-semibold"><span className="text-black">Category: </span>{category}</h3>
            <hr className="mb-6 mt-2" />
            {/* Blog Image & Short Description */}
            <div className="flex flex-col gap-6 mb-6">
                <img className="w-full xl:w-[640px] p-2 border" src={image} alt={blog_title} />
                <div className="flex flex-col gap-1 md:gap-6">
                    <h3 className="text-xl font-kreonSerif text-justify">{short_description}</h3>
                </div>
            </div >
            {/* Blog Post/Long Description */}
            <p className="text-lg first-letter:text-6xl first-letter:font-bold f first-letter:mr-1 first-letter:float-left first-letter:font-kreonSerif text-justify">{long_description}</p>
        </section>
    );
};

Preview.propTypes = {
    previewBlog: PropTypes.object,
}

export default Preview;