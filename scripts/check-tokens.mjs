// Fails if the accent tokens or the registry theme drift from docs/architecture.md.
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const ACCENTS = {
  lime: "#b4e600",
  green: "#16c172",
  teal: "#00b8b0",
  blue: "#2f8cff",
  magenta: "#ee2f96",
  red: "#f4473f",
  orange: "#ff7a1a",
  yellow: "#ffd21f",
}

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrastWithBlack = (hex) => (luminance(hex) + 0.05) / 0.05

const css = readFileSync("packages/ui/src/styles/globals.css", "utf8")
const blocks = [...css.matchAll(/\[data-accent="([\w-]+)"\]\s*{([^}]*)}/g)]
assert.deepEqual(
  blocks.map(([, name]) => name).sort(),
  Object.keys(ACCENTS).sort(),
  "globals.css must define exactly the 8 accents",
)

for (const [, name, body] of blocks) {
  assert.match(
    body,
    new RegExp(`--primary:\\s*${ACCENTS[name]};`),
    `${name}: --primary`,
  )
  assert.match(
    body,
    /--primary-foreground:\s*#000;/,
    `${name}: --primary-foreground`,
  )
  assert.ok(
    contrastWithBlack(ACCENTS[name]) >= 4.5,
    `${name}: black text must reach 4.5:1`,
  )
}

const { items } = JSON.parse(
  readFileSync("packages/registry/registry.json", "utf8"),
)
assert.deepEqual(
  items.map((item) => item.name),
  ["theme"],
  "phase-0 registry holds only the theme",
)

const [theme] = items
assert.equal(theme.type, "registry:theme")
for (const mode of ["light", "dark"]) {
  assert.equal(theme.cssVars[mode].primary, ACCENTS.lime, `${mode}: primary`)
  assert.equal(
    theme.cssVars[mode]["primary-foreground"],
    "#000",
    `${mode}: primary-foreground`,
  )
}
assert.equal(theme.cssVars.light.radius, "0rem")
assert.match(theme.cssVars.theme["font-sans"], /Open Sans/)

console.log("tokens ok: 8 accents, registry theme in step")
