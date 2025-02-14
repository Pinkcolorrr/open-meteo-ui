export const RequestedValueStatus = {
  fulfilled: "fulfilled",
  error: "error",
  loading: "loading",
  uninitialized: "uninitialized",
} as const;

export type TRequestedValueStatus = keyof typeof RequestedValueStatus;
