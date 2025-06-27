import { baseApi } from '../baseApi';

export const FavoriteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: () => ({
                url: '/Favorites',
                method: 'GET',
            }),
            providesTags: ['Favorites'],
        }),

        addFavorite: builder.mutation({
            query: (propertyId) => ({
                url: `/Favorites/${propertyId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Favorites'],
        }),
        
        deleteFavorite: builder.mutation({
            query: (propertyId) => ({
                url: `/Favorites/${propertyId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Favorites'],
        }),

        getFavorite: builder.query({
            query: (id) => ({
                url: `/Favorites/${id}`,
                method: 'GET',
            providesTags: ['Favorites'],
            }),
        }),

        getSingleProperty: builder.query({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'GET',
            }),
            providesTags: ['Property', 'Favorites']
        }),
    }),
});

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetFavoriteQuery,
    useGetSinglePropertyQuery,
} = FavoriteApi;