// ---------- Your email (change in one place) ----------
const MY_EMAIL = "ppdoodles51@gmail.com";

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme (dark / light) with memory
const root = document.documentElement, themeBtn = document.getElementById('themeBtn');
function setTheme(t){ root.dataset.theme = t; themeBtn.innerHTML = t === 'dark' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>"; try{localStorage.setItem('theme', t)}catch(e){} }
let saved = null; try{ saved = localStorage.getItem('theme') }catch(e){}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

// Mobile menu
const menu = document.getElementById('menu'), menuBtn = document.getElementById('menuBtn');
menuBtn.onclick = () => { menu.classList.toggle('open'); menuBtn.innerHTML = menu.classList.contains('open') ? "<i class='bx bx-x'></i>" : "<i class='bx bx-menu'></i>"; };
menu.querySelectorAll('a').forEach(a => a.onclick = () => { menu.classList.remove('open'); menuBtn.innerHTML = "<i class='bx bx-menu'></i>"; });

// Active link on scroll
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// Scroll reveal
const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

// Typing effect
const words = ["web applications", "Django websites", "Python projects", "responsive pages"];
const typed = document.getElementById('typed'); let wi = 0, ci = words[0].length, del = true;
(function type(){
  const w = words[wi]; typed.textContent = w.slice(0, ci);
  if (del) { ci--; if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; } }
  else { ci++; if (ci > words[wi].length) { del = true; setTimeout(type, 1600); return; } }
  setTimeout(type, del ? 45 : 85);
})();

// Project filter
document.querySelectorAll('.filters button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.filters button').forEach(x => x.classList.remove('on')); b.classList.add('on');
  document.querySelectorAll('.proj').forEach(p => p.style.display = (b.dataset.f === 'all' || p.dataset.cat.includes(b.dataset.f)) ? '' : 'none');
});

// Lightbox for achievements / certificates
const lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img');
document.querySelectorAll('.g-item img').forEach(i => i.onclick = () => { lbImg.src = i.src; lb.classList.add('open'); });
lb.onclick = e => { if (e.target !== lbImg) lb.classList.remove('open'); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

// Contact form -> opens email app
document.getElementById('contactForm').onsubmit = e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const n = v('name'), em = v('email'), s = v('subject') || 'Message from portfolio', m = v('msg');
  location.href = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(m + "\n\n— " + n + " (" + em + ")")}`;
};

// Back to top
const toTop = document.getElementById('toTop');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 600));
toTop.onclick = () => scrollTo({ top: 0 });

// Hide broken images gracefully
document.querySelectorAll('img').forEach(i => i.addEventListener('error', () => { i.style.opacity = 0; }));

// Scroll progress bar
const bar=document.getElementById('progress');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
// Count-up numbers
const cnt=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=+el.dataset.n;let n=0;const t=setInterval(()=>{n++;el.textContent=n+(el.dataset.s||'');if(n>=end)clearInterval(t)},120);cnt.unobserve(el)}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(el=>cnt.observe(el));
