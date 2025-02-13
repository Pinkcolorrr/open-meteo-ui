import { GeoLocation } from "@shared/utils/geo-location";

export function UserLocation({ country, countryCode, city }: GeoLocation) {
  return (
    <div className={"p-2 bg-gray-300 rounded-lg mt-2"}>
      <div className={"text-xs"}>CURRENT</div>
      <div>
        {country} <span className={"uppercase"}>({countryCode})</span>, {city}
      </div>
    </div>
  );
}
