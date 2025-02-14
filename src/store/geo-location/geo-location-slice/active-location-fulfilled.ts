import { PayloadAction } from "@reduxjs/toolkit";
import { compareLocations, GeoLocation } from "@shared/geo-location";
import { RequestedValue } from "@store/lib/requested-value";
import { PersistentMeta } from "@store/middlewares/persistent-middleware";

import { GeoLocationState } from "./geo-location-slice.ts";

const RECENT_LOCATIONS_STORAGE_KEY = "OM-UI_RECENT-LOCATIONS";

const RECENT_LOCATIONS_MAX = 5;

export function getRecentLocationsInitialState(): GeoLocation[] {
  try {
    const item = localStorage.getItem(RECENT_LOCATIONS_STORAGE_KEY);
    if (item) {
      return JSON.parse(item) ?? [];
    }

    return [];
  } catch (err) {
    console.error("Unable to get recent location from storage", err);
    return [];
  }
}

export const onActiveLocationFulfilled = (
  state: GeoLocationState,
  action: PayloadAction<GeoLocation>,
) => {
  RequestedValue.onSuccess(state.activeLocation, action.payload);
  const isAlreadyInRecent = state.recentLocations.find((loc) =>
    compareLocations(loc, action.payload),
  );

  const isCurrentLocation =
    !!state.currentLocation.data && compareLocations(state.currentLocation.data, action.payload);

  if (isAlreadyInRecent || isCurrentLocation) {
    return;
  }

  if (state.recentLocations.length < RECENT_LOCATIONS_MAX) {
    state.recentLocations = state.recentLocations.concat(action.payload);
  } else {
    state.recentLocations = state.recentLocations
      .slice(1, RECENT_LOCATIONS_MAX)
      .concat(action.payload);
  }

  (action as PayloadAction<GeoLocation, string, PersistentMeta<GeoLocation[]>>).meta = {
    persistent: true,
    key: RECENT_LOCATIONS_STORAGE_KEY,
    dataToPersist: state.recentLocations,
  };
};
