import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import catLoading from '../../assets/blue-cat.svg'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Comment = ({ comment }) => {
    const { user } = useAuth();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const replyRef = useRef(null);
    const axiosSecure = useAxiosSecure();

    const { _id, comment_body, commenter_email, commenter_name, commenter_photo, commented_on } = comment;
    const commentTime = moment(commented_on).format('MMMM DD, YYYY [at] hh:mm A');

    const { isPending, isError, error, data: replies, refetch } = useQuery({
        queryKey: ['replies', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/replies/${_id}`);
            return res.data;
        }, enabled: true,
    })

    const handlePostReply = (e) => {
        e.preventDefault();
        const replyText = e.target.reply.value;
        if (replyText === "") return;
        // console.log(replyText);
        const replyData = {
            reply_body: replyText,
            reply_person: user.displayName,
            reply_email: user.email,
            reply_photo: user.photoURL,
            comment_id: _id,
            replied_on: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        axios.post(`https://furry-friends-server-nhb.vercel.app/replies`, { ...replyData })
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    e.target.reset();
                    refetch();
                    toast.success('Successfully Replied!');
                    setShowReplyBox(false);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurred!");
            })
    }

    // Focus Reply Box
    useEffect(() => {
        if (showReplyBox && replyRef.current) {
            replyRef.current.focus();
        }
    }, [showReplyBox]);

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
        <div className='my-4'>
            {/* Comments */}
            <div className='flex items-center gap-1'>
                <img src={commenter_photo} alt={commenter_name} className='w-11 h-11 rounded-full p-[2px] border' />
                <h4 className='text-lg font-normal' title={commenter_email}><span className="font-bold text-furry">{commenter_name}</span> commented:</h4>
            </div>
            <p className='ml-12 mb-2'>{comment_body}</p>
            <div className="text-xs ml-12 flex items-center gap-2 mb-2">
                <h5 className="text-gray-500">{commentTime}</h5>
                <button className='cursor-pointer text-blue-950 hover:text-blue-600' onClick={() => setShowReplyBox(showReplyBox => !showReplyBox)}>Reply</button>
            </div>
            {/* Reply Box */}
            <div className='ml-4 mb-2'>
                {
                    showReplyBox && <div className="ml-6 mb-2">
                        <form className="flex items-start flex-col gap-4" onSubmit={handlePostReply}>
                            <textarea ref={replyRef} className="w-full lg:w-2/5 h-28 border border-furry rounded-lg p-2 outline-none focus:border-2" name="reply" id="reply" placeholder={`Reply to ${commenter_name}'s Comment`}></textarea>

                            <Button buttonText={'Reply'} buttonType={'submit'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} className={'text-sm border rounded-xl px-3 py-1 font-medium'}></Button>
                        </form>
                    </div>
                }

                {/* Replies */}
                {
                    replies?.map(reply => <div className='ml-8' key={reply._id}>
                        <div className="flex items-center gap-1">
                            <img src={reply.reply_photo} alt={reply.reply_person} className='w-10 h-10 rounded-full p-[2px] border' />
                            <div className='flex flex-col gap-0 leading-4'>
                                <h5 className='text-xs'>{moment(reply.replied_on).format('MMMM DD, YYYY [at] hh:mm A')}</h5>
                                <h4 className='font-normal' title={reply.reply_email}><span className="font-bold text-furry">{reply.reply_person}</span> replied:</h4>
                            </div>
                        </div>
                        <p className='ml-11'>{reply.reply_body}</p>
                        {
                            replies.indexOf(reply) !== replies?.length - 1 && <hr className='my-4' />
                        }
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