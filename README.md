# Yicheng Chen website

Personal website: Home, CV and Research, hosted on GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `cv.html` | CV page |
| `research.html` | Research page |
| `site.css` | shared style |
| `site.js` | shared design settings and engine (background network, marks, menu) |
| `photo.jpg` | photo on the Home page |
| `icon.png` | browser-tab icon |

## Publish (first time)

1. Sign in at github.com (or create a free account).
2. Top right **+** > **New repository**. Name it exactly `USERNAME.github.io` (your GitHub user name), set it **Public**, click **Create repository**.
3. On the new repository page, click **uploading an existing file**. Drag in all the files of this folder (not the folder itself). Click **Commit changes**.
4. **Settings** > **Pages**. Under *Build and deployment*, Source: **Deploy from a branch**; Branch: **main**, folder **/ (root)**; **Save**.
5. After one or two minutes the site is live at `https://USERNAME.github.io`.

## Edit text and links

Open the page's file on github.com, click the pencil (Edit), change only the block between `<script type="text/plain" id="content">` and `</script>`, then **Commit changes**. The site updates within a minute or two.

| Write | Gives |
|---|---|
| `# Research` | page title |
| `## Working Papers` | section heading |
| an empty line | new paragraph |
| `[text](https://link)` | link; outside links open in a new tab |
| lines holding only links | a list of links, one per line |
| `![Yicheng Chen](photo.jpg)` | the photo, with its description for screen readers |
| `footer: © 2025 Yicheng Chen. All rights reserved.` | footer text |

To replace the photo, upload a new `photo.jpg` (portrait, about 364 × 469 or larger at the same shape).

## Change the design

Colours, sizes and the network are in the `SETTINGS` block at the top of `site.js`; each line has a note. Change one value at a time and keep the commas.

## Open items

- `photo.jpg` is cropped from a screenshot of the old site; replace it with the original for a sharper photo.
