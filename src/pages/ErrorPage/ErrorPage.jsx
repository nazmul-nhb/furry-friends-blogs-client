import errorCat from '../../assets/cat_error.json'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lottie from 'lottie-react';
// import Error404 from '../../assets/error-404.svg';

const ErrorPage = () => {
    return (
        <section className="flex items-center h-svh sm:p-16 dark:bg-gray-50 dark:text-gray-800">
            <Helmet>
                <title>Error : : 404</title>
            </Helmet>
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-6 space-y-2 text-center">
                    <Lottie className='mt-8' animationData={errorCat} />
                <p className="text-lg font-semibold md:text-3xl text-red-800">Page Not Found!</p>
                <p className="text-furry mt-4 mb-8 dark:text-gray-600">But You can Find Numerous Blogs on Our Homepage!</p>
                <Link to={'/'} className="px-8 py-3 font-semibold bg-furry text-white border border-furry rounded-3xl hover:bg-transparent hover:text-furry transition duration-500">Back to Homepage</Link>
            </div>
        </section>
    );
};

export default ErrorPage;
