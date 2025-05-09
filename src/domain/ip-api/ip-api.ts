import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IpApiResponse } from "./models/ip-api-response.ts";

export const ipApi = createApi({
  reducerPath: "ip-api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ipwhois.app/json/" }),
  endpoints: (builder) => ({
    resolveIp: builder.query<IpApiResponse, void>({
      query: () => "",
    }),
  }),
});
