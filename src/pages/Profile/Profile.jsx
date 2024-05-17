import useAuth from "../../hooks/useAuth";
import { Helmet } from 'react-helmet-async';
import moment from 'moment';

const Profile = () => {
    const { user } = useAuth();

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4 space-y-6 flex flex-col justify-center items-center">
            <Helmet>
                <title>Profile: {user.displayName} - Furry Friends Blogs</title>
            </Helmet>
            <div className="bg-gradient-to-l from-[#829ae8fa] to-[#7690e5fa] flex flex-col items-center gap-6 w-[96%] md:w-4/5 lg:w-3/4 mx-auto px-4 lg:px-20 py-6 lg:py-10 shadow-lg shadow-[#3c3939]">
                <div className="flex flex-col gap-3 items-center my-4">
                    <img className="rounded-full border-2 p-1 border-furry w-24 md:w-32 h-24 md:h-32" src={user.photoURL} alt={user.displayName} title={user.displayName} />
                    <h4 className="text-lg md:text-3xl font-bold">{user.displayName}</h4>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-2 md:text-xl">
                    <h4 className="font-semibold">Registered Email:</h4>
                    {user.email}
                </div>
                {
                    user.emailVerified
                        ? <p className="text-furry">Your Email is Verified!</p>
                        : <p className="text-red-700">Your Email is Not Verified!</p>
                }
                <div className="flex flex-col items-center md:flex-row gap-2 md:text-xl">
                    <h4 className="font-semibold">Account Created on:</h4>
                    {moment(user.metadata.creationTime).format('MMMM DD, YYYY [at] hh:mm:ss A')}
                </div>
                <div className="flex flex-col items-center md:flex-row gap-2 md:text-xl">
                    <h4 className="font-semibold">Last Login Time:</h4>
                    {moment(user.metadata.lastSignInTime).format('MMMM DD, YYYY [at] hh:mm:ss A')}
                </div>
            </div>
        </section>
    );
};

export default Profile;