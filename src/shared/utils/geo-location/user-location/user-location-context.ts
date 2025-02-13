import { createContext } from "react";

import { GeoLocationData } from "../models/geo-location-data.ts";

export const UserLocationContext = createContext<GeoLocationData | null>(null);
