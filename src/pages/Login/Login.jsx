import banner from "../../assets/cat-login-custom.png";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { user, userLogin, setUserLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	if (user) {
		navigate(from, { replace: true });
	}

	useEffect(() => {
		if (errors.email) {
			toast.error(errors.email.message, { duration: 2000 });
			return;
		}
		if (errors.password) {
			toast.error(errors.password.message, { duration: 2000 });
			return;
		}
	}, [errors.email, errors.password]);

	const handleLogin = (data) => {
		const { email, password } = data;
		userLogin(email, password)
			.then(() => {
				toast.success("Successfully Logged in!");
				// navigate(location?.state ? location.state : '/');
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (
					error.message ===
					"Firebase: Error (auth/invalid-credential)."
				) {
					Swal.fire({
						title: "Error!",
						text: "Email & Password Did Not Match!",
						icon: "error",
						confirmButtonText: "Close",
					});
				} else {
					Swal.fire({
						title: "Error!",
						text: error.message,
						icon: "error",
						confirmButtonText: "Close",
					});
				}
			})
			.finally(() => {
				setUserLoading(false);
			});
	};

	return (
		<section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
			<Helmet>
				<title>Login - Furry Friends Blogs</title>
			</Helmet>
			<h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 font-kreonSerif">
				Please, Login
			</h2>
			<div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-6 lg:gap-8">
				<figure className="flex-1 w-3/5 lg:w-full">
					<img src={banner} alt="Login Banner" />
				</figure>
				<div className="flex-1 flex flex-col gap-2">
					{/* Social Media Login */}
					<SocialLogin />
					<div className="flex items-center w-full my-4">
						<hr className="w-full dark:text-gray-600" />
						<p className="px-3 dark:text-gray-600">OR</p>
						<hr className="w-full dark:text-gray-600" />
					</div>
					{/* Email Password Login */}
					<form
						onSubmit={handleSubmit(handleLogin)}
						className="w-full flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-[#8689ee] border border-furry rounded-md"
					>
						<h2 className="text-xl md:text-2xl font-medium font-kreonSerif">
							Login with Email & Password
						</h2>
						<div className="flex flex-col gap-3">
							<label htmlFor="email">Your Email</label>
							<input
								{...register("email", {
									required: {
										value: true,
										message: "Provide your email address.",
									},
								})}
								className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
								type="email"
								name="email"
								id="email"
								placeholder="Your Email"
							/>
							{errors.email && (
								<p className="text-red-700">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor="password">Your Password</label>
							<div className="relative">
								<input
									{...register("password", {
										required: {
											value: true,
											message:
												"Provide a valid password.",
										},
									})}
									className="w-full bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Your Password"
								/>
								{errors.password && (
									<p className="text-red-700">
										{errors.password.message}
									</p>
								)}
								<span
									className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</span>
							</div>
						</div>

						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Log into Your Account
						</button>
						<p className="text-center text-sm md:text-base font-medium">
							New to this site?{" "}
							<Link
								className="hover:pl-4 text-[#3c5cc3] font-bold hover:text-furry transition-all duration-500"
								to={"/register"}
							>
								Register Here!
							</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
