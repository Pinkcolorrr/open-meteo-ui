export const RequestedValueStatus = {
  fulfilled: "fulfilled",
  error: "error",
  loading: "loading",
  uninitialized: "uninitialized",
} as const;

export type THandledValueStatus = keyof typeof RequestedValueStatus;
