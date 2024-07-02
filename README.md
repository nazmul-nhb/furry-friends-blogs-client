# Furry Friends Blogs

## Project Overview

### The Home of Pet Lovers who enjoy writing and reading blogs about pets

Furry Friends Blogs is a feature-rich blogging platform designed for pet lovers who enjoy writing and reading about pets. The platform offers a seamless and engaging experience for users to share their pet stories, tips, and advice. It includes various functionalities such as adding blogs to a wishlist, filtering and searching for blogs, and interactive user profiles, ensuring dynamic interaction with the content. Additionally, it provides secure user authentication and a responsive design for an optimal experience across devices.

## Live Link

- [Live Link (Vercel)](https://furry-friends-blogs-nhb.vercel.app)
- [Live Link (Firebase)](https://furry-friends-dcbd4.web.app)

## Notable Features of the Website

- **Advanced Blog Filtering & Search**: Users can effortlessly filter blogs by category or search for specific titles, with robust pagination control to enhance browsing experience.

- **Comprehensive User Management**: Users can efficiently manage (edit and delete) their blogs, comments, and replies, ensuring full control over their content and interactions.

- **Interactive Featured Blogs Display**: The Featured Blogs page showcases the top 10 posts in an interactive table, allowing users to sort by column headers for easy navigation and discovery of popular content.

- **Personalized Wishlist Management**: Users can save blogs for later reading, remove blogs from their wishlist, and receive notifications if a blog has been deleted by its author.

### Technologies used in this Project

- ReactJS
- Javascript
- TailwindCSS
- Express.js (Server Side)
- MongoDB (Server Side)

## Run the Project Locally

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/nazmul-nhb/furry-friends-blogs-client.git
    cd furry-friends-blogs-client
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the necessary environment variables. (**Important!**)

4. **Run the Application**:

    ```sh
    npm run dev -- --host
    ```

5. **Access the Site**: Open your browser and go to `http://localhost:5173/` or `http://192.168.1.12:5173/` from other devices on the same network to view the application.

### Utility Packages Used in this Project
<!-- markdownlint-disable MD033 -->
<details>
<summary>Click to Expand</summary>

- [tanstack-table](https://tanstack.com/table/latest) for showing interactive table on **Featured Blogs** page
- [tanstack-query](https://tanstack.com/query/latest) for managing states while fetching data (get)
- [axios](https://axios-http.com/docs/intro) for fetching data (CRUD)
- [framer-motion](https://www.npmjs.com/package/framer-motion) for *newsletter* section animation
- [react-photo-view](https://www.npmjs.com/package/react-photo-view) to view photos in full size on **Blog Details** page and in *Tips & Advice* section
- [lottie-react](https://lottiereact.com/components/Lottie#getting-started) for Animation on **ErrorPage**
- [react-hook-form](https://react-hook-form.com/) for handling forms
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter) in **Blog Details** page for comment heading
- [swiper](https://swiperjs.com/) for Slider/Swiper on Homepage Banner
- [animate.css](https://animate.style/) for Animation Effects on Preview modals on **Add & Update Blog** pages
- [react-tooltip](https://react-tooltip.com/) for showing tooltips
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) for Dynamic Page Titles
- [react-icons](https://react-icons.github.io/react-icons/) for showing icons throughout the site
- [react-hot-toast](https://react-hot-toast.com/) for Showing Toasts
- [sweetalert2](https://sweetalert2.github.io/) for Showing Sweet Alerts
- [momentjs](https://momentjs.com/) to get time & handle time format
- [react-tabs](https://www.npmjs.com/package/react-tabs) in *Tips & Advice* section to show tabs

</details>
<!-- markdownlint-enable MD033 -->

<!-- 
### Notable Features & Description of the Project

#### Homepage

- A slider with thumbnails in the hero section, clicking on Read Blog will redirect to the blog details page
- In Recent Blogs section, there are 6 recent blog posts, users can either read the full blog on clicking read blog button or add to your wishlist (if you're a logged in user)
- Pet Tips & Advice section provides some tips & advice about pets
- FAQs section has Accordion to expand/collapse questions & answers
- There is Newsletter section where users can subscribe to the latest updates via email (Not Fully Functional)

#### All Blogs Page

- On All Blogs page, users will find all the blogs posted by all users
- Users can filter blogs by category or search for a particular blog title
- Users can also control pagination (i.e. how many blogs there should be in a page)
- Users can sort blogs on this page by latest or oldest posts (posting time)

#### Featured Blogs Page

- Showcase top 10 posts which contain more words in an interactive table
- Users can tap/click on a column header to sort the column alphabetically

#### Blog Details Page

- Blog Details is private route, meaning users should login first to navigate to this page, there is a *Go Back* button to navigate to the page they came from
- Users can comment on blogs and reply to the comments
- Users can edit and delete their comments & replies
- If a user is the blog author, s/he cannot comment but can reply to others' comments
- If a user is the blog author s/he can click Update button, it will open a new page where s/he can update the blog that s/he added, there is a cancel button to go back
- Users can preview the blog before clicking update button
- On clicking time fields or "Edited" button, users can see updated time for blog, comments or replies

#### User Profile Page

- Users can update/delete their blogs from their profile page

#### Wishlist Page

- On Wishlist Page, a user can find the blogs s/he has added for reading later, users can remove any blog from their wishlist
- If a blog in wishlist is deleted by the blog author, user will see that info in wishlist page and can remove that deleted blog from the wishlist

#### Add Blog Page

- On Add Blog page, users can add/post blogs, there is a cancel button to go back
- Users can preview the blog before posting to see how it will look after posting

#### Register Page

- On Register page, a user must fill in all the fields to create a new account. Password must be 8 characters long and must contain at least an upper case and lower case letter, a number and a symbol. If users don't follow these, they will notice error messages below the input fields and as toasts
- After successful registration, they will see a toast and will be redirected to login page to login

#### Login Page

- On Login page, users can login using email and password or with Google, Facebook or Github account.
- There is also a redirect link to navigate to the Register page if users need a new account
- After successful login, a toast will popup
- If the password and email do not match, users will see an error message as toast

#### Navbar & Others

- On **Navbar** beside user's profile picture, there is a theme toggler icon. Users can change theme from dark to light mode and vice versa by clicking this icon (No Third Party Package Used)
- If user clicks on the profile picture, it will open a menu containing user profile name with link to visit profile page and a logout button to log out from the site
- On **Navbar** beside Wishlist nav link, users can see the number of blogs in their wishlist
- On Homepage & Blog Details page, there is a horizontal bar below the navbar to see the progress of how much of the page is scrolled so far (No Third Party Package Used)
- There is a pair of scroll buttons on every page to scroll to top or bottom (No Third Party Package Used)
- If you enter any invalid URL suffix, you'll see a **404 Error Page**. This page has special animation effects
-->
