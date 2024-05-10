import "./Navbar.css";
import toast from "react-hot-toast";
import defaultPP from '../../assets/user.png';
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { MdMenuOpen, MdOutlineClose } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

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

    const navItems = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/all-blogs'}>All Blogs</NavLink>
        <NavLink to={'/featured-blogs'}>Featured Blogs</NavLink>
        {
            user && <>
                <NavLink to={'/add-blog'}>Add Blog</NavLink>
                <NavLink to={'/wishlist'}>Wishlist</NavLink>
            </>
        }
        <NavLink to={'/contact'}>Contact</NavLink>
    </>

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
        <nav className="max-w-[1920px] flex items-center gap-0 md:gap-4 mx-auto shadow-md px-2 py-3 md:px-20 sticky top-0 bg-gradient-to-l from-[#a0a4beed] to-[#7466b4f6] bg-opacity-100 z-20">
            <div ref={sidebarRef} className="min-[1170px]:hidden text-5xl cursor-pointer" onClick={() => setOpen(!open)}>
                {
                    open
                        ? <MdOutlineClose className="text-[#ea0c0c] hover:text-[midnightblue] transform transition-all duration-1000"></MdOutlineClose>
                        : <MdMenuOpen className="text-[midnightblue] hover:text-[#ea0c0c] transform transition-all duration-1000"></MdMenuOpen>
                }
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1" title="Furry Friends">
                    <Link to="/">
                        <div className="flex flex-col">
                            <h3 className="text-base md:text-2xl font-semibold text-[midnightblue]">Furry Friends</h3>
                        </div></Link>
                </div>
                {/* Navbar Items/NavLinks/Routes */}
                <div className="text-sm xl:text-base">
                    <ul className={`w-1/2 min-[1170px]:w-full flex flex-col min-[1170px]:flex-row justify-start min-[1170px]:justify-center gap-2 font-medium duration-500 absolute min-[1170px]:static shadow-lg shadow-slate-700 min-[1170px]:shadow-none h-screen min-[1170px]:h-auto p-4 min-[1170px]:p-0 ${open ? 'left-0 top-[72px] bg-gradient-to-t from-[#a0a4beed] to-[#6b5caffb] bg-opacity-100 flex z-10' : '-left-full top-[72px]'}`}>
                        {navItems}
                    </ul>
                </div>

                {
                    user
                        ? <div className="flex items-center gap-2 md:gap-3">
                            <Tooltip anchorSelect=".nameIcon" place="bottom">
                                {userName}
                            </Tooltip>
                            <Link to={'/profile'}><img className="nameIcon w-9 md:w-14 h-9 md:h-14 rounded-full border-2 p-[2px] border-[#0e1d42e8] hover:opacity-70 transition-all duration-1000" src={profilePicture} alt={userName} /></Link>
                            <Tooltip anchorSelect=".logOutIcon" place="bottom">
                                Log out
                            </Tooltip>
                            <div className="logOutIcon flex items-center justify-center w-9 md:w-14 h-9 md:h-14 rounded-full border-2 border-[midnightblue] p-[2px] cursor-pointer text-2xl md:text-4xl hover:text-3xl hover:md:text-5xl bg-[midnightblue] text-[#ffffff] hover:text-[#ea0c0c] hover:bg-[#e0d5d5] hover:border-[#ea0c0c] transform transition-all duration-1000" onClick={handleLogout}>
                                <IoMdLogOut />
                            </div>
                        </div>
                        : <ul className="flex items-center gap-1 md:gap-3 text-sm xl:text-base font-medium">
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </ul>
                }
            </div>
        </nav>
    );
};

export default Navbar;