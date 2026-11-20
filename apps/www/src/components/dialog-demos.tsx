import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@kstile/registry/react/alert-dialog"
import { Button } from "@kstile/registry/react/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@kstile/registry/react/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@kstile/registry/react/dropdown-menu"
import { Input } from "@kstile/registry/react/input"
import * as React from "react"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Rename project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            The new name shows in the URL and on every invite.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-1.5">
          <label htmlFor="dialog-name" className="text-sm font-semibold">
            Project name
          </label>
          <Input id="dialog-name" defaultValue="kstile-site" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogTileDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Invite people</Button>
      </DialogTrigger>
      <DialogContent variant="tile">
        <DialogHeader>
          <span className="text-xs font-semibold">Team</span>
          <DialogTitle>Invite people</DialogTitle>
          <DialogDescription>
            They get an email with a link that works for 7 days.
          </DialogDescription>
        </DialogHeader>
        <Input
          variant="tile"
          label="Email"
          type="email"
          placeholder="maya@fernhill.studio"
          className="bg-background"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Send invite</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogSideDemo() {
  const [region, setRegion] = React.useState("eu-west")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Project settings</Button>
      </DialogTrigger>
      <DialogContent side="right">
        <DialogHeader>
          <DialogTitle>Project settings</DialogTitle>
          <DialogDescription>
            Changes apply on the next deploy.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-1.5">
          <label htmlFor="sheet-name" className="text-sm font-semibold">
            Name
          </label>
          <Input id="sheet-name" defaultValue="kstile-site" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="sheet-region" className="text-sm font-semibold">
            Region
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger id="sheet-region" variant="field">
              {region}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
              <DropdownMenuRadioGroup value={region} onValueChange={setRegion}>
                <DropdownMenuRadioItem value="eu-west">
                  eu-west
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="us-east">
                  us-east
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ap-south">
                  ap-south
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const sorts = ["Newest first", "Oldest first", "Name, A to Z", "Most used"]

export function DialogBottomDemo() {
  const [sort, setSort] = React.useState(sorts[0])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sort: {sort}</Button>
      </DialogTrigger>
      <DialogContent side="bottom" className="gap-3 px-0 pb-4">
        <DialogHeader className="px-6">
          <DialogTitle>Sort projects</DialogTitle>
          <DialogDescription className="sr-only">
            Pick the order of the project list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          {sorts.map((s) => (
            <DialogClose key={s} asChild>
              <button
                type="button"
                aria-pressed={s === sort}
                onClick={() => setSort(s)}
                className="flex min-h-12 cursor-pointer items-center bg-transparent px-6 text-left text-base text-foreground hover:bg-accent aria-pressed:bg-primary aria-pressed:text-primary-foreground focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-foreground"
              >
                {s}
              </button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DialogBandDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Publish changes</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="gap-0 p-0">
        <div className="flex h-14 shrink-0 items-center justify-between bg-primary pr-2 pl-5 text-primary-foreground">
          <DialogTitle className="text-base">Publish changes</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close"
              className="text-inherit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="square"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </Button>
          </DialogClose>
        </div>
        <DialogDescription className="p-5">
          These go live on kstile-site straight away.
        </DialogDescription>
        <div className="h-0.75 bg-foreground" />
        <DialogFooter className="px-5 py-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Publish</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sign out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of every device?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll need to sign in again on your other devices.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function AlertDialogDestructiveDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            kstile-site and its 14 deployments are removed for good. This can't
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
