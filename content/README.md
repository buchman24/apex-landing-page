# Editing the APEX site

Everything you can see on the site lives in this folder. You never need to open a component.

| File | What it holds |
| --- | --- |
| `site.ts` | Site title, navigation, footer, contact email |
| `home.ts` | Home page copy, section by section |
| `tracks.ts` | Founders and Architect tracks, cohort dates |
| `stats.ts` | The APEX proof numbers (`siteStats`), the Israel rankings and Vision 2030 |
| `people.ts` | Core team, advisory board, faculty |
| `events.ts` | The next three events |
| `partner.ts` | The /partner page |
| `forms.ts` | Where the forms send data, and the marketing-consent wording |
| `logos.ts` | Companies that gave written permission to show their logo |
| `scene.ts` | The words that float in the 3D scene |
| `release.ts` | The switch that blocks production while anything is unresolved |

Community members are added through `/add-member`, which writes to `data/members.ts`. Do not reformat that file.

## How to edit in the GitHub web editor

1. Open the file, click the pencil, and change only the text between the quotes.
2. Commit to a new branch and open a pull request. Vercel adds a preview link.
3. Check the preview on your phone before asking for a merge.

## The two markers

- `missing("what is needed", "who owns it")`: we do not have this yet. Previews show a yellow MISSING block. Replace the whole call with the real text in quotes.
- `approved: false`: the content exists but is not signed off. Previews show "Pending approval". Change it to `approved: true` only after the named approver says yes.

Items waiting on Avishag Bohbot are the exception: previews show no marker for them. Pending content renders plainly and missing items are left out. They still appear in the build report and still block production.

While anything is missing or unapproved, the production build fails on purpose and the current site stays live. The full list is printed in every build log under `[APEX release gate]`.

## The 3D background

The scene behind every page is drawn by `lib/scene/` and `components/scene/SceneCanvas.tsx`. Each section tells the camera where to be with a `data-scene` attribute.

- The home hero is pinned (`data-scene-hero`). Its first scroll drives talent in and technology out.
- A `SceneBreak` is a pause where the page steps aside and the mountain holds the screen. Each one names the scene labels it shows, for example `labels="rails"`.
- The label words live in `scene.ts`.
- The static images in `public/scene/` are shown first, and to visitors who prefer reduced motion. To swap in a designer's illustration, replace those two files.
