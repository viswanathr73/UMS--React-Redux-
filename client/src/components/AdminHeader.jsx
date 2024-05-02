import { Disclosure, Menu, Transition } from '@headlessui/react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState } from 'react'
import { adminLogoutb } from '../slices/adminApiSlice';
import { adminLogout } from '../slices/authSlice'
import { toast } from 'react-toastify';

const navigation = [
    { name: 'Admin', href: '/admin', current: true },
    ]
    
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  
  
const AdminHeader=()=>{
    const {adminInfo}=useSelector((state)=>state.auth)
  
    console.log(adminInfo);
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutHandler=async()=>{
        try {
            await adminLogoutb()
            dispatch(adminLogout());
          navigate('/adminLogin')
            
          } catch (error) {
           toast.error(error)
          }
        
    }
    
    
    
    
    
    return (
        <Disclosure as="nav" className="bg-black">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <img
                      className="w-auto h-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href} // Update this to the correct property of your navigation item
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
  
                <Menu as="div" className="relative ml-3">
    <div>
     
      {adminInfo ? (
    <div className="flex items-center">
      <div className="mr-2 text-white">
        {adminInfo.name}
      </div>
  
      <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          className="w-10 h-10 rounded-full"
          
          src={adminInfo.profile ?(`http://localhost:5000/images/${adminInfo.profile}`) : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"  }
          alt={`Profile of ${adminInfo.name}`}
        />
      </Menu.Button>
    </div>
  ) : (
    <>
      
      <Link to="/login">
        <span className="text-gray-300">Log in</span>
      </Link>
    </>
  )}
  
    </div>
  
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-gray-100 shadow-lg rounded-1md ring-1 ring-black ring-opacity-5 focus:outline-none">
                        
                        
                        <Menu.Item>
                          {({ active }) => (
                             <span onClick={logoutHandler} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                           log out
                           </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}

export default AdminHeader