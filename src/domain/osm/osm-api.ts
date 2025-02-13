import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeoLocation } from "@shared/lib/hooks/useGeoLocation.ts";

import { OsmReverseGeoResponse } from "./models/osm-reverse-geo.ts";

export const osmApi = createApi({
  reducerPath: "osm",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nominatim.openstreetmap.org" }),
  endpoints: (builder) => ({
    getReverseGeo: builder.query<OsmReverseGeoResponse, GeoLocation>({
      query: (params) => ({
        url: "/reverse",
        params: {
          format: "json",
          ...params,
        },
      }),
    }),
  }),
});
