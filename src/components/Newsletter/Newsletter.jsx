import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import newsletter from '../../assets/newsletter.png'

const Newsletter = () => {
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1.2]);

    const handleNewsletter = (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim(" ")
        if (!email) {
            e.target.reset();
            return toast.error('Enter Your Email Address First!');
        }
        toast.success("Thank You for Subscribing!");
        e.target.reset();
    }

    return (
        <motion.section style={{ scale }} className="text-center my-12">
            <motion.div
                style={{
                    scaleY: scrollYProgress
                }}>
                <h3 className="text-furry font-bold max-[430px]:text-xl text-2xl md:text-4xl mb-4">Subscribe to Our Newsletter</h3>
                <h4 className="text-furry md:text-xl mb-2 font-kreonSerif">Join Our Furry Friends Family</h4>
                <p className="text-gray-600 mx-auto w-4/5 md:w-3/5 text-center font-semibold mb-6 max-[430px]:text-base md:text-lg">Subscribe to our newsletter today and unlock a world of exclusive pet content, personalized recommendations, and community engagement. Get early access to our latest blogs!</p>
            </motion.div>
            <figure>
                <img className="w-4/5 md:w-1/4 block mx-auto" src={newsletter} alt="Newsletter" />
            </figure>
            <motion.form
                style={{
                    scaleY: scrollYProgress
                }}
                onSubmit={handleNewsletter} className="flex-1 flex flex-col items-center justify-center gap-2 px-8 lg:px-0">
                <input placeholder="Enter Your Email Address" className="p-2 rounded-3xl text-center border border-furry focus:outline-0 w-4/5 md:3/5 lg:w-2/5 focus:bg-[#6262b69b] transition duration-500 mb-4" type="email" name="email" id="email" />
                <Button buttonType={'submit'} color={'#272c50'} hoverBgColor={'transparent'} hoverColor={'white'} className={'border !rounded-3xl font-bold md:text-xl !px-4 !py-2'} buttonText={"Subscribe to Newsletter"}></Button>
            </motion.form>
        </motion.section>
    );
};

export default Newsletter;