// Yicheng Chen website: the text of the page, the name and the contacts.
//
//   # Research                  title of a part
//   ## Working Papers           a list of papers
//   (empty line)                new paragraph
//   [text](https://link)        link; outside links open in a new tab
//   ![Yicheng Chen](photo.jpg)  the photo, with its description for screen readers
//   a paper:                    ### title
//                               lines such as "with Coauthor Name" or "Revise and Resubmit, Journal"
//                               a line of links, always in this order: [Journal](link) once published, [Paper](link) (the latest
//                               version), [SSRN](link), then any [Appendix](link) [Slides](link) [Code](link); Abstract comes first by itself
//                               a line starting with > holds the abstract (optional; without it there is no Abstract button)
//
// The page has two parts, both on index.html: 'index.html' below is the top (About) and 'research.html' the Research part.

const SITE={
  name:'Yicheng Chen',            // at the top of the profile column and in the tab
  menu:[['Home','index.html'],['Research','research.html']],   // [label, part]; the first is the top of the page
  photo:'photo.jpg',              // photo in the profile column
  photoFrame:[40,32,1.7],         // photo framing: across and down (0 to 100) and zoom (1 to 4)
  about:'About',                  // heading of the first part
  // profile column: position lines, an empty line, then the links (email, CV, others)
  sidebar:`Ph.D. Candidate in Economics
Boston University

[cyccool@bu.edu](mailto:cyccool@bu.edu)
[Curriculum Vitae](https://www.dropbox.com/scl/fi/togc6wza0aaas6ccehswp/CV_Yich.pdf?rlkey=sxdi9oy2go6xx3hgssr7q36qp&st=u11b1v4b&dl=0)`
};

const PAGES={
'index.html':`# Home
![Yicheng Chen](photo.jpg)

I am a fifth-year Ph.D. candidate in Economics at Boston University. My research focuses on public economy, political economy, and economic history.

Prior to joining the doctoral program, I worked as a Research Assistant at the Center for Quantitative History at the University of Hong Kong.

I hold an M.A. in Economics from the University of Chicago and a B.S. in Economics from Peking University.`,

'research.html':`# Research

## Working Papers

### The G.I. Bill Beyond College: Agricultural Training and Veteran Farmers
[Paper](https://www.dropbox.com/scl/fi/s2hwog7vgz95o4xcembhw/WWIIDraft.pdf?rlkey=x4l8bsleranqpx560gk0q0rhg&st=u40188vg&dl=0) [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5002477)
> Switching occupations is costly for experienced workers, raising the question of whether public programs can shift their career paths. After World War II, the G.I. Bill funded on-farm training for 700,000 veterans. Using the 1940 draft lottery and newly digitized draft cards linked to censuses, I find that older veterans were more likely to operate farms in 1950, while employment and earnings did not change significantly. Veteran status likely drew some older, and rural and less educated, men into farming, mainly through on-farm training, just as the G.I. Bill sent younger ones to college.

## Work in Progress

### The Value of Local Public Investment: Evidence from Tax and Bond Referenda
with Nhan Ngo

### The Costs of Service: Short- and Long-Term Effects of WWII Injuries
with Michael Briskin and Vasudha Ramakrishna

### Partisan Sorting in American Governments

### Who Left, and What Did It Cost? The 2025 Federal Workforce Cuts

### American Business, 1860–1925`
};
