import { createContext } from "react";

import { GeoLocationContext } from "./models/geo-location-context.ts";

export const LocationContext = createContext<GeoLocationContext | null>(null);
