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
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
        },
        setVerifiedCredentials: (state) => {
            state.isVerified = true;   
            state.isAuthenticated = true;         
            Cookies.set('accessToken', state.accessToken, { expires: 1/24 });
            Cookies.set('refreshToken', state.refreshToken, { expires: 30 });
        },
        logout: (state) => {
            Object.assign(state, initialState);
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },
    },
});

export const { setCredentials, setVerifiedCredentials, logout } = authSlice.actions;
export default authSlice.reducer;