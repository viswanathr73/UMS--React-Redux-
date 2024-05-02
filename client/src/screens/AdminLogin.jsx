import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAdminCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Loader";
import AdminHeader from "../components/AdminHeader";
import { adminLogin } from "../slices/adminApiSlice";
import { toast } from "react-toastify";
const AdminLogin=()=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')

    const navigate=useNavigate();
    const dispatch=useDispatch();
    

   
    
    const {adminInfo}=useSelector((state)=>state.auth)
    
    useEffect(()=>{
     if(adminInfo){
      navigate('/admin')
     }
    },[navigate,adminInfo])
    
    
    
    
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {

        const res=await adminLogin({email,password})
        dispatch(setAdminCredentials({...res}))
       
      } catch (error) { 
        toast.error(error?.data?.message || error.message )
        
      }

    }
    
    return (
        <>
        <AdminHeader/>
        <FormContainer>
<div className="w-1/2 h-screen bg-black">
    <div className="flex flex-col justify-center w-2/3 h-full mx-auto text-white xl:w-1/2">
    
     
      <div className="mt-10">
        <form onSubmit={handleSubmit} >
          <div>
            <label className="mb-2.5 block font-extrabold">Email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" />
          </div>
          <div className="mt-4">
            <label className ="mb-2.5 block font-extrabold">Password</label>
            <input type="password" id="email" value={password} onChange={(e)=>setPassword(e.target.value)} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
          </div>
          <div className="flex flex-col justify-between w-full mt-4 sm:flex-row">
             
            
            
          </div>
          
          
          <div className="my-10">
            <button type="submit" className="w-full p-5 bg-orange-600 rounded-full hover:bg-orange-800">Login</button>
          </div>
        </form>
        
       
        
      </div>
    </div>
  </div>
</FormContainer>
</>
    )
}

export default AdminLogin