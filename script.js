const header=document.querySelector('[data-header]');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>24);
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
const io=new IntersectionObserver((entries,observer)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const panel=document.querySelector('#reflective-panel');
const setLight=e=>{if(!panel)return;const r=panel.getBoundingClientRect();const x=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));const y=Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100));panel.style.setProperty('--mx',`${x}%`);panel.style.setProperty('--my',`${y}%`)};
panel?.addEventListener('pointermove',setLight);panel?.addEventListener('pointerenter',setLight);
if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1200px) rotateX(${y*-1.4}deg) rotateY(${x*1.8}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
