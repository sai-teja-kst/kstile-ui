// Fails if the accent tokens or the registry theme drift from the agreed palette.
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const ACCENTS = {
  lime: "#b4e600",
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

const css = readFileSync("packages/ui/src/styles/tokens.css", "utf8")
// Mono flips with the theme, so it's checked on its own below.
const blocks = [
  ...css.matchAll(/^\[data-accent="([\w-]+)"\]\s*{([^}]*)}/gm),
].filter(([, name]) => name !== "mono")
assert.deepEqual(
  blocks.map(([, name]) => name).sort(),
  Object.keys(ACCENTS).sort(),
  "tokens.css must define exactly the 7 colour accents",
)
assert.match(
  css,
  /^\[data-accent="mono"\]\s*{\s*--primary:\s*#000;\s*--primary-foreground:\s*#fff;/m,
  "mono: black with white text on light",
)
assert.match(
  css,
  /\[data-theme="dark"\] \[data-accent="mono"\]\s*{\s*--primary:\s*#fff;\s*--primary-foreground:\s*#000;/,
  "mono: white with black text on dark",
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
const theme = items.find((item) => item.type === "registry:theme")
assert.ok(theme, "the registry must hold the theme")
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

// The accent picker ships its own copy of the accents, in shadcn's .dark form.
const picker = items.find((item) => item.name === "accent-picker")
assert.ok(picker, "the registry must hold the accent picker")
const shipped = (selector) => picker.css[selector] ?? {}
for (const [name, value] of Object.entries(ACCENTS)) {
  assert.deepEqual(
    shipped(`:root[data-accent="${name}"], [data-accent="${name}"]`),
    { "--primary": value, "--primary-foreground": "#000" },
    `accent-picker: ${name}`,
  )
}
assert.deepEqual(
  shipped(':root[data-accent="mono"], [data-accent="mono"]'),
  { "--primary": "#000", "--primary-foreground": "#fff" },
  "accent-picker: mono on light",
)
assert.deepEqual(
  shipped(':root.dark[data-accent="mono"], .dark [data-accent="mono"]'),
  { "--primary": "#fff", "--primary-foreground": "#000" },
  "accent-picker: mono on dark",
)
assert.equal(Object.keys(picker.css).length, 9, "accent-picker: 9 accent rules")
const source = readFileSync("packages/registry/react/accent-picker.tsx", "utf8")
for (const name of ["mono", ...Object.keys(ACCENTS)]) {
  assert.match(source, new RegExp(`"${name}",`), `accent-picker.tsx: ${name}`)
}

console.log(
  "tokens ok: 7 colour accents and mono, registry theme and accent picker in step",
)
