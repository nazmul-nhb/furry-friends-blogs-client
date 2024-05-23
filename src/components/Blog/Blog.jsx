import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { MdAccessTime, MdPets } from 'react-icons/md';
import { PiBirdFill, PiCatFill, PiDogFill, PiRabbitFill } from 'react-icons/pi';
import { GiFrog } from 'react-icons/gi';
import useWishlist from '../../hooks/useWishlist';
import Swal from 'sweetalert2';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { LuFileEdit } from 'react-icons/lu';
import { IoBookmarks, IoDocumentTextOutline } from 'react-icons/io5';
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const Blog = ({ blog, wishlist, profile, handleDeleteWishlist, handleDeleteBlog }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const axiosSecure = useAxiosSecure();
    const { refetch } = useWishlist();

    const { blog_title, category, image, short_description, posted_on, posted_by, _id } = blog;
    const formattedDate = moment(posted_on).format('MMMM DD, YYYY [at] hh:mm A');
    // console.log(blog);

    const handleAddToWishlist = () => {
        if (user && user?.email) {
            axios.post('https://furry-friends-server-nhb.vercel.app/wishlist', { blog_id: _id, blog_title, user_email: user.email, time_added: moment().format("YYYY-MM-DD HH:mm:ss") })
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success('Blog Added to Wishlist!');
                    } else {
                        toast.error(res.data?.message);
                    }
                    refetch();
                })
                .catch(error => {
                    // console.log(error);
                    console.error(error.response);
                })
        } else {
            toast.error('You should login first!');
            Swal.fire({
                title: "Oops! You're Not Logged in!",
                text: "Do You Want to Log in Now?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log Me in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // navigate("/login");
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (

        <div className='border p-3 flex flex-col shadow-md shadow-blue-950'>
            <Link to={`/blog-details/${_id}`}>
                <figure className='relative border p-1 mb-2 hover:scale-[1.03] transition-all duration-700'>
                    <img className='aspect-[2/1]' src={image} alt={blog_title} />
                    <h3 className="absolute bottom-1 left-1 pb-1 pt-[2px] pl-2 w-full bg-gradient-to-r from-furry via-[#1e3fada3] to-[#1e3fad01] font-jokeyOneSans tracking-wider text-lg flex items-center gap-1 text-white"><MdPets /> Category: {
                        category === "Cats" ? <span className='flex items-center gap-1'><PiCatFill />{category}</span>
                            : category === "Dogs" ? <span className='flex items-center gap-1'><PiDogFill /> {category}</span>
                                : category === "Birds" ? <span className='flex items-center gap-1'><PiBirdFill />{category}</span>
                                    : category === "Rabbits" ? <span className='flex items-center gap-1'><PiRabbitFill /> {category}</span>
                                        : <span className='flex items-center gap-1'><GiFrog /> {category}</span>
                    }</h3>
                </figure>
            </Link>
            {/* <hr className="my-2" /> */}
            <Link to={`/blog-details/${_id}`}><h3 className="font-kreonSerif hover:text-furry transition-all duration-700 text-xl md:text-2xl">{blog_title}</h3></Link>
            <p className='text-gray-500'>Posted by <span className="text-furry font-semibold">{posted_by}</span></p>
            <p className="text-gray-700 flex-grow my-2">{short_description}</p>
            <p className='text-gray-500 text-sm flex items-center gap-1'><MdAccessTime /> {formattedDate}</p>
            <hr className="my-4" />
            <div className=" rounded-b-xl flex justify-between items-center">
                {
                    profile
                        ? <Button onClick={() => handleDeleteBlog(_id, blog_title)} className={'border px-3 md:px-4 lg:px-3 xl:px-6 py-2 rounded-3xl text-xs md:text-sm lg:text-xs xl:text-base font-bold flex items-center gap-1'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} icon={<RiDeleteBin5Fill />} buttonText={'Delete Blog'}></Button>
                        : <Link to={`/blog-details/${_id}`}><Button className={'border px-3 md:px-4 lg:px-3 xl:px-6 py-2 rounded-3xl text-xs md:text-sm lg:text-xs xl:text-base font-bold flex items-center gap-1'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Read Blog'} icon={<IoDocumentTextOutline />}></Button></Link>
                }
                {wishlist
                    ? <Button onClick={() => handleDeleteWishlist(_id, blog_title)} className={'border px-3 md:px-4 lg:px-3 xl:px-6 py-2 rounded-3xl text-xs md:text-sm lg:text-xs xl:text-base font-bold flex items-center gap-1'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Remove Wishlist'} icon={<RiDeleteBin5Fill />}></Button>
                    : profile ? <Link to={`/update-blog/${_id}`}><Button
                        buttonText={'Update Blog'} hoverBgColor={'transparent'} hoverColor={'white'} color={'#1e40ad'}
                        className={'border px-3 md:px-4 lg:px-3 xl:px-6 py-2 rounded-3xl text-xs md:text-sm lg:text-xs xl:text-base font-bold flex items-center gap-1'} icon={<LuFileEdit />}
                    ></Button></Link>
                        : <Button onClick={handleAddToWishlist} className={'border px-3 md:px-4 lg:px-3 xl:px-6 py-2 rounded-3xl text-xs md:text-sm lg:text-xs xl:text-base font-bold flex items-center gap-1'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} buttonText={'Add to Wishlist'} icon={<IoBookmarks />}></Button>
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
    handleDeleteBlog: PropTypes.func,
}

export default Blog;