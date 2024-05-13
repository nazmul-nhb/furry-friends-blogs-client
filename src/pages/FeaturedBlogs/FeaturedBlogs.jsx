import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import catLoading from '../../assets/blue-cat.svg';
import TableFeatured from "../../components/TableFeatured/TableFeatured";
import { useMemo } from 'react';
import { Link } from "react-router-dom";
const FeaturedBlogs = () => {
    const { isPending, isError, error, data: featuredBlogs } = useQuery({
        queryKey: ['featuredBlogs'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/featured-blogs`);
            return res.data;
        }
    })
    const data = useMemo(() => featuredBlogs, [featuredBlogs]);
    console.log(data);
    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'Serial',
            accessorKey: 'serial'
        },
        {
            header: 'Blog Title',
            accessorKey: 'blog_title',
            cell: (cell) =>{
                return <Link className="hover:text-[midnightblue] font-semibold" to={`../blog-details/${cell.row.original._id}`}>{cell.row.original.blog_title}</Link>
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
                console.log(cell);
                return <img src={cell.row.original.blogger_photo} style={{width:'64px', borderRadius:'100%'}} alt="Profile" />;
            }
        },

    ]
    console.log(featuredBlogs);

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
                <title>Featured Blogs - Furry Friends</title>
            </Helmet>
            Featured Blogs


            <TableFeatured data={data} columns={columns}
            ></TableFeatured>


        </section>
    );
};

export default FeaturedBlogs;