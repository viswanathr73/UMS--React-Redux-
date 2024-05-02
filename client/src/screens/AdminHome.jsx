import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { deletUser, editUser, listUser} from "../slices/adminApiSlice";
import { userDetails } from "../slices/authSlice";
const TABLE_HEAD = ["Name", "Email", "Created At", "", ""];

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { adminInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  useEffect(() => {
    if (!adminInfo) {
      navigate('/adminLogin');
    }
  }, [adminInfo]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await listUser();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (data) => {
    try {
      setSearchQuery(data);
      console.log(data,'HHH');
      const filtered = users.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(data.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(data.toLowerCase());
        return nameMatch || emailMatch;
      });
      console.log(filtered,'KKK');
      setFilteredUsers(filtered);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };



 


    const edit=async(user)=>{
        dispatch(userDetails(user))
       
        navigate('/editUser')
       }
    
       
       const handleDelete=async (user)=>{
      try {
        const res=await deletUser(user)
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
        setFilteredUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id))
        navigate('/admin')
      } catch (error) {
        throw new Error ('Failed to delete user')
      }
        
       }
 
 
  return (

    
    <div className="relative h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/blaack.jpg')" }}>
      <div className="absolute inset-0 flex flex-col items-center justify-between m-5 bg-black bg-opacity-50">
        <div className="flex flex-col items-center rounded-md bg-neutral-800 bg-opacity-80 lg:w-6/12">
           
        <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-4 py-2 border rounded-md mr-2"
        />
        
      </div>
           
           
           
           
            <br />
            <br />
            <br />
          <Card className="w-full h-full overflow-auto">
            <table className="w-full text-left table-auto min-w-max bg-neutral-200 bg-opacity-80">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head,i) => (
                    <th key={i} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>


              {filteredUsers.length > 0 ? (
                   filteredUsers.map((user) => (



                    <tr key={user._id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {user.name}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {user.email}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {formatDate(user.createdAt)}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                       
                        <Typography onClick={()=>edit(user)} as="a"  variant="small" color="blue-gray" className="font-medium">
                          Edit
                        </Typography>
                       
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography onClick={()=>handleDelete(user)} as="a"  variant="small" color="blue-gray" className="font-medium">
                          Delete
                        </Typography>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        No user Found
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
          <div className="flex mt-8"></div>
          <br /> <br />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
