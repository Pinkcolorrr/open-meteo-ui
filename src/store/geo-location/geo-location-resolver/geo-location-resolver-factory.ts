import { AppDispatch } from "@store/store.ts";

import { GeoLocationIpFirstResolver } from "./geo-location-ip-first-resolver.ts";
import { GeoLocationNavigatorFirstResolver } from "./geo-location-navigator-first-resolver.ts";
import { TGeoLocationResolveStrategy } from "./geo-location-resolve-strategy.ts";
import { GeoLocationResolver } from "./geo-location-resolver.ts";

export function createGeoLocationResolver(
  strategy: TGeoLocationResolveStrategy,
  dispatch: AppDispatch,
): GeoLocationResolver {
  const strategiesMap = new Map<TGeoLocationResolveStrategy, GeoLocationResolver>([
    ["navigatorFirst", new GeoLocationNavigatorFirstResolver(dispatch)],
    ["ipFirst", new GeoLocationIpFirstResolver(dispatch)],
  ]);

  const creator = strategiesMap.get(strategy);
  if (!creator) {
    throw new Error(`Unknown strategy: ${strategy}`);
  }

  return strategiesMap.get(strategy)!;
}
