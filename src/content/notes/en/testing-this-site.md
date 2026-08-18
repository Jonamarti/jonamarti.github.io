---
title: What runs before this site deploys
summary: The checks every push has to pass, and the two bugs they were written in response to.
description: The continuous integration pipeline behind jonamarti.github.io: type checking, a case sensitive link checker, Playwright, axe and Lighthouse budgets.
area: qa
date: 2026-08-18
tags: [GitHub Actions, Playwright, axe, Lighthouse, CI]
---

Advertising CI/CD expertise on a site that had no pipeline of its own was hard to defend, so this
one now runs the same kind of checks I would set up for any other project. Pushing to `master`
triggers the workflow, pull requests run everything except the deploy step.

## The checks

**Type checking.** `astro check` over every `.astro` and `.ts` file. The content collections are
validated against a Zod schema, so a project with a missing or misspelled frontmatter field fails
the build instead of rendering a blank card.

**Link checking.** A script walks the built output and resolves every internal reference. The
important detail is that it compares against the real directory entries rather than asking the
filesystem whether a path exists. Windows is case insensitive and GitHub Pages is not, so a
reference to `Image.PNG` that is really `image.png` works locally and 404s in production. Asking
`existsSync` would never catch it.

**Playwright.** 86 tests across a desktop and a mobile project: every route returns 200 with a
single `h1`, the language switcher lands on the same page in the other language, the dropdown opens
and closes with the keyboard, and the URLs from the pre-Astro version of the site still resolve.

**Accessibility.** `axe-core` runs against eight pages with the WCAG 2.1 AA rule set, plus one pass
with the navigation dropdown open, since a menu that is only reachable by mouse passes every test
that never opens it.

**Lighthouse.** Budgets on performance, accessibility, best practices and SEO. Failing a budget
fails the build.

## What the checks actually caught

Two things, both of which I had already convinced myself were fine.

The first was a dropdown that stopped appearing on hover. Adding `position: relative` to the list
item moved the menu inside a container with `overflow: hidden`, which had been clipping it all
along. It had worked before by accident, because with no positioned ancestor the absolutely
positioned menu escaped the clipping entirely.

The second was the projects page scoring 58 on performance. I had no prior experience measuring performance, so this was useful for me for learning and what those metrics meant. A 1.3 MB animated GIF with four frames in it, and screenshots close to 2000 pixels wide being displayed in cards a few hundred pixels across. Converting the animations to WebP and putting the screenshots through the image pipeline took the page from 2200 KiB to 275 KiB, and the largest contentful paint from 10.8 seconds to 2.2.
