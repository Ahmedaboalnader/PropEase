import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        
        verify: builder.mutation({
            query: (credentials) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: credentials,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: credentials,
            }),
        }),

        resetPassword: builder.mutation({
            query: (credentials) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useVerifyMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;