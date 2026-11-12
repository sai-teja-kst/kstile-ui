// @ts-check

import react from "@astrojs/react"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { accents } from "./src/accents.mjs"

// https://astro.build/config
export default defineConfig({
  // Gives every page a canonical URL and turns on Starlight's sitemap.
  site: "https://kstile-ui.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "kstile",
      favicon: "/favicon.svg",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/sai-teja-kst/kstile-ui",
        },
      ],
      logo: {
        light: "./src/assets/kstile-mark-light.svg",
        dark: "./src/assets/kstile-mark-dark.svg",
        alt: "",
      },
      components: {
        ThemeSelect: "./src/components/theme-select.astro",
      },
      head: [
        {
          // Applies the saved accent before first paint, the same way the home page does.
          tag: "script",
          content: `(() => {
            const accents = ${JSON.stringify(accents)}
            const apply = () => {
              let accent
              try {
                accent = localStorage.getItem("kstile-accent")
              } catch {}
              document.documentElement.dataset.accent = accents.includes(accent) ? accent : "lime"
              for (const radio of document.querySelectorAll("kstile-accent-picker input")) {
                radio.checked = radio.value === document.documentElement.dataset.accent
              }
            }
            apply()
            addEventListener("pageshow", (event) => {
              if (event.persisted) apply()
            })
          })()`,
        },
        {
          // Starlight applies the theme only on load, so a page restored from the
          // back-forward cache would miss a change made on the home page.
          tag: "script",
          content: `addEventListener("pageshow", (event) => {
            if (!event.persisted) return
            let stored
            try {
              stored = localStorage.getItem("starlight-theme")
            } catch {
              return
            }
            const explicit = stored === "light" || stored === "dark"
            const system = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
            document.documentElement.dataset.theme = explicit ? stored : system
            window.StarlightThemeProvider?.updatePickers(explicit ? stored : "auto")
          })`,
        },
      ],
      customCss: [
        "./src/styles/docs.css",
        "@fontsource/open-sans/300.css",
        "@fontsource/open-sans/400.css",
        "@fontsource/open-sans/600.css",
      ],
      sidebar: [
        {
          label: "Getting started",
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "Installation", slug: "docs/installation" },
            { label: "Theming", slug: "docs/theming" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "Overview", slug: "docs/components" },
            { label: "Accent picker", slug: "docs/components/accent-picker" },
            { label: "Button", slug: "docs/components/button" },
            { label: "Tile", slug: "docs/components/tile" },
          ],
        },
        { label: "Templates", slug: "docs/templates" },
        { label: "Changelog", slug: "docs/changelog" },
      ],
    }),
    react(),
  ],
})
