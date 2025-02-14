import { GeoLocation } from "@shared/geo-location";

import { GeoLocationResolver } from "./geo-location-resolver.ts";
import { resolveLocationByIp } from "./resolve-geo-location-by-ip.ts";
import { resolveLocationByNavigator } from "./resolve-geo-location-by-navigator.ts";

export class GeoLocationNavigatorFirstResolver extends GeoLocationResolver {
  async resolve(): Promise<GeoLocation | null> {
    try {
      const location = await resolveLocationByNavigator(this.dispatch);
      if (location) return location;

      const fallbackLocation = await resolveLocationByIp(this.dispatch);
      if (fallbackLocation) return fallbackLocation;

      throw new Error("Unable to resolve location");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
