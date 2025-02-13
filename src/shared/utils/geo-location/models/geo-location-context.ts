import { GeoLocation } from "@shared/utils/geo-location";
import { Dispatch, SetStateAction } from "react";

export interface GeoLocationContext {
  location: GeoLocation | null;
  error: unknown;
  isLoading: boolean;
  setLocation: Dispatch<SetStateAction<GeoLocation | null>>;
}
