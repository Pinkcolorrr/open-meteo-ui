import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coords } from "@shared/geo-location";

import { OsmReverseGeoResponse } from "./models/osm-reverse-geo.ts";

export const osmApi = createApi({
  reducerPath: "osm",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nominatim.openstreetmap.org" }),
  endpoints: (builder) => ({
    getReverseGeo: builder.query<OsmReverseGeoResponse, { signal?: AbortSignal } & Coords>({
      query: ({ lat, lon, signal }) => ({
        url: "/reverse",
        params: {
          format: "json",
          lon,
          lat,
        },
        signal,
      }),
    }),
  }),
});
