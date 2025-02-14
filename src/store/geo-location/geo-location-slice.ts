import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoLocation } from "@shared/utils/geo-location";

import { RequestedValue } from "../utils/requested-value";
import {
  currentLocationHandler,
  getCurrentLocationsInitialState,
} from "./handlers/current-location-handler.ts";
import {
  getRecentLocationsInitialState,
  recentLocationHandler,
} from "./handlers/recent-locations-handler.ts";
import { resolveActiveGeoLocation } from "./thunks/resolve-active-geo-location.ts";
import { resolveCurrentGeoLocation } from "./thunks/resolve-current-geo-location.ts";

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
    setCurrentLocation: (state, action: PayloadAction<GeoLocation>) => {
      currentLocationHandler(state, action);
    },
    setActiveLocation: (state, action: PayloadAction<GeoLocation>) => {
      RequestedValue.onSuccess(state.activeLocation, action.payload);
      recentLocationHandler(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resolveCurrentGeoLocation.pending, (state) =>
        RequestedValue.setLoading(state.currentLocation),
      )
      .addCase(resolveCurrentGeoLocation.fulfilled, (state, action) => {
        currentLocationHandler(state, action);
      })
      .addCase(resolveCurrentGeoLocation.rejected, (state, action) =>
        RequestedValue.onError(state.currentLocation, action.payload as string),
      )
      .addCase(resolveActiveGeoLocation.pending, (state) =>
        RequestedValue.setLoading(state.activeLocation),
      )
      .addCase(resolveActiveGeoLocation.fulfilled, (state, action) => {
        RequestedValue.onSuccess(state.activeLocation, action.payload);
        recentLocationHandler(state, action);
      })
      .addCase(resolveActiveGeoLocation.rejected, (state, action) =>
        RequestedValue.onError(state.activeLocation, action.payload as string),
      );
  },
});

export const { setActiveLocation, setCurrentLocation } = geoLocationSlice.actions;
