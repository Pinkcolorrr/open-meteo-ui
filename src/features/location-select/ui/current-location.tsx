import { LocationViewModel } from "./location-view-model.ts";

export function CurrentLocation(params: LocationViewModel["currentLocation"]) {
  return (
    <>
      <div className={"text-s"}>CURRENT</div>
      <div>
        {params.country} <span className={"uppercase"}>({params.countryCode})</span>, {params.city}
      </div>
    </>
  );
}
