import { useAppDispatch } from "@store/lib/hooks.ts";
import { useEffect } from "react";

import { CURRENT_LOCATION_STORAGE_KEY } from "../geo-location-slice/current-location-fulfilled.ts";
import { setCurrentLocation } from "../geo-location-slice/geo-location-slice.ts";
import { resolveCurrentGeoLocation } from "../thunks/resolve-current-geo-location.ts";

export function CurrentGeoLocationHandler() {
  const dispatch = useAppDispatch();
  const persistLocation = localStorage.getItem(CURRENT_LOCATION_STORAGE_KEY);

  const resolveCurrentLocation = async () => {
    if (persistLocation) {
      dispatch(setCurrentLocation(JSON.parse(persistLocation)));
      dispatch(resolveCurrentGeoLocation("navigatorFirst"));
      return;
    }

    const permission = await navigator.permissions.query({ name: "geolocation" });
    if (permission.state === "granted") {
      return dispatch(resolveCurrentGeoLocation("navigatorFirst"));
    }

    await dispatch(resolveCurrentGeoLocation("ipFirst"));
    dispatch(resolveCurrentGeoLocation("navigatorFirst"));
  };

  useEffect(() => {
    resolveCurrentLocation();
  }, []);

  return null;
}
