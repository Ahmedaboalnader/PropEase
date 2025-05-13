import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};

// Check for existing auth data in cookies
const storedUser = Cookies.get('user');
const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get('refreshToken');

// Remove expired access token
if (accessToken && isTokenExpired(accessToken)) {
    Cookies.remove('accessToken');
}

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: (accessToken && !isTokenExpired(accessToken)) ? accessToken : null,
    refreshToken: refreshToken || null,
    isAuthenticated: !!(accessToken && !isTokenExpired(accessToken)),
    isVerified: !!(accessToken && !isTokenExpired(accessToken)),
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