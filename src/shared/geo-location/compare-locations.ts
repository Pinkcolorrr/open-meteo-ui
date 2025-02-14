import { Coords } from "@shared/geo-location/index.ts";

export function compareLocations(coordsA: Coords, coordsB: Coords) {
  return coordsA.lat === coordsB.lat && coordsA.lon === coordsB.lon;
}
