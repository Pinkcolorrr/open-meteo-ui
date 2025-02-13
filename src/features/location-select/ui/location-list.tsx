import { CurrentLocation } from "./current-location.tsx";
import { LocationListItem } from "./location-list-item.tsx";
import { LocationViewModel } from "./location-view-model.ts";

export function LocationList({ searchResults, currentLocation }: LocationViewModel) {
  return (
    <ul>
      <li className={"bg-gray-200 mt-2 p-2 rounded-md"}>
        <CurrentLocation {...currentLocation} />
      </li>

      {searchResults.map((location) => (
        <li className={"border-b-2 p-2"} key={location.id}>
          <LocationListItem {...location} />
        </li>
      ))}
    </ul>
  );
}
