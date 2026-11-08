import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-none border-3 font-semibold whitespace-nowrap no-underline shadow-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:border-foreground",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:border-foreground",
        // The only variant with its border at rest; hover fills it instead.
        outline:
          "border-foreground bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground",
        // The theme's foreground wins. Without one, white reads on a light theme's
        // darker red and black on a dark theme's lighter red.
        destructive:
          "border-destructive bg-destructive text-[color:var(--destructive-foreground,#fff)] hover:border-foreground dark:text-[color:var(--destructive-foreground,#000)]",
        // Never text-primary: an accent as text on a light background is unreadable.
        link: "border-transparent bg-transparent text-foreground underline underline-offset-4 hover:decoration-3",
      },
      size: {
        default: "h-10 px-5 text-sm has-[>svg]:px-4",
        xs: "h-7 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        lg: "h-12 px-7 text-base has-[>svg]:px-5",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  borderWidth,
  style,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    borderWidth?: React.CSSProperties["borderWidth"]
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ borderWidth, ...style }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
