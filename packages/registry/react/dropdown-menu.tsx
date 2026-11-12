"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Slottable } from "@radix-ui/react-slot"
import * as React from "react"

import { cn } from "@/lib/utils"

// Shared by every row. The highlight is the accent with its own text colour,
// never the accent as text: that's unreadable on a light background.
const item =
  "relative flex min-h-10 cursor-default items-center gap-2 rounded-none px-3 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-primary data-highlighted:text-primary-foreground data-inset:pl-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

// Flat and square: a thick border in the text colour and no shadow. It opens
// with a short fade and grows from the trigger; closing is instant.
const surface =
  "z-50 min-w-40 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-none border-3 border-foreground bg-background p-0 text-foreground shadow-none transition-[opacity,scale] duration-150 ease-out starting:scale-97 starting:opacity-0 motion-reduce:transition-none"

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>,
) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

const chevronIcon = (
  <svg
    key="chevron"
    data-slot="dropdown-menu-chevron"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="square"
    aria-hidden="true"
    // Only the trigger's own state turns it, not an open parent further up.
    className="size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none [[data-state=open]>&]:rotate-180"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

// Puts the chevron after the content of the element that finally renders. Each
// asChild in between, such as <Tile asChild>, passes it one level down, because
// a Slot only takes one child.
function withChevron(node: React.ReactNode): React.ReactNode {
  if (
    React.isValidElement<{ asChild?: boolean; children?: React.ReactNode }>(
      node,
    ) &&
    node.props.asChild
  ) {
    return React.cloneElement(node, undefined, withChevron(node.props.children))
  }
  return [<Slottable key="content">{node}</Slottable>, chevronIcon]
}

// Ends with a chevron that points down, and up while the menu is open.
function DropdownMenuTrigger({
  children,
  chevron = true,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  chevron?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props}>
      {/* One expression: even a false would count as a second child for asChild. */}
      {!chevron ? (
        children
      ) : props.asChild ? (
        withChevron(children)
      ) : (
        <>
          {children}
          {chevronIcon}
        </>
      )}
    </DropdownMenuPrimitive.Trigger>
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          surface,
          "max-h-(--radix-dropdown-menu-content-available-height)",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        item,
        // Red only as a shape: red text on white is too faint to read. At rest a
        // red square marks the row, so it shows before a tap on touch screens.
        // Highlighted, the row fills red and the square takes the text colour,
        // where the theme's foreground wins, as on the destructive button.
        "data-[variant=destructive]:pr-9 data-[variant=destructive]:after:absolute data-[variant=destructive]:after:right-3 data-[variant=destructive]:after:size-2 data-[variant=destructive]:after:bg-destructive data-[variant=destructive]:data-highlighted:after:bg-current data-[variant=destructive]:data-highlighted:bg-destructive data-[variant=destructive]:data-highlighted:text-[color:var(--destructive-foreground,#fff)] dark:data-[variant=destructive]:data-highlighted:text-[color:var(--destructive-foreground,#000)]",
        className,
      )}
      {...props}
    />
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="m5 12 5 5 9-10" />
    </svg>
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(item, "pr-9", className)}
      {...props}
    >
      <span
        data-slot="dropdown-menu-checkbox-item-indicator"
        className="pointer-events-none absolute right-3 flex items-center justify-center"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>,
) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(item, "pr-9", className)}
      {...props}
    >
      <span
        data-slot="dropdown-menu-radio-item-indicator"
        className="pointer-events-none absolute right-3 flex size-4 items-center justify-center"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          {/* A square dot, to match the square corners. */}
          <span className="block size-2 bg-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 pt-3 pb-1 text-xs font-semibold opacity-70 data-inset:pl-9",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      // The frame's own 3px bar in the text colour, not a hairline.
      className={cn("h-0.75 bg-foreground", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest opacity-70", className)}
      {...props}
    />
  )
}

function DropdownMenuSub(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>,
) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        item,
        "data-[state=open]:not-data-highlighted:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="square"
        aria-hidden="true"
        className="ml-auto rtl:-scale-x-100"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(surface, className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
