import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Helmet } from "react-helmet-async";
import loadingRipple from "../../assets/ripple-blue-thick.svg";
import pacman from '../../assets/red-pacman.svg';
import TableFeatured from "../../components/TableFeatured/TableFeatured";
import { useMemo } from 'react';
import { Link } from "react-router-dom";
import SectionInfo from "../../components/SectionInfo/SectionInfo";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const FeaturedBlogs = () => {
     const axiosPublic = useAxiosPublic();

    const { isPending, isError, error, data: featuredBlogs } = useQuery({
        queryKey: ['featuredBlogs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/featured-blogs`);
            return res.data;
        }
    })

    const data = useMemo(() => featuredBlogs, [featuredBlogs]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'Serial',
            accessorKey: 'total_characters',
            enableSorting: false
        },
        {
            header: 'Blog Title',
            accessorKey: 'blog_title',
            cell: (cell) => {
                return <Link className="hover:text-furry font-semibold font-kreonSerif" to={`../blog-details/${cell.row.original._id}`}>{cell.row.original.blog_title}</Link>
            }
        },
        {
            header: 'Word Count',
            accessorKey: 'word_count',
            cell: (cell) => {
                return <div className="text-center">{cell.row.original.word_count}</div>
            }
        },
        {
            header: 'Blog Owner',
            accessorKey: 'posted_by'
        },
        {
            header: 'Profile Picture',
            accessorKey: 'blogger_photo',
            cell: (cell) => {
                return <img className="w-16 rounded-full p-[2px] border border-furry mx-auto" src={cell.row.original.blogger_photo} title={cell.row.original.blogger_email} alt={cell.row.original.posted_by} />;
            },
        }
    ]

    if (isPending) {
        return (
            <div className="flex items-center justify-center">
                <img src={loadingRipple} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <span className="text-red-700">{error.message}</span>
                <img src={pacman} alt="Error!" />
            </div>
        )
    }

    return (
        <section className="mx-2 md:mx-8 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Featured Blogs - Furry Friends Blogs</title>
            </Helmet>
            <SectionInfo
                heading={"Featured Blogs"}
                info={"Explore Our Top 10 Blogs! The Threshold is Based on Word Count for each Blog post."}
            />
            <TableFeatured data={data} columns={columns}></TableFeatured>
        </section>
    );
};

export default FeaturedBlogs;