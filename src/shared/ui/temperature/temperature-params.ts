import { HTMLAttributes } from "react";

export interface TemperatureParams extends HTMLAttributes<HTMLSpanElement> {
  temperature: number;
}
