import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { OpenMeteoGeoResponse } from "./models/open-meteo-geo-response.ts";

export const openMeteoGeoApi = createApi({
  reducerPath: "open-meteo-geo",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://geocoding-api.open-meteo.com/v1",
  }),
  endpoints: (builder) => ({
    searchLocation: builder.query<OpenMeteoGeoResponse, string>({
      query: (name) => ({
        url: "/search",
        params: { name, count: 5 },
      }),
    }),
  }),
});
