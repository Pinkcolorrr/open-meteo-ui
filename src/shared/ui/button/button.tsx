import { Slot } from "@radix-ui/react-slot";
import { cn } from "@shared/utils/cn.ts";
import { forwardRef } from "react";

import { ButtonProps } from "./props.ts";
import { buttonVariants } from "./variants.ts";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
