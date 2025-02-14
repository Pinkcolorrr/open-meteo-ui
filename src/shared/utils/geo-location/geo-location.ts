import { Coords } from "./coords.ts";

export interface GeoLocation extends Coords {
  lat: number;
  lon: number;
  city: string;
  country: string;
  countryCode: string;
}
