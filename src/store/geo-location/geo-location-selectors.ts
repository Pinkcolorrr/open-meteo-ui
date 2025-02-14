import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store.ts";

export const selectCurrentLocation = (state: RootState) => state.geoLocation.currentLocation;

export const selectActiveLocation = (state: RootState) => state.geoLocation.activeLocation;

export const selectRecentLocations = (state: RootState) => state.geoLocation.recentLocations;

export const selectIsUserLocation = createSelector(
  (state: RootState) => state.geoLocation.currentLocation.data?.lat,
  (state: RootState) => state.geoLocation.currentLocation.data?.lon,
  (state: RootState) => state.geoLocation.activeLocation.data?.lat,
  (state: RootState) => state.geoLocation.activeLocation.data?.lon,
  (cLat, cLon, aLat, aLon) => cLat === aLat && cLon === aLon,
);
