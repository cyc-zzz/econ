// Yicheng Chen website: design settings. The text, the name, the menu and the contacts are in content.js.
// The design is settled. To change it, open the full design editor kept in Dropbox\Project\Site\archive\2026-10-31\design.html,
// adjust, press "Download settings.js", and replace this file with it.

const SETTINGS={
  column:'profile',               // single, or profile (photo, name and contact in a column on the left)
  onePage:true,                   // all pages of the menu on the home page, one after another
  menuPlace:'none',               // menu: top (in the bar), side (in the profile column) or none
  sideAlign:'center',             // profile column text: left or center
  contactStyle:'inline',          // contact links: text (icon and words), plain (words), buttons, inline (one line) or icons (round buttons; email stays written out)
  cvLabel:'CV',                   // the CV link reads: asis (as written), CV or Curriculum Vitae
  sideEm:14,                      // profile column width, in text sizes
  photoScale:0.6,                 // photo width, as a share of the profile column
  measure:38,                     // text column width, in text sizes
  headingStyle:'label',           // normal, or label (small spaced capitals for section names)
  paperLinks:'brackets',          // links under a paper: outline, ink, pill, text, caps, brackets or underline
  absStyle:'expand',              // abstract opens: expand, box, lines (first two lines), popover, dialog (window) or always (shown)
  absFirst:true,                  // the Abstract switch comes first among a paper's links
  absSize:'small',                // abstract text: body or small
  absColour:'text',               // abstract colour: text or muted (details grey)
  absLeading:1.385,               // abstract line spacing
  absEdge:'none',                 // abstract edge: rule (thin line), indent or none (flush with the title)
  absAlign:'justify',             // abstract: left or justify
  absWidth:'440',                 // abstract line length: 440 (440 px at a 1280 px window, scaling with the text), match (as many characters as the text), 90, 75, 65 (characters) or full (the whole column)
  header:'split',                 // top bar: split (name left, menu right), centred or stacked (name above menu, on the left)
  headerWidth:'content',          // full (across the window) or content (as wide as the text)
  band:'none',                    // band behind the top: none, tint (light) or accent (link colour)
  bannerTitle:false,              // page title inside the band
  titleAlign:'left',              // page titles: center or left
  homeTitle:false,                // show the title ("Home") on the home page
  homeLayout:'side',              // home photo: side (beside the text) or top (above it)
  photoShape:'circle',            // rounded (rectangle) or circle
  background:'#ffffff',           // page background (six-digit hex, as all colours here)
  text:'#4a4a4a',                 // text
  muted:'#707070',                // menu, footer and sidebar text
  link:'#2b2b82',                 // links, the current-page bar in the menu, the tab icon
  lines:'#e4e4ec',                // thin lines under the top bar and page titles
  font:'crimson',                 // text: system, inter, sourcesans, roboto, lato, sourceserif, literata, newsreader, charis, garamond, crimson or comfortaa
  headingFont:'same',             // name and titles: same, or one of the fonts above
  textSize:16,                    // px
  textWeight:400,                 // 300 (light) to 500 (medium)
  lineSpacing:1.5,                // between lines, as a multiple of the text size; one line (text size x this) is the unit of every gap
  smallLeading:1.385,             // line spacing of the small text (position, authors, labels)
  entryGap:0.75,                  // lines between papers
  fluidScale:1.1875,              // 1 = the same body size on every screen; above 1 = the body size grows with the window up to this times textSize (1440 px and wider)
  smallSize:13,                   // px, small text: position, contacts, author lines, buttons, menu
  smallFont:'same',               // font of the small text: same, or one of the fonts above
  paraGap:0.75,                   // lines between paragraphs, papers and links
  sectionGap:2,                   // lines between sections
  columnGap:3,                    // lines between the profile column and the text
  topSpace:2.5,                   // lines above the page
  nameSize:25,                    // px, the name in the top bar
  titleSize:25,                   // px, page titles such as "Research"
  titleWeight:600,                // 300 to 800
  headingSize:20,                 // px, section headings such as "Working Papers"
  headingWeight:400,              // name and section headings, 300 to 800
  headingColour:'#1f1f5c',        // name and headings: text, link, or a colour such as '#043361'
  width:960,                      // px, the widest the page content gets
  photoWidth:150,                 // px
  photoCorners:4,                 // px, corner rounding (0 = square)
  linkStyle:'hover',              // subtle (light underline), solid (full underline) or hover (underline only under the mouse)
  menuStyle:'underline',          // current page in the menu: underline, pill, bold or plain
  headerLine:false,               // line under the top bar
  titleLine:false,                // line under page titles
  pageFade:true,                  // pages fade in
  iconAccent:false,               // all dots in the first colour, one star in the second
  icon:'constellation',           // tab icon: dots (constellation, network, square, diamond, hub, orbit), stars (cassiopeia, orion, cygnus, lyra, crux, scorpius, pleiades, gemini, leo, ursaminor, aquila, delphinus, flyby, web, rising, triad), letters (yc, ydc, y, ycit, yinc, chen, ycsans) or file (icon.png)
  iconColour:'dots',              // dots (the background-dot grey), link, heading, text, muted, or a colour such as '#b31b1b'
  iconColour2:'link',             // none, or the colour the icon shades to (link, dots, heading, or a colour such as '#8a8ae6')
  iconBack:'none',                // behind the icon: none, soft (light tile), square or circle (filled, white mark) or ring
  iconTwoTone:false,              // grey lines between the dots
  network:true,                   // background network on or off
  networkColour:'#8e8e8e',        // link, muted, text, or a colour such as '#8c959f'
  strength:0.6,                   // visibility of the network, 0 to 1.5
  density:0.55,                   // dots per screen area (1 = medium)
  reach:100,                      // px; dots closer than this are joined by a line
  speed:10,                       // px per second
  pull:0.3,                       // gravity between dots: paths bend as dots pass each other (0 = none); same path shapes at any speed
  gravityRange:220,               // px; dots farther apart than this do not pull
  steady:0.15,                    // how fast a dot returns to cruising speed after a pass, per second (low = planet-like speed-up)
  spacing:0,                      // push apart within 36 px (0 = off)
  speedSpread:0.35,               // each dot's speed is speed x (1 ± this)
  sizeSpread:0.6,                 // dot sizes vary up to about 2 times either way at 1 (0 = all alike)
  shadeSpread:0,                  // some dots fainter, down to 1 - this
  heavyBig:true,                  // big dots pull more (by area)
  lifespan:40,                    // seconds a dot lives (60-140% of this) before it fades and a new one appears
  clickDots:60,                   // most clicked dots on screen at once, fading ones included
  quietInside:0.05,               // network strength over text (0 = hidden)
  quietMargin:1,                  // quiet margin around text, in gaps
  quietFade:3,                    // the network comes back over this many gaps
};
