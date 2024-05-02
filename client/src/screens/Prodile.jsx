import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Spinner from '../components/Loader';
const UserProfile = () => {
  const [updateProfile,{isLoading}]=useUpdateProfileMutation()
  const dispatch=useDispatch();
  const navigate=useNavigate();
 
  const {userInfo}=useSelector((state)=>state.auth)
  const image=()=>{
    document.getElementById("fileInput").click();
  }
  const changeProfile=async(e)=>{
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
   const res=await updateProfile(formData).unwrap();
   dispatch(setCredentials({...res}))
   navigate('/profile')
  }
  
  return (
    <>
     
    
    

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")'
          }}>
           
           
            <span id="blackOverlay" className="absolute w-full h-full bg-black opacity-50"></span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px" style={{ transform: 'translateZ(0px)' }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="fill-current text-blueGray-200" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container px-4 mx-auto">
            <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                    <div className="relative">
                      <img onClick={image} alt="..." src={userInfo.profile ? (`http://localhost:5000/images/${userInfo.profile}`) : ('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')} className="w-20 h-20 rounded-full" />
                      <input
              type="file"
              name="file"
              id="fileInput"
              onChange={changeProfile}
              hidden
            />
            
            {isLoading && <Spinner/>}
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                  <div className="px-3 py-6 mt-32 sm:mt-0">
                    <Link to='/editprofile'>
                      <button className="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none sm:mr-2" type="button">
                        Edit Profile
                      </button>
                    </Link>
                      
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-4/12 lg:order-1">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      
                      
                      <br />
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <h3 className="mb-2 text-4xl font-semibold leading-normal text-blueGray-700">
                    {userInfo.name}
                  </h3>
                  <div className="mt-0 mb-2 text-sm font-bold leading-normal uppercase text-blueGray-400">
                   
                    {userInfo.email}
                  </div>
                
                 
                </div>
                
                </div>
              </div>
            </div>
       
          <footer className="relative pt-8 pb-6 mt-8 bg-blueGray-200">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap items-center justify-center md:justify-between">
                <div className="w-full px-4 mx-auto text-center md:w-6/12">
                  
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
