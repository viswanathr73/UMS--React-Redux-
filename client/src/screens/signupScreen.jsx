
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer"
import { useState ,useEffect} from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from 'react-toastify';
import Spinner from "../components/Loader";
const SignupScreen=()=>{

const dispatch=useDispatch();
const navigate=useNavigate();

const [register,{isLoading}]=useRegisterMutation()

const {userInfo}=useSelector((state)=>state.auth)

useEffect(()=>{
  if(userInfo){
    navigate('/');
    
  }
},[navigate,userInfo])




    const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [conformPassword,setConfromPassword]=useState('')

    const handleSubmit=async(e)=>{
      e.preventDefault();
if(password !==conformPassword){
  toast.error('password is not match')
}else{
  try {
    const res=await register({name,email,password}).unwrap()
  dispatch(setCredentials({...res}))
  navigate('/')
  } catch (error) {
    
  
  toast.error(error?.data?.message || error.message )
  }
}
      



    }
return(
<FormContainer>
<div className="w-1/2 h-screen bg-black">
    <div className="flex flex-col justify-center w-2/3 h-full mx-auto text-white xl:w-1/2">
    
     
      <div className="mt-10">
        <form onSubmit={handleSubmit} >
          <div>
          <div className="mt-4">
            <label className ="mb-2.5 block font-extrabold">Name</label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
          </div>
            <label className="mb-2.5 block font-extrabold">Email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"  />
          </div>
          <div className="mt-4">
            <label className ="mb-2.5 block font-extrabold">Password</label>
            <input type="password" id="email" value={password} onChange={(e)=>setPassword(e.target.value)} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
          </div>
         
          <div className="mt-4">
            <label className ="mb-2.5 block font-extrabold"> Confirm Password</label>
            <input type="password" id="email" value={conformPassword} onChange={(e)=>setConfromPassword(e.target.value)} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
          </div>
          
          
          {isLoading && <Spinner/>}
          <div className="my-10">
            <button type="submit" className="w-full p-5 bg-orange-600 rounded-full hover:bg-orange-800">Sign Up</button>
          </div>
        </form>
        
        <Link to='/login'>
        <div>
          Already have an accound ..? 
        </div>
        </Link>
        
      </div>
    </div>
  </div>
</FormContainer>
)

}

export default SignupScreen

