// @ts-check

import react from "@astrojs/react"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "kstile",
      favicon: "/favicon.svg",
      logo: {
        light: "./src/assets/kstile-mark-light.svg",
        dark: "./src/assets/kstile-mark-dark.svg",
        alt: "",
      },
      head: [
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
            { label: "Button", slug: "docs/components/button" },
          ],
        },
        { label: "Changelog", slug: "docs/changelog" },
      ],
    }),
    react(),
  ],
})
