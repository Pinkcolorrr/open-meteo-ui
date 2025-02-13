import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coords } from "@shared/models/coords.ts";

import { OsmReverseGeoResponse } from "./models/osm-reverse-geo.ts";

export const osmApi = createApi({
  reducerPath: "osm",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nominatim.openstreetmap.org" }),
  endpoints: (builder) => ({
    getReverseGeo: builder.query<OsmReverseGeoResponse, Coords>({
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
