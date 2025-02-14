import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks.ts";
import { selectCurrentLocation } from "./geo-location-selectors.ts";
import { setActiveLocation } from "./geo-location-slice.ts";
import { resolveActiveGeoLocation } from "./thunks/resolve-active-geo-location.ts";

type paramsDataSource = `params?lat=${number}&lon=${number}`;

export function LocationHandler() {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const [dataSource, setDataSource] = useState<"user" | paramsDataSource | null>(null);
  const lat = params.has("lat") && Number(params.get("lat"));
  const lon = params.has("lon") && Number(params.get("lon"));

  const resolveLocation = async (source: "user" | paramsDataSource) => {
    if (source.includes("params") && lat && lon) {
      dispatch(resolveActiveGeoLocation({ lat, lon }));
      return;
    }

    if (currentLocation.data) {
      dispatch(setActiveLocation(currentLocation.data));
    }
  };

  useEffect(() => {
    if (dataSource) {
      resolveLocation(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (lat && lon) {
      setDataSource(`params?lat=${lat}&lon=${lon}`);
    } else if (currentLocation.data) {
      setDataSource("user");
    }
  }, [lat, lon, currentLocation]);

  return null;
}
