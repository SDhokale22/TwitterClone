import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import {TWEET_API_ENDPOINT} from "../utils/constant";
import {useSelector, useDispatch} from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from '../redux/tweetsSlice';
import {USER_API_ENDPOINT} from "../utils/constant";
import { timeSince } from '../utils/constant';

const Tweet = ({tweet}) => {
    const {user} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const likeOrDislikeHandler = async(id) => {
        try{
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`, {id:user?._id}, {
                withCredentials:true
            });
            dispatch(getRefresh());
            toast.success(res.data.message);
            
        }catch(error){
            toast.error(error.res.data.message)
            console.log(error);
        }
    }

    const deleteTweetHandler = async(id) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
            
        }catch(error){
            toast.error(error.res.data.message)
            console.log(error);
        }
    }

    const BookmarkHandler = async(id) => {
        try{
            const res = await axios.put(`${USER_API_ENDPOINT}/bookmark/${id}`, {id:user?._id}, {
                withCredentials:true
            });
            //console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
            
        }catch(error){
            toast.error(error.res.data.message)
            console.log(error);
        }
    }
    
  return (
    <div className='border border-b border-gray-200'>
        <div>
        <div className='flex p-4'>
            <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB0IbR10VTbRxgKOiEBSE3vVEyXBNWhaqWXw&s' size="40" round={true} />
            <div className=' ml-2 w-full'>
            <div className='flex items-center'>
                <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                <p className='text-grey-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}.  ${timeSince(tweet?.createdAt)}`}</p>
            </div>
            
            <div>
                <p>{tweet?.description}</p>
            </div>
            <div className='flex justify-between my-3'>
                <div className='flex items-center'>
                    <div className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'
                        onClick={() => likeOrDislikeHandler(tweet?._id)} >
                        <CiHeart size={"24px"} />
                    </div>
                    <p>{tweet?.like?.length}</p>
                </div>
                <div className='flex items-center'>
                    <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                        <FaRegComment size={"20px"} />
                    </div>
                    <p>50</p>
                </div>
                <div className='flex items-center'>
                    <div className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'
                    onClick={() => BookmarkHandler(user?._id)} >
                        <CiBookmark size={"24px"} />
                    </div>
                    <p>{user?.bookmarks?.length}</p>
                </div>
                {
                    user?._id === tweet?.userId &&  (
                        <div className='flex items-center'
                            onClick={() => deleteTweetHandler(tweet?._id)} >
                            <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                            <MdDeleteOutline size={"24px"} />
                        </div>
                        <p>0</p>
                        </div>
                    )
                }                
                
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Tweet