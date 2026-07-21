const header=document.querySelector('[data-header]');
const menu=document.querySelector('.menu-button');
const nav=document.querySelector('.main-nav');
const setHeader=()=>header?.classList.toggle('scrolled',scrollY>24);
setHeader();addEventListener('scroll',setHeader,{passive:true});
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
const io=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const night=document.querySelector('#night-panel');
const moveLight=e=>{if(!night)return;const r=night.getBoundingClientRect();const x=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));const y=Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100));night.style.setProperty('--mx',`${x}%`);night.style.setProperty('--my',`${y}%`);night.classList.add('is-active')};
night?.addEventListener('pointermove',moveLight);
night?.addEventListener('pointerenter',moveLight);
night?.addEventListener('pointerleave',()=>night.classList.remove('is-active'));
if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1100px) rotateX(${y*-2.2}deg) rotateY(${x*2.8}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
