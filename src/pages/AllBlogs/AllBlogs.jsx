import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import searchLoading from '../../assets/search-blue.svg';
import rain from '../../assets/rain.svg';
import { useEffect, useRef, useState } from "react";
import Blog from "../../components/Blog/Blog";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
import pacman from '../../assets/red-pacman.svg';
import SectionInfo from "../../components/SectionInfo/SectionInfo";

const AllBlogs = () => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const [sortByTime, setSortByTime] = useState(false);
    const inputRef = useRef(null);

    // Fetch Blog Count
    const { isFetching, isError: isCountError, error: countError, data: blogCount = 0 } = useQuery({
        queryKey: ['blogCount', category, searchText],
        queryFn: async () => {
            const res = await
                axios.get(`https://furry-friends-server-nhb.vercel.app/blogs-count?category=${category === "All" ? " " : category}&search=${searchText}`)
            return res.data.count;
        }
    })

    // Calculate Pages
    const totalPages = Math.ceil(blogCount / itemsPerPage);
    const pages = [...Array(totalPages).keys()];

    // Fetch Blogs
    const { isLoading, isError, error, data: blogs } = useQuery({
        queryKey: ['blogs', sortByTime, currentPage, itemsPerPage, category, searchText],
        queryFn: async () => {
            const res = await
                axios.get(`https://furry-friends-server-nhb.vercel.app/blogs?sort=${sortByTime ? -1 : 1}&page=${currentPage - 1}&size=${itemsPerPage}&category=${category === "All" ? " " : category}&search=${searchText}`);
            return res.data;
        }
    })

    const handleItemsPerPage = (e) => {
        const pageValue = parseInt(e.target.value);
        setItemsPerPage(pageValue);
        setCurrentPage(1);
    }

    const handlePreviousPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        currentPage < pages?.length && setCurrentPage(currentPage + 1);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
        setCurrentPage(1);
    }

    const handleSearchBlog = (e) => {
        e.preventDefault();
        if (e.target.search.value === '') {
            return toast.error('Please, Search with a Keyword!');
        }
        setSearchText(e.target.search.value);
        setCurrentPage(1);
    }

    // Show Toast with Search Count
    useEffect(() => {
        if (searchText && blogs?.length > 0) {
            toast.success(`${blogs?.length} ${blogs?.length > 1 ? 'Matches' : 'Match'} Found!`);
        }
    }, [blogs, searchText]);

    // Clear Search Text after a search
    const clearSearchText = () => {
        setSearchText('');
        inputRef.current.value = '';
    }

    let loadingSpinner = null;

    if (isLoading && searchText) {
        loadingSpinner = (
            <div className="flex items-center justify-center">
                <img className="w-48 h-48" src={searchLoading} alt="Loading..." />
            </div>
        );
    } else if (isLoading || isFetching) {
        loadingSpinner = (
            <div className="flex items-center justify-center">
                <img className="w-48 h-48" src={loadingRipple} alt="Loading..." />
            </div>
        );
    }

    if (isError || isCountError) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <span className="text-red-700">{error.message || countError.message}</span>
                <img src={pacman} alt="Error!" />
            </div>
        )
    }

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>All Blogs - Furry Friends Blogs</title>
            </Helmet>

            <SectionInfo
                heading={"All Blogs"}
                info={"Explore All the Blogs about Your Favorite Pets"}
            />

            {/* Filter & Search */}
            <div className="my-6 text-sm md:text-base flex flex-col md:flex-row justify-start md:justify-center items-center gap-3 md:gap-6">
                {/* Filter */}
                <form className="text-furry font-semibold">
                    <select
                        onChange={handleFilter}
                        value={category}
                        className="focus:bg-[#dce1f5] p-2 rounded-lg outline outline-none border border-furry"
                        name="category" id="category">
                        <option value="">Filter by Category</option>
                        <option value="All">All</option>
                        <option value="Cats">Cats</option>
                        <option value="Dogs">Dogs</option>
                        <option value="Birds">Birds</option>
                        <option value="Rabbits">Rabbits</option>
                        <option value="Others">Others</option>
                    </select>
                </form>

                {/* Search */}
                <form onSubmit={handleSearchBlog} className="flex gap-2 items-center text-furry">
                    <div className="flex gap-2 items-center relative">
                        <input ref={inputRef} defaultValue={searchText} className="text-left p-2 rounded-lg outline outline-none border focus:bg-[#dce1f5] text-furry border-furry" placeholder="Search by Blog Title" type="text" name="search" id="search" />
                        {
                            searchText !== '' && <button title="Clear Search Field" onClick={clearSearchText} className="absolute right-2 text-3xl hover:text-red-900"><FaDeleteLeft /></button>
                        }
                    </div>
                    <button className="border py-2 px-4 rounded-lg font-bold tracking-wider border-furry bg-furry text-white hover:bg-transparent hover:text-furry transition-all duration-700" type="submit">Search</button>
                </form>
            </div>

            {/* Loading Spinner */}
            {loadingSpinner}

            {/* Total Blog Count */}
            {blogCount > 0 && !searchText && <h3 className="text-center text-furry font-kreonSerif text-xl md:text-3xl mb-6 flex items-center justify-center">Total {blogCount} {blogCount > 1 ? 'Blogs' : 'Blog'} Posted {category && category !== 'All' && `in "${category}" Category`} Till Now</h3>}

            {/* Show Search Count */}
            {
                searchText && blogs?.length > 0 ? (<div className="mb-8 flex items-center justify-center text-furry font-kreonSerif text-2xl">
                    {blogs?.length} {blogs?.length > 1 ? 'Matches' : 'Match'} Found {category && category !== 'All' && `in "${category}" Category`}!
                </div>)
                    : searchText && blogs?.length <= 0 ? (<div className="text-center flex flex-col items-center justify-center text-furry font-kreonSerif text-xl md:text-4xl">
                        <img src={rain} alt="Raining..." />
                        <p>No Blogs Found!</p>
                    </div>)
                        : null
            }

            {/* Show this if there is no posts on the whole site! */}
            {
                !searchText && blogs?.length <= 0 && <div className="text-center flex flex-col items-center justify-center text-furry font-kreonSerif text-xl md:text-4xl">
                    <img src={rain} alt="Raining..." />
                    <p>No One Ever Posted Any Blog Yet!!</p>
                </div>
            }

            {blogs?.length > 0 && <>
                {/* Top Pagination */}
                {blogs?.length > 5 &&
                    <div className="hidden md:flex gap-4 flex-col lg:flex-row justify-center items-center font-semibold my-6 lg:my-8">
                        <div className="flex gap-2 items-center justify-center">
                            <p className="text-furry px-3 py-1 border border-furry">Page: {currentPage} of {totalPages}</p>
                            <select className="border px-2 py-1 focus:text-furry outline-furry border-furry text-furry focus:bg-[#1e3fad26]" value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                                <option value="6">Blogs Per Page: 6</option>
                                <option value="12">Blogs Per Page: 12</option>
                                <option value="24">Blogs Per Page: 24</option>
                                <option value="48">Blogs Per Page: 48</option>
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button className={"px-3 py-1 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-furry border-furry hover:bg-furry hover:text-white"} disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>

                            {
                                pages?.map(page => <button
                                    className={`px-3 py-1 border ${currentPage === page + 1 ? 'bg-furry border-furry text-white hover:bg-transparent hover:text-furry' : ' text-furry border-furry hover:bg-furry hover:text-white'}`}
                                    onClick={() => setCurrentPage(page + 1)}
                                    key={page}
                                >{page + 1}</button>)
                            }

                            <button className={"px-3 py-1 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-furry border-furry hover:bg-furry hover:text-white"} disabled={currentPage === pages?.length || totalPages === 0} onClick={handleNextPage}>Next</button>
                        </div>
                    </div>
                }

                {/* Sort by Time Posted */}
                {
                    blogs?.length > 1 && <div className="flex gap-2 items-center justify-center font-medium text-sm md:text-xl mb-4">
                        <h3 className="text-furry">{sortByTime ? 'You Are Seeing Latest Posts First' : 'You Are Seeing Oldest Posts First'}</h3>
                        <button onClick={() => setSortByTime(!sortByTime)} className="border py-0.5 px-2 rounded-lg border-furry bg-transparent text-furry hover:bg-furry text-xs md:text-lg hover:text-white transition-all duration-700" type="submit">{sortByTime ? 'See Oldest Posts' : 'See Latest Posts'}</button>
                    </div>
                }

                {/* Blogs */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        blogs?.map(blog => <Blog
                            key={blog._id}
                            blog={blog}
                        ></Blog>)
                    }
                </div>

                {/* Bottom Pagination */}
                <div className="flex flex-col gap-4 justify-center items-center font-semibold mt-8 lg:mt-16">
                    <p className="text-furry">Page: {currentPage} of {totalPages}</p>
                    <div className="flex gap-3">
                        <button className={"px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-furry border-furry hover:bg-furry hover:text-white"} disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>

                        {
                            pages?.map(page => <button
                                className={`px-3 border ${currentPage === page + 1 ? 'bg-furry border-furry text-white hover:bg-transparent hover:text-furry' : ' text-furry border-furry hover:bg-furry hover:text-white'}`}
                                onClick={() => setCurrentPage(page + 1)}
                                key={page}
                            >{page + 1}</button>)
                        }

                        <button className={"px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-furry border-furry hover:bg-furry hover:text-white"} disabled={currentPage === pages?.length || totalPages === 0} onClick={handleNextPage}>Next</button>
                    </div>
                    <select className="border px-2 py-1 focus:text-furry outline-furry border-furry text-furry focus:bg-[#1e3fad26]" value={itemsPerPage} onChange={handleItemsPerPage} name="blogs" id="blogs">
                        <option value="6">Blogs Per Page: 6</option>
                        <option value="12">Blogs Per Page: 12</option>
                        <option value="24">Blogs Per Page: 24</option>
                        <option value="48">Blogs Per Page: 48</option>
                    </select>
                </div>
            </>
            }
        </section>
    );
};

export default AllBlogs;