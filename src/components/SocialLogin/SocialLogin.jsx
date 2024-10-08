import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SocialLogin = () => {
	const { googleLogin, githubLogin, setUserLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const handleGoogleLogin = () => {
		googleLogin()
			.then(() => {
				toast.success("Successfully Logged in!");
				// navigate(location?.state ? location.state : '/');
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (
					error.message ===
					"Firebase: Error (auth/popup-closed-by-user)."
				) {
					Swal.fire({
						title: "Login Failed!",
						text: "Popup Closed by User!",
						icon: "warning",
						confirmButtonText: "Close",
					});
				} else if (
					error.message ===
					"Firebase: Error (auth/account-exists-with-different-credential)."
				) {
					Swal.fire({
						title: "Error!",
						text: "Account Exists for this Email with Different Credential!",
						icon: "error",
						confirmButtonText: "Close",
					});
				} else {
					Swal.fire({
						title: "Error!",
						text: error.message.split(": ")[1] || error.message,
						icon: "error",
						confirmButtonText: "Close",
					});
				}
			})
			.finally(() => {
				setUserLoading(false);
			});
	};

	const handleGithubLogin = () => {
		githubLogin()
			.then(() => {
				toast.success("Successfully Logged in!");
				// navigate(location?.state ? location.state : '/');
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (
					error.message ===
					"Firebase: Error (auth/popup-closed-by-user)."
				) {
					Swal.fire({
						title: "Login Failed!",
						text: "Popup Closed by User!",
						icon: "warning",
						confirmButtonText: "Close",
					});
				} else if (
					error.message ===
					"Firebase: Error (auth/account-exists-with-different-credential)."
				) {
					Swal.fire({
						title: "Error!",
						text: "Account Exists for this Email with Different Credential!",
						icon: "error",
						confirmButtonText: "Close",
					});
				} else {
					Swal.fire({
						title: "Error!",
						text: error.message.split(": ")[1] || error.message,
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
		<div className="text-furry">
			<h3 className="text-lg md:text-xl font-medium text-center mb-6 font-kreonSerif">
				Login with Social Media
			</h3>
			<div className="flex flex-col md:flex-row md:items-center gap-4 text-xl font-bold tracking-wider">
				<button
					onClick={handleGoogleLogin}
					aria-label="Login with Google"
					type="button"
					className="flex items-center justify-center w-full p-2 gap-2 border rounded-md border-[#dc3c2a] bg-[#dc3c2a] text-[#fff] hover:text-[#dc3c2a] hover:bg-transparent transition-all duration-500"
				>
					<FaGoogle />
					<p>Google</p>
				</button>
				<button
					onClick={handleGithubLogin}
					aria-label="Login with GitHub"
					role="button"
					className="flex items-center justify-center w-full p-2 gap-2 border rounded-md border-[#29903b] bg-[#29903b] text-[#fff] hover:text-[#29903b] hover:bg-transparent transition-all duration-500"
				>
					<FaGithub />
					<p>GitHub</p>
				</button>
				{/* <button onClick={handleFacebookLogin} aria-label="Login with Facebook" role="button" className="flex items-center justify-center w-full p-2 gap-2 border rounded-md border-[#0866ff] bg-[#0866ff] text-[#fff] hover:text-[#0866ff] hover:bg-transparent transition-all duration-500">
                    <FaFacebook />
                    <p>Facebook</p>
                </button> */}
			</div>
		</div>
	);
};

export default SocialLogin;
