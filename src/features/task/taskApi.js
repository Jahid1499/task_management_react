import { apiSlice } from "../api/apislice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
      providesTags: ["task"],
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ["task"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    changeStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}/tasks`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useChangeStatusMutation,
} = projectApi;
