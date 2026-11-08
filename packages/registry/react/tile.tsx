import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

// The fill colour lives in --tile-bg so a flip tile's faces can share it.
const tileVariants = cva(
  "group/tile relative flex flex-col justify-end gap-1.5 overflow-hidden rounded-none bg-(--tile-bg) p-4 no-underline perspective-[900px] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground has-[[data-slot=tile-front]]:bg-transparent [&:is(a,button)]:cursor-pointer [&:is(a,button)]:hover:outline-3 [&:is(a,button)]:hover:-outline-offset-3 [&:is(a,button)]:hover:outline-foreground",
  {
    variants: {
      variant: {
        // Muted, not card: in shadcn's default light theme the card colour matches the page.
        default: "text-foreground [--tile-bg:var(--color-muted)]",
        fill: "text-primary-foreground [--tile-bg:var(--color-primary)]",
      },
      // How a flip tile turns to its back. --tile-out moves the front away and
      // --tile-in is where the back starts.
      transition: {
        "flip-up": "[--tile-out:rotateX(180deg)] [--tile-in:rotateX(-180deg)]",
        "flip-down":
          "[--tile-out:rotateX(-180deg)] [--tile-in:rotateX(180deg)]",
        "flip-left":
          "[--tile-out:rotateY(180deg)] [--tile-in:rotateY(-180deg)]",
        "flip-right":
          "[--tile-out:rotateY(-180deg)] [--tile-in:rotateY(180deg)]",
        "slide-up":
          "[--tile-out:translateY(-100%)] [--tile-in:translateY(100%)]",
        "slide-left":
          "[--tile-out:translateX(-100%)] [--tile-in:translateX(100%)]",
        fade: "[--tile-in-opacity:0] [--tile-in:none] [--tile-out-opacity:0] [--tile-out:none]",
      },
    },
    defaultVariants: {
      variant: "default",
      transition: "flip-up",
    },
  },
)

function Tile({
  className,
  variant = "default",
  transition = "flip-up",
  asChild = false,
  flipped,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof tileVariants> & {
    asChild?: boolean
    flipped?: boolean
  }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="tile"
      data-variant={variant}
      data-transition={transition}
      // Without a flipped prop, a flip tile turns on hover and keyboard focus.
      data-flip={flipped === undefined ? "hover" : undefined}
      data-flipped={flipped}
      className={cn(tileVariants({ variant, transition, className }))}
      {...props}
    />
  )
}

function TileTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-title"
      className={cn(
        "text-3xl leading-tight font-light tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

function TileDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="tile-description"
      className={cn("text-sm leading-snug opacity-80", className)}
      {...props}
    />
  )
}

// Pins its child to the top right. On a link or button tile it nudges on hover.
function TileIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tile-icon"
      className={cn(
        "pointer-events-none absolute top-4 right-4 z-10 transition-[translate] duration-150 ease-out motion-reduce:transition-none [:is(a,button):hover_&]:translate-x-0.5 [:is(a,button):hover_&]:-translate-y-0.5 [&_svg:not([class*='size-'])]:size-6",
        className,
      )}
      {...props}
    />
  )
}

function TileArrow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="tile-arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

const face =
  "absolute inset-0 flex flex-col justify-end gap-1.5 bg-(--tile-bg) p-4 backface-hidden transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.3,0.8,0.2,1)] motion-reduce:transition-none"

function TileFront({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-front"
      className={cn(
        face,
        "group-data-[flipped=true]/tile:[opacity:var(--tile-out-opacity,1)] group-data-[flipped=true]/tile:[transform:var(--tile-out)] group-data-[flip=hover]/tile:group-hover/tile:[opacity:var(--tile-out-opacity,1)] group-data-[flip=hover]/tile:group-hover/tile:[transform:var(--tile-out)] group-data-[flip=hover]/tile:group-focus-visible/tile:[opacity:var(--tile-out-opacity,1)] group-data-[flip=hover]/tile:group-focus-visible/tile:[transform:var(--tile-out)]",
        className,
      )}
      {...props}
    />
  )
}

// Hidden from screen readers, so keep it decorative and put nothing focusable on it.
function TileBack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-back"
      aria-hidden="true"
      className={cn(
        face,
        "[opacity:var(--tile-in-opacity,1)] [transform:var(--tile-in)] group-data-[flipped=true]/tile:[opacity:1] group-data-[flipped=true]/tile:[transform:none] group-data-[flip=hover]/tile:group-hover/tile:[opacity:1] group-data-[flip=hover]/tile:group-hover/tile:[transform:none] group-data-[flip=hover]/tile:group-focus-visible/tile:[opacity:1] group-data-[flip=hover]/tile:group-focus-visible/tile:[transform:none]",
        className,
      )}
      {...props}
    />
  )
}

export {
  Tile,
  TileArrow,
  TileBack,
  TileDescription,
  TileFront,
  TileIcon,
  TileTitle,
  tileVariants,
}
