// Yicheng Chen website: shared settings and engine for every page.

// ===================== DESIGN SETTINGS: change with care =====================
const SETTINGS={
  colour1:'#4d7c6b',      // sage: start of the title gradient, links, first dots
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
  speed:7,                // px per second
  strength:.6,            // visibility of the network, 0 to 1.5
  lights:true,            // now and then a small light travels along a line
  clickDots:40,           // most clicked dots on screen at once, fading ones included
  clickDotLife:20,        // seconds before a clicked dot fades out
  quietInside:.05,        // network strength over text (0 = hidden)
  quietMargin:1,          // quiet margin around text, in gaps
  quietFade:3             // the network comes back over this many gaps
};

// ===================== ENGINE: no need to edit below =====================
(()=>{
const S=SETTINGS,$=q=>document.querySelector(q),R=document.documentElement.style;
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),mixc=(a,b,s)=>[0,1,2].map(i=>Math.round(a[i]+(b[i]-a[i])*s)),
  sm=f=>f<=0?0:f>=1?1:f*f*f*(f*(6*f-15)+10);   // one fade curve for every line, dot and quiet zone
const C1=rgb(S.colour1),C2=rgb(S.colour2),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// one motion law: UI parts follow a critically damped spring (rate W_UI, settles in DUR, no overshoot), and the CSS transitions use the
// same curve; the background runs the same law three times slower. Dots relax at rate G toward their own slowly turning drift.
const W_UI=11,W_BG=W_UI/3,DUR=.6,G=1.8,PSPD=80,BIRTH=1000,FADE=2500;
function spring(o,target,w,dt){o.v+=(w*w*(target-o.x)-2*w*o.v)*dt;o.x+=o.v*dt}
[['--a1',S.colour1],['--a2',S.colour2],['--bg',S.background],['--ink',S.ink],['--ts',S.titleSize+'px'],['--tg',S.titleGap+'px'],['--bs',S.textSize+'px'],
 ['--bw',S.textWeight],['--lh',S.lineSpacing],['--pg',S.gap*S.textSize+'px'],['--h2s',S.headingSize+'px'],['--pr',S.photoCorners+'px'],['--ds',S.dotSize+'px'],
 ['--fg',S.frameGap+'px'],['--dur',DUR+'s']].forEach(([p,v])=>R.setProperty(p,v));
let EASE='ease';
if(CSS.supports('transition-timing-function','linear(0, 1)')){const u1=W_UI*DUR,e=u=>1-(1+u)*Math.exp(-u),z=e(u1);
  EASE='linear('+Array.from({length:25},(_,i)=>(e(u1*i/24)/z).toFixed(4)).join(',')+')';R.setProperty('--ease',EASE)}

// page content: # title, ## heading, empty line = paragraph, [text](link), link-only lines = link list, ![photo](file), footer: text
function md(src){let title='',photo=null,foot='',cur=[];const B=[],flush=()=>{if(cur.length){B.push(cur);cur=[]}};
  for(const l of src.replace(/\r/g,'').split('\n').map(x=>x.trim())){
    if(!l){flush();continue}
    if(l.startsWith('# ')){flush();title=l.slice(2).trim();continue}
    if(/^footer:/i.test(l)){flush();foot=l.replace(/^footer:\s*/i,'');continue}
    const ph=l.match(/^!\[[^\]]*\]\(([^)]*)\)$/);if(ph){flush();photo=ph[1].trim();continue}
    if(l.startsWith('## ')){flush();B.push({h:l.slice(3).trim()});continue}
    cur.push(l)}
  flush();
  // outside links open in a new tab; pages of this site and email links open as usual
  const esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),only=/^\[[^\]]+\]\([^)\s]+\)$/,
    lk=x=>esc(x).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':''}>${t}</a>`);
  return{title,photo,foot:lk(foot),html:B.map(b=>b.h!==undefined?`<h2>${esc(b.h)}</h2>`:b.every(x=>only.test(x))?`<p class="links">${b.map(lk).join('')}</p>`:`<p>${lk(b.join(' '))}</p>`).join('')}}

let tm,pw,pm,cv,ctx,P=[],PU=[],TR=[],MX=-999,MY=-999,IN=0,mp=0,nextPulse=0,last=0,introT;
const FXS={x:0,v:0},FYS={x:0,v:0},MPS={x:0,v:0};

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
function navDot(a){const d=$('#navdot');d.style.left=a.offsetLeft+a.offsetWidth/2+'px'}
function menu(){const cur=document.body.dataset.page,on=document.querySelector(`nav a[data-p="${cur}"]`);
  if(on){on.classList.add('on');navDot(on);requestAnimationFrame(()=>$('#navdot').classList.add('ready'))}
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',e=>{if(a===on||e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();
    document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x===a));navDot(a);document.body.classList.add('leaving');
    setTimeout(()=>{location.href=a.href},RM?0:300)}))}
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});

// quiet text area: the line boxes of all text plus quietMargin gaps stay at quietInside; the network returns over quietFade gaps
function textRects(){TR=[];const rg=document.createRange();
  document.querySelectorAll('.name,nav a,h1,.text>p,.text>h2,footer').forEach(el=>{rg.selectNodeContents(el);for(const r of rg.getClientRects())if(r.width&&r.height)TR.push(r)})}
function calmAt(x,y){if(!TR.length)return 1;let d=1e12;
  for(const r of TR){const dx=Math.max(r.left-x,0,x-r.right),dy=Math.max(r.top-y,0,y-r.bottom),dd=dx*dx+dy*dy;if(dd<d){d=dd;if(!d)break}}
  const g=S.gap*S.textSize,s=(Math.sqrt(d)-S.quietMargin*g)/(S.quietFade*g);return S.quietInside+(1-S.quietInside)*sm(s)}

// background network
const nodeCol=x=>mixc(C1,C2,Math.min(1,Math.max(0,x/innerWidth)));
function node(x,y,o={}){const th=Math.random()*6.28;return{x,y,th,om:0,vx:S.speed*Math.cos(th),vy:S.speed*Math.sin(th),born:0,die:0,lf:1,...o}}
function initNet(){P=[];PU=[];const n=Math.min(170,Math.round(innerWidth*innerHeight/16000*S.density));for(let i=0;i<n;i++)P.push(node(Math.random()*innerWidth,Math.random()*innerHeight))}
function life(p,t){let a=1;if(p.born)a=sm((t-p.born)/BIRTH);if(p.die)a*=1-sm((t-p.die)/FADE);return a}
function hop(a){const c=P.filter(q=>q!==a&&q.lf>.5&&Math.hypot(q.x-a.x,q.y-a.y)<S.reach);return c.length?c[Math.random()*c.length|0]:null}
function step(t,dt){const w=innerWidth,h=innerHeight,sp=RM?0:S.speed,M=60;
  for(const p of P){let ax=0,ay=0;
    if(p.born&&!p.die&&t-p.born>S.clickDotLife*1000)p.die=t;
    // heading turns slowly at random; near an edge it turns back inward and a soft force keeps the dot on screen (no bounce)
    p.om=(p.om+(Math.random()-.5)*dt*3.6)*Math.exp(-dt*.6);p.th+=p.om*dt;
    const nx=(p.x<M?sm(1-p.x/M):0)-(p.x>w-M?sm(1-(w-p.x)/M):0),ny=(p.y<M?sm(1-p.y/M):0)-(p.y>h-M?sm(1-(h-p.y)/M):0);
    if(nx||ny){if(Math.cos(p.th)*nx+Math.sin(p.th)*ny<0){const df=Math.atan2(ny,nx)-p.th;p.th+=Math.atan2(Math.sin(df),Math.cos(df))*Math.min(1,dt*1.5*Math.hypot(nx,ny))}ax+=nx*30;ay+=ny*30}
    ax+=G*(sp*Math.cos(p.th)-p.vx);ay+=G*(sp*Math.sin(p.th)-p.vy);
    p.vx+=ax*dt;p.vy+=ay*dt;p.x=Math.min(w,Math.max(0,p.x+p.vx*dt));p.y=Math.min(h,Math.max(0,p.y+p.vy*dt))}
  P=P.filter(p=>!p.die||t-p.die<FADE)}
function draw(t){const k=S.strength;ctx.clearRect(0,0,innerWidth,innerHeight);if(!P.length)return;textRects();
  P.forEach(p=>{p.col=nodeCol(p.x);p.lf=life(p,t)});ctx.lineWidth=.6;
  const ln=(a,b,al)=>{al*=Math.min(a.lf,b.lf)*calmAt((a.x+b.x)/2,(a.y+b.y)/2);if(al<.006)return;
    ctx.strokeStyle=`rgba(${mixc(a.col,b.col,.5)},${Math.min(1,al)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()};
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<S.reach)ln(a,b,sm(1-d/S.reach)*.32*k)}
  if(mp>.005)P.forEach(p=>{const d=Math.hypot(p.x-MX,p.y-MY);if(d<170)ln(p,{x:MX,y:MY,col:p.col,lf:1},sm(1-d/170)*.55*k*mp)});
  P.forEach(p=>{const a=Math.min(1,.55*k*p.lf*calmAt(p.x,p.y));if(a<.006)return;ctx.fillStyle=`rgba(${p.col},${a})`;ctx.beginPath();ctx.arc(p.x,p.y,1.6*Math.sqrt(p.lf),0,7);ctx.fill()});
  if(S.lights&&!RM){
    if(t>nextPulse){nextPulse=t+1200+Math.random()*1200;const a=P[Math.random()*P.length|0],b=hop(a);if(b)PU.push({a,b,t0:t,dur:Math.max(350,Math.hypot(b.x-a.x,b.y-a.y)/PSPD*1000)})}
    PU=PU.filter(u=>t-u.t0<u.dur);
    PU.forEach(u=>{const s=Math.max(0,(t-u.t0)/u.dur),x=u.a.x+(u.b.x-u.a.x)*s,y=u.a.y+(u.b.y-u.a.y)*s,f=sm(s/.4)*sm((1-s)/.4);
      ctx.fillStyle=`rgba(${mixc(u.a.col,u.b.col,s)},${Math.min(1,f*.9*k*Math.min(u.a.lf,u.b.lf)*calmAt(x,y))})`;ctx.beginPath();ctx.arc(x,y,2.3,0,7);ctx.fill()})}}

// UI springs: the marks drift a few px with the mouse; the mouse lines fade in and out with the mouse
function ui(dt){const on=IN&&!RM;
  spring(FXS,on?(MX/innerWidth-.5)*-6:0,W_UI,dt);spring(FYS,on?(MY/innerHeight-.5)*-6:0,W_UI,dt);
  R.setProperty('--fx',FXS.x.toFixed(2)+'px');R.setProperty('--fy',FYS.x.toFixed(2)+'px');spring(MPS,IN,W_BG,dt);mp=Math.min(1,Math.max(0,MPS.x))}
function loop(t){const dt=last?Math.min(.05,(t-last)/1000):0;last=t;ui(dt);step(t,dt);draw(t);requestAnimationFrame(loop)}
function size(){const d=devicePixelRatio||1;cv.width=innerWidth*d;cv.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);initNet();marks(false);const on=$('nav a.on');if(on)navDot(on)}

function start(){const c=md($('#content').textContent);
  $('#title').textContent=c.title;$('#foot').innerHTML=c.foot;
  $('#page').innerHTML=c.photo?`<main><div class="pw"><div class="photo"></div><div class="pm"></div></div><div class="text">${c.html}</div></main>`:`<div class="text solo">${c.html}</div>`;
  tm=$('#tm');pw=$('.pw');pm=$('.pm');cv=$('#net');ctx=cv.getContext('2d');
  if(pw){$('.photo').style.backgroundImage=`url("${c.photo}")`;
    pw.addEventListener('pointerenter',()=>hover(pm,true));pw.addEventListener('pointerleave',()=>hover(pm,false))}
  $('.hd').addEventListener('pointerenter',()=>hover(tm,true));$('.hd').addEventListener('pointerleave',()=>hover(tm,false));
  addEventListener('pointermove',e=>{MX=e.clientX;MY=e.clientY;IN=1});
  document.addEventListener('mouseout',e=>{if(!e.relatedTarget)IN=0});
  // a click adds a dot that starts at rest, joins the network, lives clickDotLife seconds and fades;
  // when clickDots are on screen (fading ones included), clicks wait until one has gone
  addEventListener('pointerdown',e=>{if(e.target.closest('a'))return;const now=performance.now();
    if(P.filter(p=>p.born).length>=S.clickDots)return;P.push(node(e.clientX,e.clientY,{born:now,lf:0,vx:0,vy:0}))});
  let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,150)});
  menu();size();marks(!RM);document.fonts.ready.then(()=>{const on=$('nav a.on');if(on)navDot(on)});requestAnimationFrame(loop)}
document.readyState==='loading'?addEventListener('DOMContentLoaded',start):start();
})();
