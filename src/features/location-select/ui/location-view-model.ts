import { OpenMeteoGeoData } from "@domain/open-meteo";

export interface LocationViewModelItem {
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  id: number;
}

export const toViewModel = (data: OpenMeteoGeoData[]): LocationViewModelItem[] => {
  return data.map((location) => ({
    id: location.id,
    name: location.name,
    country: location.country,
    countryCode: location.country_code,
    timezone: location.timezone,
  }));
};
