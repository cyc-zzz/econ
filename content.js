// Yicheng Chen website: the text of the page, the name and the contacts.
// The easiest way to change it: open edit.html (in the Dropbox folder), change the text on the page, press "Download content.js",
// and replace this file with it. Or change the words between the back-quotes here; keep the back-quotes and commas.
//
//   # Research                  title of a part
//   ## Working Papers           a list of papers
//   (empty line)                new paragraph
//   [text](https://link)        link; outside links open in a new tab
//   ![Yicheng Chen](photo.jpg)  the photo, with its description for screen readers
//   a paper:                    ### title
//                               lines such as "with Coauthor Name" or "Revise and Resubmit, Journal"
//                               a line of links such as [Draft](link) [SSRN](link)
//                               a line starting with > holds the abstract (optional; without it there is no Abstract button)
//
// The page has two parts, both on index.html: 'index.html' below is the top (About) and 'research.html' the Research part.

const SITE={
  name:'Yicheng Chen',            // at the top of the profile column and in the tab
  menu:[['Home','index.html'],['Research','research.html']],   // [label, part]; the first is the top of the page
  photo:'photo.jpg',              // photo in the profile column
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

I am a fourth-year Ph.D. candidate in Economics at Boston University. My research focuses on political economy and economic history.

Prior to joining the doctoral program, I worked as a Research Assistant at the Center for Quantitative History at the University of Hong Kong.

I hold an M.A. in Economics from the University of Chicago and a B.S. in Economics from Peking University.`,

'research.html':`# Research

## Working Papers

### The G.I. Bill Beyond College: Agricultural Training and Veteran Farmers
[Draft](https://www.dropbox.com/scl/fi/s2hwog7vgz95o4xcembhw/WWIIDraft.pdf?rlkey=x4l8bsleranqpx560gk0q0rhg&st=u40188vg&dl=0)`
};
