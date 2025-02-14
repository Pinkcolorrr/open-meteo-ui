import { ipApi } from "@domain/ip-api";
import { GeoLocation } from "@shared/utils/geo-location";
import { AppDispatch } from "@store/store.ts";

export const resolveLocationByIp = async (
  dispatch: AppDispatch,
): Promise<GeoLocation | undefined> => {
  try {
    const response = await dispatch(ipApi.endpoints.resolveIp.initiate());

    if ("error" in response) throw response.error;
    if (!response.data) throw new Error("No data in response");

    return {
      lat: response.data.lat,
      lon: response.data.lon,
      name: response.data.city ?? response.data.town ?? response.data.road,
      country: response.data.country,
      countryCode: response.data.countryCode,
    };
  } catch (error) {
    console.error("Failed while resolving location by IP", error);
  }
};
