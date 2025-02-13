import { useEffect, useState } from "react";

export interface GeoLocation {
  lat: number;
  lon: number;
}

export function useGeoLocation(): [GeoLocation | null, boolean, string | null] {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setPosition = (pos: GeolocationPosition) => {
    setLoading(false);
    setLocation({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  const setPositionError = (err: GeolocationPositionError) => {
    setLoading(false);
    setError(`Error: ${err.message}`);
  };

  const getLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Cannot resolve geolocation");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(setPosition, setPositionError);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return [location, loading, error];
}
