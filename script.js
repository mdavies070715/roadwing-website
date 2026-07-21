const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const mobileNav=document.querySelector('[data-mobile-nav]');
const reflective=document.querySelector('[data-reflective]');

function closeMenu(){
  menuButton?.setAttribute('aria-expanded','false');
  mobileNav?.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')!=='true';
  menuButton.setAttribute('aria-expanded',String(open));
  mobileNav.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>24),{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function setLight(x,y,radius=180){
  reflective?.style.setProperty('--x',`${x}px`);
  reflective?.style.setProperty('--y',`${y}px`);
  reflective?.querySelector('.logo-light')?.style.setProperty('clip-path',`circle(${radius}px at ${x}px ${y}px)`);
}
reflective?.addEventListener('pointermove',e=>{
  const rect=reflective.getBoundingClientRect();
  setLight(e.clientX-rect.left,e.clientY-rect.top,Math.max(150,rect.width*.17));
});
reflective?.addEventListener('pointerleave',()=>{
  const rect=reflective.getBoundingClientRect();
  setLight(rect.width/2,rect.height/2,0);
});
reflective?.addEventListener('touchmove',e=>{
  const t=e.touches[0]; if(!t)return;
  const rect=reflective.getBoundingClientRect();
  setLight(t.clientX-rect.left,t.clientY-rect.top,Math.max(130,rect.width*.2));
},{passive:true});
