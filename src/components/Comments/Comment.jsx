import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';

const Comment = ({ comment }) => {
    const { user } = useAuth();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(false);

    const { _id, comment_body, commenter_email, commenter_name, commenter_photo, commented_on } = comment;
    const commentTime = moment(commented_on).format('MMMM DD, YYYY [at] hh:mm A');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/replies/${_id}`)
            .then(res => {
                setReplies(res.data);
                setLoading(false)
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
            comment_id: _id,
            replied_on: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        setLoading(true);
        axios.post(`http://localhost:5000/replies`, { ...replyData })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    setReplies(() => [replyData, ...replies]);
                    toast.success('Successfully Replied!');
                    setShowReplyBox(false);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurred!");
            })

        setLoading(true);
        axios.get(`http://localhost:5000/replies/${_id}`)
            .then(res => {
                setReplies(res.data)
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center space-x-2">
                .......
            </div>
        )
    }

    return (
        <div className='my-4'>
            {/* Comments */}
            <div className='flex items-center gap-1'>
                <img src={commenter_photo} alt={commenter_name} className='w-9 rounded-full p-[2px] border' />
                <h4 className='text-lg' title={commenter_email}><span className="font-semibold">{commenter_name}</span> commented:</h4>
            </div>
            <p className='ml-10 mb-2'>{comment_body}</p>
            <div className="text-xs ml-10 flex items-center gap-2 mb-2">
                <h5 className=''>{commentTime}</h5>
                <button className='cursor-pointer' onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
            </div>
            {/* Reply Box */}
            <div className='ml-4 mb-2'>
                {
                    showReplyBox && <div className="ml-6 mb-2">
                        <form className="flex items-end gap-4" onSubmit={handlePostReply}>
                            <textarea className="w-[70%] lg:w-1/3 border rounded-lg p-2" name="reply" id="reply" placeholder={`Reply to ${commenter_name}'s Comment`}></textarea>

                            <Button buttonText={'Reply'} buttonType={'submit'} color={'midnightblue'} hoverBgColor={'transparent'} hoverColor={'white'} className={'text-sm border rounded-xl px-3 py-1 font-medium'}></Button>
                        </form>
                    </div>
                }

                {/* Replies */}
                {
                    replies?.map(reply => <div className='ml-5' key={reply._id}>
                        <div className="flex items-center gap-1">
                            <img src={reply.reply_photo} alt={reply.reply_person} className='w-9 rounded-full p-[2px] border' />
                            <div className='flex flex-col gap-0 leading-4'>
                                <h5 className='text-xs'>{moment(reply.replied_on).format('MMMM DD, YYYY [at] hh:mm A')}</h5>
                                <p title={reply.reply_email}><span className="font-semibold">{reply.reply_person}</span> replied:</p>
                            </div>
                        </div>
                        <p className='ml-10'>{reply.reply_body}</p>
                        <hr className='my-4' />
                    </div>)
                }
            </div>
            <hr />
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
}

export default Comment;