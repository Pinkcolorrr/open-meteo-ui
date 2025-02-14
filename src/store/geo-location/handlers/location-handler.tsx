import { CURRENT_LOCATION_STORAGE_KEY } from "@store/geo-location/handlers/current-location-handler.ts";
import { resolveCurrentGeoLocation } from "@store/geo-location/thunks/resolve-current-geo-location.ts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { selectCurrentLocation } from "../geo-location-selectors.ts";
import { setActiveLocation, setCurrentLocation } from "../geo-location-slice.ts";
import { resolveActiveGeoLocation } from "../thunks/resolve-active-geo-location.ts";

type paramsDataSource = `params?lat=${number}&lon=${number}`;
type currentDataSource = `current?lat=${number}&lon=${number}`;

export function LocationHandler() {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const [dataSource, setDataSource] = useState<currentDataSource | paramsDataSource | null>(null);
  const lat = params.has("lat") && Number(params.get("lat"));
  const lon = params.has("lon") && Number(params.get("lon"));
  const persistLocation = localStorage.getItem(CURRENT_LOCATION_STORAGE_KEY);

  const resolveActiveLocation = async (source: currentDataSource | paramsDataSource) => {
    if (source.includes("params") && lat && lon) {
      dispatch(resolveActiveGeoLocation({ lat, lon }));
      return;
    }

    if (currentLocation.data) {
      dispatch(setActiveLocation(currentLocation.data));
    }
  };

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

  useEffect(() => {
    if (dataSource) {
      resolveActiveLocation(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (lat && lon) {
      setDataSource(`params?lat=${lat}&lon=${lon}`);
    } else if (currentLocation.data) {
      setDataSource(`current?lat=${currentLocation.data.lat}&lon=${currentLocation.data.lon}`);
    }
  }, [lat, lon, currentLocation.data]);

  return null;
}
