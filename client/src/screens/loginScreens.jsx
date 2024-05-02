
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Spinner from "../components/Loader";
import { toast } from "react-toastify";
const LoginScreen=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')

    const navigate=useNavigate();
    const dispatch=useDispatch();
    

    const [login,{isLoading}]=useLoginMutation();
    
    const {userInfo}=useSelector((state)=>state.auth)
    
    useEffect(()=>{
     if(userInfo){
      navigate('/')
     }
    },[navigate,userInfo])
    
    
    
    
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const res=await login({email,password}).unwrap()
        dispatch(setCredentials({...res}))
      } catch (error) { 
        toast.error(error?.data?.message || error.message )
        
      }



    }
return(
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
          {isLoading && <Spinner/>}
          
          <div className="my-10">
            <button type="submit" className="w-full p-5 bg-orange-600 rounded-full hover:bg-orange-800">Login</button>
          </div>
        </form>
        
        <Link to='/signup'>
        <div>
          Dont have any account ..?
        </div>
        </Link>
        
      </div>
    </div>
  </div>
</FormContainer>
)

}

export default LoginScreen

