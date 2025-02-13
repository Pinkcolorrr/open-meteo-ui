import { fetchWeatherData, WeatherDataParams } from "@atombrenner/openmeteo";
import { createApi } from "@reduxjs/toolkit/query/react";

import { ExtendedWeatherDataParams } from "./models/extended-weather-data-params.ts";

export const openMeteoApi = createApi({
  reducerPath: "open-meteo",
  baseQuery: async () => ({ data: null }),
  endpoints: (builder) => ({
    getForecast: builder.query({
      queryFn: async (params: ExtendedWeatherDataParams) => {
        try {
          const data = await fetchWeatherData(params as WeatherDataParams);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
