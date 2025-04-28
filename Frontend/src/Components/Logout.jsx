import React from 'react';
import { MdLogout } from 'react-icons/md';
// import { useLogoutMutation } from '../Store/Auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../utils/notification';

const Logout = () => {
    // const [logoutApi] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // const response = await logoutApi().unwrap();
            dispatch(logout());
            // showNotification.success(response?.message || 'Logged out successfully');
            navigate('/');
        } catch (error) {
            showNotification.error(error?.data?.message || 'Logout failed');
        }
    };

    return (
        <div
            onClick={handleLogout}
            className='w-full flex gap-8 items-center font-semibold text-xl !px-20 py-3 mt-64 text-logout cursor-pointer'
        >
            <MdLogout size={35} /> Logout
        </div>
    );
};

export default Logout;