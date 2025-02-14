import { osmApi } from "@domain/osm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coords } from "@shared/models/coords.ts";

export const resolveActiveGeoLocation = createAsyncThunk(
  "geoLocation/resolveActive",
  async ({ lat, lon }: Coords, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(osmApi.endpoints.getReverseGeo.initiate({ lat, lon }));

      if ("error" in response) throw response.error;
      if (!response.data) return rejectWithValue("Unable to resolve active location");

      return {
        lat: lat,
        lon: lon,
        city: response.data.address.city,
        country: response.data.address.country,
        countryCode: response.data.address.country_code,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
