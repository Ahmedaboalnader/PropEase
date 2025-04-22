import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import { baseApi } from './baseApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});