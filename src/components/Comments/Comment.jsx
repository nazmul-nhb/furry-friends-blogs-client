import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import interwind from '../../assets/interwind-blue.svg';
import pacman from '../../assets/red-pacman.svg';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import Reply from './Reply';

const Comment = ({ comment, handleDeleteComment, commentsRefetch }) => {
    const { user } = useAuth();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [editableComment, setEditableComment] = useState(false);
    const [showCommentUpdateTime, setShowCommentUpdateTime] = useState(false);
    const replyRef = useRef(null);
    const axiosSecure = useAxiosSecure();

    const { _id, comment_body, commenter_email, commenter_name, commenter_photo, commented_on, updated_on } = comment;
    const commentTime = moment(commented_on).format('MMMM DD, YYYY [at] hh:mm A');

    const { isPending, isError, error, data: replies, refetch } = useQuery({
        queryKey: ['replies', _id],
        queryFn: async () => {
            const res = await axios.get(`https://furry-friends-server-nhb.vercel.app/replies/${_id}`);
            return res.data;
        }, enabled: true,
    })

    const handlePostReply = (e) => {
        e.preventDefault();
        const replyText = e.target.reply.value;
        if (replyText === "") {
            toast.error('Please, Write Something!', { duration: 1500 })
            return;
        }
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

    const handleDeleteReply = (id) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `Delete Your Reply Permanently?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#2a7947',
            confirmButtonText: 'Yes, Delete It!'
        }).then((result) => {
            if (result.isConfirmed) {
                // setDeleting(true);
                axiosSecure.delete(`/reply/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Removed!',
                                'Reply Deleted!',
                                'success'
                            )
                            toast.success('Reply Deleted!');
                            // setDeleting(false);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        })
    }

    const handleEditComment = (e) => {
        e.preventDefault();
        const commentData = e.target.edit_comment.value;
        if (commentData === "") {
            toast.error('Please, Write Something!', { duration: 1500 })
            return;
        }
        const editedComment = {
            comment_body: commentData,
            updated_on: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        axiosSecure.patch(`/comment/${_id}`, { ...editedComment })
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    commentsRefetch();
                    toast.success('Comment Updated!');
                    setEditableComment(false);
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
            <div className="flex items-center justify-center">
                <img src={interwind} alt="Loading..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <span className="text-red-700">{error.message}</span>
                <img src={pacman} alt="Error!" />
            </div>
        )
    }

    return (
        <div className='my-4'>
            {/* Comment */}
            <div className='flex items-center gap-1'>
                <img src={commenter_photo} alt={commenter_name} className='w-11 h-11 rounded-full p-[2px] border' />
                <div className='flex flex-col justify-around gap-0 items-start leading-none'>
                    <h5 className="text-gray-500 text-sm">{commentTime}</h5>
                    <h4 className='font-normal text-base' title={commenter_email}><span className="font-bold text-furry">{commenter_name}</span> commented:</h4>
                </div>
            </div>
            {/* Edit Comment */}
            {
                editableComment ? <form className="ml-12 mb-2 flex flex-col items-start gap-4" onSubmit={handleEditComment}>
                    <textarea defaultValue={comment_body} className="w-full lg:w-3/5 h-32 border border-furry rounded-lg p-2 outline-none focus:border-2" name="edit_comment" id="edit_comment" placeholder="Edit Your Comment"></textarea>
                    <Button buttonText={'Comment'} buttonType={'submit'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} className={'border rounded-xl px-3 py-1 font-medium'}></Button>
                </form>
                    : <p className='ml-12 mb-2'>{comment_body}</p>
            }
            <div className="text-xs ml-12 flex items-center gap-2 mb-2 font-semibold">
                {/* Edit & Delete Buttons */}
                {
                    user.email === commenter_email && <div className='flex gap-2'>
                        <button className='cursor-pointer text-blue-950 hover:text-furry' onClick={() => setEditableComment(!editableComment)}>Edit</button>
                        <button className='cursor-pointer text-blue-950 hover:text-furry' onClick={() => handleDeleteComment(_id)}>Delete</button>
                    </div>
                }
                <Tooltip anchorSelect=".comment-edit-time" place="top">
                    Edited on: {moment(updated_on).format('MMMM DD, YYYY [at] hh:mm A')}
                </Tooltip>
                {updated_on && <button className='comment-edit-time cursor-pointer text-blue-950 hover:text-furry' onClick={() => setShowCommentUpdateTime(!showCommentUpdateTime)}>Edited</button>}
                <button className='cursor-pointer text-blue-950 hover:text-furry' onClick={() => setShowReplyBox(showReplyBox => !showReplyBox)}>Reply</button>
            </div>
            {
                showCommentUpdateTime && <h5 className="ml-12 text-gray-500 text-sm">Edited on: {moment(updated_on).format('MMMM DD, YYYY [at] hh:mm A')}</h5>
            }
            {/* Reply Box */}
            <div className='ml-4 mb-1'>
                {
                    showReplyBox && <form className="ml-6 mb-2 flex items-start flex-col gap-4" onSubmit={handlePostReply}>
                        <textarea ref={replyRef} className="w-full lg:w-2/5 h-28 border border-furry rounded-lg p-2 outline-none focus:border-2" name="reply" id="reply" placeholder={`Reply to ${commenter_name}'s Comment`}></textarea>

                        <Button buttonText={'Reply'} buttonType={'submit'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} className={'text-sm border rounded-xl px-3 py-1 font-medium'}></Button>
                    </form>
                }

                {/* Replies */}
                {
                    replies?.map(reply => (<div key={reply._id}>
                        <Reply
                            reply={reply}
                            handleDeleteReply={handleDeleteReply}
                            setShowReplyBox={setShowReplyBox}
                            replyRefetch={refetch}
                            commenter_name={commenter_name}
                        ></Reply>
                        {
                            replies.indexOf(reply) !== replies?.length - 1 && <hr className='my-4' />
                        }
                    </div>
                    ))
                }
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    handleDeleteComment: PropTypes.func,
    commentsRefetch: PropTypes.func,
}

export default Comment;