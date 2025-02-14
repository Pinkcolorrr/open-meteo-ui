import { ReactNode, useState } from "react";

import { getDayStart } from "../lib/get-day-start.ts";
import { ActiveDateContext } from "./active-date-context.ts";

export function ActiveDateProvider({ children }: { children: ReactNode }) {
  const [activeDate, setActiveDate] = useState<number>(getDayStart().getTime());

  const setDate = (date: number) => {
    const noTimeDate = getDayStart(date).getTime();
    setActiveDate(noTimeDate);
  };

  return (
    <ActiveDateContext.Provider value={{ date: activeDate, setDate }}>
      {children}
    </ActiveDateContext.Provider>
  );
}
