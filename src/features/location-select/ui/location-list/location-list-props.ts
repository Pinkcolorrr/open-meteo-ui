import { LocationViewModelItem } from "@features/location-select/ui/location-view-model.ts";

export interface LocationListProps {
  viewModel: LocationViewModelItem[];
  onLocationSelect: (location: LocationViewModelItem) => void;
}
