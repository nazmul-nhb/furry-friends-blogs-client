import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const Newsletter = () => {
    const handleNewsletter = (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim(" ")
        if (!email) {
            e.target.reset();
            return toast.error('Enter Your Email Address First!');
        }
        toast.success("Subscribed to Newsletter!");
        e.target.reset();
    }

    return (
        <section className="my-8">
            <div className="">
                <h3 className="text-center text-furry font-bold max-[430px]:text-lg text-2xl md:text-4xl mb-4">Subscribe to Our Newsletter</h3>
                <p className="mx-auto w-4/5 md:w-3/5 text-center font-semibold mb-6 max-[430px]:text-sm md:text-lg">Get Updates for Your Favorite Pets. You can unsubscribe anytime!</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex-1 flex flex-col items-center justify-center gap-2 px-8 lg:px-0">
                <input placeholder="Enter Your Email Address" className="p-2 rounded-3xl text-center border border-furry focus:outline-0 w-full md:w-1/2 focus:bg-[#6262b69b] transition duration-500" type="email" name="email" id="email" />
                <Button buttonType={'submit'} color={'#272c50'} hoverBgColor={'transparent'} hoverColor={'white'} className={'border !rounded-3xl font-bold md:text-xl !px-4 !py-2'} buttonText={"Subscribe to Newsletter"}></Button>
            </form>
        </section>
    );
};

export default Newsletter;