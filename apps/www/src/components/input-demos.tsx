import { Input } from "@kstile/registry/react/input"

// In a .tsx file because MDX can't pass JSX to a React prop such as label.
export function InputBadgeTileDemo() {
  return (
    <Input
      variant="tile"
      type="url"
      placeholder="https://fernhill.studio/hooks/deploy"
      label={
        <span className="flex items-center gap-2">
          Webhook URL
          <span className="bg-primary px-1.5 text-primary-foreground">
            Beta
          </span>
        </span>
      }
    />
  )
}
