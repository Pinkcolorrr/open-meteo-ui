import { PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { GeoLocation } from "@shared/utils/geo-location";
import { PersistentMeta } from "@store/middlewares/persistent-middleware";

import { RequestedValue } from "../../utils/requested-value";
import { GeoLocationState } from "../geo-location-slice.ts";

export const CURRENT_LOCATION_STORAGE_KEY = "OM-UI_CURRENT_LOCATION";

export function getCurrentLocationsInitialState(): RequestedValue<GeoLocation> {
  try {
    const item = localStorage.getItem(CURRENT_LOCATION_STORAGE_KEY);
    if (item) {
      return {
        data: JSON.parse(item),
        error: null,
        status: QueryStatus.fulfilled,
        isUninitialized: false,
        isError: false,
        isLoading: false,
        isSuccess: true,
      };
    }

    return new RequestedValue();
  } catch (err) {
    console.error("Unable to get recent location from storage", err);
    return new RequestedValue();
  }
}

export function currentLocationHandler(
  state: GeoLocationState,
  action: PayloadAction<GeoLocation>,
) {
  RequestedValue.onSuccess(state.currentLocation, action.payload);
  (action as PayloadAction<GeoLocation, string, PersistentMeta>).meta = {
    persistent: true,
    key: CURRENT_LOCATION_STORAGE_KEY,
    dataToPersist: action.payload,
  };
}
