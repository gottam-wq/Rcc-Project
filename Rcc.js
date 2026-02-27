/* NAV */
window.addEventListener('scroll',()=>document.querySelector('nav').classList.toggle('scrolled',scrollY>60));
document.getElementById('hamburger').addEventListener('click',()=>document.getElementById('nav-links').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav-links').classList.remove('open')));

/* ──── HERO SLIDER ──── */
let hIdx=0, hAuto;
const hSlides=document.querySelectorAll('.hero-slide');
const hTrack=document.getElementById('heroSlides');
const hDots=document.querySelectorAll('.hero-dot');
const N=hSlides.length;

function goHero(n){
  hSlides[hIdx].classList.remove('active');
  hIdx=(n+N)%N;
  hSlides[hIdx].classList.add('active');
  hTrack.style.transform=`translateX(-${hIdx*100}%)`;
  hDots.forEach((d,i)=>d.classList.toggle('active',i===hIdx));
}
function startH(){hAuto=setInterval(()=>goHero(hIdx+1),5800)}
function stopH(){clearInterval(hAuto)}
document.getElementById('heroNext').onclick=()=>{stopH();goHero(hIdx+1);startH()};
document.getElementById('heroPrev').onclick=()=>{stopH();goHero(hIdx-1);startH()};
hDots.forEach(d=>d.addEventListener('click',()=>{stopH();goHero(+d.dataset.i);startH()}));
let htx=0;
document.querySelector('.hero').addEventListener('touchstart',e=>htx=e.touches[0].clientX,{passive:true});
document.querySelector('.hero').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-htx;if(Math.abs(dx)>40){stopH();goHero(hIdx+(dx<0?1:-1));startH()}});
startH();

/* ──── GALLERY ──── */
let gIdx=0;
const gTrack=document.getElementById('galleryTrack');
const gThumbs=document.querySelectorAll('.gallery-thumb');
const gPrBar=document.getElementById('galleryProgress');
const gCnt=document.getElementById('galleryCount');

function vis(){return window.innerWidth<=700?1:window.innerWidth<=960?2:3}
function gSlides(){return[...document.querySelectorAll('.gallery-slide')].filter(s=>s.style.display!=='none')}

function updG(){
  const sl=gSlides();const tot=sl.length;const v=vis();
  const mx=Math.max(0,tot-v);gIdx=Math.min(gIdx,mx);
  const sw=(sl[0]?.offsetWidth||280)+15;
  gTrack.style.transform=`translateX(-${gIdx*sw}px)`;
  gThumbs.forEach((t,i)=>t.classList.toggle('active',i===gIdx));
  gPrBar.style.width=(tot>v?(gIdx/(tot-v))*100:100)+'%';
  gCnt.textContent=String(gIdx+1).padStart(2,'0')+' / '+String(tot).padStart(2,'0');
}

document.getElementById('galleryNext').onclick=()=>{const sl=gSlides();gIdx=Math.min(gIdx+1,Math.max(0,sl.length-vis()));updG()};
document.getElementById('galleryPrev').onclick=()=>{gIdx=Math.max(gIdx-1,0);updG()};
gThumbs.forEach((t,i)=>t.onclick=()=>{gIdx=i;updG()});
window.addEventListener('resize',updG);
setTimeout(updG,80);

document.querySelectorAll('.gallery-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.gallery-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  const cat=tab.dataset.cat;
  document.querySelectorAll('.gallery-slide').forEach(s=>s.style.display=(cat==='all'||s.dataset.cat===cat)?'':'none');
  gIdx=0;setTimeout(updG,50);
}));

let gtx=0;
gTrack.addEventListener('touchstart',e=>gtx=e.touches[0].clientX,{passive:true});
gTrack.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-gtx;
  if(Math.abs(dx)>40){const sl=gSlides();const mx=Math.max(0,sl.length-vis());gIdx=dx<0?Math.min(gIdx+1,mx):Math.max(gIdx-1,0);updG()}
});

/* Lightbox */
let lbIdx=0;
function visSlides(){return[...document.querySelectorAll('.gallery-slide')].filter(s=>s.style.display!=='none')}
function openLb(i){
  const sl=visSlides();lbIdx=i;
  const img=sl[i]?.querySelector('img');
  const ov=sl[i]?.querySelector('.gallery-overlay strong');
  if(img){document.getElementById('lbImg').src=img.src;document.getElementById('lbCaption').textContent=ov?.textContent||'';document.getElementById('lightbox').classList.add('open')}
}
document.querySelectorAll('.gallery-slide').forEach((s)=>s.addEventListener('click',()=>{
  const vi=visSlides().indexOf(s);if(vi>=0)openLb(vi);
}));
document.getElementById('lbClose').onclick=()=>document.getElementById('lightbox').classList.remove('open');
document.getElementById('lightbox').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open')});
document.getElementById('lbPrev').onclick=e=>{e.stopPropagation();const sl=visSlides();lbIdx=(lbIdx-1+sl.length)%sl.length;const img=sl[lbIdx]?.querySelector('img');const ov=sl[lbIdx]?.querySelector('.gallery-overlay strong');if(img){document.getElementById('lbImg').src=img.src;document.getElementById('lbCaption').textContent=ov?.textContent||''}};
document.getElementById('lbNext').onclick=e=>{e.stopPropagation();const sl=visSlides();lbIdx=(lbIdx+1)%sl.length;const img=sl[lbIdx]?.querySelector('img');const ov=sl[lbIdx]?.querySelector('.gallery-overlay strong');if(img){document.getElementById('lbImg').src=img.src;document.getElementById('lbCaption').textContent=ov?.textContent||''}};

/* ──── TESTIMONIALS ──── */
let tIdx=0, tAuto;
const tTrack=document.getElementById('testiTrack');
const tCards=document.querySelectorAll('.testi-card');
const tDots=document.querySelectorAll('.testi-dot');
const tTot=tCards.length;
function goT(n){
  tIdx=(n+tTot)%tTot;
  const w=tCards[0]?.offsetWidth||300;
  const mx=Math.max(0,tTot-3);
  tTrack.style.transform=`translateX(-${Math.min(tIdx,mx)*(w+20)}px)`;
  tDots.forEach((d,i)=>d.classList.toggle('active',i===tIdx%tDots.length));
}
tDots.forEach((d,i)=>d.onclick=()=>goT(i));
tAuto=setInterval(()=>goT(tIdx+1),4600);
tTrack.addEventListener('mouseenter',()=>clearInterval(tAuto));
tTrack.addEventListener('mouseleave',()=>{tAuto=setInterval(()=>goT(tIdx+1),4600)});

/* ──── FAQ ──── */
document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
  const it=btn.parentElement;const op=it.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!op)it.classList.add('open');
}));

/* ──── COUNTER ──── */
let counted=false;
function animCount(el){
  const tgt=+el.dataset.target;const dur=1800;const step=16;
  let cur=0;const inc=tgt/(dur/step);
  const t=setInterval(()=>{cur+=inc;if(cur>=tgt){cur=tgt;clearInterval(t)}el.textContent=Math.floor(cur)+'+'},step);
}
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting&&!counted){counted=true;document.querySelectorAll('.counter-num').forEach(animCount)}});
},{threshold:.4}).observe(document.querySelector('.counter-band'));

/* ──── SCROLL REVEAL ──── */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add('visible');
    const sib=[...e.target.parentElement.children].filter(c=>c.className===e.target.className);
    if(sib.length>1)e.target.style.transitionDelay=(sib.indexOf(e.target)*.08)+'s';
    ro.unobserve(e.target);
  });
},{threshold:.08});
document.querySelectorAll('.reveal,.service-card,.why-item,.owner-card,.counter-item').forEach(el=>ro.observe(el));

/* ──── WHATSAPP FORM ──── */
function sendWA(){
  const n=document.getElementById('f-name').value||'Not specified';
  const t=document.getElementById('f-type').value||'Not specified';
  const a=document.getElementById('f-area').value||'Not specified';
  const l=document.getElementById('f-loc').value||'Not specified';
  const msg=`Namaste Vinod ji! 🙏\n\nMain quote lena chahta hoon:\n\n*Name:* ${n}\n*Project Type:* ${t}\n*Area / Size:* ${a}\n*Location:* ${l}\n\nPlease contact me. Thank you!`;
  window.open('https://wa.me/919468971373?text='+encodeURIComponent(msg),'_blank');
}