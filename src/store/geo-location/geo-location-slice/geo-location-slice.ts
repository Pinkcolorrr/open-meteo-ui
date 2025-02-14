import { createSlice } from "@reduxjs/toolkit";
import { GeoLocation } from "@shared/geo-location";
import { RequestedValue } from "@store/lib/requested-value";

import { resolveActiveGeoLocation } from "../thunks/resolve-active-geo-location.ts";
import { resolveCurrentGeoLocation } from "../thunks/resolve-current-geo-location.ts";
import {
  getRecentLocationsInitialState,
  onActiveLocationFulfilled,
} from "./active-location-fulfilled.ts";
import {
  getCurrentLocationsInitialState,
  onCurrentLocationFulfilled,
} from "./current-location-fulfilled.ts";

export interface GeoLocationState {
  currentLocation: RequestedValue<GeoLocation>;
  activeLocation: RequestedValue<GeoLocation>;
  recentLocations: GeoLocation[];
}

const initialState: GeoLocationState = {
  currentLocation: getCurrentLocationsInitialState(),
  activeLocation: new RequestedValue<GeoLocation>(),
  recentLocations: getRecentLocationsInitialState(),
};

export const geoLocationSlice = createSlice({
  name: "geoLocation",
  initialState,
  reducers: {
    setCurrentLocation: onCurrentLocationFulfilled,
    setActiveLocation: onActiveLocationFulfilled,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resolveCurrentGeoLocation.pending, (state) =>
        RequestedValue.setLoading(state.currentLocation),
      )
      .addCase(resolveCurrentGeoLocation.fulfilled, onCurrentLocationFulfilled)
      .addCase(resolveCurrentGeoLocation.rejected, (state, action) =>
        RequestedValue.onError(state.currentLocation, action.payload as string),
      )
      .addCase(resolveActiveGeoLocation.pending, (state) =>
        RequestedValue.setLoading(state.activeLocation),
      )
      .addCase(resolveActiveGeoLocation.fulfilled, onActiveLocationFulfilled)
      .addCase(resolveActiveGeoLocation.rejected, (state, action) =>
        RequestedValue.onError(state.activeLocation, action.payload as string),
      );
  },
});

export const { setActiveLocation, setCurrentLocation } = geoLocationSlice.actions;
