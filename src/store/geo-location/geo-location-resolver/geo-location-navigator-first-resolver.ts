import { GeoLocation } from "@shared/geo-location";

import { GeoLocationResolver } from "./geo-location-resolver.ts";
import { resolveLocationByIp } from "./resolve-geo-location-by-ip.ts";
import { resolveLocationByNavigator } from "./resolve-geo-location-by-navigator.ts";

export class GeoLocationNavigatorFirstResolver extends GeoLocationResolver {
  async resolve(): Promise<GeoLocation | null> {
    const requests = [resolveLocationByNavigator, resolveLocationByIp];

    for (const request of requests) {
      try {
        const res = await request(this.dispatch);
        if (res) return res;
      } catch (error) {
        console.error("Unable to resolve location:", error);
        return null;
      }
    }
    return null;
  }
}
