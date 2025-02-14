import { ipApi } from "@domain/ip-api";
import { openMeteoApi, openMeteoGeoApi } from "@domain/open-meteo";
import { osmApi } from "@domain/osm";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { geoLocationSlice } from "./geo-location";

export const store = configureStore({
  reducer: {
    [openMeteoApi.reducerPath]: openMeteoApi.reducer,
    [openMeteoGeoApi.reducerPath]: openMeteoGeoApi.reducer,
    [ipApi.reducerPath]: ipApi.reducer,
    [osmApi.reducerPath]: osmApi.reducer,
    [geoLocationSlice.reducerPath]: geoLocationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      openMeteoApi.middleware,
      osmApi.middleware,
      openMeteoGeoApi.middleware,
      ipApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
