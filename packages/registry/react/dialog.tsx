"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import type * as React from "react"

import { cn } from "@/lib/utils"

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>,
) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(
  props: React.ComponentProps<typeof DialogPrimitive.Portal>,
) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose(
  props: React.ComponentProps<typeof DialogPrimitive.Close>,
) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

// A flat scrim, no blur. It fades in; closing is instant, like the menu.
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 ease-out starting:opacity-0 motion-reduce:transition-none dark:bg-black/70",
        className,
      )}
      {...props}
    />
  )
}

// Where the dialog sits, and the frame edge that faces the page.
const sides = {
  center:
    "top-1/2 left-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 starting:scale-97",
  right: "inset-y-0 right-0 h-full w-full max-w-sm starting:translate-x-8",
  bottom: "inset-x-0 bottom-0 max-h-[85dvh] starting:translate-y-8",
}
const frames = {
  center: "border-3",
  right: "border-l-3",
  bottom: "border-t-3",
}

function DialogContent({
  className,
  children,
  variant = "default",
  side = "center",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  // default: a 3px frame in the text colour. tile: a muted tile, no frame.
  variant?: "default" | "tile"
  // right and bottom make a sheet that sits against that edge.
  side?: "center" | "right" | "bottom"
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-variant={variant}
        data-side={side}
        className={cn(
          "group/dialog fixed z-50 flex flex-col overflow-y-auto rounded-none text-foreground shadow-none outline-hidden transition-[opacity,scale,translate] duration-150 ease-out starting:opacity-0 motion-reduce:transition-none",
          sides[side],
          variant === "tile"
            ? "gap-4 bg-muted p-4"
            : cn("gap-5 border-foreground bg-background p-6", frames[side]),
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-2 right-2 flex size-10 cursor-pointer items-center justify-center border-3 border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-3 focus-visible:outline-foreground group-data-[variant=tile]/dialog:top-1 group-data-[variant=tile]/dialog:right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="square"
              aria-hidden="true"
              className="size-4"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      // Leaves room for the close button.
      className={cn("flex flex-col gap-1.5 pr-10", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        // mt-auto pins it to the bottom of a sheet.
        "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        // On the tile, the buttons become tiles of their own, flush with the
        // bottom edge and labelled bottom left. The outline button takes the
        // card colour, or it would vanish into the muted tile.
        "group-data-[variant=tile]/dialog:-mx-4 group-data-[variant=tile]/dialog:-mb-4 group-data-[variant=tile]/dialog:grid group-data-[variant=tile]/dialog:auto-cols-fr group-data-[variant=tile]/dialog:grid-flow-col group-data-[variant=tile]/dialog:gap-0 group-data-[variant=tile]/dialog:*:h-16 group-data-[variant=tile]/dialog:*:items-end group-data-[variant=tile]/dialog:*:justify-start group-data-[variant=tile]/dialog:*:px-4 group-data-[variant=tile]/dialog:*:pb-2.5 group-data-[variant=tile]/dialog:*:text-base group-data-[variant=tile]/dialog:*:data-[variant=outline]:border-card group-data-[variant=tile]/dialog:*:data-[variant=outline]:bg-card",
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-lg leading-tight font-bold",
        // The tile sets its title large and light, like the input tile's value.
        "group-data-[variant=tile]/dialog:text-3xl group-data-[variant=tile]/dialog:font-light group-data-[variant=tile]/dialog:tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm leading-normal", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
