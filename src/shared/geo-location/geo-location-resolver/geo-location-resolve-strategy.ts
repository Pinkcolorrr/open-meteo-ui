export const GeoLocationResolveStrategy = {
  ipFirst: "ipFirst",
  navigatorFirst: "navigatorFirst",
} as const;

export type TGeoLocationResolveStrategy = keyof typeof GeoLocationResolveStrategy;
