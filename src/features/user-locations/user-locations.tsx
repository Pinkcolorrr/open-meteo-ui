import { compareLocations, GeoLocation } from "@shared/geo-location";
import {
  selectActiveLocation,
  selectCurrentLocation,
  selectIsUserLocation,
  selectRecentLocations,
} from "@store/geo-location";
import { useAppSelector } from "@store/lib/hooks.ts";
import { createSearchParams, useNavigate } from "react-router-dom";

import { LocationItem } from "./ui/location-item/location-item.tsx";

export function UserLocations() {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const actionLocation = useAppSelector(selectActiveLocation);
  const recentLocations = useAppSelector(selectRecentLocations);
  const isUserLocation = useAppSelector(selectIsUserLocation);
  const navigate = useNavigate();

  const onCurrentLocationSelect = () => {
    navigate({
      pathname: "",
    });
  };

  const onLocationSelect = (location: GeoLocation) => {
    navigate({
      pathname: "",
      search: createSearchParams({
        lat: location.lat.toString(),
        lon: location.lon.toString(),
      }).toString(),
    });
  };

  return (
    <div>
      <div className={"border-b-2 pb-4 p-4"}>
        {currentLocation.data && (
          <button
            className={"w-full text-start mb-2"}
            disabled={
              !!actionLocation.data && compareLocations(actionLocation.data, currentLocation.data)
            }
            onClick={onCurrentLocationSelect}
          >
            <LocationItem {...currentLocation.data} title={"current"} isActive={isUserLocation} />
          </button>
        )}
      </div>

      {!!recentLocations.length && (
        <div className={"p-4 max-h-[600px] overflow-auto"}>
          <span className={"text-sm text-gray-500 mb-1 inline-block"}>Recent</span>
          <div>
            {[...recentLocations].reverse().map((location) => (
              <button
                className={"w-full text-start not-last:mb-1"}
                key={location.lon + location.lat}
                disabled={!!actionLocation.data && compareLocations(actionLocation.data!, location)}
                onClick={() => onLocationSelect(location)}
              >
                <LocationItem
                  {...location}
                  isActive={
                    !!actionLocation.data && compareLocations(actionLocation.data, location)
                  }
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
