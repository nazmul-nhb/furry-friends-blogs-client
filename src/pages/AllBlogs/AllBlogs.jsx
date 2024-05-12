import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import catLoading from '../../assets/blue-cat.svg';
import { useEffect, useState } from "react";
import Blog from "../../components/Blog/Blog";

const AllBlogs = () => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogCount, setBlogCount] = useState(0);
    const [category, setCategory] = useState('');

    const totalPages = Math.ceil(blogCount / itemsPerPage);
    const pages = [...Array(totalPages).keys()];
    
    useEffect(() => {
        axios.get(`http://localhost:5000/blogs-count?category=${category}`)
            .then(res => {
                setBlogCount(res.data.count);
            })
            .catch(error => {
                console.log(error);
            })
    }, [category])

    const { isPending, isError, error, data: blogs } = useQuery({
        queryKey: ['blogs', currentPage, itemsPerPage, category],
        queryFn: async () => {
            const res = await
                axios.get(`http://localhost:5000/blogs?sort=1&page=${currentPage - 1}&size=${itemsPerPage}&category=${category}`);
            return res.data;
        }
    })


    console.log(blogCount);

    const handleItemsPerPage = (e) => {
        const pageValue = parseInt(e.target.value);
        setItemsPerPage(pageValue);
        setCurrentPage(1);
    }

    const handlePreviousPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        currentPage < pages.length && setCurrentPage(currentPage + 1);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    }

    if (isPending) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <img src={catLoading} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <span>Error: {error.message}</span>
            </div>
        )
    }

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>All Blogs - Furry Friends</title>
            </Helmet>
            All Blogs
            <form className="my-8">
                <select
                    onChange={handleFilter}
                    value={category}
                    className="p-2 rounded-lg text-center outline outline-gray-700"
                    name="category" id="category">
                    <option value="">Filter by Category</option>
                    <option value="Cats">Cats</option>
                    <option value="Dogs">Dogs</option>
                    <option value="Birds">Birds</option>
                    <option value="Rabbits">Rabbits</option>
                    <option value="Others">Others</option>
                </select>
            </form>

            <div className="grid lg:grid-cols-2 gap-6">
                {
                    blogs?.map(blog => <Blog
                        key={blog._id}
                        blog={blog}
                    ></Blog>)
                }
            </div>
            <div className="flex flex-col gap-4 justify-center items-center font-semibold">
                <p className="text-blue-950">Page: {currentPage} of {totalPages}</p>
                <div className="flex gap-3">
                    <button className={"px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white"} disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>

                    {
                        pages.map(page => <button
                            className={`px-3 border ${currentPage === page + 1 ? 'bg-orange-600 border-orange-600 text-white hover:bg-transparent hover:text-orange-600' : ' text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'}`}
                            onClick={() => setCurrentPage(page + 1)}
                            key={page}
                        >{page + 1}</button>)
                    }
                    <button className={"px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white"} disabled={currentPage === pages.length} onClick={handleNextPage}>Next</button>
                </div>
                <select className="border px-2 py-1 focus:text-orange-700 outline-orange-700 border-blue-900 text-blue-900" value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="6">Blogs Per Page: 6</option>
                    <option value="12">Blogs Per Page: 12</option>
                    <option value="24">Blogs Per Page: 24</option>
                    <option value="48">Blogs Per Page: 48</option>
                </select>
            </div>
        </section>
    );
};

export default AllBlogs;