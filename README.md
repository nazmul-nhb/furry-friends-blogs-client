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

#### Homepage

- A slider with thumbnails in the hero section
- In Recent Blogs section, there are 6 recent blog posts, users can either read the full blog on clicking read blog button or add to your wishlist (if you're a logged in user)
- Pet Tips & Advice section provides some tips & advice about pets
- FAQs section has Accordion to expand/collapse questions & answers
- Then there is our Newsletter section where users can subscribe to our latest updates via email

#### All Blogs Page

- On All Blogs page, users will find all the blogs posted by all users
- Users can filter blogs by category or search for a particular blog title
- User can also control pagination

#### Featured Blogs Page

- Showcase top 10 posts which contain more words in an interactive table
- Users can tap/click on a column header to sort the column alphabetically

#### Blog Details Page

- On Blog Details, users can click on Go Back button to navigate to the page they came from
- Users can comment and reply on blog details page
- Users can delete their comments & replies
- If a user is the blog author, s/he cannot comment but can reply to others' comments
- If a user is the blog author s/he can click Update button, it will open a new page where s/he can update the blog that s/he added, they can preview the blog before clicking update button

#### User Profile Page

- Users can update/delete their blogs from their profile page

#### Wishlist Page

- On Wishlist Page, a user can find the blogs s/he has added for reading later, users can remove any blog from their wishlist

#### Add Blog Page

- On Add Blog page, a user can add/post blogs, s/he can preview her/his blog before posting to see how it will look after posting

#### Register Page

- On Register page, a user must fill in all the fields to create a new account. Password must be 8 characters long and must contain at least an upper case and lower case letter, a number and a symbol. If users don't follow these, they will notice error messages below the input fields and as toasts
- After successful registration, they will see a toast and will be redirected to login page to login

#### Login Page

- On Login page, users can login using email and password or with Google, Facebook or Github account. - There is also a redirect link to navigate to the Register page if users need a new account
- After successful login, a toast will popup
- If the password and email do not match, users will see an error message as toast

#### Others

- On **Navbar** beside your profile picture, you can see a logout icon. You can simply log out by clicking this icon
- If you enter any invalid URL suffix, you'll see a **404 Error Page**. This page has special animation effects

### Technologies used in this Project

- ReactJS
- Javascript
- TailwindCSS
- MongoDB (Server Side)
- Express.js (Server Side)
