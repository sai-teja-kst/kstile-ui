# Contributing to kstile

Thanks for helping. Bug reports, component ideas and pull requests are all
welcome. Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md).

## Report a bug or ask for a component

[Open an issue](https://github.com/sai-teja-kst/kstile-ui/issues/new/choose) and
pick a template. For security problems, follow [SECURITY.md](SECURITY.md)
instead.

## Set up

You need the Node version in `.nvmrc` and pnpm.

```bash
corepack enable pnpm
pnpm install    # also installs the git hooks
pnpm dev        # start the site
```

The site is in `apps/www`, component source is in `packages/registry/react`, and
shared tokens are in `packages/ui`.

## Make a change

1. Branch from `main` with a name like `feat/input` or `fix/button-focus`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org), such
   as `feat: add input component`. A git hook checks every message. Run
   `pnpm commit` if you'd like to be prompted through one.
3. Before you push, run `pnpm lint`, `pnpm typecheck` and `pnpm build`. CI runs
   the same checks.
4. Open a pull request. Its title must be a conventional commit too: PRs are
   squash-merged, so the title becomes the commit on `main` and the line in the
   [changelog](https://kstile-ui.vercel.app/docs/changelog/).

Releases are automatic, so don't change version numbers or `CHANGELOG.md`.
