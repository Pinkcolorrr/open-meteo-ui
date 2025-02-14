import { Middleware } from "@reduxjs/toolkit";

import { isPersistAction } from "./is-persist-action.ts";

export const persistentMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (isPersistAction(action)) {
    const dataToPersist = action.meta.dataToPersist;

    if (action.payload !== null && action.payload !== undefined) {
      localStorage.setItem(action.meta.key, JSON.stringify(dataToPersist));
    } else {
      localStorage.removeItem(action.meta.key);
    }
  }

  return result;
};
