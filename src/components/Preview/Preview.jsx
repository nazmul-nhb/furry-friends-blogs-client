import PropTypes from 'prop-types';
import { MdPets } from "react-icons/md";
import { PiBirdFill, PiCatFill, PiDogFill, PiRabbitFill } from "react-icons/pi";
import { GiFrog } from "react-icons/gi";
import 'animate.css';

const Preview = ({ previewBlog }) => {
    const { blog_title, category, image, short_description, long_description } = previewBlog;

    return (
        <section className="animate__animated animate__bounceIn m-4 p-2 pb-10 md:px-4 bg-gradient-to-b from-[#93a9f0fa] to-[#839bebfa] rounded-lg">
            <h3 className="font-kreonSerif text-2xl md:text-4xl font-black leading-snug mb-2">{blog_title}</h3>
            {/* Blogger Info */}
            <h3 className="font-kreonSerif text-xl font-semibold flex items-center gap-1">Posted in <MdPets />Category:  <span className="flex text-furry tracking-wider items-center gap-1">
                {
                    <span className='flex items-center gap-1'>{
                        category === "Cats" ? <PiCatFill />
                            : category === "Dogs" ? <PiDogFill />
                                : category === "Birds" ? <PiBirdFill />
                                    : category === "Rabbits" ? <PiRabbitFill />
                                        : <GiFrog />}{category}
                    </span>
                }
            </span></h3>            <hr className="mb-6 mt-2" />
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