import axios from 'axios';

const ADMIN_URL = '/api/admin';

// Action creators for each API call
export const adminLogin = async (data) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Invalid email or password');
  }
};

export const adminLogoutb = async () => {
  try {
    const response = await axios.post(`${ADMIN_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};

export const listUser = async () => {
  try {
    const response = await axios.get(`${ADMIN_URL}/listUser`);
    return response.data;
  } catch (error) {
    console.error('List user error:', error);
    throw new Error('Failed to fetch user list');
  }
};

export const editUser = async (data) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/editUser`, data);
    return response.data;
  } catch (error) {
    console.error('Edit user error:', error);
    throw new Error('Failed to edit user');
  }
};


export const deletUser =async (data)=>{
 try {
    const res= await axios.post(`${ADMIN_URL}/deletUser`,data)

    return res.data
 } catch (error) {
    console.error('Edit user error:', error);
    throw new Error('Failed to delete user');
 }  
}