import { baseApi } from '../baseApi';

export const accountApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => ({
                url: '/Account',
                method: 'GET',
            }),
            extraOptions: { maxRetries: 0 }
        }),
        putAccount: builder.mutation({
            query: (userData) => ({
                url: '/Account',
                method: 'PUT',
                body:userData,
            }),
        }),
        changePassword: builder.mutation({
            query: (password) => ({
                url: '/Account/change-password',
                method: 'PUT',
                body:password,
            }),
        }),
    }),
});

export const {
    useGetAccountQuery,
    usePutAccountMutation,
    useChangePasswordMutation,
} = accountApi;