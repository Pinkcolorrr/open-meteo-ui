import { osmApi } from "@domain/osm";
import { getCurrentPositionAsync } from "@shared/utils/async-navigator-geolocation.ts";
import { GeoLocation } from "@shared/utils/geo-location";
import { AppDispatch } from "@store/store.ts";

export const resolveLocationByNavigator = async (
  dispatch: AppDispatch,
): Promise<GeoLocation | undefined> => {
  try {
    const position = await getCurrentPositionAsync();
    const response = await dispatch(
      osmApi.endpoints.getReverseGeo.initiate({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }),
    );

    if ("error" in response) throw response.error;
    if (!response.data) throw new Error("No data in response");

    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      city: response.data.address.city,
      country: response.data.address.country,
      countryCode: response.data.address.country_code,
    };
  } catch (error) {
    console.error("Failed while resolving location by navigator", error);
  }
};
