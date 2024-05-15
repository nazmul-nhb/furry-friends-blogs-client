import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import logo from '../../assets/paw.png'

const Footer = () => {

    return (
        <footer className="max-w-[1920px] mx-auto bg-gradient-to-l to-[#7b93e1fa] from-[#4c69c6fa] mt-8 md:mt-20">
            <div className="px-6 py-8 md:py-12 md:px-20">
                <div className="flex gap-4 lg:gap-0 flex-col lg:flex-row justify-center lg:items-center lg:justify-between">
                    <div className="flex gap-1.5 flex-col items-center justify-center mx-auto">
                        <img className="w-10 md:w-16" src={logo} alt="Logo" />
                        <h3 className="font-jokeyOneSans max-[430px]:text-lg text-2xl md:text-4xl font-semibold tracking-wider text-furry">Furry Friends <span className="text-white">Blogs</span></h3>
                    </div>
                </div>
                <hr className="text-white my-8" />
                <div className="flex flex-col justify-center items-center gap-4 text-[#d8d8dc]">
                    <div className="flex-1 text-center">
                        <h3><a href="#">Terms & Conditions</a></h3>
                        <h3><a href="#">Privacy Policy</a></h3>
                    </div>
                    {/* Social Media */}
                    <div className="flex-1 flex flex-row gap-8 justify-center text-2xl">
                        <a href="https://x.com/nhb42" target="_blank" className="hover:text-furry">
                            <FaXTwitter></FaXTwitter></a>
                        <a href="https://fb.com/nazmul.batchu" target="_blank" className="hover:text-furry">
                            <FaFacebookF></FaFacebookF></a>
                        <a href="https://www.instagram.com/nazmulbatchu" target="_blank" className="hover:text-[darkred]">
                            <FaInstagram></FaInstagram></a>
                        <a href="https://github.com/nazmul-nhb/" target="_blank" className="hover:text-furry">
                            <FaGithub></FaGithub></a>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 items-center">
                        <span className="font-semibold">Furry Friends Blogs</span>
                        <span className="text-[#d8d8dc]">2024 &copy; All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;