import { OpenMeteoGeoData } from "@domain/open-meteo";
import { compareLocations, Coords } from "@shared/geo-location";

export interface LocationViewModelItem {
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  id: number;
  isLoading: boolean;
}

export const toViewModel = (
  data: OpenMeteoGeoData[],
  activeLocationLoading: boolean,
  searchCords: Coords | null,
): LocationViewModelItem[] => {
  return data.map((location) => ({
    id: location.id,
    name: location.name,
    country: location.country,
    countryCode: location.country_code,
    timezone: location.timezone,
    isLoading:
      activeLocationLoading &&
      !!searchCords &&
      compareLocations(
        { lon: searchCords.lon, lat: searchCords.lat },
        { lat: location.latitude, lon: location.longitude },
      ),
  }));
};
