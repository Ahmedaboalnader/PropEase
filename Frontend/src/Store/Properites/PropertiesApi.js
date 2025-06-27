import { baseApi } from '../baseApi';
import Cookies from 'js-cookie';

export const PropertiesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProperty: builder.mutation({
            query: (params) => ({
                url: '/properties',
                method: 'POST',
                body: params,
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }),
            invalidatesTags: ['Property'],
        }),

        deleteProperty: builder.mutation({
            query: (propertyId) => ({
                url: `/properties/${propertyId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }),
            invalidatesTags: ['Property'],
        }),

        editProperty: builder.mutation({
            query: ({ propertyId, params }) => ({
                url: `/properties/${propertyId}`,
                method: 'PUT',
                body: params,
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }),
            invalidatesTags: ['EditProperty'],
        }),

        getAllProperites: builder.query({
            query: (params) => ({
                url: '/properties',
                method: 'GET',
                params,
            }),
            providesTags: ["Property"]
        }),

        getSingleProperty: builder.query({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'GET',
            }),
            providesTags: ["Property"]
        }),
    }),
});

export const {
    useCreatePropertyMutation,
    useDeletePropertyMutation,
    useEditPropertyMutation,
    useGetAllProperitesQuery,
    useGetSinglePropertyQuery,
} = PropertiesApi;