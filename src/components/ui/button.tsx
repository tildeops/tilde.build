import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: relative + isolate + overflow-hidden for the fill-wipe pseudo.
  // before is the sliding underlay; we hide it offscreen and slide in on hover.
  "group/btn relative isolate overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:relative [&_svg]:z-[1] before:content-[''] before:absolute before:inset-0 before:-z-10 before:-translate-x-[101%] before:transition-transform before:duration-[600ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:translate-x-0 motion-reduce:before:transition-none motion-reduce:before:translate-x-0 motion-reduce:before:opacity-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-on-accent gloss-inset shadow-[0_6px_20px_-8px_rgb(var(--accent-rgb)/0.5)] before:bg-accent-deep",
        secondary:
          "bg-bg-elevated text-ink border border-rule hover:border-ink/30 before:bg-ink/[0.06]",
        ghost:
          "text-ink before:bg-bg-elevated",
        link:
          "text-accent underline-offset-4 hover:underline rounded-none px-0 before:hidden",
        invert:
          "bg-on-accent text-on-light before:bg-on-light/10",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
