import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Check for existing auth data in cookies
const storedUser = Cookies.get('user');
const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get('refreshToken');

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    isAuthenticated: !!accessToken,
    isVerified: !!accessToken,
    tempEmail: null,
    tempPhone: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.user = payload.user;
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.tempEmail = payload.email;
            state.tempPhone = payload.phoneNumber;
        },
        setVerifiedCredentials: (state) => {
            state.isVerified = true;   
            state.isAuthenticated = true;         
            Cookies.set('accessToken', state.accessToken, { expires: 7 });
            Cookies.set('refreshToken', state.refreshToken, { expires: 30 });
            Cookies.set('user', JSON.stringify(state.user), { expires: 7 });
        },
        logout: (state) => {
            Object.assign(state, initialState);
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove('user');
        },
    },
});

export const { setCredentials, setVerifiedCredentials, logout } = authSlice.actions;
export default authSlice.reducer;