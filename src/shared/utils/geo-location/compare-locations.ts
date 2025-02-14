import { Coords } from "@shared/utils/geo-location";

export function compareLocations(coordsA: Coords, coordsB: Coords) {
  return coordsA.lat === coordsB.lat && coordsA.lon === coordsB.lon;
}
