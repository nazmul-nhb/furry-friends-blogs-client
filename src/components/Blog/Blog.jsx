import PropTypes from 'prop-types';

const Blog = ({blog}) => {
    return (
        <div>
            <img className='aspect-[3/1]' src={blog.image} alt="" />
        </div>
    );
};

Blog.propTypes={
    blog: PropTypes.object,
}

export default Blog;