import { apiSlice } from "../api/apislice";
export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
      providesTags: ["project"],
    }),

    getProject: builder.query({
      query: (id) => `/projects/${id}`,
    }),

    getSingleProject: builder.query({
      query: (id) => `/user/projects/${id}`,
    }),

    getUserProjects: builder.query({
      query: () => `/projects`,
      providesTags: ["userProject"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),

    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetUserProjectsQuery,
  useGetSingleProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
