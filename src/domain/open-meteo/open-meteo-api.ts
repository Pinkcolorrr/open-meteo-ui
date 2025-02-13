import { fetchWeatherData, WeatherDataParams } from "@atombrenner/openmeteo";
import { createApi } from "@reduxjs/toolkit/query/react";

export const openMeteoApi = createApi({
  reducerPath: "open-meteo",
  baseQuery: async () => ({ data: null }),
  endpoints: (builder) => ({
    getForecast: builder.query({
      queryFn: async (params: WeatherDataParams) => {
        try {
          const data = await fetchWeatherData(params);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
