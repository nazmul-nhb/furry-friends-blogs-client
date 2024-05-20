import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import axios from "axios";
import blocks from '../../assets/blocks.svg';
import pacman from '../../assets/red-pacman.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './Slider.css';

import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

const Slider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { isPending, isError, error, data: bannerBlogs } = useQuery({
        queryKey: ['bannerBlogs'],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/featured-blogs`);
            return res.data;
        }
    })

    if (isPending) {
        return (
            <div className="flex items-center justify-center">
                <img src={blocks} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <span className="text-red-700">{error.message}</span>
                <img src={pacman} alt="Error!" />
            </div>
        )
    }

    return (
        <div className=''>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: false,
                    disableOnInteraction: false,
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                className="mySwiper2 aspect-[3/1.4]"
            >
                {bannerBlogs?.map(blog => <SwiperSlide key={blog._id}>
                    <div className="flex relative">
                        <img className='w-full aspect-[3/1.5]' src={blog.image} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full bg-gradient-to-l from-[#2b396660] to-[#4b6ee277] h-full py-4 flex flex-col gap-4 items-center justify-around">
                            <h3 className="font-kreonSerif max-[430px]:text-base text-2xl md:text-3xl lg:text-6xl font-black !leading-snug text-white px-8">{blog.blog_title}</h3>
                            <Link className='border border-furry rounded-3xl px-3 py-1 md:py-2 md:px-4 text-lg md:text-2xl font-bold hover:bg-[#ffffff68] bg-[#1e3fada3] hover:text-furry text-white transition-all duration-500' to={`/blog-details/${blog._id}`}>Read Full Blog</Link>
                        </div>
                    </div>
                </SwiperSlide>
                )}
            </Swiper>
            {/* Thumbnails for Banner Images */}
            <Swiper
                onSwiper={setThumbsSwiper}
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: false,
                    disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-2"
            >
                {bannerBlogs?.map(blog => <SwiperSlide key={blog._id}>
                    <img className='w-full aspect-[3/1.6]' src={blog.image} />
                </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default Slider;