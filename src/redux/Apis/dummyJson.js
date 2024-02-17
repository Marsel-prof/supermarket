import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products?`,
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getCategory: builder.query({
      query: (name) => `/products/category/${name}`,
    }),
    getCartById: builder.query({
      query: (userId) => `/carts/user/${userId}`,
    }),
    addToCart: builder.mutation({
      query: ({ userId, products }) => ({
        url: '/carts/add',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          products: products.map(product => ({
            id: product.id,
            quantity: product.quantity
          }))
        })
      })
    })
    
  
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddToCartMutation 
,useGetCategoryQuery,useGetCartByIdQuery} = dummyJsonApi;
