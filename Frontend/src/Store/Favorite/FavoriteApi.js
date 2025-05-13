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
                url: `/Favorites/toggle/${propertyId}`,
                method: 'POST',
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
    }),
});

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useGetFavoriteQuery,
} = FavoriteApi;