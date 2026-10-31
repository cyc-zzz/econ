# Yicheng Chen website

Personal website on GitHub Pages: one page with About and Research, a profile column, and a quiet background network.

## Files

| File | What it is |
|---|---|
| `index.html` | the page; it loads the files below |
| `content.js` | all the text: name, position, email, CV link, About, papers and their links |
| `settings.js` | the design (settled) |
| `site.js`, `site.css` | the engine and the style |
| `photo.jpg`, `icon.png` | the photo; the tab icon as a file (search results, phone home screens) |
| `edit.html` | your private editor; keep it in Dropbox, do not upload it |

## Change the text, papers or links

1. Double-click `edit.html` in `Dropbox\Project\Site\Assets`. Your page opens with a bar at the top.
2. Click any part to edit it in place: the profile column, About, the Research heading, a list (such as Working Papers) or a paper. **Done** applies it, **Cancel** or Esc leaves it.
   - **+ Add a paper** under a list, **+ Add a list** at the end of Research.
   - In a paper: **↑ ↓** move it, **Remove paper** deletes it. A paper needs only a title; authors, status, links (`Label | address`, one per line) and the abstract are optional. Without an abstract there is no Abstract button.
   - **Undo** reverses the last change; **Open page ↗** shows the page with your changes in a new tab.
3. Press **Download content.js** and put the file in this folder, replacing the old `content.js`.
4. On github.com open the site's repository: **Add file** > **Upload files**, drop in `content.js`, **Commit changes**. The site shows it in about a minute.

Your changes stay in that browser until you download them, also after closing the page (**How to publish** > **Discard all changes** drops them).

PDFs (CV, drafts): put them in Dropbox and use the shared link as the address. Replacing a PDF under the same name keeps its link, so nothing here needs to change.

`index.html` also carries one plain line (name, position, email) for browsers without JavaScript; change it there too if your email changes.

## Change the design

The design is settled. The full design editor, with every option considered, is kept in `Dropbox\Project\Site\archive\2026-10-31`: open `design.html` there, choose, press **Download settings.js** (and **Download icon.png** if the tab icon changed), put the file(s) in this folder and upload them.

## Publish

Upload these 8 files: `index.html`, `content.js`, `settings.js`, `site.js`, `site.css`, `photo.jpg`, `icon.png`, `README.md`. Not `edit.html`.

First time:

1. Sign in at github.com (or create a free account).
2. Top right **+** > **New repository**. Name it exactly `USERNAME.github.io` (your GitHub user name), set it **Public**, click **Create repository**.
3. On the new repository page, click **uploading an existing file**. Drag in the 8 files. Click **Commit changes**.
4. **Settings** > **Pages**. Under *Build and deployment*, Source: **Deploy from a branch**; Branch: **main**, folder **/ (root)**; **Save**.
5. After one or two minutes the site is live at `https://USERNAME.github.io`.

A file uploaded under the same name replaces the old one. If the repository holds files the site no longer has (`research.html`, `cv.html`, `404.html`, `design.html`), delete them there: open the file > **...** > **Delete file** > **Commit changes**.
