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
          <TileFront>
            <TileIcon>
              <TileArrow />
            </TileIcon>
            <TileTitle>installation</TileTitle>
          </TileFront>
          <TileBack>
            <TileDescription>
              One command, and the code is yours.
            </TileDescription>
            <TileTitle>installation</TileTitle>
          </TileBack>
        </a>
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
