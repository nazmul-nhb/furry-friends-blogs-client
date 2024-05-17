## Furry Friends Blogs

- The Home of Pet Lovers who enjoy writing and reading blogs about pets

### Live Website Link

- [Live Website Link (Vercel)](https://furry-friends-blogs-nhb.vercel.app)
- [Live Website Link (Firebase)](https://furry-friends-dcbd4.web.app)

### Mentioned NPM Utility Packages Used in this Project

- [tanstack-table](https://tanstack.com/table/latest) for showing interactive table on featured blogs page
- [tanstack-query](https://tanstack.com/query/latest) for data fetching (get)
- [framer-motion](https://www.npmjs.com/package/framer-motion) for newsletter section animation
- [react-photo-view](https://www.npmjs.com/package/react-photo-view) to view photos in full size on blog details page and in Tips & Advice Section
- [material-ui](https://mui.com/material-ui/) to show accordion on FAQs section

### Other NPM Utility Packages Used in this Project

- [lottie-react](https://lottiereact.com/components/Lottie#getting-started) for Animation on ErrorPage
- [react-hook-form](https://react-hook-form.com/) for Handling Forms
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter) in blog details page for comment heading
- [swiper](https://swiperjs.com/) for Slider/Swiper on Homepage Banner
- [animate.css](https://animate.style/) for Animation Effects on Preview Blogs from Add & Update Page
- [react-tooltip](https://react-tooltip.com/) on Navbar Profile Picture & Logout Button
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) for Dynamic Page Titles
- [react-icons](https://react-icons.github.io/react-icons/) for showing icons throughout the site
- [react-hot-toast](https://react-hot-toast.com/) for Showing Toasts
- [sweetalert2](https://sweetalert2.github.io/) for Showing Sweet Alerts
- [momentjs](https://momentjs.com/) to get time & handle time format
- [react-tabs](https://www.npmjs.com/package/react-tabs) in tips & advice section to show tabs

### Notable Features of the Website

- On **Home**, you'll notice a a slider with thumbnails in hero section
- On Add Blog page, you can add/post blogs, you can preview your blog before posting to see how it will look after posting
- On **Blog Details**, you can click on **Go Back** button to navigate to the page you came from to this page
- You can comment and reply on blog details page
- If you are the blog owner, you cannot comment but reply to others' comments
- If you click **Update** button, it will open a new page where you can update the blog that you added, you can preview before clicking update button
- On **All Blogs** page, you'll find all the blogs posted by all users
- You can filter blogs by category or search for a particular blog title
- You can also select blogs per page to view on this page
- In **Recent Blogs** section, you'll see 6 recent blog posts, you can either read the full blog on clicking read details button or add to your wishlist (if you're a logged in user)
- On Wishlist Page, you can find the blogs you have added for reading later, you can remove any blog from your wishlist
- Below that you'll find **Pet Tips & Advice** section where you can learn some tips & advice about pets
- Under that section, you'll find **Frequently Asked Questions (FAQs)** section to know some basic things about our blog site
- **FAQs** section has Accordion to expand/collapse questions
- Then You'll find our Newsletter section where you can subscribe to our latest updates via your email
- You will notice animation effect this section
- On Featured Blogs page, you'll find 10 posts which contain more words
- You can select any table column's header to sort the columns alphabetically
- On **Login** page, you can login using your email and password or with *Google*, *Facebook* or *Github* account. There is also a redirect link to navigate you to the **Register** page if you need a new account
- After successful login, you'll see a toast
- If your password and email do not match, you'll see an error message as toast. if there is other errors during login, you'll also see those as toast
- On **Register** page, you must fill in all the fields. Your password should be 6 characters long and should contain at least an upper case letter, a number and a symbol. If you don't follow these, you'll notice error messages below the input fields and toasts
- After successful registration, you'll see a toast and you'll be redirected to login page to login
- If you click on the profile picture on the navbar it will take you to you *profile details* page. You can see your information there, i.e. your name, email, whether your email is verified or not, last log in time and account creation date.
- On **Navbar** beside your profile picture, you can see a logout icon. You can simply log out by clicking this icon
- If you enter any invalid URL suffix, you'll see a **404 Error Page**. This page has special animation effects
