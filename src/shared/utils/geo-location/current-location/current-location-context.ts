import { createContext } from "react";

import { GeoLocationData } from "../models/geo-location-data.ts";

export const CurrentLocationContext = createContext<GeoLocationData | null>(null);
