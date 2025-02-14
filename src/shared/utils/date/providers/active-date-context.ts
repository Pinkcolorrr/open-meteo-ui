import { createContext } from "react";

import { ActiveDateData } from "./active-date-data.ts";

export const ActiveDateContext = createContext<ActiveDateData>({
  date: new Date().getTime(),
  setDate: () => {
    throw new Error("setDate not implemented");
  },
});
