import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ScrollIndicator = () => {
    const [visible, setVisible] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const handleScrollIndicator = () => {
            const scroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scroll / height) * 100;
            document.getElementById("scroll-bar").style.width = scrolled + "%";

            // show scroll percentage beside scrollbar
            if (scrolled === 0) {
                // document.getElementById("scroll-percentage").textContent = "";
                setVisible(false);
            } else {
                setVisible(true);
                // document.getElementById("scroll-percentage").textContent = ""; // Math.round(scrolled) + "%";
            }
        };

        window.addEventListener('scroll', handleScrollIndicator);
        return () => window.removeEventListener('scroll', handleScrollIndicator);
    }, []);

    return (
        <div className={`max-w-[1920px] w-full mt-[1px] flex items-center gap-1 h-1 md:h-2 fixed ${user ? 'min-[430px]:top-20 top-[68px] md:top-[88px]' : 'min-[430px]:top-20 max-[429px]:top-[68px] md:top-20 lg:top-[72px] xl:top-[72px]'} left-0 right-0 mx-auto z-20 ${visible ? 'bg-gradient-to-l from-[#e3e7f4d4] to-[#7690e5d2]' : 'bg-transparent'}`}>
            <div className="h-1 md:h-2 bg-furry w-[0%]" id="scroll-bar"></div>
            <div className="text-xs font-semibold font-kreonSerif text-furry" id="scroll-percentage"></div>
        </div>
    );
};

export default ScrollIndicator;
