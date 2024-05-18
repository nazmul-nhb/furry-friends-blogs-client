import "./Navbar.css";
import toast from "react-hot-toast";
import defaultPP from '../../assets/user.png';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdMenuOpen, MdOutlineClose, MdOutlinePostAdd } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth";
import logo from '../../assets/paw.png'
import { FaPaw, FaSignOutAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaBookBookmark } from "react-icons/fa6";
import { BsListStars } from "react-icons/bs";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import catLoading from '../../assets/blue-cat.svg';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    // const axiosSecure = useAxiosSecure();

    // const { isPending, isError, error, data: wishlistBlogs } = useQuery({
    //     queryKey: ['wishlistBlogs'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
    //         return res.data;
    //     },
    //     enabled: !!user,
    // });

    const sidebarRef = useRef(null);

    useEffect(() => {
        if (user) {
            setUserName(user?.displayName || 'No Name Provided');
            setProfilePicture(user?.photoURL || defaultPP);
        } else {
            setUserName('No Name Provided');
            setProfilePicture(defaultPP);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [sidebarRef]);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out Successfully!");
            })
            .catch(error => {
                toast.error(error.message.split(': ')[1]);
            })
    }

    // if (user && isPending) {
    //     return (
    //         <div className="flex items-center justify-center space-x-2">
    //             <img src={catLoading} alt="Loading..." />
    //         </div>
    //     )
    // }

    // if (user && isError) {
    //     return (
    //         <div className="flex items-center justify-center space-x-2">
    //             <span>Error: {error.message}</span>
    //         </div>
    //     )
    // }

    return (
        <nav className="max-w-[1920px] flex items-center gap-0 md:gap-4 mx-auto shadow-md px-3 py-4 md:px-10 xl:px-20 sticky top-0 bg-gradient-to-l from-[#829ae8fa] to-[#7690e5fa] bg-opacity-100 z-50 text-[#1e4080]">
            <div ref={sidebarRef} className="min-[1170px]:hidden max-[430px]:text-3xl text-5xl cursor-pointer" onClick={() => setOpen(!open)}>
                {
                    open
                        ? <MdOutlineClose className="text-[#fff] hover:text-furry transform transition-all duration-2000"></MdOutlineClose>
                        : <MdMenuOpen className="text-furry hover:text-[#fff] transform transition-all duration-2000"></MdMenuOpen>
                }
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1" title="Furry Friends">
                    <Link to="/">
                        <div className="flex gap-1.5 items-center">
                            <img className="max-[430px]:w-5 w-7 md:w-10" src={logo} alt="Logo" />
                            <h3 className="font-jokeyOneSans max-[430px]:text-lg text-2xl md:text-4xl font-semibold tracking-wider text-furry">Furry Friends <span className="text-white">Blogs</span></h3>
                        </div>
                    </Link>
                </div>
                {/* Navbar Items/NavLinks/Routes */}
                <div className="text-sm xl:text-base">
                    <ul className={`w-3/5 min-[1170px]:w-full flex flex-col min-[1170px]:flex-row justify-start min-[1170px]:justify-center gap-2 text-lg md:text-xl font-semibold duration-500 absolute min-[1170px]:static shadow-lg shadow-slate-700 min-[1170px]:shadow-none h-screen min-[1170px]:h-auto p-4 min-[1170px]:p-0 ${open ? 'left-0 min-[430px]:top-20 top-[68px] md:top-[88px] bg-gradient-to-t from-[#7690e5fa] to-[#829ae8fa] bg-opacity-100 flex z-10' : '-left-full min-[430px]:top-20 top-[68px] md:top-[88px]'}`}>
                        <NavLink className={'flex gap-0.5 items-center'} to={'/'}><IoHome className="pb-[2px] text-xl" /> Home</NavLink>
                        <NavLink className={'flex gap-0.5 items-center'} to={'/all-blogs'}><FaPaw className="pb-[2px] text-xl" /> All Blogs</NavLink>
                        <NavLink className={'flex gap-0.5 items-center'} to={'/featured-blogs'}><BsListStars className="text-xl" />Featured Blogs</NavLink>
                        {
                            user && <>
                                <NavLink className={'flex gap-0.5 items-center'} to={'/add-blog'}><MdOutlinePostAdd className="pb-[2px] text-2xl" />Add Blog</NavLink>
                                <NavLink className={'flex gap-0.5 items-center'} to={'/wishlist'}><FaBookBookmark className="pb-[2px] text-xl" />Wishlist</NavLink>
                                {/* <sup>{wishlistBlogs?.length > 0 && wishlistBlogs?.length}</sup> */}
                            </>
                        }
                    </ul>
                </div>

                {
                    user
                        ? <div className="flex items-center gap-2 md:gap-3">
                            <Tooltip anchorSelect=".nameIcon" place="bottom">
                                {userName}
                            </Tooltip>
                            <Link to={'/profile'}><img className="nameIcon w-9 md:w-14 h-9 md:h-14 rounded-full border-2 p-[2px] border-furry hover:opacity-70 transition-all duration-1000" src={profilePicture} alt={userName} /></Link>
                            <Tooltip anchorSelect=".logOutIcon" place="bottom">
                                Log out
                            </Tooltip>
                            <div className="logOutIcon font-bold flex items-center justify-center w-9 md:w-14 h-9 md:h-14 rounded-full border-2 border-furry pl-1 md:pl-1 cursor-pointer text-2xl md:text-3xl hover:text-[28px] hover:md:text-4xl bg-furry text-[#ffffff] hover:text-furry hover:bg-transparent transform transition-all duration-1000" onClick={handleLogout}>
                                <FaSignOutAlt />
                            </div>
                        </div>
                        : <ul className="font-jokeyOneSans flex items-center gap-1 md:gap-3 text-base md:text-xl font-medium md:pt-0 pt-1">
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </ul>
                }
            </div>
        </nav>
    );
};

export default Navbar;