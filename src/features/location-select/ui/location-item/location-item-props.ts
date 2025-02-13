import { GeoLocation } from "@shared/utils/geo-location";

export interface LocationItemProps extends GeoLocation {
  title: string;
  isActive: boolean;
}
