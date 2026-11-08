import {
  Tile,
  TileArrow,
  TileBack,
  TileDescription,
  TileFront,
  TileIcon,
  TileTitle,
} from "@kstile/registry/react/tile"

// ponytail: lives in React because Astro passes MDX children as opaque HTML, which asChild can't merge into.

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function TileGridDemo() {
  return (
    <div className="grid w-full auto-rows-[8.5rem] grid-cols-2 gap-2 sm:grid-cols-4">
      <Tile variant="fill" className="col-span-2 row-span-2">
        <TileDescription>Button and Tile, so far.</TileDescription>
        <TileTitle className="text-5xl">2 components</TileTitle>
      </Tile>
      <Tile asChild>
        <a href="/docs/components/button/">
          <TileIcon>
            <TileArrow />
          </TileIcon>
          <TileTitle>button</TileTitle>
        </a>
      </Tile>
      <Tile asChild>
        <a href="/docs/theming/">
          <TileIcon>
            <TileArrow />
          </TileIcon>
          <TileTitle>theming</TileTitle>
        </a>
      </Tile>
      <Tile asChild className="col-span-2">
        <a href="/docs/installation/">
          <TileIcon>
            <TileArrow />
          </TileIcon>
          <TileTitle>installation</TileTitle>
        </a>
      </Tile>
      <Tile className="col-span-2">
        <TileIcon>
          <SunIcon />
        </TileIcon>
        <TileTitle>light</TileTitle>
      </Tile>
      <Tile variant="fill" className="col-span-2">
        <TileFront>
          <TileTitle>templates</TileTitle>
        </TileFront>
        <TileBack>
          <TileDescription>Whole pages built from tiles.</TileDescription>
          <TileTitle>templates</TileTitle>
        </TileBack>
      </Tile>
    </div>
  )
}

export function TileLinkDemo() {
  return (
    <div className="grid w-full auto-rows-[9rem] grid-cols-2 gap-2 sm:grid-cols-3">
      <Tile asChild>
        <a href="/docs/">
          <TileIcon>
            <TileArrow />
          </TileIcon>
          <TileTitle>docs</TileTitle>
        </a>
      </Tile>
      <Tile asChild variant="fill">
        <a href="/docs/components/">
          <TileIcon>
            <TileArrow />
          </TileIcon>
          <TileTitle>components</TileTitle>
        </a>
      </Tile>
    </div>
  )
}
