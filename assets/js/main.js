// ===== Priya Maurya Portfolio · v3 =====
var MY_EMAIL = "ppdoodles51@gmail.com";
document.getElementById("year").textContent = new Date().getFullYear();

// Theme (dark default)
var root = document.documentElement, themeBtn = document.getElementById("themeBtn");
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.innerHTML = t === "light" ? "<i class='bx bx-moon'></i>" : "<i class='bx bx-sun'></i>";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
var saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");
themeBtn.onclick = function () { setTheme(root.dataset.theme === "light" ? "dark" : "light"); };

// Mobile menu
var menu = document.getElementById("menu"), menuBtn = document.getElementById("menuBtn");
function closeMenu() { menu.classList.remove("open"); menuBtn.innerHTML = "<i class='bx bx-menu-alt-right'></i>"; }
menuBtn.onclick = function () {
  menu.classList.toggle("open");
  menuBtn.innerHTML = menu.classList.contains("open") ? "<i class='bx bx-x'></i>" : "<i class='bx bx-menu-alt-right'></i>";
};
menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });

// Header + progress + back to top
var header = document.getElementById("header"), bar = document.getElementById("progress"), toTop = document.getElementById("toTop");
addEventListener("scroll", function () {
  var h = document.documentElement, y = h.scrollTop;
  header.classList.toggle("scrolled", y > 20);
  bar.style.width = (y / (h.scrollHeight - h.clientHeight) * 100) + "%";
  toTop.classList.toggle("show", y > 700);
});
toTop.onclick = function () { scrollTo({ top: 0 }); };

// Active menu link
var links = Array.prototype.slice.call(menu.querySelectorAll("a"));
var spy = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });

// Reveal on scroll
var rev = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 0.08 + "s"; rev.observe(el); });

// Typing effect
var words = ["Django platforms", "payment-ready websites", "live market data pages", "AI-powered workflows", "EdTech products"];
var typed = document.getElementById("typed"), wi = 0, ci = words[0].length, del = true;
(function type() {
  typed.textContent = words[wi].slice(0, ci);
  if (del) { ci--; if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; } }
  else { ci++; if (ci > words[wi].length) { del = true; setTimeout(type, 1700); return; } }
  setTimeout(type, del ? 40 : 80);
})();

// Count-up stats
var cnt = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (!e.isIntersecting) return;
    var el = e.target, end = +el.dataset.n, n = 0, step = Math.max(1, Math.round(end / 25));
    var t = setInterval(function () { n = Math.min(end, n + step); el.textContent = n + (el.dataset.s || ""); if (n >= end) clearInterval(t); }, 50);
    cnt.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-n]").forEach(function (el) { cnt.observe(el); });

// Spotlight on work tiles + cursor glow
document.querySelectorAll(".tile").forEach(function (t) {
  t.addEventListener("mousemove", function (e) {
    var r = t.getBoundingClientRect();
    t.style.setProperty("--mx", (e.clientX - r.left) + "px");
    t.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
});
var glow = document.getElementById("glow");
if (matchMedia("(pointer:fine)").matches) {
  addEventListener("mousemove", function (e) { glow.style.opacity = 1; glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
}

// Lightbox
var lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
document.querySelectorAll(".g-item").forEach(function (g) {
  g.addEventListener("click", function () { lbImg.src = g.querySelector("img").src; lb.classList.add("open"); });
});
lb.onclick = function (e) { if (e.target !== lbImg) lb.classList.remove("open"); };
document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });

// Contact form -> email app
document.getElementById("contactForm").onsubmit = function (e) {
  e.preventDefault();
  function v(id) { return document.getElementById(id).value.trim(); }
  var nl = String.fromCharCode(10);
  var body = v("msg") + nl + nl + "- " + v("name") + " (" + v("email") + ")";
  location.href = "mailto:" + MY_EMAIL + "?subject=" + encodeURIComponent(v("subject") || "Message from portfolio") + "&body=" + encodeURIComponent(body);
};

// Hide broken images
document.querySelectorAll("img").forEach(function (i) { i.addEventListener("error", function () { i.style.opacity = 0; }); });
