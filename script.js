const loader=document.querySelector('.loader');
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hidden'),450));

const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-button');
const mobileNav=document.querySelector('.mobile-nav');
const closeMenu=()=>{menuButton?.classList.remove('open');mobileNav?.classList.remove('open');document.body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false')};
menuButton?.addEventListener('click',()=>{const open=menuButton.classList.toggle('open');mobileNav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));

const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>40);
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const productImage=document.querySelector('.product-image');
const lightSwitch=document.querySelector('.light-switch');
lightSwitch?.addEventListener('click',()=>{const active=productImage.classList.toggle('reflective');lightSwitch.setAttribute('aria-pressed',String(active));lightSwitch.querySelector('b').textContent=active?'Reflection active':'Activate reflection'});

const heroImage=document.querySelector('.hero-media>img');
window.addEventListener('scroll',()=>{if(heroImage && window.scrollY<innerHeight*1.2){heroImage.style.transform=`scale(1.12) translateY(${window.scrollY*.025}px)`}},{passive:true});
