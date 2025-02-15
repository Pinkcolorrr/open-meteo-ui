import { LocationViewModelItem } from "../location-view-model.ts";

export interface LocationListProps {
  viewModel: LocationViewModelItem[];
  onLocationSelect: (location: LocationViewModelItem) => void;
}
