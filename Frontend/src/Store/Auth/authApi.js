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

        loginPhone: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login-by-phone',
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

        verifyReset: builder.mutation({
            query: (credentials) => ({
                url: '/auth/verify-reset-otp',
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

        resendOTPRegister: builder.mutation({
            query: (credentials) => ({
                url: '/auth/resend-otp-after-register',
                method: 'POST',
                body: credentials,
            }),
        }),

        resendOTPForgot: builder.mutation({
            query: (credentials) => ({
                url: '/auth/resend-otp-after-forgot',
                method: 'POST',
                body: credentials,
            }),
        }),

    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLoginPhoneMutation,
    useVerifyMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyResetMutation,
    useResendOTPRegisterMutation,
    useResendOTPForgotMutation,
} = authApi;