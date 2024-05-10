import banner from '../../assets/dog-register-custom.png';
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, logOut, googleLogin, facebookLogin, githubLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = data => {
        const { name, photo, email, password } = data;

        createUser(email, password)
            .then(result => {
                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => { })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message.split(': ')[1] || error.message,
                            icon: 'error',
                            confirmButtonText: 'Close'
                        });
                    })
                toast.success("Registration Successful! Please, Login Now!");
                logOut();
                navigate('/login');
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    Swal.fire({
                        title: 'Registration Failed!',
                        text: "Already Exists! Your Email is Registered with Different Credential!",
                        icon: 'warning',
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

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Successfully Logged in!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
                    Swal.fire({
                        title: 'Warning!',
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
                        title: 'Error!',
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
                        title: 'Error!',
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
                <title>Register - Furry Friends</title>
            </Helmet>
            <div className='flex flex-col md:flex-row justify-between gap-6'>
                <figure className='flex-1'>
                    <h2 className="text-lg md:text-2xl font-semibold text-center">Please, Register</h2>
                    <img src={banner} alt="Banner" />
                </figure>
                <div className='flex-1'>
                    <h3 className='text-lg md:text-xl font-medium text-center mb-6'>Register with Social Media</h3>
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
                    <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-6 px-4 lg:px-20 py-4 lg:py-10 shadow-lg shadow-[#333335] border border-[#d3d0d0] rounded-md">
                        <h3 className='text-lg md:text-xl font-medium text-center'>Register with Email & Password</h3>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="name">Your Name *</label>
                            <input
                                {...register("name", {
                                    required:
                                        { value: true, message: "You must provide your name." }
                                })}
                                className="p-2 rounded-lg bg-[#F3F3F3]" type="text" name="name" id="name" placeholder="Enter Your Name" />
                            {
                                errors.name && <p className="text-red-700">{errors.name.message}</p>
                            }
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="email">Your Email *</label>
                            <input
                                {...register("email", {
                                    required:
                                        { value: true, message: "You must provide a valid email address." }
                                })}
                                className="p-2 rounded-lg bg-[#F3F3F3]" type="email" name="email" id="email" placeholder="Enter Your Email" />
                            {
                                errors.email && <p className="text-red-700">{errors.email.message}</p>
                            }
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="photo">Your Photo URL *</label>
                            <input
                                {...register("photo", {
                                    required:
                                        { value: true, message: "You must provide a valid photo URL." }
                                })}
                                className="p-2 rounded-lg bg-[#F3F3F3]" type="text" name="photo" id="photo" placeholder="Enter Your Photo URL" />
                            {
                                errors.photo && <p className="text-red-700">{errors.photo.message}</p>
                            }
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="password">Your Password *</label>
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true, message: "You must choose a password."
                                        },
                                        minLength: {
                                            value: 6, message: "Password should be at least 6 characters long!"
                                        },
                                        validate: {
                                            isUpper: (value) => {
                                                if (/(?=.*[A-Z])/.test(value)) {
                                                    return true;
                                                }
                                                return "Password must contain at least 1 upper case character!"
                                            },
                                            isLower: (value) => {
                                                if (/(?=.*[a-z])/.test(value)) {
                                                    return true;
                                                }
                                                return "Password must contain at least 1 lower case character!"
                                            }
                                        }
                                    })}
                                    className="p-2 rounded-lg w-full bg-[#F3F3F3]" type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter Your Password" />
                                <span className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>
                        </div>
                        {
                            errors.password && (
                                <p className="text-red-700">{errors.password.message}</p>)
                        }
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register New Account</button>
                        <p className="text-center text-sm md:text-base font-medium">Already have an Account? <Link className="text-red-700 hover:text-blue-800" to={'/login'}>Login Here!</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;