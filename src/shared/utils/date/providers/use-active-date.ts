import { useContext } from "react";

import { ActiveDateContext } from "./active-date-context.ts";
import { ActiveDateData } from "./active-date-data.ts";

export function useActiveDate(): ActiveDateData {
  const context = useContext(ActiveDateContext);

  if (!context) {
    throw new Error("useActiveDate must be used within a ActiveDateContext");
  }

  return context;
}
