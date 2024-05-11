import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import Comment from "./Comment";
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Comments = ({ blog }) => {
    const [comments, setComments] = useState([])
    const [hideTextArea, setHideTextArea] = useState(false);

    const { user } = useAuth();
    const { _id, blogger_email } = blog;

    // Tanstack Query cannot Update new comments on UI instantly!
    // const { isPending, isError, error, data: comments } = useQuery({
    //     queryKey: ['comments', _id],
    //     queryFn: async () => {
    //         const res = await axios.get(`http://localhost:5000/comments/${_id}`);
    //         return res.data;
    //     }
    // })

    useEffect(() => {
        axios.get(`http://localhost:5000/comments/${_id}`)
            .then(res => {
                setComments(res.data)
            })
            .catch(error => {
                console.error(error);
            })
    }, [_id])

    // console.log(comments);

    const handlePostComment = (e) => {
        e.preventDefault();
        if (user.email === blogger_email) {
            toast.error('Cannot comment on own blog!');
            setHideTextArea(true);
            return;
        }
        const newComment = e.target.comment.value;
        const commentData = {
            comment_body: newComment,
            commenter_email: user.email,
            commenter_name: user.displayName,
            commenter_photo: user.photoURL,
            blog_id: _id,
        }

        axios.post(`http://localhost:5000/comments`, { ...commentData })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Successfully Commented!')
                }
            })
            .catch(error => {
                console.error(error);
            })

        axios.get(`http://localhost:5000/comments/${_id}`)
            .then(res => {
                setComments(res.data)
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <div>

            <div className="">
                {
                    comments?.map(comment => <Comment key={comment._id} comment={comment}></Comment>)
                }
            </div>

            <h3>Write Your Comment</h3>
            <form className="flex flex-col items-start justify-center gap-4" onSubmit={handlePostComment}>
                {hideTextArea ? <div>Cannot Comment on Own Blog!</div>
                    : <textarea required className="border rounded-lg p-4" name="comment" id="comment" placeholder="Write Your Comment"></textarea>
                }
                <Button buttonText={'Comment'} buttonType={'submit'} color={'midnightblue'} hoverBgColor={'transparent'} hoverColor={'white'} className={'border rounded-xl px-3 py-1 font-medium'}></Button>
            </form>
        </div>
    );
};

Comments.propTypes = {
    blog: PropTypes.object,
}

export default Comments;