import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import Comment from "./Comment";
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import moment from "moment";
import catLoading from '../../assets/blue-cat.svg'

const Comments = ({ blog }) => {
    const [hideTextArea, setHideTextArea] = useState(false);

    const { user } = useAuth();
    const { _id, blogger_email } = blog;

    const { isPending, isError, error, data: comments, refetch } = useQuery({
        queryKey: ['comments', _id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/comments/${_id}`);
            return res.data;
        }, enabled: true,
    })

    // console.log(comments);

    const handlePostComment = (e) => {
        e.preventDefault();
        const newComment = e.target.comment.value;
        if (newComment === "") {
            toast.error('Please, Write Something!', { duration: 1500 })
            return;
        }
        if (user.email === blogger_email) {
            toast.error('Cannot comment on Own Blog!', { duration: 3000 });
            setHideTextArea(!hideTextArea);
            return;
        }
        const commentData = {
            comment_body: newComment,
            commenter_email: user.email,
            commenter_name: user.displayName,
            commenter_photo: user.photoURL,
            blog_id: _id,
            commented_on: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        axios.post(`http://localhost:5000/comments`, { ...commentData })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    e.target.reset();
                    refetch();
                    toast.success('Successfully Commented!');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurred!");
            })
    }

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
        <div className="my-4">
            <h3 className="font-semibold mb-2">Write Your Comment</h3>
            {
                hideTextArea
                    ? <p className="text-red-700 font-semibold">Cannot Comment on Own Blog!</p>
                    : <form className="flex items-end gap-4" onSubmit={handlePostComment}>
                        <textarea className="w-2/3 lg:w-1/3 border rounded-lg p-2" name="comment" id="comment" placeholder="Write Your Comment"></textarea>
                        <Button buttonText={'Comment'} buttonType={'submit'} color={'midnightblue'} hoverBgColor={'transparent'} hoverColor={'white'} className={'border rounded-xl px-3 py-1 font-medium'}></Button>
                    </form>
            }
            <div className="">
                {
                    comments?.map(comment => <Comment key={comment._id} comment={comment}></Comment>)
                }
            </div>
        </div>
    );
};

Comments.propTypes = {
    blog: PropTypes.object,
}

export default Comments;