import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { IoIosCloseCircle } from "react-icons/io";
import Preview from "../../components/Preview/Preview";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
// import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
import pacman from "../../assets/red-pacman.svg";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GiCancel } from "react-icons/gi";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UpdateBlog = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [showModal, setShowModal] = useState(false);
	const [previewBlog, setPreviewBlog] = useState("");
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();

	const {
		isLoading: isBlogLoading,
		isError,
		error,
		data: blog,
		refetch,
	} = useQuery({
		queryKey: ["blog", id],
		queryFn: async () => {
			const res = await axiosPublic.get(`/blog/${id}`);
			return res.data;
		},
	});

	const closeModal = () => {
		setShowModal(false);
	};

	const handlePreview = (modifiedBlog) => {
		setPreviewBlog(modifiedBlog);
		setShowModal(true);
	};

	const handleUpdateBlog = (modifiedBlog) => {
		if (user?.email !== blog.blogger_email) {
			toast.error("You cannot update this blog!");
			// navigate(`/blog-details/${id}`);
			navigate(-1);
			return;
		}
		const updatedBlog = {
			...modifiedBlog,
			updated_on: moment().format("YYYY-MM-DD HH:mm:ss"),
			blogger_photo: user?.photoURL,
		};

		axiosSecure
			.patch(`/blog/${id}`, { ...updatedBlog })
			.then((res) => {
				if (res.data.modifiedCount > 0) {
					Swal.fire({
						title: "Congratulations!",
						text: `"${modifiedBlog.blog_title}" Updated Successfully!`,
						icon: "success",
						confirmButtonText: "Okay!",
					});
					refetch();
					// navigate(`/blog-details/${id}`);
					navigate(-1);
				}
			})
			.catch((error) => {
				console.error(error);
				if (error) {
					Swal.fire({
						title: "Error!!",
						text: error,
						icon: "error",
						confirmButtonText: "Close",
					});
				}
			});
	};

	if (isBlogLoading) {
		return (
			<div className="flex items-center justify-center">
				<img src={loadingRipple} alt="Loading..." />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center mt-8 gap-2">
				<span className="text-red-700">{error.message}</span>
				<img src={pacman} alt="Error!" />
			</div>
		);
	}

	const { blog_title, category, image, short_description, long_description } =
		blog;

	return (
		<section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
			<Helmet>
				<title>Update : {blog_title} - Furry Friends Blogs</title>
			</Helmet>
			<h2 className="text-lg md:text-2xl text-furry font-semibold text-center mb-6">
				Hello, {user?.displayName}, <br /> Update Your Blog: &ldquo;
				{blog_title}&rdquo;
			</h2>

			<Button
				onClick={() => navigate(-1)}
				className={
					"border mx-auto mb-8 text-xl font-bold py-2 px-4 rounded-3xl flex items-center gap-2"
				}
				icon={<GiCancel />}
				buttonText={"Cancel"}
				color={"#1e40ad"}
				hoverColor={"white"}
				hoverBgColor={"transparent"}
			></Button>

			<form
				onSubmit={handleSubmit(handleUpdateBlog)}
				className="flex flex-col gap-6 mx-auto px-4 lg:px-16 py-6 lg:py-10 shadow-md shadow-[#8689ee] border border-furry rounded-lg"
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* Blog Title */}
					<div className="lg:col-span-2 w-full flex flex-col gap-3">
						<label className="font-medium" htmlFor="blog_title">
							Update Blog Title*
						</label>
						<input
							defaultValue={blog_title}
							{...register("blog_title", {
								required: {
									value: true,
									message:
										"You must provide a Title for Your Blog.",
								},
								maxLength: {
									value: 96,
									message:
										"Blog Title should not exceed 96 characters!",
								},
							})}
							className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
							type="text"
							name="blog_title"
							id="blog_title"
							placeholder="Update Title for Your Blog (Max: 96 Characters"
						/>
						{errors.blog_title && (
							<p className="text-red-700">
								{errors.blog_title.message}
							</p>
						)}
					</div>
					{/* Photo URL for Blog */}
					<div className="w-full flex flex-col gap-3">
						<label className="font-medium" htmlFor="image">
							Update Link for Blog Image*
						</label>
						<input
							defaultValue={image}
							{...register("image", {
								required: {
									value: true,
									message: "You must provide a valid link.",
								},
							})}
							className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
							type="text"
							name="image"
							id="image"
							placeholder="Image Link for Your Blog/Pet"
						/>
						{errors.image && (
							<p className="text-red-700">
								{errors.image.message}
							</p>
						)}
					</div>
					{/* Blog Category */}
					<div className="w-full flex flex-col gap-3">
						<label className="font-medium" htmlFor="category">
							Update Blog Category*
						</label>
						<select
							defaultValue={category}
							{...register("category", {
								required: {
									value: true,
									message: "You must select a Category.",
								},
							})}
							className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
							name="category"
							id="category"
							placeholder="Select A Category"
						>
							<option value={""}>Select A Category</option>
							<option value="Cats">Cats</option>
							<option value="Dogs">Dogs</option>
							<option value="Birds">Birds</option>
							<option value="Rabbits">Rabbits</option>
							<option value="Others">Others</option>
						</select>
						{errors.category && (
							<p className="text-red-700">
								{errors.category.message}
							</p>
						)}
					</div>
					{/* Short Description */}
					<div className="lg:col-span-2 w-full flex flex-col gap-3">
						<label
							className="font-medium"
							htmlFor="short_description"
						>
							Update Short Description*
						</label>
						<input
							defaultValue={short_description}
							{...register("short_description", {
								required: {
									value: true,
									message: "You must write something.",
								},
								maxLength: {
									value: 120,
									message:
										"Short Description should not exceed 120 characters!",
								},
							})}
							className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
							type="text"
							name="short_description"
							id="short_description"
							placeholder="Write a Short Description for Your Blog (Max: 120 Characters)"
						/>
						{errors.short_description && (
							<p className="text-red-700">
								{errors.short_description.message}
							</p>
						)}
					</div>
					{/* Long Description */}
					<div className="lg:col-span-2 w-full flex flex-col gap-3">
						<label
							className="font-medium"
							htmlFor="long_description"
						>
							Update Long Description*
						</label>
						<textarea
							defaultValue={long_description}
							{...register("long_description", {
								required: {
									value: true,
									message: "You must write something.",
								},
							})}
							className="bg-transparent focus:border-2 h-44 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0"
							type="text"
							name="long_description"
							id="long_description"
							placeholder="Write a Long Description/Blog Post"
						/>
						{errors.long_description && (
							<p className="text-red-700">
								{errors.long_description.message}
							</p>
						)}
					</div>
				</div>
				<div className="flex gap-6 flex-col md:flex-row items-center justify-center">
					<Button
						onClick={handleSubmit(handlePreview)}
						buttonType={"button"}
						className={
							"border !border-furry w-full text-xl font-bold p-2 rounded-3xl !bg-transparent hover:!bg-furry"
						}
						color={"white"}
						hoverColor={"#1e40ad"}
						hoverBgColor={"#1e40ad"}
						buttonText={"Preview Your Post"}
					></Button>
					<Button
						buttonType={"submit"}
						className={
							"border w-full text-xl font-bold p-2 rounded-3xl"
						}
						buttonText={"Update Blog"}
						color={"#1e40ad"}
						hoverColor={"white"}
						hoverBgColor={"transparent"}
					></Button>
				</div>
			</form>
			{showModal && (
				<dialog
					open
					className="w-[96%] xl:w-auto h-[90%] bg-opacity-95 bg-[#d9dff3c3] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-50 overflow-y-auto"
				>
					<Preview previewBlog={previewBlog}></Preview>
					<button
						onClick={closeModal}
						className="absolute top-1 right-1 text-5xl text-red-700 hover:text-furry hover:opacity-80 transition-all duration-500"
						title="Close"
					>
						<IoIosCloseCircle />
					</button>
				</dialog>
			)}
		</section>
	);
};

export default UpdateBlog;
