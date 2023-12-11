import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apislice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  devTools: process.env.REACT_APP_PRODUCTION_MODE,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
