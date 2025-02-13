import { createContext } from "react";

import { GeoLocationActiveData } from "../models/geo-location-data.ts";

export const ActiveLocationContext = createContext<GeoLocationActiveData | null>(null);
