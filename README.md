# jonamarti.github.io

Personal portfolio of Jon A. Martiarena. Static site built with Astro, published to GitHub Pages
at <https://jonamarti.github.io>.

## Commands

| Command                   | What it does                                              |
| ------------------------- | --------------------------------------------------------- |
| `npm run dev`             | Development server on <http://localhost:4321>             |
| `npm run build`           | Builds the site into `dist/`                              |
| `npm run preview`         | Serves the built site                                     |
| `npm run lint`            | ESLint over `.astro`, `.ts` and `.mjs`                    |
| `npm run lint:css`        | Stylelint over `src/styles`                               |
| `npm run format`          | Prettier, writing the changes                             |
| `npm run format:check`    | Prettier, reporting instead of writing                    |
| `npm run check`           | Type checks `.astro` and `.ts` files                      |
| `npm run check:workflows` | actionlint over `.github/workflows`                       |
| `npm run check:links`     | Resolves every internal link in `dist/`, case sensitively |
| `npm test`                | Playwright tests, desktop and mobile                      |
| `npm run lighthouse`      | Lighthouse budgets against `dist/`                        |
| `npm run verify`          | All of the above, in the order CI runs them               |

`npm run check:links` compares references against the real directory entries instead of asking
the filesystem whether a path exists. Windows is case insensitive and GitHub Pages is not, so a
reference to `Image.PNG` that is really `image.png` only breaks in production; this catches it
locally.

The tests serve `dist/` through `scripts/serve-dist.mjs` rather than `astro preview`, which
holds a project wide lock and refuses to start alongside another Astro server.

Lighthouse needs a Chrome binary. On a machine without one, point it at the browser Playwright
already downloaded:

```sh
export CHROME_PATH=$(node -e "console.log(require('@playwright/test').chromium.executablePath())")
npm run lighthouse
```

## Hooks

`pre-commit` runs `lint-staged`: Prettier and ESLint with `--fix` over the staged files only,
Stylelint over the staged CSS, and actionlint if a workflow file is part of the commit. It stays
under a few seconds, which is the point; a hook that costs half a minute gets skipped with
`--no-verify` within a week.

`pre-push` runs `npm run verify`, the same sequence CI runs. That is where the build, the link
check and the Playwright suite live, so a red pipeline is caught before the push rather than
after it.

`npm run check:workflows` exists because a broken deploy got through everything else. The
workflow had a run step whose next step had been swallowed by a bad indent, which is valid YAML
and parses without complaint; a schema aware linter is the only thing that sees it. The runner
label list baked into the actionlint build is a few versions behind, so a newer `runs-on` value
may need the check adjusting.

## Structure

```
src/
  layouts/     Base plus one layout per page type
  components/  Nav, Footer, Cube, ProjectCard, Timeline, Skills
  content/     projects/{en,es}/*.md, validated by src/content.config.ts
  data/        Timeline, skills and About copy, both languages
  i18n/        String catalogue and locale helpers
  pages/       Thin route files that delegate to the layouts
public/        Images, favicons, manifest, and redirects for the pre-Astro URLs
tests/         Playwright smoke and accessibility suites
scripts/       Build time checks
```

## Languages

English lives at the root, Spanish under `/es/`. The locale comes from the URL, and the language
link in the nav resolves to the same page in the other language. Interface strings live in
`src/i18n/ui.ts`; page content lives in `src/data/` and in the content collections, keyed by
locale.

## Adding a project

Create `src/content/projects/en/<slug>.md` and `src/content/projects/es/<slug>.md` with the same
slug. The frontmatter schema is in `src/content.config.ts`; a missing or misspelled field fails
the build. The card, the detail page, the nav dropdown and the sitemap all follow from there.

Set `detail: false` for a project that should appear as a card without a page of its own.

## Deployment

Pushing to `master` runs the workflow in `.github/workflows/deploy.yml`: lint, format check,
workflow check, type check, build, link check, Playwright, Lighthouse, then deploy to Pages.
Pull requests run everything except the deploy. The Pages source is set to GitHub Actions, not
a branch.
