import { useOpenMeteoData } from "@domain/open-meteo";
import { osmApi } from "@domain/osm";
import { CurrentWeatherItemSkeleton } from "@features/current-weather/ui/current-weather-item-skeleton.tsx";
import { GeoLocation, useGeoLocation } from "@shared/lib/hooks/useGeoLocation.ts";
import { useEffect, useState } from "react";

import { CurrentWeatherItem } from "./ui/current-weather-item.tsx";
import { toViewModel } from "./ui/current-weather-view-model.ts";

export function CurrentWeather() {
  const { data, error, isLoading } = useOpenMeteoData();
  const [location, locationLoading] = useGeoLocation();
  const [getLocationData, { isLoading: isReverseGeoLoading }] = osmApi.useLazyGetReverseGeoQuery();
  const [city, setCity] = useState<string>("");

  const setCityData = async (location: GeoLocation) => {
    const locationData = await getLocationData(location);

    if (locationData.data) {
      setCity(locationData.data.address.city);
    }
  };

  useEffect(() => {
    if (!locationLoading) {
      setCityData(location ?? { lat: 0, lon: 0 });
    }
  }, [locationLoading]);

  if (error) {
    return <div>error fetching dara</div>;
  }

  return isLoading || isReverseGeoLoading ? (
    <CurrentWeatherItemSkeleton />
  ) : (
    data && <CurrentWeatherItem viewModel={toViewModel(data, city)} />
  );
}
