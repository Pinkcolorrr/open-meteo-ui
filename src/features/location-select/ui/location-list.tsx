import { LocationListItem } from "./location-list-item.tsx";
import { LocationListParams } from "./location-view-model.ts";

export function LocationList({ viewModel, onLocationSelect }: LocationListParams) {
  return (
    <ul>
      {viewModel.map((location) => (
        <li className={"border-b-2"} key={location.id}>
          <button
            className={"p-2 w-full text-start hover:bg-gray-100 rounded-lg"}
            onClick={() => onLocationSelect(location)}
          >
            <LocationListItem {...location} />
          </button>
        </li>
      ))}
    </ul>
  );
}
