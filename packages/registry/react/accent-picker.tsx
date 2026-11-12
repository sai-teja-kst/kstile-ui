"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Each name is a [data-accent] block that the accent-picker item adds to your CSS.
const accents = [
  "lime",
  "mono",
  "teal",
  "blue",
  "magenta",
  "red",
  "orange",
  "yellow",
] as const

// A name, or a name with the text people see and hear for it.
type Accent = string | { value: string; label: string }

// The data-accent attribute on <html> is the only state, so every picker on the
// page, and any script that sets it, stays in step.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-accent"],
  })
  return () => observer.disconnect()
}

const getAccent = () => document.documentElement.dataset.accent
const getServerAccent = () => undefined

const AccentPickerContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  swatchesId: string
} | null>(null)

// Holds the open state. Put the trigger and the swatches anywhere inside it,
// such as the trigger in your header and the swatches just below.
function AccentPicker({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }
  const swatchesId = React.useId()

  return (
    <AccentPickerContext.Provider value={{ open, setOpen, swatchesId }}>
      <div
        data-slot="accent-picker"
        data-state={open ? "open" : "closed"}
        className={className}
        {...props}
      />
    </AccentPickerContext.Provider>
  )
}

// A square in the current accent that shows and hides the swatches.
function AccentPickerTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const context = React.useContext(AccentPickerContext)
  if (!context)
    throw new Error("AccentPickerTrigger must be inside AccentPicker")
  const { open, setOpen, swatchesId } = context

  return (
    <button
      type="button"
      data-slot="accent-picker-trigger"
      aria-label="Accent"
      aria-expanded={open}
      aria-controls={swatchesId}
      className={cn(
        "group/accent-trigger inline-grid size-11 shrink-0 cursor-pointer place-items-center rounded-none border-0 bg-transparent p-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(!open)
      }}
      {...props}
    >
      {children ?? (
        <span className="size-6.5 bg-primary outline-2 outline-offset-2 outline-foreground group-aria-expanded/accent-trigger:outline-3" />
      )}
    </button>
  )
}

// One radio per accent. Inside AccentPicker it shows only while open; on its
// own it's always visible.
function AccentPickerSwatches({
  accents: accentsProp = accents,
  storageKey = "kstile-accent",
  onValueChange,
  label = "Accent",
  className,
  ...props
}: React.ComponentProps<"fieldset"> & {
  accents?: readonly Accent[]
  // Where the choice is saved in localStorage. Pass null to save it yourself.
  storageKey?: string | null
  onValueChange?: (accent: string) => void
  label?: string
}) {
  const context = React.useContext(AccentPickerContext)
  const current = React.useSyncExternalStore(
    subscribe,
    getAccent,
    getServerAccent,
  )
  const name = React.useId()

  const pick = (accent: string) => {
    document.documentElement.dataset.accent = accent
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, accent)
      } catch {}
    }
    onValueChange?.(accent)
  }

  return (
    <fieldset
      id={context?.swatchesId}
      hidden={context ? !context.open : undefined}
      data-slot="accent-picker-swatches"
      className={cn(
        // [hidden] is spelled out because grid would beat it without Tailwind's preflight.
        "m-0 grid min-w-0 grid-cols-8 gap-1 border-0 p-0 [&[hidden]]:hidden",
        className,
      )}
      {...props}
    >
      <legend className="sr-only">{label}</legend>
      {accentsProp.map((accent) => {
        const { value, label: text } =
          typeof accent === "string" ? { value: accent, label: accent } : accent
        return (
          <label
            key={value}
            data-slot="accent-picker-swatch"
            data-accent={value}
            className="relative flex min-h-10 cursor-pointer items-end bg-primary p-1.5 text-xs font-semibold text-primary-foreground after:absolute after:top-1.5 after:right-1.5 after:size-2.5 after:bg-primary-foreground after:opacity-0 has-checked:after:opacity-100 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground"
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={current === value}
              onChange={() => pick(value)}
              className="absolute inset-0 m-0 cursor-pointer opacity-0"
            />
            {/* Show the names with [&_[data-slot=accent-picker-swatch-label]]:not-sr-only. */}
            <span data-slot="accent-picker-swatch-label" className="sr-only">
              {text}
            </span>
          </label>
        )
      })}
    </fieldset>
  )
}

export {
  type Accent,
  AccentPicker,
  AccentPickerSwatches,
  AccentPickerTrigger,
  accents,
}
