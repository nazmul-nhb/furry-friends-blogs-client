import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import catLoading from '../../assets/blue-cat.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './Slider.css';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Slider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { isPending, isError, error, data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/blogs?size=12&sort=1`);
            return res.data;
        }
    })

    if (isPending) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <img src={catLoading} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <span>Error: {error.message}</span>
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
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {blogs?.map(blog => <SwiperSlide key={blog._id}>
                    <div className="flex relative">
                        <img className='w-full' src={blog.image} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full bg-[#0000ff52]">
                            <h3 className="text-3xl font-bold leading-snug text-white px-8">{blog.blog_title}</h3>
                            <Link className="" to={`/blog-details/${blog._id}`}>
                                <Button buttonText={'Read Full Blog'}></Button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                )}
            </Swiper>
            {/* Thumnails for Banner Images */}
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-4"
            >
                {blogs?.map(blog => <SwiperSlide key={blog._id}>
                    <img className='w-full' src={blog.image} />
                </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default Slider;