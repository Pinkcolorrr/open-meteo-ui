import { GeoLocation } from "@shared/utils/geo-location";

export interface GeoLocationData {
  location: GeoLocation | null;
  error: unknown;
  isLoading: boolean;
}
