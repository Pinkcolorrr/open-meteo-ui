import { openMeteoApi, openMeteoGeoApi } from "@domain/open-meteo";
import { osmApi } from "@domain/osm";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [openMeteoApi.reducerPath]: openMeteoApi.reducer,
    [openMeteoGeoApi.reducerPath]: openMeteoGeoApi.reducer,
    [osmApi.reducerPath]: osmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      openMeteoApi.middleware,
      osmApi.middleware,
      openMeteoGeoApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
