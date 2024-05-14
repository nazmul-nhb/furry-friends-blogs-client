import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import AddBlog from "../pages/AddBlog/AddBlog";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import PrivateRoute from "./PrivateRoute";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import Profile from "../pages/Profile/Profile";

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
                element: <PrivateRoute><AddBlog /></PrivateRoute>
            },
            {
                path: '/blog-details/:id',
                element: <PrivateRoute><BlogDetails /></PrivateRoute>
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Wishlist /></PrivateRoute>
            },
            {
                path: '/update-blog/:id',
                element: <PrivateRoute><UpdateBlog /></PrivateRoute>
            },
            {
                path: '/profile',
                element: <Profile />
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
