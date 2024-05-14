import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const Blog = ({ blog, wishlist, handleDeleteWishlist }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [countClick, setCountClick] = useState(0);

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

        axios.post('https://furry-friends-server-nhb.vercel.app/wishlist', { blog_id: _id, user_email: user.email, time_added: moment().format("YYYY-MM-DD HH:mm:ss") })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Blog Added to Wishlist');
                }
            })
            .catch(error => {
                // console.error(error.response.data.message);
                toast.error(error.response.data.message);
            })
    }

    return (
        <div className='border rounded-xl p-4 flex flex-col'>
            <figure className=''>
                <img className='aspect-[2/1] rounded-t-xl' src={image} alt={blog_title} />
            </figure>
            <hr className="my-4" />
            <h3 className="font-kreonSerif text-xl md:text-2xl">{blog_title}</h3>
            <p className='text-gray-500'>Posted by {posted_by} in Category : <span className="text-blue-900">{category}</span></p>
            <p className="text-gray-700 flex-grow my-2">{short_description}</p>
            <p className='text-gray-500 text-sm'>Published on: {formattedDate}</p>
            <hr className="my-4" />
            <div className=" rounded-b-xl flex justify-between items-center p-2">
                <Link to={`/blog-details/${_id}`}><Button className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Read Details'}></Button></Link>
                {wishlist ?
                    <Button onClick={() => handleDeleteWishlist(_id)} className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Remove'}></Button>
                    : <Button onClick={handleAddToWishlist} className={'border px-3 md:px-6 py-2 rounded-3xl text-sm md:text-base font-bold'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Add to Wishlist'}></Button>
                }
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object,
    wishlist: PropTypes.bool,
    handleDeleteWishlist: PropTypes.func,
}

export default Blog;