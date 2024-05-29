import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Button from '../Button/Button';
import { Tooltip } from 'react-tooltip';
import { MdOutlineUpdate } from 'react-icons/md';

const Reply = ({ reply, handleDeleteReply, setShowReplyBox, replyRefetch, commenter_name }) => {
    const { user } = useAuth();
    const [editableReply, setEditableReply] = useState(false);
    const [showReplyUpdateTime, setShowReplyUpdateTime] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { _id, reply_body, reply_person, reply_email, reply_photo, replied_on, updated_on } = reply;

    const handleEditReply = (e) => {
        e.preventDefault();
        const replyData = e.target.edit_reply.value;
        // console.log(replyData);
        if (replyData === "") {
            toast.error('Please, Write Something!', { duration: 1500 })
            return;
        }
        const editedReply = {
            reply_body: replyData,
            updated_on: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        axiosSecure.patch(`/reply/${_id}`, { ...editedReply })
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    replyRefetch();
                    toast.success('Reply Updated!');
                    setEditableReply(false);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurred!");
            })
    }

    return (
        <div className='ml-8'>
            {/* Reply */}
            <div className="flex items-center gap-1">
                <img src={reply_photo} alt={reply_person} className='w-10 h-10 rounded-full p-[2px] border' />
                <div className='flex flex-col gap-0 leading-4'>
                    <h5 className='text-gray-500 text-xs'>{moment(replied_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h5>
                    <h4 className='font-normal' title={reply_email}><span className="font-bold text-furry">{reply_person}</span> replied:</h4>
                </div>
            </div>

            {/* Edit Reply */}
            {editableReply ?
                <form className="ml-11 mb-2 flex items-start flex-col gap-4" onSubmit={handleEditReply}>
                    <textarea defaultValue={reply_body} className="w-full lg:w-2/5 h-28 border border-furry rounded-lg p-2 outline-none focus:border-2" name="edit_reply" id="edit_reply" placeholder={`Edit Your Reply to ${commenter_name}'s Comment`}></textarea>

                    <div className='flex gap-6 items-center'>
                        <Button buttonText={'Reply'} buttonType={'submit'} color={'#1e40ad'} hoverBgColor={'transparent'} hoverColor={'white'} className={'text-sm border rounded-xl px-3 py-1 font-medium'}></Button>
                        <Button onClick={() => setEditableReply(!editableReply)} buttonText={'Cancel'} color={'gray'} hoverBgColor={'transparent'} hoverColor={'white'} className={'text-sm border rounded-xl px-3 py-1 font-medium'}></Button>
                    </div>
                </form>
                : <p className='ml-11 mb-1'>{reply_body}</p>
            }
            {/* Edit & Delete Buttons */}
            <div className="text-xs ml-11 flex items-center gap-2 mb-2 font-semibold text-blue-500">
                {
                    user.email === reply_email && <div className='flex gap-2'>
                        <button className='cursor-pointer hover:text-furry' onClick={() => setEditableReply(!editableReply)}>Edit</button>
                        <button className='cursor-pointer hover:text-furry' onClick={() => handleDeleteReply(_id)}>Delete</button>
                    </div>
                }
                {
                    updated_on && <Tooltip anchorSelect=".reply-edit-time" place="top">
                        Edited on: {moment(updated_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}
                    </Tooltip>
                }
                {updated_on && <button className='reply-edit-time cursor-pointer hover:text-furry' onClick={() => setShowReplyUpdateTime(!showReplyUpdateTime)}>Edited</button>}
                <button className='cursor-pointer hover:text-furry' onClick={() => setShowReplyBox(showReplyBox => !showReplyBox)}>Reply</button>
            </div>
            {
                showReplyUpdateTime && updated_on && <h5 className="ml-11 text-gray-500 text-sm flex items-center gap-1"><MdOutlineUpdate />{moment(updated_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h5>
            }
        </div>
    );
};

Reply.propTypes = {
    reply: PropTypes.object,
    commenter_name: PropTypes.string,
    handleDeleteReply: PropTypes.func,
    setShowReplyBox: PropTypes.func,
    replyRefetch: PropTypes.func,
}

export default Reply;