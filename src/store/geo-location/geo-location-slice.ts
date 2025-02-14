import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoLocation } from "@shared/utils/geo-location";
import { resolveActiveGeoLocation } from "@store/geo-location/thunks/resolve-active-geo-location.ts";

import { RequestedValue } from "../utils/requested-value";
import { resolveCurrentGeoLocation } from "./thunks/resolve-current-geo-location.ts";

interface GeoLocationState {
  currentLocation: RequestedValue<GeoLocation>;
  activeLocation: RequestedValue<GeoLocation>;
  recentLocations: GeoLocation[];
}

const initialState: GeoLocationState = {
  currentLocation: new RequestedValue<GeoLocation>(),
  activeLocation: new RequestedValue<GeoLocation>(),
  recentLocations: [],
};

export const geoLocationSlice = createSlice({
  name: "geoLocation",
  initialState,
  reducers: {
    setRecentLocations: (state, action: PayloadAction<GeoLocation[]>) => {
      state.recentLocations = action.payload;
    },
    setActiveLocation: (state, action: PayloadAction<GeoLocation>) => {
      RequestedValue.onSuccess(state.activeLocation, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resolveCurrentGeoLocation.pending, (state) =>
        RequestedValue.setLoading(state.currentLocation),
      )
      .addCase(resolveCurrentGeoLocation.fulfilled, (state, action) =>
        RequestedValue.onSuccess(state.currentLocation, action.payload),
      )
      .addCase(resolveCurrentGeoLocation.rejected, (state, action) =>
        RequestedValue.onError(state.currentLocation, action.payload as string),
      )
      .addCase(resolveActiveGeoLocation.pending, (state) =>
        RequestedValue.setLoading(state.activeLocation),
      )
      .addCase(resolveActiveGeoLocation.fulfilled, (state, action) =>
        RequestedValue.onSuccess(state.activeLocation, action.payload),
      )
      .addCase(resolveActiveGeoLocation.rejected, (state, action) =>
        RequestedValue.onError(state.activeLocation, action.payload as string),
      );
  },
});

export const { setRecentLocations, setActiveLocation } = geoLocationSlice.actions;
