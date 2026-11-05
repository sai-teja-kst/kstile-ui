import { Button } from "@kstile/registry/react/button"

// ponytail: lives in React because Astro passes MDX children as opaque HTML, which asChild can't merge into.
export function ButtonLinkDemo() {
  return (
    <Button asChild>
      <a href="/docs/">Back to the introduction</a>
    </Button>
  )
}
