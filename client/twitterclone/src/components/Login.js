import React, { useState } from 'react';
import axios from "axios";
import { USER_API_ENDPOINT } from '../utils/constant.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getUser } from '../redux/userSlice.js';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }

  const loginSignupHahdler = () => {
    setIsLogin(!isLogin);
  }

  return (

    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
        <img className='ml-5' width={"400px"} src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=740&t=st=1711035937~exp=1711036537~hmac=3092ec856d881461d3b884df2f9b98320fbe09a9a2f1a6bd672f8a6f02df6f6600' alt='' />
        </div>
        <div>
        <div className='my-5'>
          <h1 className='font-bold text-6xl'>Happening Now.</h1>
        </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Join Today"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
          {
            !isLogin && (
              <>
              <input className='outline-blue-500 border border-gray-800 px-4 py-1 rounded-full my-1 font-semibold' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
              <input className='outline-blue-500 border border-gray-800 px-4 py-1 rounded-full my-1 font-semibold' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
              </>
            )
          }
           
            <input className='outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-1 font-semibold' type='email' value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email' />
            <input className='outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-1 font-semibold' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button className='bg-[#1D9BF0] text-white border-none py-2 my-4 rounded-full text-lg'>{isLogin ? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Do not Have an Account?" : "Already Have an Account?"} <span className='cursor-pointer font-bold text-blue-800' onClick={loginSignupHahdler}>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login