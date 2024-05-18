import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
// import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { MdAccessTime, MdPets } from 'react-icons/md';
import { PiBirdFill, PiCatFill, PiDogFill, PiRabbitFill } from 'react-icons/pi';
import { GiFrog } from 'react-icons/gi';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Blog = ({ blog, wishlist, profile, handleDeleteWishlist, refetch }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [countClick, setCountClick] = useState(0);
    const axiosSecure = useAxiosSecure();

    const { blog_title, category, image, short_description, posted_on, posted_by, _id } = blog;
    const formattedDate = moment(posted_on).format('MMMM DD, YYYY [at] hh:mm A');
    // console.log(blog);

    const handleAddToWishlist = () => {
        // if user isn't logged in show toast & after 2 clicks redirect to login page
        if (!user) {
            toast.error('You should login first!');
            setCountClick(count => count + 1);
            if (countClick === 2) {
                navigate('/login');
            }
            return;
        }

        axiosSecure.post('/wishlist', { blog_id: _id, user_email: user.email, time_added: moment().format("YYYY-MM-DD HH:mm:ss") })
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Blog Added to Wishlist');
                    refetch();
                }
            })
            .catch(error => {
                // console.error(error.response.data.message);
                toast.error(error.response.data.message);
            })
    }

    return (

        <div className='border p-3 flex flex-col shadow-md shadow-blue-950'>
            <figure className='relative border p-1 mb-2'>
                <img className='aspect-[2/1]' src={image} alt={blog_title} />
                <h3 className="absolute bottom-1 left-1 pb-1 pt-[2px] pl-2 w-full bg-gradient-to-r from-furry via-[#1e3fada3] to-[#1e3fad01] font-jokeyOneSans tracking-wider text-lg flex items-center gap-1 text-white"><MdPets /> Category: {
                    category === "Cats" ? <span className='flex items-center gap-1'><PiCatFill />{category}</span>
                        : category === "Dogs" ? <span className='flex items-center gap-1'><PiDogFill /> {category}</span>
                            : category === "Birds" ? <span className='flex items-center gap-1'><PiBirdFill />{category}</span>
                                : category === "Rabbits" ? <span className='flex items-center gap-1'><PiRabbitFill /> {category}</span>
                                    : <span className='flex items-center gap-1'><GiFrog /> {category}</span>
                }</h3>
            </figure>
            {/* <hr className="my-2" /> */}
            <h3 className="font-kreonSerif text-xl md:text-2xl">{blog_title}</h3>
            <p className='text-gray-500'>Posted by <span className="text-furry font-semibold">{posted_by}</span></p>
            <p className="text-gray-700 flex-grow my-2">{short_description}</p>
            <p className='text-gray-500 text-sm flex items-center gap-1'><MdAccessTime /> {formattedDate}</p>
            <hr className="my-4" />
            <div className=" rounded-b-xl flex justify-between items-center">
                <Link to={`/blog-details/${_id}`}><Button className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Read Details'}></Button></Link>
                {wishlist ?
                    <Button onClick={() => handleDeleteWishlist(_id)} className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Remove'}></Button>
                    : profile ? <Link to={`/update-blog/${_id}`}><Button
                        buttonText={'Update Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'}
                        className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'}
                    ></Button></Link>
                        : <Button onClick={handleAddToWishlist} className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Add to Wishlist'}></Button>
                }
            </div>
        </div>

    );
};

Blog.propTypes = {
    blog: PropTypes.object,
    wishlist: PropTypes.bool,
    profile: PropTypes.bool,
    handleDeleteWishlist: PropTypes.func,
    refetch: PropTypes.func,
}

export default Blog;