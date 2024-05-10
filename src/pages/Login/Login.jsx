import banner from '../../assets/cat-login-custom.png';
import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userLogin, googleLogin, facebookLogin, githubLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = data => {
        const { email, password } = data;
        userLogin(email, password)
            .then(() => {
                toast.success("Successfully Logged in!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/invalid-credential).") {
                    Swal.fire({
                        title: 'Error!',
                        text: "Email & Password Did Not Match!",
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Successfully Logged in!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
                    Swal.fire({
                        title: 'Login Failed!',
                        text: "Popup Closed by User!",
                        icon: 'warning',
                        confirmButtonText: 'Close'
                    });
                } else if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    Swal.fire({
                        title: 'Error!',
                        text: "Account Exists for this Email with Different Credential!",
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message.split(': ')[1] || error.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            })
    }

    const handleFacebookLogin = () => {
        facebookLogin()
            .then(() => {
                toast.success("Successfully Logged in!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
                    Swal.fire({
                        title: 'Login Failed!',
                        text: "Popup Closed by User!",
                        icon: 'warning',
                        confirmButtonText: 'Close'
                    });
                } else if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    Swal.fire({
                        title: 'Error!',
                        text: "Account Exists for this Email with Different Credential!",
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message.split(': ')[1] || error.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(() => {
                toast.success("Successfully Logged in!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
                    Swal.fire({
                        title: 'Login Failed!',
                        text: "Popup Closed by User!",
                        icon: 'warning',
                        confirmButtonText: 'Close'
                    });
                } else if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    Swal.fire({
                        title: 'Error!',
                        text: "Account Exists for this Email with Different Credential!",
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message.split(': ')[1] || error.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            })
    }

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Login - Furry Friends</title>
            </Helmet>

            <div className="flex flex-col md:flex-row-reverse items-center md:items-start justify-between gap-6">
                <figure className='flex-1 w-1/2 md:w-full'>
                    <h2 className="text-lg md:text-2xl font-semibold text-center mb-8">Please, Login</h2>
                    <img src={banner} alt="Banner" />
                </figure>
                <div className="flex-1">
                    <h3 className='text-lg md:text-xl font-medium text-center mb-6'>Login with Social Media</h3>
                    <div className="flex gap-4">
                        <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <FaGoogle />
                            <p>Google</p>
                        </button>
                        <button onClick={handleGithubLogin} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <FaGithub />
                            <p>GitHub</p>
                        </button>
                        <button onClick={handleFacebookLogin} aria-label="Login with Facebook" role="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <FaFacebook />
                            <p>Facebook</p>
                        </button>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full dark:text-gray-600" />
                        <p className="px-3 dark:text-gray-600">OR</p>
                        <hr className="w-full dark:text-gray-600" />
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6 px-4 lg:px-20 py-4 lg:py-10 shadow-lg shadow-[#333335] border border-[#d3d0d0] rounded-md">
                        <h2 className="text-2xl font-medium">Please, Login</h2>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email">Your Email</label>
                            <input
                                {...register("email", {
                                    required:
                                        { value: true, message: "You must provide your email address." }
                                })}
                                className="p-2 rounded-lg bg-[#F3F3F3]" type="email" name="email" id="email" placeholder="Your Email" />
                            {
                                errors.email && <p className="text-red-700">{errors.email.message}</p>
                            }
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password">Your Password</label>
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required:
                                            { value: true, message: "You must provide a valid password." }
                                    })}
                                    className="p-2 rounded-lg w-full bg-[#F3F3F3]" type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Your Password" />
                                {
                                    errors.password && <p className="text-red-700">{errors.password.message}</p>
                                }
                                <span className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log into Your Account</button>
                        <p className="text-center text-sm md:text-base font-medium">New to this site? <Link className="text-red-700 hover:text-blue-800" to={'/register'}>Register Here!</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;