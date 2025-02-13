import { osmApi } from "@domain/osm/osm-api.ts";
import { GeoLocation, useGeoLocation } from "@shared/hooks/useGeoLocation.ts";
import { useEffect, useState } from "react";
import { OsmReverseGeoResponse } from "@domain/osm/models/osm-reverse-geo.ts";

export function useCurrentLocationName(): [OsmReverseGeoResponse | null, boolean] {
  const [geoLocation, geoLocationLoading] = useGeoLocation();
  const [getLocationData, { isLoading }] = osmApi.useLazyGetReverseGeoQuery();
  const [data, setData] = useState<OsmReverseGeoResponse | null>(null);

  const setCityData = async (location: GeoLocation) => {
    const locationData = await getLocationData(location);

    if (locationData.data) {
      setData(locationData.data);
    }
  };

  useEffect(() => {
    if (!geoLocationLoading) {
      setCityData(geoLocation ?? { lat: 0, lon: 0 });
    }
  }, [geoLocationLoading]);

  return [data, isLoading];
}
