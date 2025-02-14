import { selectCurrentLocation, selectIsUserLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";

import { LocationItem } from "./ui/location-item/location-item.tsx";

export function UserLocations() {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const isUserLocation = useAppSelector(selectIsUserLocation);

  return (
    <div>
      <div className={"border-b-2 pb-4 p-4"}>
        {currentLocation.data && (
          <button className={"w-full text-start mb-2"}>
            <LocationItem {...currentLocation.data} title={"current"} isActive={isUserLocation} />
          </button>
        )}
      </div>

      {/*{!!recentLocations.length && (*/}
      {/*  <div className={"p-4 max-h-[240px] overflow-auto"}>*/}
      {/*    <span className={"text-sm text-gray-500 mb-1 inline-block"}>Recent</span>*/}
      {/*    <div>*/}
      {/*      {recentLocations.map((location) => (*/}
      {/*        <button*/}
      {/*          className={"w-full text-start not-last:mb-1"}*/}
      {/*          key={location.lon + location.lat}*/}
      {/*        >*/}
      {/*          <LocationItem*/}
      {/*            {...location}*/}
      {/*            isActive={*/}
      {/*              currentLocation?.lat === location.lat && currentLocation.lon === location.lon*/}
      {/*            }*/}
      {/*          />*/}
      {/*        </button>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
