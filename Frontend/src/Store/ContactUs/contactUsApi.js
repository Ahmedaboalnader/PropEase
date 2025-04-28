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
    }),
});

export const {
    useContactMutation,
} = contactUsApi;