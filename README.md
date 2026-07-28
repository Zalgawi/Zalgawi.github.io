# zayd-portfolio

Personal portfolio. Nuxt 4, Tailwind 4, Nuxt Content, statically generated.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # static output in .output/public
```

## How it's put together

| Path | What's in it |
| --- | --- |
| `app/assets/css/main.css` | Design tokens + the handful of rules utilities can't express |
| `app/composables/useSpatialNav.ts` | Geometric arrow-key focus navigation |
| `app/components/TvRemote.vue` | The floating remote, its collapse state and the hint bubble |
| `content/work/*.md` | One file per case study — add a file, get a card and a page |

### Theming

Palette lives in CSS custom properties on `:root`, overridden under
`[data-theme="light"]`. `@theme inline` maps those to Tailwind tokens, so
`bg-surface` resolves through the variable and flips at runtime.
`@nuxtjs/color-mode` writes `data-theme` and persists it in a cookie.

### Spatial navigation

Anything with `data-nav` joins the focus graph. Arrow keys pick the nearest
element in the direction pressed, scored by distance along the travel axis
plus a penalty for drifting off it. Native focus is untouched, so Tab and
screen readers behave normally — the ring just follows.

## Adding a case study

Drop a file in `content/work/`. Frontmatter is schema-validated in
`content.config.ts`, so a typo fails the build rather than rendering blank.

## Deploying

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
In the repo: **Settings → Pages → Source → GitHub Actions**. Nothing else to
configure — the workflow reads the base path from the Pages API, so it works
whether the repo is `Zalgawi.github.io` (served from `/`) or a project repo
(served from `/<repo-name>/`).

Two things make this work and are easy to break:

- `nitro.preset: 'github-pages'` emits `.nojekyll`. Without it GitHub runs
  Jekyll, which ignores every directory starting with an underscore — that's
  `_nuxt/` and `__nuxt_content/`, i.e. all the JS, CSS and content data.
- Links into `public/` need the base path applied manually (see `cvHref` in
  `app/pages/index.vue`). Nuxt rewrites `<NuxtLink>` and bundled assets, but
  not a raw `href`.

Note the repo must be public for Pages on a free account.

### Cloudflare Pages

Build command `npm run generate`, output directory `.output/public`. No base
path needed, and you get per-branch preview deploys.

## Windows notes

**Node 24 (Active LTS) is the target** — see `.nvmrc`. Nuxt 4 requires
`^22.19.0 || ^24.11.0 || >=26.0.0` and will refuse to start on anything
older. Check with `node -v`.

Installing via nvm-windows keeps older Node versions available for other
projects:

```powershell
winget install CoreyButler.NVMforWindows
# close and reopen the terminal, then:
nvm install 24
nvm use 24
```

Note that nvm-windows needs any existing standalone Node install removed
first (Add or Remove Programs → Node.js), or the two fight over PATH.

**`better-sqlite3` is pinned to `^12.5.0` on purpose.** Nuxt Content needs a
sqlite driver. Version 13 dropped its prebuild fallback and always compiles
from source, which means Visual Studio Build Tools. The v12 line downloads a
prebuilt binary instead, so `npm install` works on a clean Windows machine.
Don't bump it to 13 unless you have a compiler set up.

**If PowerShell blocks npm** with "running scripts is disabled on this
system", either run the commands in Command Prompt or allow local scripts:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Enable long paths before cloning**, since nested `node_modules` can exceed
the old 260-character limit:

```powershell
git config --global core.longpaths true
```
