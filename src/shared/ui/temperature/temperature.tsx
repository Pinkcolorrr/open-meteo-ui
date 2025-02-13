import { clsx } from "clsx";

import { TemperatureParams } from "./temperature-params.ts";

export function Temperature(props: TemperatureParams) {
  const { temperature, className, ...otherProps } = props;
  return (
    <span
      className={clsx("relative after:content-['°'] after:absolute", className)}
      {...otherProps}
    >
      {temperature}
    </span>
  );
}
