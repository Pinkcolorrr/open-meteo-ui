import { osmApi, resolveOsmDisplayName } from "@domain/osm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coords, GeoLocation } from "@shared/geo-location";

import { AppDispatch, RootState } from "../../store.ts";

export const resolveActiveGeoLocation = createAsyncThunk<
  GeoLocation,
  Coords,
  { dispatch: AppDispatch; state: RootState }
>("geoLocation/resolveActive", async ({ lat, lon }: Coords, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(osmApi.endpoints.getReverseGeo.initiate({ lat, lon }));

    if ("error" in response) throw response.error;
    if (!response.data) return rejectWithValue("Unable to resolve active location");

    return {
      lat: lat,
      lon: lon,
      name: resolveOsmDisplayName(response.data),
      country: response.data.address.country,
      countryCode: response.data.address.country_code,
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});
