import React from 'react';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/Auth/authSlice';
import { showNotification } from '../utils/notification';
import { useLogoutMutation } from '../Store/Auth/authApi';
import { useNavigate } from 'react-router-dom';

const Logout = ({tabs = false}) => {
    const [logoutApi] = useLogoutMutation();
    const dispatch = useDispatch();
    const{navigate} = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logoutApi().unwrap();
            dispatch(logout());
            showNotification.success(response?.message || 'Logged out successfully');
            navigate('/')
        } catch (error) {
            showNotification.error(error?.data?.message || 'Logout failed');
        }
    };

    return (
        <div
            onClick={handleLogout}
            className={`!flex  !items-center gap-8 !px-4 py-2 !rounded-lg !transition-all !duration-300 text-logout 
                !cursor-pointer !font-medium !text-lg !min-w-[200px] 
                ${tabs ? "mt-64 !justify-center hover:bg-logout hover:text-white " : "!justify-start"}`}
        >
            <MdLogout size={35} /> Logout
        </div>
    );
};

export default Logout;