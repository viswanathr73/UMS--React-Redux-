import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/AdminHeader";
import AdminHome from "./screens/AdminHome";


const Admin=()=>{
    return (
        <>
        <AdminHeader/>
        <ToastContainer />
        <AdminHome />
        </>
    )
}

export default Admin