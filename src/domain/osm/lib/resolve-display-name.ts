import { OsmReverseGeoResponse } from "../models/osm-reverse-geo.ts";

export function resolveOsmDisplayName(data: OsmReverseGeoResponse) {
  return (
    data.address.city ??
    data.address.town ??
    data.address.village ??
    data.address.road ??
    data.address.municipality ??
    data.address.state_district ??
    data.address.state
  );
}
