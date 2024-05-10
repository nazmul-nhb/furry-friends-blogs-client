import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Wishlist from "../pages/Wishlist/Wishlist";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/all-blogs',
                element: <AllBlogs />
            },
            {
                path: '/featured-blogs',
                element: <FeaturedBlogs />
            },
            {
                path: '/add-blog',
                element: <FeaturedBlogs />
            },
            {
                path: '/wishlist',
                element: <Wishlist />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ],
    },
]);
