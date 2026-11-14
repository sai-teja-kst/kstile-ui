import type * as React from "react"

import { cn } from "@/lib/utils"

// Shared by both variants. Errors are marked by a red shape, never red text,
// which is too faint to read on a light background.
const base =
  "w-full min-w-0 rounded-none bg-transparent text-foreground shadow-none placeholder:text-foreground/60 selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed"

function Input({
  className,
  type,
  variant = "default",
  label,
  ...props
}: React.ComponentProps<"input"> & {
  variant?: "default" | "tile"
  // The tile's own label, set inside it at the top. Only the tile uses it.
  label?: React.ReactNode
}) {
  if (variant === "tile") {
    // The label wraps the input, so it needs no id, and a tap anywhere on the
    // tile focuses it. className styles the tile, the rest goes to the input.
    return (
      <label
        data-slot="input-tile"
        className={cn(
          "relative flex h-16 cursor-text flex-col justify-end bg-muted px-3 pb-2 text-foreground has-disabled:cursor-not-allowed has-disabled:opacity-50 has-focus-visible:outline-3 has-focus-visible:-outline-offset-3 has-focus-visible:outline-foreground has-aria-invalid:after:absolute has-aria-invalid:after:top-2.5 has-aria-invalid:after:right-2.5 has-aria-invalid:after:size-2.5 has-aria-invalid:after:bg-destructive",
          className,
        )}
      >
        {label != null && (
          <span
            data-slot="input-tile-label"
            className="absolute top-2 left-3 text-xs font-semibold"
          >
            {label}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          data-variant="tile"
          className={cn(
            base,
            "h-8 border-0 p-0 text-xl font-light tracking-tight outline-hidden",
          )}
          {...props}
        />
      </label>
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      data-variant="default"
      className={cn(
        base,
        // The frame matches the outline button. Focus adds a ring in the text
        // colour, since an accent ring is too faint on white.
        "h-10 border-3 border-foreground px-3 text-base focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-50 aria-invalid:border-destructive md:text-sm file:mr-3 file:h-full file:border-0 file:bg-transparent file:p-0 file:[font-family:inherit] file:font-semibold file:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
