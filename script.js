const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const mobileMenu=document.querySelector('[data-mobile-menu]');
const cursorLight=document.querySelector('.cursor-light');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');document.body.style.overflow=''}));

if(matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove',e=>{cursorLight.style.opacity='1';cursorLight.style.left=e.clientX+'px';cursorLight.style.top=e.clientY+'px'},{passive:true});
}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');if(entry.target.classList.contains('story'))entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal,.story').forEach(el=>observer.observe(el));

const tilt=document.querySelector('[data-tilt]');
if(tilt&&matchMedia('(pointer:fine)').matches){
  tilt.addEventListener('mousemove',e=>{const r=tilt.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(1100px) rotateY(${x*5}deg) rotateX(${-y*4}deg)`});
  tilt.addEventListener('mouseleave',()=>tilt.style.transform='');
}

const reflective=document.querySelector('[data-reflective]');
const emblem=reflective?.querySelector('.reflective-emblem');
if(reflective&&emblem){
  const move=e=>{const r=emblem.getBoundingClientRect();const point=e.touches?e.touches[0]:e;const x=Math.max(0,Math.min(r.width,point.clientX-r.left));const y=Math.max(0,Math.min(r.height,point.clientY-r.top));emblem.style.setProperty('--mx',`${x}px`);emblem.style.setProperty('--my',`${y}px`);reflective.classList.add('active')};
  emblem.addEventListener('mousemove',move);emblem.addEventListener('touchmove',move,{passive:true});
  emblem.addEventListener('mouseleave',()=>reflective.classList.remove('active'));
}
