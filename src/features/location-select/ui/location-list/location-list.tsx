import { LocationListItem } from "./location-list-item.tsx";
import { LocationListProps } from "./location-list-props.ts";

export function LocationList({ viewModel, onLocationSelect }: LocationListProps) {
  return (
    <ul>
      {viewModel.map((location) => (
        <li className={"not-last:border-b-2"} key={location.id}>
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
