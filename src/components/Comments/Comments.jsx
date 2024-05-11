import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';

const Comments = ({ blog }) => {
    const {user} = useAuth();
    const { _id, blogger_email } = blog;

    return (
        <div>
            User: {user.email} vs Author: {blogger_email}
        </div>
    );
};

Comments.propTypes ={
    blog: PropTypes.object,
}

export default Comments;