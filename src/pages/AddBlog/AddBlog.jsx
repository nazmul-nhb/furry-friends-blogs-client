import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { IoIosCloseCircle } from "react-icons/io";
import Preview from "../../components/Preview/Preview";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useTypewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

const AddBlog = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [previewBlog, setPreviewBlog] = useState("");
    const navigate = useNavigate();

    const closeModal = () => {
        setShowModal(false);
    };

    const handlePreview = (newBlog) => {
        setPreviewBlog(newBlog);
        setShowModal(true);
    }

    const handleAddBlog = (newBlog) => {
        // send data to the server/database
        const finalBlog = {
            ...newBlog, posted_on: moment().format("YYYY-MM-DD HH:mm:ss"), posted_by: user.displayName, blogger_email: user.email, blogger_photo: user.photoURL
        }
        // console.log(finalBlog);

        axios.post(`https://furry-friends-server-nhb.vercel.app/blogs`, { ...finalBlog })
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: `"${newBlog.blog_title}" Added Successfully!`,
                        icon: 'success',
                        confirmButtonText: 'Okay!'
                    })
                    reset();
                }
            })
            .catch(error => {
                console.error(error);
                if (error) {
                    Swal.fire({
                        title: 'Error!!',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }

    const [text] = useTypewriter({
        words: [`Write A Blog`],
        loop: true,
    })

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Add Blog - Furry Friends Blogs</title>
            </Helmet>
            <h2 className="text-lg md:text-3xl text-furry font-bold text-center mb-8">Hi, {user.displayName}, {text}</h2>

            <Button onClick={() => navigate(-1)} className={'border mx-auto mb-8 text-xl font-bold py-2 px-4 rounded-3xl flex items-center gap-2'} icon={<GiCancel />} buttonText={'Cancel'} color={'#1e40ad'} hoverColor={'white'} hoverBgColor={'transparent'}></Button>

            {/* Form */}
            <form onSubmit={handleSubmit(handleAddBlog)} className="flex flex-col gap-6 mx-auto px-4 lg:px-16 py-6 lg:py-10 shadow-md shadow-[#8689ee] border border-furry rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Blog Title */}
                    <div className="lg:col-span-2 w-full flex flex-col gap-3">
                        <label className="font-medium" htmlFor="blog_title">Blog Title*</label>
                        <input
                            {...register("blog_title", {
                                required: { value: true, message: "You must provide a Title for Your Blog." },
                                maxLength: { value: 96, message: "Blog Title should not exceed 96 characters!" }
                            })}
                            className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0" type="text" name="blog_title" id="blog_title" placeholder=" Title for Your Blog (Max: 96 Characters)" />
                        {
                            errors.blog_title && <p className="text-red-700">{errors.blog_title.message}</p>
                        }
                    </div>
                    {/* Photo URL for Blog */}
                    <div className="w-full flex flex-col gap-3">
                        <label className="font-medium" htmlFor="image">Link for Blog Image*</label>
                        <input
                            {...register("image", {
                                required:
                                    { value: true, message: "You must provide a valid link." }
                            })}
                            className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0" type="text" name="image" id="image" placeholder="Image Link for Your Blog/Pet" />
                        {
                            errors.image && <p className="text-red-700">{errors.image.message}</p>
                        }
                    </div>
                    {/* Blog Category */}
                    <div className="w-full flex flex-col gap-3">
                        <label className="font-medium" htmlFor="category">Blog Category*</label>
                        <select
                            {...register("category", {
                                required:
                                    { value: true, message: "You must select a Category." }
                            })}
                            className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0" name="category" id="category" placeholder="Select A Category">
                            <option value={""}>Select A Category</option>
                            <option value="Cats">Cats</option>
                            <option value="Dogs">Dogs</option>
                            <option value="Birds">Birds</option>
                            <option value="Rabbits">Rabbits</option>
                            <option value="Others">Others</option>
                        </select>
                        {
                            errors.category && <p className="text-red-700">{errors.category.message}</p>
                        }
                    </div>
                    {/* Short Description */}
                    <div className="lg:col-span-2 w-full flex flex-col gap-3">
                        <label className="font-medium" htmlFor="short_description">Short Description*</label>
                        <input
                            {...register("short_description", {
                                required: { value: true, message: "You must write something." },
                                maxLength: { value: 120, message: "Short Description should not exceed 120 characters!" }
                            })}
                            className="bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0" type="text" name="short_description" id="short_description" placeholder="Write a Short Description for Your Blog (Max: 120 Characters)" />
                        {
                            errors.short_description && <p className="text-red-700">{errors.short_description.message}</p>
                        }
                    </div>
                    {/* Long Description */}
                    <div className="lg:col-span-2 w-full flex flex-col gap-3">
                        <label className="font-medium" htmlFor="long_description">Long Description*</label>
                        <textarea
                            {...register("long_description", {
                                required:
                                    { value: true, message: "You must write something." }
                            })}
                            className="h-44 bg-transparent focus:border-2 p-2 rounded-lg border border-furry transition duration-500 focus:outline-0" type="text" name="long_description" id="long_description" placeholder="Write a Long Description/Blog Post" />
                        {
                            errors.long_description && <p className="text-red-700">{errors.long_description.message}</p>
                        }
                    </div>
                </div>
                <div className="flex gap-6 flex-col md:flex-row items-center justify-center">
                    <Button onClick={handleSubmit(handlePreview)} buttonType={'button'} className={'border !border-furry w-full text-xl font-semibold p-2 rounded-3xl !bg-transparent hover:!bg-furry focus:border-2'} color={'white'} hoverColor={'#1e40ad'} hoverBgColor={'#1e40ad'} buttonText={'Preview Your Post'}></Button>
                    <Button buttonType={'submit'} className={'border w-full text-xl font-semibold p-2 rounded-3xl'} buttonText={'Submit'} color={'#1e40ad'} hoverColor={'white'} hoverBgColor={'transparent'}></Button>
                </div>
            </form>
            {
                showModal && (
                    <dialog open className="w-[96%] xl:w-auto h-[90%] bg-opacity-95 bg-[#d9dff3c3] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-50 overflow-y-auto">
                        <Preview previewBlog={previewBlog}></Preview>
                        <button onClick={closeModal} className='absolute top-1 right-1 text-5xl text-red-700 hover:text-furry hover:opacity-80 transition-all duration-500' title='Close'><IoIosCloseCircle /></button>
                    </dialog>
                )
            }
        </section>
    );
};

export default AddBlog;