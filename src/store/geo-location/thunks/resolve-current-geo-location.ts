import { createAsyncThunk } from "@reduxjs/toolkit";
import { GeoLocation } from "@shared/geo-location";

import { AppDispatch, RootState } from "../../store.ts";
import { createGeoLocationResolver, TGeoLocationResolveStrategy } from "../geo-location-resolver";

export const resolveCurrentGeoLocation = createAsyncThunk<
  GeoLocation,
  TGeoLocationResolveStrategy,
  { dispatch: AppDispatch; state: RootState }
>("geoLocation/resolveCurrent", async (strategy, { dispatch, rejectWithValue }) => {
  try {
    const resolver = createGeoLocationResolver(strategy, dispatch);
    const location = await resolver.resolve();

    if (location) return location;

    return rejectWithValue("Unable to resolve current location");
  } catch (error) {
    return rejectWithValue(error);
  }
});
