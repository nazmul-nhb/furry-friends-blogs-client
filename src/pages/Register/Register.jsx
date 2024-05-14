import banner from '../../assets/dog-register-custom.png';
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, logOut, googleLogin, facebookLogin, githubLogin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (errors.password) {
            toast.error(errors.password.message, { duration: 2000 })
        }
        if (errors.name) {
            toast.error(errors.name.message, { duration: 2000 })
        }
        if (errors.photo) {
            toast.error(errors.photo.message, { duration: 2000 })
        }
        if (errors.email) {
            toast.error(errors.email.message, { duration: 2000 })
        }
    }, [errors.email, errors.name, errors.password, errors.photo])

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
                toast.success("Successful! Please, Login Now!");
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
                <title>Register - Furry Friends Blogs</title>
            </Helmet>
            <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 font-kreonSerif">Please, Register</h2>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8'>
                <figure className='flex-1 w-1/2 lg:w-full'>
                    <img src={banner} alt="Register Degister Banner" />
                </figure>
                {/* Social Media Login */}
                <div className='flex-1'>
                    <div className="text-blue-950">
                        <h3 className='text-lg md:text-xl font-medium text-center mb-6 font-kreonSerif'>Register & Login with Social Media</h3>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 text-xl font-bold tracking-wider">
                            <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md border-[#dc3c2a] bg-[#dc3c2a] text-[#fff] hover:text-[#dc3c2a] hover:bg-transparent transition-all duration-500">
                                <FaGoogle />
                                <p>Google</p>
                            </button>
                            <button onClick={handleGithubLogin} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md border-[#010409] bg-[#010409] text-[#fff] hover:text-[#010409] hover:bg-transparent transition-all duration-500">
                                <FaGithub />
                                <p>GitHub</p>
                            </button>
                            <button onClick={handleFacebookLogin} aria-label="Login with Facebook" role="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md border-[#0866ff] bg-[#0866ff] text-[#fff] hover:text-[#0866ff] hover:bg-transparent transition-all duration-500">
                                <FaFacebook />
                                <p>Facebook</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full dark:text-gray-600" />
                        <p className="px-3 dark:text-gray-600">OR</p>
                        <hr className="w-full dark:text-gray-600" />
                    </div>
                    {/* Email Password Login */}
                    <form onSubmit={handleSubmit(handleRegister)} className="w-full flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-[#333335] border border-[#d3d0d0] rounded-md">
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
                                        { value: true, message: "Provide a valid email address!" }
                                })}
                                className="p-2 rounded-lg bg-[#F3F3F3]" type="email" name="email" id="email" placeholder="Enter Your Email" />
                            {
                                errors.email && <p className="text-red-700">{errors.email.message}</p>
                            }
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="photo">Photo URL for Your Profile*</label>
                            <input
                                {...register("photo", {
                                    required:
                                        { value: true, message: "Provide a valid photo URL." }
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
                                            value: 6, message: "Password must contain 6 characters!"
                                        },
                                        validate: {
                                            isCapital: (value) => {
                                                if (/(?=.*[A-Z])/.test(value)) {
                                                    return true;
                                                }
                                                return "Password must contain capital letter!"
                                            },
                                            // isLower: (value) => {
                                            //     if (/(?=.*[a-z])/.test(value)) {
                                            //         return true;
                                            //     }
                                            //     return "Password must contain small letter!"
                                            // }
                                            isNumeric: (value) => {
                                                if (/(?=.*[0-9])/.test(value)) {
                                                    return true;
                                                }
                                                return "Password must contain a number!"
                                            },
                                            isSpecialChar: (value) => {
                                                if (/(?=.*[!@#$%^&*()_+\-~=[\]{};'`:"\\|,.<>/?])/.test(value)) {
                                                    return true;
                                                }
                                                return "Password must contain a symbol!"
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
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register New Account</button>
                        <p className="text-center text-sm md:text-base font-medium">Already have an Account? <Link className="hover:pl-4 text-[#3c5cc3] font-bold hover:text-furry transition-all duration-500" to={'/login'}>Login Here!</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;