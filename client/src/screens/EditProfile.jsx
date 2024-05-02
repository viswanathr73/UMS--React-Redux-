import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../slices/usersApiSlice";
import { toast } from 'react-toastify';
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Loader";
const EditProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name,setName]=useState(userInfo.name);
  const [email,setEmail]=useState(userInfo.email);
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('')
  
  const [editProfile,{isLoading}]=useEditProfileMutation()
  const dispatch=useDispatch()
const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(password !==confirmPassword){
        toast.error('password is not match')    
    }else{
        try {
            
            
            const res= await editProfile({name,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            
            navigate('/profile')
        } catch (error) {
        toast.error(error?.data?.message || error.message)    
            
        }
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full p-8 bg-white shadow-md md:w-3/5 lg:ml-4">
        <div className="p-6 rounded shadow">
            <form onSubmit={handleSubmit}>
          <div className="pb-6">
            <label htmlFor="name" className="block pb-1 font-semibold text-gray-700">
              Name
            </label>
            <div className="flex">
              <input
               
                id="username"
                className="w-full px-4 py-2 rounded-r border-1"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          </div>
          <div className="pb-4">
            <label htmlFor="about" className="block pb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
            
              id="email"
              className="w-full px-4 py-2 rounded-r border-1"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            
          </div>
          <div className="pb-6">
            <label htmlFor="name" className="block pb-1 font-semibold text-gray-700">
              Password
            </label>
            <div className="flex">
              <input
               
                id="password"
                className="w-full px-4 py-2 rounded-r border-1"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>
        
        
         
          <div className="pb-6">
            <label htmlFor="name" className="block pb-1 font-semibold text-gray-700">
            confirm  Password
            </label>
            <div className="flex">
              <input
             
                id="confirmPassword"
                className="w-full px-4 py-2 rounded-r border-1"
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          
            
          <button type="submit" className="px-4 py-2 text-white bg-gray-500 rounded-md">Edit</button>

          </form>
        </div>
     
      </div>
    </div>
  );
};

export default EditProfile;
