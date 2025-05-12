import { baseApi } from '../baseApi';
import Cookies from 'js-cookie';

export const PropertiesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProperty: builder.mutation({
            query: (params) => {
                const token = Cookies.get('access_token');

                return {
                    url: '/properties',
                    method: 'POST',
                    body: params, 
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                };
            },
        }),
        getAllProperites: builder.query({
            query: () => ({
                url: '/properties',
                method: 'GET',
            }),
        }),
        getSingleProperty: builder.query({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreatePropertyMutation,
    useGetAllProperitesQuery,
    useGetSinglePropertyQuery,


} = PropertiesApi;