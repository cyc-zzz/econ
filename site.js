// Yicheng Chen website: shared settings and engine for every page.

// ===================== DESIGN SETTINGS: change with care =====================
const SETTINGS={
  colour1:'#4d7c6b',      // sage: start of the title gradient, links, first dots (six-digit hex, as all colours here)
  colour2:'#f06449',      // coral: end of the title gradient
  background:'#fffaf3',   // warm white
  ink:'#1f2328',          // text colour
  titleSize:58,           // px
  titleGap:14,            // space between the title and the line of dots below it, px (larger = further apart)
  textSize:16,            // px
  textWeight:350,         // 300 to 700
  lineSpacing:1.7,        // between lines of text, as a multiple of the text size
  gap:1,                  // one gap between paragraphs, headings and links, in text sizes (1 = 16 px)
  headingSize:20,         // section headings such as "Working Papers", px
  photoCorners:2,         // px, the photo's corner rounding (0 = square); the frame stays straight
  dotSize:5,              // px, dots of the title mark, photo frame, links and menu
  frameGap:12,            // px between the photo and its frame
  density:.55,            // background dots per screen area (1 = medium)
  reach:100,              // px; dots closer than this are joined by a line
  speed:10,               // cruising speed of the background dots, px per second
  pull:.5,                // gravity between dots: paths bend as dots pass each other (0 = none)
  lifespan:40,            // seconds a dot lives (60-140% of this, clicked dots too) before it fades and a new one appears
  strength:.6,            // visibility of the network, 0 to 1.5
  clickDots:60,           // most clicked dots on screen at once, fading ones included
  quietInside:.05,        // network strength over text (0 = hidden)
  quietMargin:1,          // quiet margin around text, in gaps
  quietFade:3             // the network comes back over this many gaps
};

// ===================== ENGINE: no need to edit below =====================
(()=>{
const S=SETTINGS,$=q=>document.querySelector(q),R=document.documentElement.style;
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),mixc=(a,b,s)=>[0,1,2].map(i=>Math.round(a[i]+(b[i]-a[i])*s)),
  sm=f=>f<=0?0:f>=1?1:f*f*f*(f*(6*f-15)+10);   // one fade curve for every line, dot, force and quiet zone
// when the visitor's system asks for less motion, the page skips its fade-in and draw-in; the network keeps its slow drift
const C1=rgb(S.colour1),C2=rgb(S.colour2),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// motion: page elements follow a critically damped spring (rate W_UI, settles in DUR, no overshoot) and the CSS transitions use the
// same curve
const W_UI=11,DUR=.6,BIRTH=1000,FADE=2500,GRAV=5000,RANGE=220,SOFT=900,GOV=.8,TURN=.15,EDGE=60,WALL=30;
function spring(o,target,w,dt){o.v+=(w*w*(target-o.x)-2*w*o.v)*dt;o.x+=o.v*dt}
[['--a1',S.colour1],['--a2',S.colour2],['--bg',S.background],['--ink',S.ink],['--ts',S.titleSize+'px'],['--tg',S.titleGap+'px'],['--bs',S.textSize+'px'],
 ['--bw',S.textWeight],['--lh',S.lineSpacing],['--pg',S.gap*S.textSize+'px'],['--h2s',S.headingSize+'px'],['--pr',S.photoCorners+'px'],['--ds',S.dotSize+'px'],
 ['--fg',S.frameGap+'px'],['--dur',DUR+'s']].forEach(([p,v])=>R.setProperty(p,v));
if(CSS.supports('transition-timing-function','linear(0, 1)')){const u1=W_UI*DUR,e=u=>1-(1+u)*Math.exp(-u),z=e(u1);
  R.setProperty('--ease','linear('+Array.from({length:25},(_,i)=>(e(u1*i/24)/z).toFixed(4)).join(',')+')')}

// page content: # title, ## heading, empty line = paragraph, [text](link), link-only lines = link list, ![photo](file), footer: text
function md(src){let title='',photo=null,alt='',foot='',buf=[];const B=[],flush=()=>{if(buf.length){B.push(buf);buf=[]}};
  for(const l of src.replace(/\r/g,'').split('\n').map(x=>x.trim())){
    if(!l){flush();continue}
    if(l.startsWith('# ')){flush();title=l.slice(2).trim();continue}
    if(/^footer:/i.test(l)){flush();foot=l.replace(/^footer:\s*/i,'');continue}
    const ph=l.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);if(ph){flush();alt=ph[1].trim();photo=ph[2].trim();continue}
    if(l.startsWith('## ')){flush();B.push({h:l.slice(3).trim()});continue}
    buf.push(l)}
  flush();
  // outside links open in a new tab; pages of this site and email links open as usual
  const esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),only=/^\[[^\]]+\]\([^)\s]+\)$/,
    lk=x=>esc(x).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':''}>${t}</a>`);
  return{title,photo,alt:esc(alt),foot:lk(foot),html:B.map(b=>b.h!==undefined?`<h2>${esc(b.h)}</h2>`:b.every(x=>only.test(x))?`<p class="links">${b.map(lk).join('')}</p>`:`<p>${lk(b.join(' '))}</p>`).join('')}}

let VW=1,VH=1,N=0,tm,pw,pm,cv,ctx,P=[],TR=[],MX=-999,MY=-999,IN=0,last=0,introT,cur;
const FXS={x:0,v:0},FYS={x:0,v:0};

// marks: title mark (dot, line, dot, line, dot) and photo frame (4 corner dots), drawn as SVG; each dot takes the gradient colour at its position
function svgOf(p,id,w,h,gv,intro){const[x1,y1,x2,y2]=gv,vx=x2-x1,vy=y2-y1,n2=vx*vx+vy*vy||1,r=S.dotSize/2,
  tc=(x,y)=>`rgb(${mixc(C1,C2,Math.min(1,Math.max(0,((x-x1)*vx+(y-y1)*vy)/n2)))})`;
  let s=`<svg class="mk${intro?' in':''}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${S.colour1}"/><stop offset="1" stop-color="${S.colour2}"/></linearGradient></defs>`;
  p.lines.forEach(([d,i])=>s+=`<path class="ln" d="${d}" pathLength="1" stroke="url(#g${id})" style="--i:${i}"/>`);
  p.nodes.forEach(([x,y,i])=>s+=`<circle class="nd" cx="${x}" cy="${y}" r="${r}" fill="${tc(x,y)}" style="--i:${i}"/>`);
  return s+'</svg>'}
function marks(intro){const w=96;
  tm.innerHTML=svgOf({lines:[[`M0 10H${w/2}`,0],[`M${w/2} 10H${w}`,1]],nodes:[[0,10,0],[w/2,10,1],[w,10,2]]},'t',w,20,[0,10,w,10],intro);
  if(pw){const g=S.frameGap,W=pw.offsetWidth+2*g,H=pw.offsetHeight+2*g;
    pm.innerHTML=svgOf({lines:[[`M0 0H${W}V${H}`,0],[`M0 0V${H}H${W}`,0]],nodes:[[0,0,0],[W,0,1],[0,H,1],[W,H,2]]},'p',W,H,[0,0,W,H],intro);
    Object.assign(pm.firstChild.style,{left:-g+'px',top:-g+'px'})}
  clearTimeout(introT);introT=setTimeout(()=>document.querySelectorAll('.mk.in').forEach(s=>s.classList.remove('in')),2400)}
const hover=(box,on)=>{const s=box&&box.querySelector('svg');if(s)s.classList.toggle('hov',on)};

// menu: the dot sits under the current page; a click slides it to the next page while this one fades out
function navDot(a){$('#navdot').style.left=a.offsetLeft+a.offsetWidth/2+'px'}
const markNav=a=>{document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x===a));if(a)navDot(a)};
function menu(){cur=document.querySelector(`nav a[data-p="${document.body.dataset.page}"]`);
  markNav(cur);if(cur)requestAnimationFrame(()=>$('#navdot').classList.add('ready'));
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;e.preventDefault();
    if(a===cur)return;markNav(a);document.body.classList.add('leaving');setTimeout(()=>{location.href=a.href},300)}))}
// coming back with the browser's back button shows this page again as it was
addEventListener('pageshow',e=>{if(e.persisted){document.body.classList.remove('leaving');markNav(cur)}});

// quiet text area: the line boxes of all text plus quietMargin gaps stay at quietInside; the network returns over quietFade gaps
function textRects(){TR=[];const rg=document.createRange();
  document.querySelectorAll('.name,nav a,h1,.text>p,.text>h2,footer').forEach(el=>{rg.selectNodeContents(el);for(const r of rg.getClientRects())if(r.width&&r.height)TR.push(r)})}
function calmAt(x,y){if(!TR.length)return 1;let d=1e12;
  for(const r of TR){const dx=Math.max(r.left-x,0,x-r.right),dy=Math.max(r.top-y,0,y-r.bottom),dd=dx*dx+dy*dy;if(dd<d){d=dd;if(!d)break}}
  const g=S.gap*S.textSize,s=(Math.sqrt(d)-S.quietMargin*g)/(S.quietFade*g);return S.quietInside+(1-S.quietInside)*sm(s)}

// background network. Each dot fades in, lives about lifespan seconds, fades out, and a new one fades in elsewhere.
// Dots cruise at a set speed in their own direction; each pair within RANGE pulls along a softened inverse square, which bends
// their paths as they pass. The pull fades out for dots moving together, and every heading turns slowly at random, so no pair
// ends up travelling as one; a governor restores cruising speed but leaves the direction free; a soft push near the edges turns
// them back inside.
const nodeCol=x=>mixc(C1,C2,Math.min(1,Math.max(0,x/VW)));
function node(x,y,t,o={}){const th=Math.random()*6.28;return{x,y,vx:S.speed*Math.cos(th),vy:S.speed*Math.sin(th),ax:0,ay:0,born:0,die:0,lf:1,click:0,
  end:t+S.lifespan*1000*(.6+.8*Math.random()),...o}}
function initNet(){const t=performance.now();P=[];N=Math.min(170,Math.round(VW*VH/16000*S.density));
  for(let i=0;i<N;i++){const p=node(Math.random()*VW,Math.random()*VH,t);p.end=t+(p.end-t)*Math.random();P.push(p)}}  // staggered first lives
function life(p,t){let a=1;if(p.born)a=sm((t-p.born)/BIRTH);if(p.die)a*=1-sm((t-p.die)/FADE);return a}
function step(t,dt){
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy;if(d2>RANGE*RANGE)continue;
    const q=d2+SOFT,f=GRAV*S.pull*Math.min(a.lf,b.lf)*sm(1-Math.sqrt(d2)/RANGE)*sm(Math.hypot(b.vx-a.vx,b.vy-a.vy)/S.speed)/(q*Math.sqrt(q));a.ax+=dx*f;a.ay+=dy*f;b.ax-=dx*f;b.ay-=dy*f}
  for(const p of P){let ax=p.ax,ay=p.ay;p.ax=p.ay=0;
    if(!p.die&&t>p.end)p.die=t;
    if(p.click&&t-p.born<BIRTH)continue;   // a clicked dot stays exactly where it was clicked while it fades in
    const nx=(p.x<EDGE?sm(1-p.x/EDGE):0)-(p.x>VW-EDGE?sm(1-(VW-p.x)/EDGE):0),ny=(p.y<EDGE?sm(1-p.y/EDGE):0)-(p.y>VH-EDGE?sm(1-(VH-p.y)/EDGE):0);
    if((nx||ny)&&p.vx*nx+p.vy*ny<2){ax+=nx*WALL;ay+=ny*WALL}   // the push stops once the dot is heading back inside
    const v=Math.hypot(p.vx,p.vy),r=(Math.random()-.5)*TURN*Math.sqrt(12*dt),c=Math.cos(r),s=Math.sin(r);   // slow random turn
    [p.vx,p.vy]=[p.vx*c-p.vy*s,p.vx*s+p.vy*c];
    if(v<.01){const th=Math.random()*6.28;p.vx=.1*Math.cos(th);p.vy=.1*Math.sin(th)}else{const g=GOV*(S.speed-v)/v;ax+=g*p.vx;ay+=g*p.vy}
    p.vx+=ax*dt;p.vy+=ay*dt;p.x=Math.min(VW+EDGE,Math.max(-EDGE,p.x+p.vx*dt));p.y=Math.min(VH+EDGE,Math.max(-EDGE,p.y+p.vy*dt))}
  P=P.filter(p=>!p.die||t-p.die<FADE);
  let alive=0;for(const p of P)if(!p.click&&!p.die)alive++;
  for(;alive<N;alive++)P.push(node(Math.random()*VW,Math.random()*VH,t,{born:t,lf:0}))}
function draw(t){const k=S.strength;ctx.clearRect(0,0,VW,VH);if(!P.length)return;textRects();
  P.forEach(p=>{p.col=nodeCol(p.x);p.lf=life(p,t)});ctx.lineWidth=.6;
  const ln=(a,b,al)=>{al*=Math.min(a.lf,b.lf)*calmAt((a.x+b.x)/2,(a.y+b.y)/2);if(al<.006)return;
    ctx.strokeStyle=`rgba(${mixc(a.col,b.col,.5)},${Math.min(1,al)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()};
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<S.reach)ln(a,b,sm(1-d/S.reach)*.32*k)}
  P.forEach(p=>{const a=Math.min(1,.55*k*p.lf*calmAt(p.x,p.y));if(a<.006)return;ctx.fillStyle=`rgba(${p.col},${a})`;ctx.beginPath();ctx.arc(p.x,p.y,1.6*Math.sqrt(p.lf),0,7);ctx.fill()})}

// the marks drift a few px with the mouse
function ui(dt){spring(FXS,IN?(MX/VW-.5)*-6:0,W_UI,dt);spring(FYS,IN?(MY/VH-.5)*-6:0,W_UI,dt);
  R.setProperty('--fx',FXS.x.toFixed(2)+'px');R.setProperty('--fy',FYS.x.toFixed(2)+'px')}
// while the tab is hidden the page stops; every life cycle is shifted by the pause so the dots resume where they were
function loop(t){if(last&&t-last>250){const g=t-last;P.forEach(p=>{if(p.born)p.born+=g;if(p.die)p.die+=g;p.end+=g})}
  const dt=last?Math.min(.05,(t-last)/1000):0;last=t;ui(dt);step(t,dt);draw(t);requestAnimationFrame(loop)}
// the canvas box excludes a scrollbar, so all geometry uses the box size, not the window size. A resize keeps the dots
// (phones resize the window while scrolling); the number of dots follows the new area through the life cycle.
function size(first){const d=devicePixelRatio||1;VW=cv.clientWidth;VH=cv.clientHeight;cv.width=VW*d;cv.height=VH*d;ctx.setTransform(d,0,0,d,0,0);
  if(first)initNet();else N=Math.min(170,Math.round(VW*VH/16000*S.density));marks(false);if(cur)navDot(cur)}

function start(){const c=md($('#content').textContent);
  $('#title').textContent=c.title;$('#foot').innerHTML=c.foot;
  $('#page').innerHTML=c.photo?`<main><div class="pw"><div class="photo"></div><div class="pm"></div></div><div class="text">${c.html}</div></main>`:`<div class="text solo">${c.html}</div>`;
  tm=$('#tm');pw=$('.pw');pm=$('.pm');cv=$('#net');ctx=cv.getContext('2d');
  if(pw){const ph=$('.photo');ph.style.backgroundImage=`url("${c.photo}")`;ph.setAttribute('role','img');ph.setAttribute('aria-label',c.alt);
    pw.addEventListener('pointerenter',()=>hover(pm,true));pw.addEventListener('pointerleave',()=>hover(pm,false))}
  $('.hd').addEventListener('pointerenter',()=>hover(tm,true));$('.hd').addEventListener('pointerleave',()=>hover(tm,false));
  addEventListener('pointermove',e=>{MX=e.clientX;MY=e.clientY;IN=1});
  document.addEventListener('mouseout',e=>{if(!e.relatedTarget)IN=0});
  // a click adds a dot that joins the network and lives by the same rule as the others;
  // when clickDots are on screen (fading ones included), clicks are ignored until one has gone. A dot is added when the pointer
  // is released where it was pressed, so scrolling or pinching on a phone adds nothing.
  let down=null;
  addEventListener('pointerdown',e=>{down=e.button||e.target.closest('a')?null:{x:e.clientX,y:e.clientY,id:e.pointerId}});
  addEventListener('pointercancel',()=>{down=null});
  addEventListener('pointerup',e=>{const d=down;down=null;if(!d||e.pointerId!==d.id||Math.hypot(e.clientX-d.x,e.clientY-d.y)>8)return;
    const t=performance.now();if(P.filter(p=>p.click).length<S.clickDots)P.push(node(d.x,d.y,t,{born:t,lf:0,click:1,vx:0,vy:0}))});
  let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,150)});
  menu();size(true);marks(!RM);document.fonts.ready.then(()=>{if(cur)navDot(cur)});requestAnimationFrame(loop)}
document.readyState==='loading'?addEventListener('DOMContentLoaded',start):start();
})();
