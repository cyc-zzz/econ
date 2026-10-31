// Yicheng Chen website: engine for every page (layout, fonts, colours, background network).
// The design values are in settings.js.
(()=>{
// fonts on offer: [name, CSS font list, Google Fonts family ('' = already on every device)]
const FONTS={
  system:['System (GitHub)','-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif',''],
  inter:['Inter','"Inter",system-ui,sans-serif','Inter:wght@300..700'],
  sourcesans:['Source Sans 3','"Source Sans 3",system-ui,sans-serif','Source+Sans+3:wght@300..700'],
  roboto:['Roboto','"Roboto",system-ui,sans-serif','Roboto:wght@300..700'],
  lato:['Lato','"Lato",system-ui,sans-serif','Lato:wght@300;400;700'],
  sourceserif:['Source Serif 4','"Source Serif 4",Georgia,serif','Source+Serif+4:ital,wght@0,300..700;1,300..700'],
  literata:['Literata','"Literata",Georgia,serif','Literata:ital,wght@0,300..700;1,300..700'],
  newsreader:['Newsreader','"Newsreader",Georgia,serif','Newsreader:ital,wght@0,300..700;1,300..700'],
  charis:['Charis SIL','"Charis SIL",Georgia,serif','Charis+SIL:ital,wght@0,400;0,700;1,400;1,700'],
  garamond:['EB Garamond','"EB Garamond",Garamond,Georgia,serif','EB+Garamond:ital,wght@0,400..700;1,400..700'],
  crimson:['Crimson Pro','"Crimson Pro",Georgia,serif','Crimson+Pro:ital,wght@0,300..700;1,300..700'],
  comfortaa:['Comfortaa','"Comfortaa",system-ui,sans-serif','Comfortaa:wght@300..700']
};
// every setting: [default, allowed values] or [default, lowest, highest]; anything else falls back to the default
const SPEC={column:['single',['single','profile']],onePage:[false],menuPlace:['top',['top','side','none']],sideAlign:['left',['left','center']],
  contactStyle:['text',['text','plain','buttons','inline','icons']],cvLabel:['asis',['asis','CV','Curriculum Vitae']],sideEm:[13,8,22],photoScale:[.65,.3,1],
  measure:[34,20,50],headingStyle:['normal',['normal','label']],paperLinks:['outline',['outline','ink','pill','text','caps','brackets','underline']],absStyle:['expand',['expand','box','lines','popover','dialog','always']],absFirst:[false],absSize:['body',['body','small']],absColour:['text',['text','muted']],absLeading:[1.5,1.2,2],
  absEdge:['rule',['rule','indent','none']],absAlign:['left',['left','justify']],absWidth:['full',['full','match','90','75','65','440']],header:['split',['split','centred','stacked']],headerWidth:['full',['full','content']],
  band:['none',['none','tint','accent']],bannerTitle:[false],titleAlign:['center',['center','left']],homeTitle:[true],homeLayout:['side',['side','top']],
  photoShape:['rounded',['rounded','circle']],background:['#ffffff'],text:['#1f2328'],muted:['#59636e'],link:['#0969da'],
  lines:['#d1d9e0'],font:['system',Object.keys(FONTS)],headingFont:['same',['same',...Object.keys(FONTS)]],textSize:[16,12,24],textWeight:[400,300,500],
  lineSpacing:[1.6,1.2,2.2],smallLeading:[1.45,1.1,2],entryGap:[.75,.25,3],fluidScale:[1,1,1.5],smallSize:[14,10,22],smallFont:['same',['same',...Object.keys(FONTS)]],paraGap:[.75,.25,2],sectionGap:[2.5,1,6],columnGap:[3,1,8],topSpace:[2.5,.5,6],nameSize:[20,12,40],titleSize:[44,16,72],titleWeight:[400,300,800],headingSize:[20,12,40],
  headingWeight:[600,300,800],headingColour:['text'],width:[900,560,1400],photoWidth:[300,80,420],photoCorners:[4,0,40],linkStyle:['subtle',['subtle','solid','hover']],
  menuStyle:['underline',['underline','pill','bold','plain']],headerLine:[false],titleLine:[false],pageFade:[true],
  iconAccent:[false],icon:['constellation',['network','constellation','square','diamond','hub','ycstars','arc','cluster','ringnet','pair','dipper','cassiopeia','orion','cygnus','lyra','crux','scorpius','pleiades','gemini','leo','ursaminor','aquila','delphinus','flyby','web','rising','triad',
    'konigsberg','galton','marshall','quesnay','playfair','lorenz','galileo','newton','kepler','venn','darwin','feynman','euclid','copernicus',
    'edgeworth','indiff','ppf','cobweb','phillips','kuznets','solow','cycle','malthus','gravity','median','condorcet','dilemma','did','rd','eventstudy','iv','orbit','yc','ycreg','yclabel','y','ydc','ycit','yinc','chen','ycsans','file']],iconColour:['link'],iconColour2:['none'],
  iconBack:['none',['none','soft','square','circle','ring']],iconTwoTone:[false],
  network:[true],networkColour:['link'],strength:[.6,0,1.5],density:[.55,0,2],reach:[100,40,240],speed:[10,0,40],pull:[.5,0,3],
  gravityRange:[220,60,400],steady:[.8,.05,3],spacing:[0,0,2],speedSpread:[0,0,.8],sizeSpread:[0,0,1],shadeSpread:[0,0,.8],heavyBig:[false],lifeMin:[30,5,300],lifeMax:[90,5,300],families:[0,0,1],moons:[0,0,.5],twinkle:[0,0,1],clickDots:[60,0,200],quietInside:[.05,0,1],quietMargin:[1,0,6],quietFade:[3,.5,10]};
const HEX=/^#[0-9a-f]{6}$/i;
function clean(o){const s={};o=o||{};
  for(const[k,[d,a,b]]of Object.entries(SPEC)){const v=o[k];
    s[k]=typeof d==='boolean'?(typeof v==='boolean'?v:d):Array.isArray(a)?(a.includes(v)?v:d):typeof d==='number'?(typeof v==='number'&&isFinite(v)?Math.min(b,Math.max(a,v)):d):
      k==='networkColour'||k==='iconColour'||k==='iconColour2'||k==='headingColour'?(['link','muted','text',...(k==='headingColour'?[]:['heading']),...(k==='iconColour2'?['none']:[]),...(k.startsWith('icon')?['dots']:[])].includes(v)||HEX.test(v)?v:d):(HEX.test(v)?v:d)}
  return s}
// links may point to web pages, email, or files of this site; anything else becomes "#"
const safe=u=>/^(https?:\/\/|mailto:|tel:)/i.test(u)||!/^[a-z][\w+.-]*:/i.test(u)&&!/[\s"'<>`\\]/.test(u)?u:'#',str=(v,d)=>typeof v==='string'?v:d;
function cleanSite(o){o=o||{};const m=Array.isArray(o.menu)?o.menu.filter(x=>Array.isArray(x)&&typeof x[0]==='string'&&typeof x[1]==='string').map(([t,u])=>[t,safe(u)]):[];
  return{name:str(o.name,'Yicheng Chen'),menu:m.length?m:[['Home','index.html']],photo:safe(str(o.photo,'photo.jpg')),sidebar:str(o.sidebar,''),about:str(o.about,'About')}}
// tab icons in colour c, in a 64-unit box. Dot marks: joined dots, with grey lines when two. Letter marks: the initials drawn from the
// outlines of the site's own typefaces (GL), so they look the same on every device and in icon.png. One rule sizes every mark: it
// fills a fixed share of the inner area of its background (none 92%, soft and square 70%, circle and ring 62%), centred on its ink.
// Backgrounds: none, soft (light tile), square (filled rounded square, corner 22%), circle (filled), ring (white with a coloured ring);
// on a filled background the mark is white.
const DOTS={network:[[[32,15,9],[13,48,9],[51,48,9]],'M32 15L13 48H51Z',5],
  constellation:[[[11,25,6],[31,10,7.5],[53,22,5],[43,48,7],[17,53,5.5]],'M11 25L31 10L53 22L43 48L17 53ZM31 10L43 48',3.5,1],
  square:[[[15,15,7.5],[49,15,7.5],[49,49,7.5],[15,49,7.5]],'M15 15H49V49H15ZM15 15L49 49',4],
  diamond:[[[32,7,6.5],[57,32,6.5],[32,57,6.5],[7,32,6.5],[32,32,8]],'M32 7L57 32L32 57L7 32ZM32 7V57M7 32H57',3.5],
  hub:[[[32,32,10],[32,8,5.5],[55,25,5.5],[46,52,5.5],[18,52,5.5],[9,25,5.5]],'M32 32V8M32 32L55 25M32 32L46 52M32 32L18 52M32 32L9 25',3.5],
  ycstars:[[[9,11,4.5],[25,11,4.5],[17,28,5.5],[17,52,4.5],[57,22,4.5],[42,18.5,4.5],[33,32,5],[42,45.5,4.5],[57,42,4.5]],'M9 11L17 28L25 11M17 28V52M57 22L42 18.5L33 32L42 45.5L57 42',3.2,2],
  arc:[[[8,50,4.5],[22,22,4],[52,12,5],[40,42,9]],'M8 50Q14 14 52 12',3.5,3],
  cluster:[[[12,18,5],[30,9,6],[50,16,4.5],[22,35,7],[45,35,5],[12,52,4.5],[36,55,6]],'M12 18L30 9L50 16M12 18L22 35L30 9M22 35L45 35L50 16M22 35L12 52M22 35L36 55L45 35',3,3],
  ringnet:[[[32,8,5],[53,20,5],[53,44,5],[32,56,5],[11,44,5],[11,20,5],[32,32,7]],'M32 8L53 20L53 44L32 56L11 44L11 20ZM32 32L32 8M32 32L53 44M32 32L11 44',3,6],
  pair:[[[24,38,13],[51,17,6],[10,12,3.5]],'M24 38L51 17L10 12',3.5,0],
  dipper:[[[6,14,4],[17,18,4],[27,24,4.5],[36,31,5],[53,28,5],[56,45,5],[39,48,5]],'M6 14L17 18L27 24L36 31L53 28L56 45L39 48L36 31',3,3],
  // star shapes on one rule: four star sizes by brightness (8, 6.5, 5, 4), the brightest is the accent star, lines 3 wide
  cassiopeia:[[[6,36,4],[18,52,5],[30,33,6.5],[44,44,8],[57,13,5]],'M6 36L18 52L30 33L44 44L57 13',3,3],
  orion:[[[15,9,6.5],[47,12,5],[22,34,4],[32,31,4],[42,28,4],[20,56,5],[51,53,8]],'M15 9L22 34M47 12L42 28M22 34L42 28M22 34L20 56M42 28L51 53',3,6],
  cygnus:[[[44,10,8],[34,29,6.5],[26,44,4],[18,57,5],[11,20,5],[55,42,5]],'M44 10L34 29L26 44L18 57M11 20L34 29L55 42',3,0],
  lyra:[[[15,13,8],[30,6,4],[31,27,4],[44,24,4],[49,51,5],[35,55,5]],'M30 6L15 13L31 27L44 24L49 51L35 55L31 27',3,0],
  crux:[[[30,9,6.5],[35,54,8],[11,27,6.5],[53,34,5],[45,43,4]],'M30 9L35 54M11 27L53 34',3,1],
  scorpius:[[[54,8,5],[58,23,4],[44,20,8],[37,31,4],[34,42,4],[27,52,5],[17,57,4],[8,47,6.5],[13,35,4]],'M54 8L44 20L58 23M44 20L37 31L34 42L27 52L17 57L8 47L13 35',3,2],
  pleiades:[[[34,34,8],[52,41,6.5],[56,28,4],[14,30,6.5],[22,16,5],[24,47,5],[36,15,4]],'',3,0],
  gemini:[[[16,8,6.5],[34,11,8],[14,25,4],[10,41,5],[7,56,5],[37,28,4],[45,42,5],[55,52,6.5]],'M16 8L14 25L10 41L7 56M34 11L37 28L45 42L55 52M14 25L37 28',3,1],
  leo:[[[14,52,8],[12,38,4],[19,26,6.5],[29,15,4],[16,8,5],[42,29,5],[56,41,6.5],[42,47,4]],'M14 52L12 38L19 26L29 15L16 8M19 26L42 29L56 41L42 47L14 52',3,0],
  ursaminor:[[[54,10,8],[42,18,4],[33,25,4],[24,34,5],[28,50,5],[10,55,6.5],[7,39,4]],'M54 10L42 18L33 25L24 34L28 50L10 55L7 39L24 34',3,0],
  aquila:[[[7,20,5],[22,10,5],[32,23,8],[42,35,4],[57,42,5],[22,42,4],[14,56,5]],'M7 20L22 10L32 23L42 35L57 42M32 23L22 42L14 56',3,2],
  delphinus:[[[27,22,6.5],[43,10,8],[55,24,6.5],[39,34,5],[23,48,5],[11,57,4]],'M27 22L43 10L55 24L39 34ZM39 34L23 48L11 57',3,1],
  flyby:[[[26,31,11],[5,22,3],[12.8,43.5,3],[27.8,50.3,3.5],[43.8,40.9,4],[55,14,6.5]],'M5 22C8 60 46 62 55 14',2.6,0],
  web:[[[10,16,5],[28,7,4],[24,30,8],[48,18,6.5],[55,42,5],[36,51,6.5],[11,48,4]],'M10 16L24 30L28 7L48 18L24 30L36 51L55 42L48 18M24 30L11 48',3,2],
  rising:[[[6,57,4],[17,46,5],[28,50,4],[36,31,6.5],[48,38,5],[55,10,8]],'M6 57L17 46L28 50L36 31L48 38L55 10',3,5],
  triad:[[[13,44,8],[41,53,6.5],[31,18,5],[56,8,4]],'M13 44L41 53L31 18ZM31 18L56 8',3,0]};
// classic figures, drawn as dots and lines: Euler's Königsberg bridges (1736), Galton's board (1889), Marshall's supply-and-demand
// cross (1890), Quesnay's Tableau économique (1758), Playfair's trade chart (1786), the Lorenz curve (1905), Galileo's moons of Jupiter
// (1610), Newton's cannonball (1728), Kepler's equal areas (1609), Venn's three sets (1880), Darwin's 'I think' tree (1837), a Feynman
// diagram (1949), Euclid's proof of Pythagoras (I.47) and Copernicus's sun-centred orbits (1543)
const L=(d,c,w=3,o=1)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-opacity="${o}" stroke-linecap="round" stroke-linejoin="round"/>`,
  O=(x,y,r,c,o=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" fill-opacity="${o}"/>`;
const HIST={
  konigsberg:(m,a)=>L('M20 32Q14 18 32 9M20 32Q28 22 32 9M20 32Q14 46 32 55M20 32Q28 42 32 55M20 32H52M32 9L52 32M32 55L52 32',m,3,.6)+O(32,9,5,m)+O(32,55,5,m)+O(52,32,5,m)+O(20,32,6.5,a),
  galton:(m,a)=>[[32],[27.5,36.5],[23,32,41],[18.5,27.5,36.5,45.5]].map((r,i)=>r.map(x=>O(x,9+i*8,2.8,m)).join('')).join('')+
    `<path d="M6 57C18 57 22 40 32 40C42 40 46 57 58 57Z" fill="${a}" fill-opacity=".22"/>`+L('M6 57C18 57 22 40 32 40C42 40 46 57 58 57',a,3)+L('M6 58H58',m,2.5,.6),
  marshall:(m,a)=>L('M9 7V57H58',m,2.5,.55)+L('M14 12C22 34 34 44 54 50',m,3.5)+L('M14 50C34 44 42 34 50 12',a,3.5)+O(33.3,40.1,4.5,a),
  quesnay:(m,a)=>L('M14 8L50 16L14 24L50 32L14 40L50 48L14 56',m,3,.6)+[8,24,40,56].map(y=>O(14,y,3.8,m)).join('')+[16,32,48].map(y=>O(50,y,3.8,a)).join(''),
  playfair:(m,a)=>L('M8 8V56H58',m,2.5,.55)+`<path d="M8 44C22 42 32 30 56 16L56 36C40 33 22 30 8 30Z" fill="${a}" fill-opacity=".18"/>`+L('M8 44C22 42 32 30 56 16',m,3.5)+L('M8 30C22 30 40 33 56 36',a,3.5),
  lorenz:(m,a)=>L('M10 10H54V54H10Z',m,2.5,.5)+`<path d="M10 54L54 10C48 42 36 53 10 54Z" fill="${a}" fill-opacity=".16"/>`+L('M10 54L54 10',m,2.5,.6)+L('M10 54C36 53 48 42 54 10',a,3.5),
  galileo:(m,a)=>O(25,32,9.5,m)+O(8,32,3.2,a)+O(42,32,3.2,a)+O(50,32,3.2,a)+O(58,32,3.2,a),
  newton:(m,a)=>`<circle cx="32" cy="38" r="23" fill="none" stroke="${a}" stroke-width="2.5" stroke-dasharray="3 4" stroke-opacity=".7"/>`+O(32,38,13,m)+`<path d="M29 25.5L32 20L35 25.5Z" fill="${m}"/>`+
    L('M33 20Q44 19 47 30',a,3)+L('M33 20Q53 18 57 34',a,3)+O(33,19,3,a),
  kepler:(m,a)=>`<path d="M12.3 32L9.48 40.5A26 17 0 0 1 9.48 23.5Z M12.3 32L57.43 28.47A26 17 0 0 1 57.43 35.53Z" fill="${a}" fill-opacity=".28"/>`+
    `<ellipse cx="32" cy="32" rx="26" ry="17" fill="none" stroke="${m}" stroke-width="3"/>`+O(12.3,32,4.8,a)+O(57.43,35.53,3.2,m),
  venn:(m,a)=>[[24,25],[40,25],[32,39]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="15" fill="${i==2?a:m}" fill-opacity=".1" stroke="${i==2?a:m}" stroke-width="3"/>`).join(''),
  darwin:(m,a)=>L('M32 58V40M32 40L18 27M32 40L46 25M18 27L9 15M18 27L24 11M46 25L39 11M46 25L56 15',m,3)+[[9,15],[24,11],[39,11],[56,15]].map(([x,y])=>O(x,y,3.8,a)).join('')+O(32,58,3.5,m),
  feynman:(m,a)=>L('M7 9L20 32L7 55M57 9L44 32L57 55',m,3)+L('M20 32q3 -7 6 0t6 0t6 0t6 0',a,3)+O(20,32,4,m)+O(44,32,4,m),
  euclid:(m,a)=>`<path d="M26 24L26 36L42 36Z" fill="${a}" fill-opacity=".3"/>`+L('M14 24H26V36H14ZM26 36H42V52H26ZM26 24L42 36L54 20L38 8Z',m,2.5)+L('M26 24L26 36L42 36Z',a,3),
  copernicus:(m,a)=>[10,18,26].map(r=>`<circle cx="32" cy="32" r="${r}" fill="none" stroke="${m}" stroke-width="2.5" stroke-opacity=".45"/>`).join('')+O(32,32,5.5,a)+O(37,23.3,2.8,m)+O(15.1,25.8,3.2,m)+O(53.3,46.9,3.6,m)};
// economics figures: Edgeworth's box (1881), indifference curve and budget line (Hicks and Allen, 1934), the production possibility
// frontier (Haberler, 1930), the cobweb (Ezekiel, 1938), the Phillips curve (1958), the Kuznets curve (1955), Solow's steady state (1956),
// the business cycle (Burns and Mitchell, 1946), Malthus's race of population and food (1798), the gravity model of trade (Tinbergen,
// 1962), the median voter (Hotelling 1929, Downs 1957), Condorcet's voting cycle (1785), the prisoner's dilemma (Tucker, 1950),
// difference in differences (Card and Krueger, 1994), regression discontinuity (Thistlethwaite and Campbell, 1960), an event study
// (Fama, Fisher, Jensen and Roll, 1969) and the instrumental-variable path diagram (Wright, 1928)
const AX=m=>L('M9 6V56H59',m,2.5,.5);
Object.assign(HIST,{
  edgeworth:(m,a)=>L('M8 10H56V54H8Z',m,2.5,.5)+`<path d="M12 20C22 40 36 46 54 48C44 30 30 22 12 20Z" fill="${a}" fill-opacity=".18"/>`+L('M12 20C22 40 36 46 54 48',m,3)+L('M12 20C30 22 44 30 54 48',m,3)+
    L('M8 54C26 46 38 30 56 10',a,2.5,.8)+O(8,54,3.5,m)+O(56,10,3.5,m)+O(33.5,36,4.2,a),
  indiff:(m,a)=>AX(m)+L('M10 16L52 56',m,3,.7)+L('M16 6C18 18 22 27.4 28 33.1S44 48 60 50',a,3.5)+O(28,33.1,4.5,a),
  ppf:(m,a)=>AX(m)+L('M10 12C34 12 52 30 54 56',m,3.5)+O(40,22.5,4.5,a)+O(26,40,3.2,m,.6),
  cobweb:(m,a)=>L('M22 54L46 6',m,3)+L('M8 18.8L58 48.8',m,3)+L('M10 20H39V37.4H30.3V32.2H32.9',a,2.5)+O(32.3,33.4,4,a),
  phillips:(m,a)=>AX(m)+[[16,14],[19,26],[24,33],[30,39],[38,43],[46,46],[54,47],[21,20],[34,44]].map(([x,y])=>O(x,y,2.6,m,.75)).join('')+L('M14 10C18 34 28 46 56 50',a,3.5),
  kuznets:(m,a)=>AX(m)+[[14,44],[20,32],[26,24],[33,21],[40,24],[46,31],[53,42],[30,26]].map(([x,y])=>O(x,y,2.6,m,.75)).join('')+L('M10 52C20 12 44 12 56 48',a,3.5),
  solow:(m,a)=>AX(m)+L('M10 56C14 34 28 22 58 16',m,3,.6)+L('M10 56C16 42 30 34 58 30',m,3.5)+L('M10 56L58 18',a,3)+O(37.2,34.5,4.5,a),
  cycle:(m,a)=>L('M6 44L58 22',m,2.5,.45)+L('M6 44.0L7 41.5L8 39.2L9 37.1L10 35.4L11 34.2L12 33.5L13 33.3L14 33.7L15 34.5L16 35.8L17 37.3L18 38.9L19 40.6L20 42.1L21 43.3L22 44.2L23 44.5L24 44.4L25 43.7L26 42.5L27 40.8L28 38.7L29 36.3L30 33.8L31 31.4L32 29.0L33 26.9L34 25.2L35 24.0L36 23.3L37 23.2L38 23.5L39 24.4L40 25.6L41 27.1L42 28.8L43 30.4L44 31.9L45 33.2L46 34.0L47 34.4L48 34.2L49 33.5L50 32.3L51 30.6L52 28.5L53 26.2L54 23.7L55 21.2L56 18.8L57 16.8L58 15.1',a,3.2)+[[12,33.5],[24,44.4],[36,23.3],[48,34.2]].map(([x,y])=>O(x,y,3.4,m)).join(''),
  malthus:(m,a)=>AX(m)+L('M10 44L58 26',m,3.5)+L('M10 54C34 53 46 42 54 8',a,3.5)+O(46.8,30.2,4.5,a),
  gravity:(m,a)=>L('M20 40L47 21',m,6,.55)+L('M20 40L50 50M47 21L50 50',m,2.5,.45)+O(20,40,12,a)+O(47,21,8,m)+O(50,50,5,m),
  median:(m,a)=>L('M6 54C20 54 24 16 32 16C40 16 44 54 58 54',m,3)+`<path d="M32 9V57" stroke="${a}" stroke-width="2.5" stroke-dasharray="3 3"/>`+O(25,57,3.6,a)+O(39,57,3.6,a),
  condorcet:(m,a)=>L('M28.4 17.2L15.6 42.8M20.0 50.0L44.0 50.0M48.4 42.8L35.6 17.2',m,3)+`<path d="M15.6 42.8L15.2 36.0L21.3 39.0ZM44.0 50.0L38.0 53.4L38.0 46.6ZM35.6 17.2L41.3 21.0L35.2 24.0Z" fill="${m}"/>`+O(32,10,5.5,a)+O(12,50,5.5,a)+O(52,50,5.5,a),
  dilemma:(m,a)=>`<rect x="32" y="32" width="22" height="22" fill="${a}" fill-opacity=".25"/>`+L('M10 10H54V54H10ZM32 10V54M10 32H54',m,3)+O(43,43,4.5,a)+O(21,21,3,m,.6),
  did:(m,a)=>AX(m)+`<path d="M34 8V56" stroke="${m}" stroke-width="2" stroke-dasharray="3 3" stroke-opacity=".6"/>`+L('M12 46L56 38',m,3)+L('M12 32L34 28L56 12',a,3.5)+
    `<path d="M34 28L56 24" stroke="${a}" stroke-width="2.5" stroke-dasharray="3 3" stroke-opacity=".7"/>`+O(12,46,3,m)+O(56,38,3,m)+O(12,32,3,a)+O(56,12,3.5,a),
  rd:(m,a)=>`<path d="M32 6V58" stroke="${m}" stroke-width="2" stroke-dasharray="3 3" stroke-opacity=".6"/>`+[[10,48],[14,43],[18,46],[22,40],[27,40],[29,36]].map(([x,y])=>O(x,y,2.6,m,.8)).join('')+
    [[35,24],[38,20],[43,22],[47,16],[51,17],[55,12]].map(([x,y])=>O(x,y,2.6,a,.85)).join('')+L('M8 47L31 37',m,3)+L('M33 23L57 13',a,3),
  eventstudy:(m,a)=>`<path d="M6 34H58M28 6V58" stroke="${m}" stroke-width="2" stroke-dasharray="3 3" stroke-opacity=".5"/>`+
    [[10,34,m],[16,33,m],[22,35,m],[34,28,a],[40,22,a],[46,18,a],[52,15,a]].map(([x,y,c])=>L(`M${x} ${y-6}V${y+6}`,c,2,.6)+O(x,y,3.2,c)).join(''),
  iv:(m,a)=>L('M14.0 42.0L23.0 42.0M37.0 42.0L49.0 42.0',m,3)+`<path d="M23.0 42.0L17.0 45.4L17.0 38.6ZM49.0 42.0L43.0 45.4L43.0 38.6Z" fill="${m}"/>`+`<path d="M40.5 19.4L32.9 35.7M45.5 19.4L53.1 35.7" stroke="${m}" stroke-width="2.5" stroke-dasharray="3 3" stroke-opacity=".6"/>`+`<path d="M32.9 35.7L32.4 28.8L38.6 31.6ZM53.1 35.7L47.4 31.6L53.6 28.8Z" fill="${m}" fill-opacity=".6"/>`+
    O(8,42,5.5,a)+O(30,42,5.5,m)+O(56,42,5.5,m)+O(43,14,5,m,.55)});
const GL={"serif:Y":{"d":"M513 526 304 195 341 284V186Q341 161 341.5 139.5Q342 118 342.5 101.5Q343 85 344.5 74.5Q346 64 347 61L417 47L414 0H151L148 47L218 61Q219 64 220.0 74.5Q221 85 222.0 101.5Q223 118 223.5 139.5Q224 161 224 186V284L252 195L53 526L2 541L5 587H249L252 541L190 526L324 301H303L435 526L365 541L368 587H561L564 541Z","w":566,"box":[2,0,564,587],"upm":1024,"cap":587},"serif:C":{"d":"M371 -9Q277 -9 204.0 25.0Q131 59 89.0 125.0Q47 191 47 286Q47 355 71.5 412.0Q96 469 141.5 510.0Q187 551 250.0 573.5Q313 596 390 596Q434 596 480.0 587.0Q526 578 559 563L566 415L510 411L477 513Q458 524 432.5 529.5Q407 535 381 535Q317 535 274.5 506.0Q232 477 210.5 426.0Q189 375 189 308Q189 228 216.0 171.0Q243 114 288.5 84.0Q334 54 390 54Q417 54 445.0 62.0Q473 70 492 85L530 176L590 170L561 40Q530 21 478.5 6.0Q427 -9 371 -9Z","w":614,"box":[47,-9,590,596],"upm":1024,"cap":587},"serif:y":{"d":"M222 -4 41 377 -6 393 -3 436H231L234 393L172 377L292 113ZM493 436 496 393 449 377 276 29 197 -137Q172 -189 145.5 -208.5Q119 -228 87 -228Q56 -228 37.5 -213.0Q19 -198 19 -176Q19 -156 35.0 -139.5Q51 -123 83 -114L192 -83L132 -130L250 91L262 113L377 377L315 393L318 436Z","w":488,"box":[-6,-228,496,436],"upm":1024,"cap":587},"serif:c":{"d":"M255 -8Q194 -8 144.5 19.0Q95 46 65.5 95.0Q36 144 36 208Q36 272 67.0 325.5Q98 379 152.5 411.5Q207 444 277 444Q321 444 354.5 432.5Q388 421 407.0 401.0Q426 381 426 357Q426 335 412.5 323.0Q399 311 378 311Q360 311 346.5 318.0Q333 325 315 341L249 401L295 390Q262 397 230.5 381.5Q199 366 179.0 330.0Q159 294 159 238Q159 160 197.5 119.5Q236 79 293 79Q325 79 352.5 92.0Q380 105 406 136L436 109Q408 51 360.0 21.5Q312 -8 255 -8Z","w":448,"box":[36,-8,436,444],"upm":1024,"cap":587},"serif4:Y":{"d":"M492 535 287 218 312 286V191Q312 154 312.5 128.0Q313 102 313.5 86.5Q314 71 315.0 63.0Q316 55 316 52L386 39L384 0H156L153 39L223 52Q224 55 224.5 63.0Q225 71 226.0 86.5Q227 102 227.5 128.0Q228 154 228 191V286L248 218L50 535L0 549L2 587H209L212 549L151 535L298 299H284L425 535L355 549L358 587H540L542 549Z","w":541,"box":[0,0,542,587],"upm":1024,"cap":587},"serif4:C":{"d":"M368 -9Q281 -9 209.5 24.5Q138 58 95.0 124.5Q52 191 52 289Q52 352 74.0 407.5Q96 463 138.5 505.5Q181 548 242.0 572.0Q303 596 381 596Q422 596 468.0 588.0Q514 580 550 565L557 428L512 424L482 519Q463 532 432.0 538.5Q401 545 372 545Q297 545 249.5 512.5Q202 480 179.5 426.0Q157 372 157 307Q157 222 186.5 163.0Q216 104 266.5 74.0Q317 44 378 44Q410 44 436.0 51.0Q462 58 486 72L530 166L576 161L548 35Q514 17 467.0 4.0Q420 -9 368 -9Z","w":604,"box":[52,-9,576,596],"upm":1024,"cap":587},"serifItalic:y":{"d":"M-51 -229Q-88 -229 -106.5 -213.0Q-125 -197 -125 -175Q-125 -158 -116.0 -141.5Q-107 -125 -91 -110Q-75 -124 -53.5 -133.5Q-32 -143 -6 -143Q28 -143 71.5 -121.5Q115 -100 165 -48L205 -10Q254 52 283.5 109.0Q313 166 326.5 224.5Q340 283 340 348Q340 371 335.0 393.0Q330 415 324 428Q336 435 350.0 439.5Q364 444 378 444Q408 444 427.0 426.0Q446 408 446 367Q446 319 427.5 264.5Q409 210 377.0 153.0Q345 96 304.0 41.5Q263 -13 218 -60Q182 -98 146.0 -129.0Q110 -160 75.0 -182.5Q40 -205 8.0 -217.0Q-24 -229 -51 -229ZM129 -105Q128 -52 125.0 5.5Q122 63 118.0 119.0Q114 175 109.0 224.0Q104 273 99.5 309.5Q95 346 91 364Q58 337 29 288L-2 322Q22 360 48.0 387.0Q74 414 99.0 429.0Q124 444 144 444Q168 444 180.0 431.5Q192 419 197 388Q200 373 203.5 339.0Q207 305 211.0 259.5Q215 214 218.5 164.0Q222 114 225.0 66.5Q228 19 229 -18Z","w":462,"box":[-125,-229,446,444],"upm":1024,"cap":587},"serifItalic:c":{"d":"M254 384Q226 384 200.5 356.0Q175 328 159.5 280.5Q144 233 145 173Q146 124 166.5 99.5Q187 75 219 75Q242 75 275.0 91.5Q308 108 339 145L367 104Q326 48 275.0 20.0Q224 -8 183 -8Q139 -8 103.5 11.0Q68 30 47.5 65.0Q27 100 27 148Q27 203 46.5 256.0Q66 309 101.5 351.5Q137 394 185.0 419.0Q233 444 290 444Q336 444 364.0 425.5Q392 407 392 372Q392 356 385.0 340.5Q378 325 367 314Q340 346 309.0 365.0Q278 384 254 384Z","w":385,"box":[27,-8,392,444],"upm":1024,"cap":587},"sans:Y":{"d":"M189 0V232L-7 652H150L208 502Q221 465 234.0 430.5Q247 396 261 358H265Q280 396 293.5 430.5Q307 465 320 502L378 652H532L336 232V0Z","w":525,"box":[-7,0,532,652],"upm":1000,"cap":660},"sans:C":{"d":"M353 -12Q269 -12 199.5 25.5Q130 63 88.0 138.0Q46 213 46 322Q46 403 70.5 466.5Q95 530 138.0 574.0Q181 618 236.5 641.0Q292 664 354 664Q417 664 467.0 639.0Q517 614 550 579L472 490Q448 513 420.0 524.5Q392 536 357 536Q314 536 277.5 510.5Q241 485 219.0 438.0Q197 391 197 327Q197 260 218.0 212.5Q239 165 276.5 140.0Q314 115 363 115Q401 115 431.0 131.0Q461 147 484 169L558 82Q516 35 465.0 11.5Q414 -12 353 -12Z","w":582,"box":[46,-12,558,664],"upm":1000,"cap":660},"hanzi:陈":{"d":"M719 38Q719 5 710.0 -20.5Q701 -46 674.5 -62.5Q648 -79 592 -85Q591 -62 587.0 -45.0Q583 -28 573 -17Q562 -6 543.5 2.0Q525 10 489 15V29Q489 29 504.0 28.0Q519 27 540.0 26.0Q561 25 579.5 24.0Q598 23 605 23Q618 23 622.5 27.5Q627 32 627 41V389H719ZM766 294Q837 260 878.5 222.0Q920 184 939.0 147.5Q958 111 958.5 81.0Q959 51 946.0 32.0Q933 13 912.5 11.5Q892 10 868 30Q863 73 845.5 119.0Q828 165 803.5 208.5Q779 252 754 287ZM589 267Q585 259 575.5 253.5Q566 248 550 249Q507 164 449.0 96.5Q391 29 325 -15L313 -5Q356 52 397.0 136.5Q438 221 464 312ZM754 562Q752 552 744.5 545.0Q737 538 718 535V389Q718 389 697.5 389.0Q677 389 651 389H629V576ZM841 463Q841 463 857.0 450.5Q873 438 895.0 420.5Q917 403 934 386Q930 370 907 370H459L451 399H790ZM869 751Q869 751 879.0 743.0Q889 735 905.5 723.0Q922 711 940.0 696.5Q958 682 973 669Q969 653 945 653H369L361 682H812ZM691 812Q687 803 676.0 796.5Q665 790 643 794L655 812Q646 783 630.5 740.0Q615 697 596.0 647.0Q577 597 556.5 546.0Q536 495 517.5 449.5Q499 404 484 370H492L459 336L367 399Q377 406 394.0 415.0Q411 424 425 428L392 392Q408 424 428.0 469.5Q448 515 468.5 567.0Q489 619 508.0 672.0Q527 725 542.5 771.0Q558 817 567 850ZM336 778V749H125V778ZM82 818 182 778H169V-55Q169 -58 160.5 -65.0Q152 -72 136.0 -78.0Q120 -84 97 -84H82V778ZM270 778 322 828 417 737Q407 725 373 725Q357 696 334.0 654.5Q311 613 286.0 572.0Q261 531 239 501Q288 467 318.5 427.0Q349 387 363.0 346.0Q377 305 377 266Q377 195 347.5 158.0Q318 121 242 119Q242 139 239.0 160.0Q236 181 230 189Q218 204 186 210V224Q200 224 218.0 224.0Q236 224 246 224Q260 224 268 230Q278 236 283.5 250.5Q289 265 289 289Q289 341 271.5 394.0Q254 447 214 498Q222 525 231.5 561.0Q241 597 250.5 636.5Q260 676 268.0 713.0Q276 750 281 778Z","w":1000,"box":[82,-85,973,850],"upm":1000,"cap":729}};
const MARKS={yc:['serif','YC'],ycreg:['serif4','YC'],yclabel:['serif','YC',.12],y:['serif','Y'],ydc:['serif','Y·C'],ycit:['serifItalic','yc'],chen:['hanzi','陈'],ycsans:['sans','YC']};
// a row of letters (and a centre dot for ·) in white or colour col, fitted into a box of size room and centred at (32,32)
function word(font,txt,room,col,track=0){let x=0,top=-1e9,bot=1e9,left=null,right=0,parts=[];const g0=GL[font+':'+txt.replace('·','')[0]],u=g0.upm;
  for(const ch of txt){if(ch==='·'){const r=g0.cap*.09;x+=g0.cap*.12;parts.push(['dot',x+r,g0.cap*.5,r]);x+=2*r+g0.cap*.12;right=x;continue}
    const g=GL[font+':'+ch],[a,b,c,d]=g.box;parts.push(['g',x,g.d]);if(left===null)left=x+a;right=x+c;top=Math.max(top,d);bot=Math.min(bot,b);x+=g.w+track*g.upm}
  const w=right-left,h=top-bot,sc=Math.min(room/w,room/h),ox=32-(left+w/2)*sc,oy=32+(bot+h/2)*sc;
  return parts.map(p=>p[0]==='dot'?`<circle cx="${(ox+p[1]*sc).toFixed(2)}" cy="${(oy-p[2]*sc).toFixed(2)}" r="${(p[3]*sc).toFixed(2)}" fill="${col}"/>`:
    `<path transform="translate(${(ox+p[1]*sc).toFixed(2)} ${oy.toFixed(2)}) scale(${sc.toFixed(5)} ${(-sc).toFixed(5)})" d="${p[2]}" fill="${col}"/>`).join('')}
const mixHex=(a,b,t)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');
function iconSVG(style,c,name,size,back='none',two=false,c2=null,acc=false){const fill=back==='square'||back==='circle',
    G=c2&&HEX.test(c)&&HEX.test(c2)?`<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="6" y1="20" x2="58" y2="44"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`:'',
    A=acc&&c2&&!fill,paint=G&&!A?'url(#g)':c,tilePaint=G?'url(#g)':c,mc=fill?'#fff':paint,
    dotC=(x,y,i,ai)=>fill?'#fff':A?(i===ai?c2:c):G?mixHex(c,c2,Math.min(1,Math.max(0,((x-6)*52+(y-20)*24)/(52*52+24*24)))):c,
    share=back==='none'?.92:back==='circle'||back==='ring'?.62:.7,
    tile=back==='square'?`<rect width="64" height="64" rx="14" fill="${tilePaint}"/>`:back==='circle'?`<circle cx="32" cy="32" r="32" fill="${tilePaint}"/>`:
      back==='soft'?`<rect width="64" height="64" rx="14" fill="${tilePaint}" fill-opacity=".12"/>`:back==='ring'?`<circle cx="32" cy="32" r="29.5" fill="#fff" stroke="${tilePaint}" stroke-width="5"/>`:'';
  let body='';
  if(DOTS[style]||style==='orbit'){const sc=back==='none'?1:share/.92,g=sc<1?` transform="translate(${32*(1-sc)} ${32*(1-sc)}) scale(${sc})"`:'',
      lc=two?(fill?'#fff':'#8c959f'):mc,lo=two&&!fill?.9:.55;
    if(style==='orbit')body=`<g${g}><ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-25 32 32)" fill="none" stroke="${lc}" stroke-width="3.5" stroke-opacity="${two&&!fill?.9:.55}"/><circle cx="32" cy="32" r="13" fill="${dotC(32,32)}"/><circle cx="51.8" cy="17.2" r="5.5" fill="${dotC(52,17)}"/></g>`;
    else{const[d,path,w,ai=0]=DOTS[style];body=`<g${g}><path d="${path}" fill="none" stroke="${lc}" stroke-width="${w}" stroke-opacity="${lo}" stroke-linejoin="round" stroke-linecap="round"/>`+
      d.map(([x,y,r],i)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${dotC(x,y,i,ai)}"/>`).join('')+'</g>'}}
  else if(HIST[style]){const sc=back==='none'?1:share/.92,g=sc<1?` transform="translate(${32*(1-sc)} ${32*(1-sc)}) scale(${sc})"`:'';
    body=`<g${g}>${HIST[style](mc,fill?'#fff':A?c2:paint)}</g>`}
  else if(style==='yinc'){// a small Y inside a large C
    const C=GL['serif:C'],Y=GL['serif:Y'],room=64*share,sc=room/(C.box[3]-C.box[1]),cx=32-(C.box[0]+C.box[2])/2*sc,cy=32+(C.box[1]+C.box[3])/2*sc,ys=sc*.38;
    body=`<path transform="translate(${cx.toFixed(2)} ${cy.toFixed(2)}) scale(${sc.toFixed(5)} ${(-sc).toFixed(5)})" d="${C.d}" fill="${mc}"/>`+
      `<path transform="translate(${(35.5-(Y.box[0]+Y.box[2])/2*ys).toFixed(2)} ${(32+(Y.box[3])/2*ys).toFixed(2)}) scale(${ys.toFixed(5)} ${(-ys).toFixed(5)})" d="${Y.d}" fill="${mc}"/>`}
  else if(MARKS[style]){const[f,t,tr]=MARKS[style];body=word(f,t,64*share,mc,tr)}
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${size?` width="${size}" height="${size}"`:''}>${G}${tile}${body}</svg>`}
const pick=(k,S)=>k==='link'?S.link:k==='muted'?S.muted:k==='text'?S.text:k==='heading'?pick(S.headingColour,S):k==='dots'?pick(S.networkColour,S):k;   // colour keyword -> colour
window.SiteEngine={FONTS,SPEC,clean,cleanSite,iconSVG,pick};
if(document.documentElement.hasAttribute('data-panel'))return;   // an editor page only borrows the tables above

const $=q=>document.querySelector(q),R=document.documentElement.style,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,
  fileOf=u=>{let f=new URL(u,location.href).pathname.split('/').pop();try{f=decodeURIComponent(f)}catch(e){}f=f||'index.html';return/\./.test(f)?f:f+'.html'},EDIT=document.documentElement.hasAttribute('data-edit'),
  FILE=EDIT?fileOf(((typeof SITE==='object'&&SITE&&Array.isArray(SITE.menu)&&SITE.menu[0])||[0,'index.html'])[1]):fileOf(location.href),
  PREVIEW=window.parent!==window&&/[?&]preview\b/.test(location.search),DRAFT=!PREVIEW&&/[?&]draft\b/.test(location.search);
let PGO=null,S=clean(typeof SETTINGS==='object'?SETTINGS:{}),SI=cleanSite(typeof SITE==='object'?SITE:{}),waiting=PREVIEW,started=false;
// previews: in a preview window an editor sends the settings; a ?draft page reads them from this browser
const pagesOf=o=>o&&typeof o==='object'?Object.fromEntries(Object.entries(o).filter(([k,v])=>typeof v==='string')):null;
if(DRAFT)try{const d=JSON.parse(localStorage.getItem('yc-site-draft'));if(d){S=clean(d.settings);SI=cleanSite(d.site);PGO=pagesOf(d.pages)}}catch(e){}

// colours, sizes, fonts and the tab icon, set before the page is drawn. Every size and gap is a multiple of the body size --fs, so
// when fluidScale is above 1 the body size alone grows with the window (textSize at a 360 px window, textSize x fluidScale from
// 1440 px on, in rem so browser zoom still works) and the whole page keeps its proportions.
function look(){const b=S.textSize,k=S.fluidScale,x=r=>`calc(var(--fs)*${+r.toFixed(4)})`,
    fs=k>1?`clamp(${b/16}rem,${+((b-b*(k-1)/3)/16).toFixed(4)}rem + ${+(b*(k-1)/10.8).toFixed(4)}vw,${+(b*k/16).toFixed(4)}rem)`:b+'px';
  [['--bg',S.background],['--text',S.text],['--muted',S.muted],['--link',S.link],['--lines',S.lines],['--fs',fs],['--fw',S.textWeight],
   ['--lh',S.lineSpacing],['--L',x(S.lineSpacing)],['--q',x(S.lineSpacing/4)],['--pg',x(S.paraGap*S.lineSpacing)],['--eg',x(S.entryGap*S.lineSpacing)],['--slh',S.smallLeading],['--sg',x(S.sectionGap*S.lineSpacing)],
   ['--cg',x(S.columnGap*S.lineSpacing)],['--top',x(S.topSpace*S.lineSpacing)],['--sm',x(S.smallSize/b)],['--meas',x(S.measure)],['--sw',x(S.sideEm)],
   ['--ppw',x(S.sideEm*S.photoScale)],['--ns',x(S.nameSize/b)],['--ts',x(S.titleSize/b)],['--tw',S.titleWeight],['--h2s',x(S.headingSize/b)],
   ['--absfs',S.absSize==='small'?'var(--sm)':'var(--fs)'],['--abslh',S.absLeading],['--absc',S.absColour==='muted'?'var(--muted)':'var(--text)'],['--absw',{full:'none',match:S.measure+'em','90':'36em','75':'30em','65':'26em','440':'29.2em'}[S.absWidth]],
   ['--hw',S.headingWeight],['--hc',pick(S.headingColour,S)],['--maxw',S.width+'px'],['--pw',S.photoWidth+'px'],['--pr',S.photoCorners+'px']].forEach(([p,v])=>R.setProperty(p,v));
  FSPX=0;
  const f=FONTS[S.font],h=S.headingFont==='same'?f:FONTS[S.headingFont],sf=S.smallFont==='same'?f:FONTS[S.smallFont],fam=[...new Set([f[2],h[2],sf[2]].filter(Boolean))];
  R.setProperty('--font',f[1]);R.setProperty('--hfont',h[1]);R.setProperty('--sfont',sf[1]);
  let l=$('#gf');
  if(fam.length){if(!l){l=document.createElement('link');l.id='gf';l.rel='stylesheet';document.head.appendChild(l)}
    const u='https://fonts.googleapis.com/css2?'+fam.map(x=>'family='+x).join('&')+'&display=swap';if(l.getAttribute('href')!==u)l.href=u}
  else if(l)l.remove();
  let m=$('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}m.content=S.background;
  // tab icon drawn from the settings as a second, SVG icon; icon.png (the same design as a file) stays for search
  // engines and browsers without SVG icons
  let sv=$('#svgicon');if(S.icon==='file'){if(sv)sv.remove()}
  else{if(!sv){sv=document.createElement('link');sv.id='svgicon';sv.rel='icon';sv.type='image/svg+xml';document.head.appendChild(sv)}
    sv.href='data:image/svg+xml,'+encodeURIComponent(iconSVG(S.icon,pick(S.iconColour,S),SI.name,0,S.iconBack,S.iconTwoTone,S.iconColour2==='none'?null:pick(S.iconColour2,S),S.iconAccent))}
  NC=rgb(pick(S.networkColour,S))}

// page content: # title, ## heading, empty line = paragraph, [text](link), link-only lines = link list, ![photo](file), footer: text.
// A paragraph that starts with ### is a paper: ### title, then any lines of authors or status, a line of links (shown as small
// buttons) and lines starting with > (the abstract, opened by an Abstract button). In the sidebar text, lines keep their breaks.
function md(src,keepLines){let title='',photo='',alt='',foot='',buf=[];const B=[],flush=()=>{if(buf.length){B.push(buf);buf=[]}};
  for(const l of src.replace(/\r/g,'').split('\n').map(x=>x.trim())){
    if(!l){flush();continue}
    if(l.startsWith('# ')){flush();title=l.slice(2).trim();continue}
    if(/^footer:/i.test(l)){flush();foot=l.replace(/^footer:\s*/i,'');continue}
    const ph=l.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);if(ph){flush();alt=ph[1].trim();photo=ph[2].trim();continue}
    if(l.startsWith('## ')){flush();B.push({h:l.slice(3).trim()});continue}
    buf.push(l)}
  flush();
  // outside links open in a new tab; pages of this site and email links open as usual
  const only=/^\[[^\]]+\]\([^)\s]+\)$/,
    lk=x=>esc(x).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>{u=u.replace(/&amp;/g,'&');return`<a href="${esc(safe(u))}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':''}>${t}</a>`});
  const paper=b=>{const abs=b.filter(x=>x.startsWith('>')).map(x=>x.slice(1).trim()),rest=b.slice(1).filter(x=>!x.startsWith('>')),
      btn=rest.filter(x=>/^(\[[^\]]+\]\([^)\s]+\)\s*)+$/.test(x)).join(' ').match(/\[[^\]]+\]\([^)\s]+\)/g)||[],meta=rest.filter(x=>!/^(\[[^\]]+\]\([^)\s]+\)\s*)+$/.test(x));
    return`<div class="paper"><h3>${lk(b[0].slice(4).trim())}</h3>${meta.map(x=>`<p class="meta">${lk(x)}</p>`).join('')}`+
      (btn.length||abs.length?`<div class="btns">${(a=>S.absFirst?a+btn.map(lk).join(''):btn.map(lk).join('')+a)(abs.length?`<button type="button" class="abs-btn" aria-expanded="false" aria-label="Abstract of ${esc(b[0].slice(4).trim())}">Abstract</button>`:'')}</div>`:'')+
      (abs.length?`<div class="abs"><div class="abs-in"><div class="abs-tx">${lk(abs.join(' '))}</div></div></div>`:'')+'</div>'};
  const blocks=B.filter(b=>b.h===undefined);
  return{title,photo,alt:esc(alt),foot:lk(foot),links:blocks.filter(b=>b.every(x=>only.test(x))).map(b=>`<p class="links">${b.map(lk).join('')}</p>`).join(''),
    html:B.map(b=>b.h!==undefined?`<h2>${esc(b.h)}</h2>`:b[0].startsWith('### ')?paper(b):b.every(x=>only.test(x))?`<p class="links">${b.map(lk).join('')}</p>`:
    `<p>${b.map(lk).join(keepLines?'<br>':' ')}</p>`).join('')}}
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// layout, built from parts that combine freely:
// column: single, or profile (photo, name and contact in a column on the left of every page)
// header: split (name left, menu right), centred (name centred, menu below) or stacked (name, menu below, on the left);
//   headerWidth full (bar across the window) or content (bar as wide as the text); band none, tint (light band) or accent
//   (band in the link colour); bannerTitle puts the page title inside the band
// titleAlign center or left; homeTitle shows the title ("Home") on the home page; homeLayout side (photo beside the text) or top
// (photo above it); photoShape rounded or circle
// onePage: the other pages of the menu follow the home text as sections (their ## headings become subheadings) and the menu
// jumps to them. menuPlace: top (the bar), side (in the profile column; needs column profile) or none. sideAlign left or center.
// contactStyle text (icon and words) or icons (round icon buttons; an email address stays written out).
const slug=u=>fileOf(u).replace(/\.html?$/,'');
let CONTENT='',HD,WR,FT,DEMO=DRAFT&&/[?&]demo\b/.test(location.search),DEMO_OPEN=false;
const DEMO_MD=`

### Example paper: Land, Credit, and Rural Recovery
with A. Coauthor and B. Coauthor
Revise and Resubmit, Journal of Economic History
[Draft](#) [SSRN](#) [Slides](#)
> This example appears only in previews, so the abstract can be tried. A typical abstract states the question, the setting and the data, the method, and the main finding with its size, in about 150 words. Click Abstract to open and close it; a pop-up or a window also closes with a click outside or the Escape key.`;
// the text of a page; the example paper joins the first page after Home (or Home when it is the only page)
const textOf=(f,own)=>(PGO&&PGO[f]!==undefined?PGO[f]:own!==undefined?own:PG[f]||'')+(DEMO&&f===fileOf((SI.menu[1]||SI.menu[0])[1])?DEMO_MD:'');
function render(){const B=document.body,home=B.dataset.page==='home',q=PREVIEW?'?preview':DRAFT?(DEMO?'?draft&demo':'?draft'):'',c=md(textOf(FILE,CONTENT)),
    one=S.onePage&&home,side=S.column==='profile',place=S.menuPlace==='side'&&!side?'top':S.menuPlace;
  B.className=['col-'+S.column,'hd-'+S.header,'hw-'+S.headerWidth,'band-'+S.band,'ta-'+S.titleAlign,'home-'+S.homeLayout,'ph-'+S.photoShape,
    'ln-'+S.linkStyle,'mn-'+S.menuStyle,'side-'+S.sideAlign,'ci-'+S.contactStyle,'hs-'+S.headingStyle,'pl-'+S.paperLinks,'ab-'+S.absStyle,'ae-'+S.absEdge,'aa-'+S.absAlign,'menu-'+place,one&&'one',S.headerLine&&'hline',
    S.titleLine&&'tline',S.pageFade&&!RM&&'pf',waiting&&'wait'].filter(Boolean).join(' ');
  stack();
  // one page: another page of the menu forwards to its section of the home page
  if(S.onePage&&!home&&SI.menu.slice(1).some(([t,u])=>fileOf(u)===FILE)){location.replace(SI.menu[0][1]+q+'#'+slug(FILE));return}
  // menu items: pages, or on a one-page home the sections of this page
  const items=SI.menu.map(([t,u],i)=>one?[i?t:SI.about||t,'#'+(i?slug(u):'about'),i===0]:[t,u+q,fileOf(u)===FILE]),
    links=items.map(([t,u,on])=>`<a href="${esc(u)}"${on?' class="on" aria-current="page"':''}>${esc(t)}</a>`).join('');
  const h1=c.title&&!(home&&!S.homeTitle)?`<h1>${esc(c.title)}</h1>`:'',img=(u,a)=>`<img class="photo" src="${esc(safe(u))}" alt="${a}">`,
    top=S.bannerTitle&&place==='top'?'':h1;
  HD.innerHTML=place!=='top'?'':`<div class="bar"><a class="name" href="${esc(SI.menu[0][1])}${q}">${esc(SI.name)}</a><nav>${links}</nav></div>`+(S.bannerTitle&&h1?`<div class="banner">${h1}</div>`:'');
  const sb=md(SI.sidebar,true);
  // the text of this page; on a one-page home, followed by the other pages as sections
  let body=c.html;
  if(one){body=`<section id="about">${SI.about?`<h2 class="sec">${esc(SI.about)}</h2>`:''}${body}</section>`;   // About and each part are sibling sections, one section gap apart
    SI.menu.slice(1).forEach(([t,u])=>{const x=md(textOf(fileOf(u)));if(x.html)body+=`<section id="${esc(slug(u))}"><h2 class="sec">${esc(x.title||t)}</h2>${x.html.replace(/<h2>/g,'<h3 class="sub">').replace(/<\/h2>/g,'</h3>')}</section>`});}
  if(side)WR.innerHTML=`<aside class="side">${img(SI.photo,esc(SI.name))}<div class="who"><div class="nm" role="heading" aria-level="1">${esc(SI.name)}</div>${sb.html}`+
    (place==='side'?`<div class="sidenav">${links}</div>`:'')+`</div></aside><div class="main">${top}<div class="text">${body}</div></div>`;
  // without the profile column, its contact links (email, CV) appear under the Home text
  else WR.innerHTML=top+(c.photo?`<div class="home">${img(c.photo,c.alt)}<div class="text">${body}${home?sb.links:''}</div></div>`:`<div class="text">${body}</div>`);
  // contact links in the profile column: the CV link takes the chosen label; style text = icon and words, plain = words, buttons = small
  // outlined buttons (as the paper buttons), inline = one line with dots between, icons = round icon buttons (the email stays written)
  WR.querySelectorAll('.side .links a').forEach(a=>{const mail=/^mailto:/i.test(a.getAttribute('href'));
    if(!mail&&S.cvLabel!=='asis'&&/\bcv\b|vitae|resume/i.test(a.textContent))a.textContent=S.cvLabel;
    if(S.contactStyle==='icons'&&!mail){a.title=a.textContent;a.innerHTML=`<span class="lt">${a.innerHTML}</span>`;a.classList.add('ib')}
    if(S.contactStyle==='buttons'&&!mail)a.classList.add('cb');
    if(S.contactStyle==='text'||a.classList.contains('ib'))a.insertAdjacentHTML('afterbegin',contactIcon(a))});
  FT.innerHTML=c.foot;
  // in a preview, links to other pages of the site stay in preview
  if(q)WR.querySelectorAll('.text a[href]').forEach(a=>{const u=a.getAttribute('href');if(!/^(https?:|mailto:|#)/.test(u))a.setAttribute('href',u+q)});
  if(DEMO_OPEN){const p=[...WR.querySelectorAll('.paper')].find(x=>/^Example paper/.test(x.querySelector('h3').textContent));if(p)openAbs(p,p.querySelector('.abs-btn'),true)}
  if(DRAFT&&!$('.draftmark'))B.insertAdjacentHTML('beforeend','<div class="draftmark">Preview with your unpublished changes</div>')}

let FSPX=0;
const fsPx=()=>FSPX||(FSPX=parseFloat(getComputedStyle(document.body).fontSize)||S.textSize);
function stack(){const f=fsPx();document.body.classList.toggle('stack',S.column==='profile'&&innerWidth<(S.sideEm+S.columnGap*S.lineSpacing+26)*f+40)}

// abstracts: expand, box and lines open in place; popover opens a small card under the switch (one at a time); dialog opens a window
// over the page with the title, authors, abstract and links; always shows it without a switch
function openAbs(p,b,only){if(S.absStyle==='dialog'){absDialog(p);return}
  const o=only||!p.classList.contains('open');
  if(S.absStyle==='popover'){closeAbs(p);p.style.setProperty('--ax',b.offsetLeft+b.offsetWidth/2+'px')}
  p.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}
function closeAbs(keep){if(S.absStyle!=='popover')return;
  WR.querySelectorAll('.paper.open').forEach(x=>{if(x!==keep){x.classList.remove('open');x.querySelector('.abs-btn').setAttribute('aria-expanded',false)}})}
let DLG;
function absDialog(p){if(!DLG){document.body.insertAdjacentHTML('beforeend','<dialog class="absdlg"><button type="button" class="dlg-x" aria-label="Close">&times;</button><div class="paper dlg-body"></div></dialog>');
    DLG=$('.absdlg');DLG.addEventListener('click',e=>{if(e.target===DLG||e.target.closest('.dlg-x'))DLG.close()})}
  DLG.querySelector('.dlg-body').innerHTML=`<h3>${p.querySelector('h3').innerHTML}</h3>`+[...p.querySelectorAll('.meta')].map(m=>m.outerHTML).join('')+
    `<div class="dlg-abs">${p.querySelector('.abs-tx').innerHTML}</div><div class="btns">${[...p.querySelectorAll('.btns a')].map(a=>a.outerHTML).join('')}</div>`;
  if(!DLG.open)DLG.showModal()}

// small line icons for the contact links in the profile column: email, CV or paper, Google Scholar, GitHub, any other link
function contactIcon(a){const u=a.getAttribute('href')||'',t=a.textContent,
    d=/^mailto:/i.test(u)?'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>':
      /\bcv\b|vitae|resume|\.pdf/i.test(t+' '+u)?'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>':
      /scholar\.google/i.test(u)?'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>':
      /github\.com/i.test(u)?'<path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/>':
      '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>';
  return`<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`}

// quiet text area: the line boxes of all text plus quietMargin gaps stay at quietInside; the network returns over quietFade gaps
const sm=f=>f<=0?0:f>=1?1:f*f*f*(f*(6*f-15)+10),rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));   // one fade curve for every line, dot, force and quiet zone
let VW=1,VH=1,N=0,cv,ctx,P=[],TR=[],last=0,NC=[9,105,218];
function textRects(){TR=[];const rg=document.createRange();
  document.querySelectorAll('.name,nav a,h1,.text>p,.text section>p,.text h2,.text h3,.paper>h3,.paper>.meta,.paper>.btns,.paper.open>.abs,.ab-lines .abs,.ab-always .abs,footer,.side .nm,.side p,.sidenav a').forEach(el=>{rg.selectNodeContents(el);for(const r of rg.getClientRects())if(r.width&&r.height)TR.push(r)})}
function calmAt(x,y){if(!TR.length)return 1;let d=1e12;
  for(const r of TR){const dx=Math.max(r.left-x,0,x-r.right),dy=Math.max(r.top-y,0,y-r.bottom),dd=dx*dx+dy*dy;if(dd<d){d=dd;if(!d)break}}
  const g=S.paraGap*fsPx()*S.lineSpacing,s=(Math.sqrt(d)-S.quietMargin*g)/(S.quietFade*g);return S.quietInside+(1-S.quietInside)*sm(s)}

// background network. Each dot fades in, lives a random lifeMin to lifeMax seconds, fades out, and a new one fades in elsewhere.
// Dots cruise at a set speed in their own direction; each pair within gravityRange pulls along a softened inverse square, which
// bends their paths as they pass. The pull grows with the square of the speed, so a path keeps its shape at any speed (pull 0.5 at
// speed 10 is the original fly-by gravity). The pull fades out for dots moving together, and every heading turns slowly at random,
// so no pair ends up travelling as one; a governor returns each dot to cruising speed at rate steady (low = dots speed up and slow
// down through a pass, as planets do); spacing pushes dots apart within SPACE px.
// Open edges: the dots live in a field that reaches reach + 20 px past the window on every side. A dot that leaves the field is
// gone; it is then out of reach of every dot in the window, so none of its lines shows as it goes. Another dot comes in at a
// random point of the field's edge, partway through its life and heading inward, with the spread of headings at which dots cross
// a line in an endless field. The window thus shows part of an endless field: no wall, nothing turns back, and the dots per area
// are the same at the edges as in the middle.
// Variety: each dot is born with its own cruising speed (speed x 1 ± speedSpread), size (log-even spread) and shade (1 down to
// 1 - shadeSpread); with heavyBig, a dot's pull grows with its area (average pull unchanged). A share families of births (not of
// dots coming in) are a group of 3 or 4 dots heading the same way; about a share moons of the dots, all from the larger half, have
// a tiny moon on a tilted orbit; with twinkle, each dot brightens and dims by up to that share and swells by 15% of it, at its own
// pace (one round in 5 to 10 s).
const BIRTH=1000,FADE=2500,GRAV=5000,SOFT=900,SPACE=36,TURN=.15,rnd=Math.random,u=()=>2*rnd()-1,out=()=>S.reach+20;
// dots in the field: density per window area (at most 170 in the window), scaled up to the field
const count=()=>{const o=out();return!VW||!VH?0:Math.round(Math.min(170,VW*VH/16000*S.density)*(VW+2*o)*(VH+2*o)/(VW*VH))};
function node(x,y,t,o={}){const th=rnd()*6.28,sf=1+S.speedSpread*u(),a=.8*S.sizeSpread,w=u(),sz=Math.exp(a*w),mt=rnd()*3.14;
  return{x,y,vx:S.speed*sf*Math.cos(th),vy:S.speed*sf*Math.sin(th),sf,sz,m:S.heavyBig&&a?sz*sz*2*a/Math.sinh(2*a):1,sh:1-S.shadeSpread*rnd(),
  ax:0,ay:0,born:0,die:0,lf:1,click:0,end:t+1000*(S.lifeMin+Math.max(0,S.lifeMax-S.lifeMin)*rnd()),
  ph:rnd()*6.28,tw:6.283/(5000+5000*rnd()),big:w>=0,rm:rnd(),ma:rnd()*6.28,mw:(rnd()<.5?-1:1)*6.283/(6000+5000*rnd()),mc:Math.cos(mt),ms:Math.sin(mt),...o}}   // twinkle; moon (tilt mt)
const spot=()=>{const o=out();return[-o+rnd()*(VW+2*o),-o+rnd()*(VH+2*o)]};   // a random point of the field
function initNet(){const t=performance.now();P=[];N=count();
  for(let i=0;i<N;i++){const p=node(...spot(),t);p.end=t+(p.end-t)*rnd();P.push(p)}}  // staggered first lives
function life(p,t){let a=1;if(p.born)a=sm((t-p.born)/BIRTH);if(p.die)a*=1-sm((t-p.die)/FADE);return a}
// a new dot at a random point of the field, or (a share families of births) a group of 3 or 4 heading the same way
function birth(t){const[x,y]=spot(),o={born:t,lf:0};if(rnd()>=S.families){P.push(node(x,y,t,o));return 1}
  const h=rnd()*6.28,n=3+(rnd()<.4);
  for(let i=0;i<n;i++){const p=node(x+12*u(),y+12*u(),t,o),g=h+.3*u(),v=S.speed*p.sf;p.vx=v*Math.cos(g);p.vy=v*Math.sin(g);P.push(p)}
  return n}
// a dot coming in across the field's edge: a random point of the edge, an angle to the inward normal spread as cos (as dots cross a
// line in an endless field), and the remaining part of a life
function enter(t){const o=out(),W=VW+2*o,H=VH+2*o;let s=rnd()*2*(W+H),x,y,nx=0,ny=0;
  if(s<W){x=-o+s;y=-o;ny=1}else if((s-=W)<W){x=-o+s;y=VH+o;ny=-1}else if((s-=W)<H){x=-o;y=-o+s;nx=1}else{x=VW+o;y=-o+s-H;nx=-1}
  const p=node(x,y,t,{born:t,lf:0}),v=S.speed*p.sf,a=Math.asin(u()),c=Math.cos(a),q=Math.sin(a);
  p.vx=v*(nx*c-ny*q);p.vy=v*(nx*q+ny*c);p.end=t+(p.end-t)*rnd();P.push(p)}
function step(t,dt){const G=GRAV*S.pull*(S.speed/10)**2,GR=S.gravityRange,far=Math.max(GR,S.spacing?SPACE:0)**2,iv=1/Math.max(S.speed,.1),o=out();
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy;if(d2>far)continue;
    const d=Math.sqrt(d2),q=d2+SOFT,lf=Math.min(a.lf,b.lf);
    const ux=b.vx-a.vx,uy=b.vy-a.vy,f=G*lf*sm(1-d/GR)*sm(Math.sqrt(ux*ux+uy*uy)*iv)/(q*Math.sqrt(q)),
      r=S.spacing&&d<SPACE&&d>.01?S.spacing*2*lf*sm(1-d/SPACE)/d:0,   // a gentle push apart, up to 2 px/s² per unit of spacing
      fa=f*b.m-r,fb=f*a.m-r;
    a.ax+=dx*fa;a.ay+=dy*fa;b.ax-=dx*fb;b.ay-=dy*fb}
  for(const p of P){let ax=p.ax,ay=p.ay;p.ax=p.ay=0;
    if(!p.die&&t>p.end)p.die=t;
    if(p.click&&t-p.born<BIRTH)continue;   // a clicked dot stays exactly where it was clicked while it fades in
    const vx=p.vx,v=Math.sqrt(vx*vx+p.vy*p.vy),r=(rnd()-.5)*TURN*Math.sqrt(12*dt),c=Math.cos(r),s=Math.sin(r);   // slow random turn
    p.vx=vx*c-p.vy*s;p.vy=vx*s+p.vy*c;
    if(v<.01){const th=rnd()*6.28;p.vx=.1*Math.cos(th);p.vy=.1*Math.sin(th)}else{const g=S.steady*(S.speed*p.sf-v)/v;ax+=g*p.vx;ay+=g*p.vy}
    p.vx+=ax*dt;p.vy+=ay*dt;p.x+=p.vx*dt;p.y+=p.vy*dt}
  let gone=0;   // dots that left the field (a dying or clicked one is not replaced)
  P=P.filter(p=>{if(p.x<-o||p.x>VW+o||p.y<-o||p.y>VH+o){if(!p.click&&!p.die)gone++;return false}return!p.die||t-p.die<FADE});
  for(;gone>0;gone--)enter(t);
  let alive=0;for(const p of P)if(!p.click&&!p.die)alive++;
  while(alive<N)alive+=birth(t)}
function draw(t){const k=S.strength,c=NC.join(',');ctx.clearRect(0,0,VW,VH);if(!S.network||!P.length)return;textRects();
  P.forEach(p=>{p.lf=life(p,t)});ctx.lineWidth=.6;
  const R=S.reach,R2=R*R;
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;
    if(d2>=R2||a.x<0&&b.x<0||a.y<0&&b.y<0||a.x>VW&&b.x>VW||a.y>VH&&b.y>VH)continue;   // too far apart, or both past one edge
    const al=sm(1-Math.sqrt(d2)/R)*.32*k*Math.min(a.lf,b.lf)*Math.sqrt(a.sh*b.sh)*calmAt((a.x+b.x)/2,(a.y+b.y)/2);if(al<.006)continue;
    ctx.strokeStyle=`rgba(${c},${Math.min(1,al)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
  P.forEach(p=>{if(p.x<-16||p.x>VW+16||p.y<-16||p.y>VH+16)return;   // out of sight
    const tw=1+S.twinkle*Math.sin(t*p.tw+p.ph),calm=calmAt(p.x,p.y),a=Math.min(1,.55*k*p.lf*p.sh*calm*tw);
    if(a>=.006){ctx.fillStyle=`rgba(${c},${a})`;ctx.beginPath();ctx.arc(p.x,p.y,1.6*p.sz*Math.sqrt(p.lf)*(1+.15*(tw-1)),0,7);ctx.fill()}
    if(S.moons&&p.big&&p.rm<2*S.moons){const an=p.ma+t*p.mw,r=4+3*p.sz,ex=Math.cos(an)*r,ey=Math.sin(an)*r*.4,
      ma=Math.min(1,.55*k*p.lf*p.sh*calm*(ey>0?1:.55));   // the moon on its tilted orbit, fainter on the far side
      if(ma>=.006){ctx.fillStyle=`rgba(${c},${ma})`;ctx.beginPath();ctx.arc(p.x+ex*p.mc-ey*p.ms,p.y+ex*p.ms+ey*p.mc,.85*Math.sqrt(p.lf),0,7);ctx.fill()}}})}
// while the tab is hidden the page stops; every life cycle is shifted by the pause so the dots resume where they were
function loop(t){if(last&&t-last>250){const g=t-last;P.forEach(p=>{if(p.born)p.born+=g;if(p.die)p.die+=g;p.end+=g})}
  const dt=last?Math.min(.05,(t-last)/1000):0;last=t;if(S.network)step(t,dt);draw(t);requestAnimationFrame(loop)}
// the canvas box excludes a scrollbar, so all geometry uses the box size, not the window size. A resize keeps the dots
// (phones resize the window while scrolling); the number of dots follows the new area through the life cycle.
function size(first){const d=devicePixelRatio||1;VW=cv.clientWidth;VH=cv.clientHeight;cv.width=VW*d;cv.height=VH*d;ctx.setTransform(d,0,0,d,0,0);
  if(first)initNet();else N=count()}

const PG=typeof PAGES==='object'&&PAGES?PAGES:{};
function start(){CONTENT=PG[FILE]!==undefined?PG[FILE]:($('#content')||{}).textContent||'';
  document.body.insertAdjacentHTML('afterbegin','<canvas id="net" aria-hidden="true"></canvas><header class="top"></header><main class="wrap" id="page"></main><footer id="foot"></footer>');
  cv=$('#net');ctx=cv.getContext('2d');HD=$('header');WR=$('#page');FT=$('#foot');render();started=true;
  if(typeof PAGES!=='object'&&!$('#content'))WR.insertAdjacentHTML('afterbegin','<p class="cjs-err">The page text could not be read: content.js has an error.</p>');
  // menu: the current page does nothing; another page fades out first when pageFade is on
  document.addEventListener('click',e=>{const a=e.target.closest('.top a,.sidenav a');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
    if(fileOf(a.href)===FILE){if(!a.hash)e.preventDefault();return}
    if(S.pageFade&&!RM){e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>{location.href=a.href},180)}});
  // coming back with the browser's back button shows this page again as it was
  addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});
  WR.addEventListener('click',e=>{const b=e.target.closest('.abs-btn');if(b)openAbs(b.closest('.paper'),b)});
  // a pop-up closes with a click elsewhere or Escape
  document.addEventListener('click',e=>{if(S.absStyle==='popover'&&!e.target.closest('.paper.open'))closeAbs()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAbs()});
  // a click adds a dot that joins the network and lives by the same rule as the others;
  // when clickDots are on screen (fading ones included), clicks are ignored until one has gone. A dot is added when the pointer
  // is released where it was pressed, so scrolling or pinching on a phone adds nothing.
  let down=null;
  addEventListener('pointerdown',e=>{down=e.button||e.target.closest('a,button,input,textarea,select,label,[data-ed]')?null:{x:e.clientX,y:e.clientY,id:e.pointerId}});
  addEventListener('pointercancel',()=>{down=null});
  addEventListener('pointerup',e=>{const d=down;down=null;if(!S.network||!d||e.pointerId!==d.id||Math.hypot(e.clientX-d.x,e.clientY-d.y)>8)return;
    const t=performance.now();if(P.filter(p=>p.click).length<S.clickDots)P.push(node(d.x,d.y,t,{born:t,lf:0,click:1,vx:0,vy:0}))});
  let rt;addEventListener('resize',()=>{FSPX=0;stack();clearTimeout(rt);rt=setTimeout(size,150)});
  size(true);requestAnimationFrame(loop);
  if(PREVIEW){parent.postMessage({type:'site-ready',file:FILE},'*');setTimeout(()=>{if(waiting){waiting=false;render()}},1500)}}

// an editor page (<html data-edit>) redraws the page with the edited text after each change
if(EDIT)window.SiteEngine.draw=(site,pages)=>{SI=cleanSite(site);PGO=pagesOf(pages);if(started){render();N=count()}};
// preview windows: new settings arrive as a message and the page is redrawn; the network keeps its dots
addEventListener('message',e=>{if(!PREVIEW||e.source!==parent||(e.origin!==location.origin&&location.protocol!=='file:'))return;
  const d=e.data||{};if(d.type!=='site-preview')return;
  S=clean(d.settings);SI=cleanSite(d.site);PGO=pagesOf(d.pages);DEMO=!!d.demo;DEMO_OPEN=!!d.demoOpen;waiting=false;look();if(DLG&&DLG.open&&!DEMO_OPEN)DLG.close();if(started){render();N=count()}});

look();
document.readyState==='loading'?addEventListener('DOMContentLoaded',start):start();
})();
