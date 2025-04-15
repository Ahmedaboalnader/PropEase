import { baseApi } from '../baseApi';
import { showNotification } from '../../utils/notification';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    showNotification.success('Registration successful! Please verify your email.');
                } catch (error) {
                    showNotification.error(error.data?.message || 'Registration failed');
                }
            },
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    showNotification.success('Login successful!');
                } catch (error) {
                    showNotification.error(error.data?.message || 'Login failed');
                }
            },
        }),
        
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
} = authApi;