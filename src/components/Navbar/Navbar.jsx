import "./Navbar.css";
import toast from "react-hot-toast";
import defaultPP from '../../assets/user.png';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdMenuOpen, MdOutlineClose, MdOutlinePostAdd } from "react-icons/md";
// import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth";
import logo from '../../assets/paw.png'
import { FaPaw, FaSignOutAlt } from "react-icons/fa";
import { IoBookmarksOutline, IoHome } from "react-icons/io5";
import { BsListStars } from "react-icons/bs";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
// import useWishlist from "../../hooks/useWishlist";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { ImProfile } from "react-icons/im";
import useWishlistCount from "../../hooks/useWishListCount";

const Navbar = () => {
    const { user, userLoading, logOut } = useAuth();
    const [openNavbar, setOpenNavbar] = useState(false);
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);
    // const { wishlistBlogs } = useWishlist();
    const { wishlistCount } = useWishlistCount();

    const sidebarRef = useRef(null);
    const dropdownRef = useRef(null);

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
                setOpenNavbar(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [sidebarRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out Successfully!");
            })
            .catch(error => {
                toast.error(error.message.split(': ')[1]);
            })
    }

    return (
        <nav className="max-w-[1920px] flex items-center gap-0 md:gap-4 mx-auto shadow-md px-3 py-4 md:px-10 xl:px-20 sticky top-0 bg-gradient-to-l from-[#829ae8fa] to-[#7690e5fa] bg-opacity-100 z-50 text-[#1e4080]">
            <div ref={sidebarRef} className="min-[1170px]:hidden max-[430px]:text-3xl text-5xl cursor-pointer" onClick={() => setOpenNavbar(!openNavbar)}>
                {
                    openNavbar
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
                    <ul className={`w-3/5 min-[1170px]:w-full flex flex-col min-[1170px]:flex-row justify-start min-[1170px]:justify-center gap-2 text-lg md:text-xl font-semibold duration-500 absolute min-[1170px]:static shadow-lg shadow-slate-700 min-[1170px]:shadow-none h-screen min-[1170px]:h-auto p-4 min-[1170px]:p-0 ${openNavbar ? 'left-0 min-[430px]:top-20 top-[68px] md:top-[88px] bg-gradient-to-t from-[#7690e5fa] to-[#829ae8fa] bg-opacity-100 flex z-30' : '-left-full min-[430px]:top-20 top-[68px] md:top-[88px]'}`}>
                        <NavLink className={'flex gap-0.5 items-center'} to={'/'}><IoHome className="pb-[2px] text-xl" /> Home</NavLink>
                        <NavLink className={'flex gap-0.5 items-center'} to={'/all-blogs'}><FaPaw className="pb-[2px] text-xl" /> All Blogs</NavLink>
                        <NavLink className={'flex gap-0.5 items-center'} to={'/featured-blogs'}><BsListStars className="text-xl" />Featured Blogs</NavLink>
                        {
                            user?.email && <>
                                <NavLink className={'flex gap-0.5 items-center'} to={'/add-blog'}><MdOutlinePostAdd className="pb-[2px] text-2xl" />Add Blog</NavLink>
                                <NavLink className={'flex gap-0.5 items-center'} to={'/wishlist'}>
                                    <IoBookmarksOutline className="pb-[2px] text-xl" />Wishlist
                                    <sup>{wishlistCount > 0 && wishlistCount}</sup>
                                </NavLink>
                            </>
                        }
                    </ul>
                </div>

                <ToggleTheme />

                {
                    userLoading ? <div className="flex items-center justify-center space-x-2">
                        <img className="w-9 md:w-14 h-9 md:h-14" src={loadingRipple} alt="User Loading..." />
                    </div>
                        : user
                            ? <div className="flex items-center gap-2 md:gap-3">
                                {/* <Tooltip anchorSelect=".nameIcon" place="right">
                                    {userName}
                                </Tooltip> */}
                                <div className="relative" ref={dropdownRef}>
                                    <img
                                        className="nameIcon w-9 md:w-14 h-9 md:h-14 rounded-full border-2 p-[2px] border-furry hover:opacity-70 transition-all duration-1000 cursor-pointer"
                                        src={profilePicture} alt={userName}
                                        onClick={() => setProfileOpen(!profileOpen)}
                                    />
                                    {profileOpen && (
                                        <ul className="dropdown-arrow absolute md:right-[16%] right-[1%] mt-2 w-48 overflow-x-auto-auto rounded-md shadow-md z-30 bg-[#1e3fadea] shadow-[#8689ee] p-2 flex flex-col gap-2 animate__animated animate__bounceIn">
                                            <NavLink className={'flex gap-2 items-center text-white'} to={'/profile'}><ImProfile />{userName}</NavLink>
                                            <Link to={''} className={'flex gap-2 items-center text-white'} onClick={handleLogout}><FaSignOutAlt />Logout</Link>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            : <ul className="font-jokeyOneSans flex items-center gap-1 md:gap-3 text-lg md:text-xl xl:text-2xl font-medium md:pt-0 pt-1">
                                <NavLink to={'/login'}>Login</NavLink>
                                {/* <NavLink to={'/register'}>Register</NavLink> */}
                            </ul>
                }
            </div>
        </nav>
    );
};

export default Navbar;