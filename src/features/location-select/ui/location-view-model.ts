import { OpenMeteoGeoResponse } from "@domain/open-meteo";
import { OsmReverseGeoResponse } from "@domain/osm/models/osm-reverse-geo.ts";

export interface LocationViewModel {
  currentLocation: {
    city: string;
    country: string;
    countryCode: string;
  };
  locationSelect: (location: LocationViewModelItem) => void;
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
  locationNameData?: OsmReverseGeoResponse,
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
      city: locationNameData?.address.city ?? "",
      country: locationNameData?.address.country ?? "",
      countryCode: locationNameData?.address.country_code ?? "",
    },
  };
};
