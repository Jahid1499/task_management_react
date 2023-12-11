import { apiSlice } from "../api/apislice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => `/users`,
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
