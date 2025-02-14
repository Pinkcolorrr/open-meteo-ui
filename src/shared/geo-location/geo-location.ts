import { Coords } from "./coords.ts";

export interface GeoLocation extends Coords {
  lat: number;
  lon: number;
  name: string;
  country: string;
  countryCode: string;
}
