import React from 'react';
import {CiHome} from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import toast from "react-hot-toast";
import  {USER_API_ENDPOINT} from "../utils/constant";
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const LeftSidebar = () => {
    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async() => {
        try{
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
            toast.success(res.data.message);
            dispatch(getUser(null));   
            dispatch(getOtherUsers(null)); 
            dispatch(getMyProfile(null)); 
            navigate("/login");
        }catch(error){
            console.log(error);
            toast.error(error.res.data.message)
        }
    }

  return (
    <>
    <div className='w-[20]'>
        <div>
            <div>
                 <img className='ml-5' width={"40px"} src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=740&t=st=1711035937~exp=1711036537~hmac=3092ec856d881461d3b884df2f9b98320fbe09a9a2f1a6bd672f8a6f02df6f6600' alt='' />
            </div>
        <div className='my-4'>
            <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
                <div>
                    <CiHome size="24px"  />
                </div>
                <h1 className='font-bold text-lg ml-2'>Home</h1>
            </Link>
            <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
                <div>
                    <CiHashtag size="24px"  />
                </div>
                <h1 className='font-bold text-lg ml-2'>Explore</h1>
            </div>
            <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
                <div>
                    <IoIosNotificationsOutline size="24px"  />
                </div>
                <h1 className='font-bold text-lg ml-2'>Notification</h1>
            </div>
            <Link to={`/Profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
                <div>
                    <CiUser size="24px"  />
                </div>
                <h1 className='font-bold text-lg ml-2'>Profile</h1>
            </Link>
            <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
                <div>
                    <CiBookmark size="24px"  />
                </div>
                <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
            </div>
            <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
                <div>
                    <AiOutlineLogout size="24px"  />
                </div>
                <h1 className='font-bold text-lg ml-2'>Logout</h1>
            </div>
            <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>

        </div>
    </div>
    </div>
    </>
  )
}

export default LeftSidebar