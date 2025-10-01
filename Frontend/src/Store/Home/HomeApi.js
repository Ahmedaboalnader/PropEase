import { baseApi } from '../baseApi';

export const HomeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        featuredCategories: builder.query({
            query: () => ({
                url: '/properties/featured-categories',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFeaturedCategoriesQuery,
} = HomeApi;