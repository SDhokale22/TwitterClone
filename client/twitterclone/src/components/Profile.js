import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import {Link, useParams} from "react-router-dom";
import Avatar from "react-avatar"
import useGetProfile from '../hooks/useGetProfile';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import toast from "react-hot-toast";
import  {USER_API_ENDPOINT} from "../utils/constant";
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetsSlice';

const Profile = () => {
  const {user, profile} = useSelector(store=>store.user);
  const {id} = useParams();
  const dispatch = useDispatch();
  //console.log(user);
  useGetProfile(id);

  const followAndUnfolowHandler = async() => {
    
    if(user.following.includes(id)){
      //unfollow
      try{
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`, {id:user?._id})
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      }catch(error){
        console.log(error);
        toast.error(error.res.data.message);
      }
    }else{
      //follow
      try{
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`, {id:user?._id})
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      }catch(error){
        console.log(error);
        toast.error(error.res.data.message);
      }
    }
    
  }


  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
        <div>
          <div className='flex items-center py-2'>
            <Link to="/" className='p-2 rounded-full hover:bg-gray-100'>
              <IoMdArrowBack size={"24px"} />
            </Link>
            <div className='ml-2'>
              <h1 className='font-bold text-lg '>{profile?.name}</h1>
              <p className='text-gray-500 text-sm'>10 Post</p>
            </div>
          </div>
            <img src='https://img.freepik.com/free-vector/gradient-business-facebook-cover-design_23-2149695696.jpg?w=1380&t=st=1711212137~exp=1711212737~hmac=1922c600b7988babec215d1558ba37658b14c7ad47f882b7ee484ca45fa7e8a6' alt='' />
            <div className='absolute top-56 ml-2 border-4 border-white rounded-full'>
              <Avatar src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png" size='120' alt="" />
            </div>
            <div className='text-right m-2'>
            {
              profile?._id === user?._id ? (
                <button className='px-4 py-1  hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
              ) : (
                <button onClick={followAndUnfolowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" :  "Follow"}</button>
              )
            }  
            </div>
            <div className='m-4'>
              <h1 className='font-bold text-xl'>{profile?.name}</h1>
              <p>{`@${profile?.username}`}</p>
            </div>
            <div className='m-4 text-sm'>
              <p>Just a casual developer, coding my way through life ✨ Lover of all things tech, coffee, and memes 🖥️☕️🤪 #codinglife #webdev"</p>
            </div>
          </div>
    </div>
  )
}

export default Profile