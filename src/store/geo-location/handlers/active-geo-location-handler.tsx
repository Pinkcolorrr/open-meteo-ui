import { compareLocations } from "@shared/geo-location";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../lib/hooks.ts";
import { selectCurrentLocation, selectRecentLocations } from "../geo-location-selectors.ts";
import { setActiveLocation } from "../geo-location-slice/geo-location-slice.ts";
import { resolveActiveGeoLocation } from "../thunks/resolve-active-geo-location.ts";

type paramsDataSource = `params?lat=${number}&lon=${number}`;
type currentDataSource = `current?lat=${number}&lon=${number}`;

export function ActiveGeoLocationHandler() {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const recentLocations = useAppSelector(selectRecentLocations);
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const [dataSource, setDataSource] = useState<currentDataSource | paramsDataSource | null>(null);
  const lat = params.has("lat") && Number(params.get("lat"));
  const lon = params.has("lon") && Number(params.get("lon"));
  const abortControllerRef = useRef<AbortController | null>(null);

  const resolveActiveLocation = async (source: currentDataSource | paramsDataSource) => {
    if (source.includes("params") && lat && lon) {
      const persistLocation = recentLocations.find((location) =>
        compareLocations(location, { lat, lon }),
      );

      if (persistLocation) {
        dispatch(setActiveLocation(persistLocation));
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      dispatch(resolveActiveGeoLocation({ lat, lon, signal }));
      return;
    }

    if (currentLocation.data) {
      dispatch(setActiveLocation(currentLocation.data));
    }
  };

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
