import { baseApi } from '../baseApi';

export const contactUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        contact: builder.mutation({
            query: (userData) => ({
                url: '/contact/send',
                method: 'POST',
                body: userData,
            }),
        }),
        subscribe: builder.mutation({
            query: (params) => ({
                url: '/contact/subscribe',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const {
    useContactMutation,
    useSubscribeMutation,
} = contactUsApi;