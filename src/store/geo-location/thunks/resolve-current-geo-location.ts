import { ipApi } from "@domain/ip-api";
import { osmApi } from "@domain/osm";
import { createAsyncThunk, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { getCurrentPositionAsync } from "@shared/utils/async-navigator-geolocation.ts";
import { GeoLocation } from "@shared/utils/geo-location";

const resolveLocationByNavigator = async (
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
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

const resolveLocationByIp = async (
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
): Promise<GeoLocation | undefined> => {
  try {
    const response = await dispatch(ipApi.endpoints.resolveIp.initiate());

    if ("error" in response) throw response.error;
    if (!response.data) throw new Error("No data in response");

    return {
      lat: response.data.lat,
      lon: response.data.lon,
      city: response.data.city,
      country: response.data.country,
      countryCode: response.data.countryCode,
    };
  } catch (error) {
    console.error("Failed while resolving location by IP", error);
  }
};

export const resolveCurrentGeoLocation = createAsyncThunk(
  "geoLocation/resolveCurrent",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });

      if (permission.state === "granted") {
        const navigatorLocation = await resolveLocationByNavigator(dispatch);
        if (navigatorLocation) return navigatorLocation;
      }

      const ipLocation = await resolveLocationByIp(dispatch);
      if (ipLocation) return ipLocation;

      const fallbackLocation = await resolveLocationByNavigator(dispatch);
      if (fallbackLocation) return fallbackLocation;

      return rejectWithValue("Unable to resolve current location");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
