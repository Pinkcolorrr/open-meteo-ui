import { Coords } from "./coords.ts";

export function compareLocations(coordsA: Coords, coordsB: Coords) {
  return coordsA.lat === coordsB.lat && coordsA.lon === coordsB.lon;
}
