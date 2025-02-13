import { GeoLocation } from "@shared/utils/geo-location";
import { Clock } from "lucide-react";

export function CurrentLocation({ country, countryCode, city, timezone }: GeoLocation) {
  return (
    <div className={"border-b-2 p-2 bg-gray-300 rounded-lg mt-2"}>
      <div className={"text-xs"}>CURRENT</div>
      <div>
        {country} <span className={"uppercase"}>({countryCode})</span>, {city}
      </div>
      <div className={"flex gap-1 items-center text-xs"}>
        {timezone} <Clock className={"size-3"} />
      </div>
    </div>
  );
}
