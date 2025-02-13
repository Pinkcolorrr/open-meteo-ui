import { OpenMeteoGeoResponse } from "@domain/open-meteo";
import { GeoLocation } from "@shared/hooks/useGeoLocation.ts";

export interface LocationViewModel {
  currentLocation: {
    city: string;
    country: string;
    countryCode: string;
  };
  searchResults: LocationViewModelItem[];
}

export interface LocationViewModelItem {
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  id: number;
}

export const toViewModel = (
  data?: OpenMeteoGeoResponse,
  locationNameData?: GeoLocation,
): LocationViewModel => {
  return {
    searchResults: (data?.results ?? []).map((location) => ({
      id: location.id,
      name: location.name,
      country: location.country,
      countryCode: location.country_code,
      timezone: location.timezone,
    })),
    currentLocation: {
      city: locationNameData?.city ?? "",
      country: locationNameData?.country ?? "",
      countryCode: locationNameData?.countryCode ?? "",
    },
  };
};
