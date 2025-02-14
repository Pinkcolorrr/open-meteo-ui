import { GeoLocation } from "@shared/geo-location";

export interface LocationItemProps extends GeoLocation {
  title?: string;
  isActive: boolean;
}
