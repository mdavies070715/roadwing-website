const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.site-nav');
const header=document.querySelector('.site-header');
const loader=document.querySelector('.loader');
const lightControl=document.querySelector('.light-control');
const dayNight=document.querySelector('.day-night');

function closeMenu(){
  menuButton?.classList.remove('open');
  navigation?.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded','false');
}

menuButton?.addEventListener('click',()=>{
  const open=menuButton.classList.toggle('open');
  navigation.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
  menuButton.setAttribute('aria-expanded',String(open));
});

document.querySelectorAll('.site-nav a').forEach(link=>link.addEventListener('click',closeMenu));

const observer=new IntersectionObserver((entries,o)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      o.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));

window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('done'),350));
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>25),{passive:true});

document.addEventListener('pointermove',event=>{
  document.documentElement.style.setProperty('--mx',`${event.clientX}px`);
  document.documentElement.style.setProperty('--my',`${event.clientY}px`);
});

function setLight(value){
  dayNight?.style.setProperty('--light',value);
}
setLight(lightControl?.value||35);
lightControl?.addEventListener('input',event=>setLight(event.target.value));

dayNight?.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  const rect=dayNight.getBoundingClientRect();
  const value=Math.max(0,Math.min(100,((event.clientX-rect.left)/rect.width)*100));
  lightControl.value=value;
  setLight(value);
});
