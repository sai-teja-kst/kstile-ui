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
      customCss: [
        "./src/styles/docs.css",
        "@fontsource/open-sans/300.css",
        "@fontsource/open-sans/400.css",
        "@fontsource/open-sans/600.css",
      ],
      sidebar: [
        {
          label: "Getting started",
          items: [{ label: "Introduction", slug: "docs" }],
        },
      ],
    }),
    react(),
  ],
})
