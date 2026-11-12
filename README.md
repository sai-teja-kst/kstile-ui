# kstile

Square, flat, tile-based components for [shadcn/ui](https://ui.shadcn.com).

Browse the components and docs at **[kstile-ui.vercel.app](https://kstile-ui.vercel.app)**.

## Use a component

kstile needs a React 19 project with Tailwind CSS v4 and shadcn set up. Add a
component with the shadcn CLI:

```bash
npx shadcn@latest add https://kstile-ui.vercel.app/r/button.json
```

The CLI copies the code into your project, so you own and can change every line.
See [Installation](https://kstile-ui.vercel.app/docs/installation/) for setup,
and [Theming](https://kstile-ui.vercel.app/docs/theming/) for kstile's square,
lime look.

## Components

See every component at
[kstile-ui.vercel.app/docs/components](https://kstile-ui.vercel.app/docs/components/).

## Develop

```bash
corepack enable pnpm
pnpm install
pnpm dev        # start the site
pnpm build      # build the registry and the site
pnpm lint       # Biome and the token check
pnpm typecheck
```

The site is in `apps/www`, component source is in `packages/registry/react`, and
shared tokens are in `packages/ui`.

## License

[MIT](LICENSE)
