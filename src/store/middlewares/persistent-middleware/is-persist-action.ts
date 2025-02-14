import { PayloadAction } from "@reduxjs/toolkit";

import { PersistentMeta } from "./persist-meta.ts";

export const isPersistAction = (
  action: unknown,
): action is PayloadAction<unknown, string, PersistentMeta> => {
  if (!action || typeof action !== "object" || !("meta" in action)) {
    return false;
  }

  const meta = action.meta;

  return (
    meta !== null &&
    typeof meta === "object" &&
    "persistent" in meta &&
    typeof meta.persistent === "boolean" &&
    "key" in meta &&
    typeof meta.key === "string" &&
    "dataToPersist" in meta
  );
};
