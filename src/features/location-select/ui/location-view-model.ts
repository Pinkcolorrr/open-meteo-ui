import { OpenMeteoGeoResponse } from "@domain/open-meteo";

export interface LocationListParams {
  viewModel: LocationViewModelItem[];
  onLocationSelect: (location: LocationViewModelItem) => void;
}

export interface LocationViewModelItem {
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  id: number;
}

export const toViewModel = (data: OpenMeteoGeoResponse): LocationViewModelItem[] => {
  return data.results.map((location) => ({
    id: location.id,
    name: location.name,
    country: location.country,
    countryCode: location.country_code,
    timezone: location.timezone,
  }));
};
