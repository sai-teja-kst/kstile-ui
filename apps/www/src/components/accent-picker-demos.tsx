import {
  AccentPicker,
  AccentPickerSwatches,
  AccentPickerTrigger,
} from "@kstile/registry/react/accent-picker"
import * as React from "react"

// A mobile-sized header: the square sits in the header and the row opens below it.
export function AccentPickerDemo() {
  return (
    <AccentPicker className="w-full max-w-sm border-3 border-foreground">
      <header className="flex h-14 items-center gap-2 pr-2 pl-4">
        <span className="mr-auto text-xl font-semibold">kstile</span>
        <AccentPickerTrigger />
      </header>
      <AccentPickerSwatches className="px-4 pb-3" />
      <div className="mx-4 mb-4 h-24 bg-primary" />
    </AccentPicker>
  )
}

export function AccentPickerSwatchesDemo() {
  return <AccentPickerSwatches className="max-w-sm" />
}

export function AccentPickerCloseDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <AccentPicker
      open={open}
      onOpenChange={setOpen}
      className="w-full max-w-sm border-3 border-foreground"
    >
      <header className="flex h-14 items-center gap-2 pr-2 pl-4">
        <span className="mr-auto text-xl font-semibold">kstile</span>
        <AccentPickerTrigger />
      </header>
      <AccentPickerSwatches
        onValueChange={() => setOpen(false)}
        className="px-4 pb-3"
      />
    </AccentPicker>
  )
}

export function AccentPickerNamesDemo() {
  return (
    <AccentPickerSwatches className="max-w-sm grid-cols-4 [&_[data-slot=accent-picker-swatch-label]]:not-sr-only [&_[data-slot=accent-picker-swatch]]:min-h-16" />
  )
}
