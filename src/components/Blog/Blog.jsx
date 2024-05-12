import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Blog = ({ blog, wishlist, handleDeleteWishlist }) => {
    const { user } = useAuth();
    const { blog_title, category, image, short_description, posted_on, posted_by, _id } = blog;
    const formattedDate = moment(posted_on).format('MMMM DD, YYYY [at] hh:mm A');
    // console.log(blog);

    const handleAddToWishlist = () => {
        axios.post('http://localhost:5000/wishlist', { blog_id: _id, user_email: user.email, time_added: moment().format("YYYY-MM-DD HH:mm:ss") })
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
        <div className='border rounded-xl p-4'>
            <figure className='relative'>
                <img className='aspect-[2/1] rounded-xl' src={image} alt={blog_title} />
                <div className=" rounded-b-xl flex justify-between items-center absolute bottom-0 left-0 right-0 bg-[#819bcc9f] p-2">
                    <Link to={`/blog-details/${_id}`}><Button className={'border px-6 py-2 rounded-3xl font-bold'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Read Full Blog'}></Button></Link>
                    {wishlist ?
                        <Button onClick={() => handleDeleteWishlist(_id)} className={'border px-6 py-2 rounded-3xl font-bold'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Remove Wishlist'}></Button>
                        : <Button onClick={handleAddToWishlist} className={'border px-6 py-2 rounded-3xl font-bold'} color={'rgb(30 64 175)'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Wishlist'}></Button>
                    }
                </div>
                <h5 className='rounded-t-xl bg-[#819bcc9f] w-full p-2 absolute top-0 right-0'>{category}</h5>
            </figure>
            <h3 className="text-3xl">{blog_title}</h3>
            <p className="text">{short_description}</p>
            <p>Posted on {formattedDate} by {posted_by}</p>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object,
    wishlist: PropTypes.bool,
    handleDeleteWishlist: PropTypes.func,
}

export default Blog;