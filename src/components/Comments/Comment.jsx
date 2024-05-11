import PropTypes from 'prop-types';
const Comment = ({comment}) => {
    // console.log(comment);
    return (
        <div>
           - {comment.comment_body}
        </div>
    );
};

Comment.propTypes={
    comment: PropTypes.object,
}

export default Comment;