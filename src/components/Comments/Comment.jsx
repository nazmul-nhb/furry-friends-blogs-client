import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Comment = ({ comment }) => {
    const { user } = useAuth();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replies, setReplies] = useState([]);

    const { _id, comment_body, commenter_email, commenter_name, commenter_photo } = comment;
    // console.log(comment);

    useEffect(() => {
        axios.get(`http://localhost:5000/replies/${_id}`)
            .then(res => {
                setReplies(res.data)
            })
            .catch(error => {
                console.error(error);
            })
    }, [_id])

    const handlePostReply = (e) => {
        e.preventDefault();
        const replyText = e.target.reply.value;
        if (replyText === "") return;
        console.log(replyText);
        const replyData = {
            reply_body: replyText,
            reply_person: user.displayName,
            reply_email: user.email,
            reply_photo: user.photoURL,
            comment_id: _id
        }

        axios.post(`http://localhost:5000/replies`, { ...replyData })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Successfully Replied!')
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurred!");
            })

        axios.get(`http://localhost:5000/replies/${_id}`)
            .then(res => {
                setReplies(res.data)
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='my-4'>
            {/* Comments */}
            <div className='flex items-center gap-1'>
                <img src={commenter_photo} alt={commenter_name} className='w-8 rounded-full p-[2px] border' />
                <p title={commenter_email}>{commenter_name} commented:</p>
            </div>
            <div className="flex items-end gap-2">
                <button className='ml-9 cursor-pointer border px-3 pb-1 rounded-2xl leading-none' onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
                <p className=''>{comment_body}</p>
            </div>
            <div className='ml-4'>
                {
                    showReplyBox && <div className="ml-4">
                        <form className="flex items-end gap-4" onSubmit={handlePostReply}>
                            <textarea className="border rounded-lg p-2" name="reply" id="reply" placeholder={`Reply to ${commenter_name}'s Comment`}></textarea>

                            <Button buttonText={'Reply'} buttonType={'submit'} color={'midnightblue'} hoverBgColor={'transparent'} hoverColor={'white'} className={'text-sm border rounded-xl px-3 py-1 font-medium'}></Button>
                        </form>
                    </div>
                }

                {/* Replies */}
                {
                    replies?.map(reply => <div className='ml-4' key={reply._id}>
                        <div className="flex items-center gap-1">
                            <img src={reply.reply_photo} alt={reply.reply_person} className='w-8 rounded-full p-[2px] border' />
                            <p title={reply.reply_email}>{reply.reply_person} replied:</p>
                        </div>
                        <p className='ml-9'>{reply.reply_body}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
}

export default Comment;