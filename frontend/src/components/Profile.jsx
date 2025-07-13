import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext.jsx";
import { Button } from '@mui/material';
const Profile = () => {
   const { userData, setUserData } = useContext(AuthContext);
   const navigate = useNavigate();
   
    const handleLogout = () => {
            setUserData(null);
            localStorage.removeItem("user");
            localStorage.removeItem("username");
            navigate('/');
            };

    return (
       
        <div className='flex justify-center flex-col items-center mt-10'>
            <img className='h-80 w-80' src='/profileLogo.png'/>
            <div className='flex flex-row justify-evenly items-center w-full mt-10 tracking-wide'>
                <span className='flex justify-center flex-col items-center '>
                    <h2 className='text-2xl font-semibold '>Username</h2>
                    <p className='text-xl font-medium text-gray-400 cursor-pointer hover:font-semibold'>{userData?.username || "N/A"}</p>
                    </span>
                  <span className='flex justify-center flex-col items-center'>
                    <h2 className='text-2xl font-semibold'>Email</h2>
                    <p className='text-xl font-medium text-gray-400 cursor-pointer hover:font-semibold'>{userData.email || "N/A"}</p>
                </span>
            </div>
            <span className='mt-20'><Button variant="contained" color="error" onClick={handleLogout}><b>Logout</b></Button>
            </span>
        </div>
    );
}

export default Profile;
