// ---------- Auto-updating copyright year ----------
document.querySelectorAll('.copy-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ---------- Header scroll state ----------
const header = document.getElementById('siteHeader');
const heroContent = document.getElementById('heroContent');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lastScrollY = window.scrollY;
let headerHidden = false;
const HEADER_HIDE_DEADZONE = 80; // don't hide until scrolled past the header's own height
const HEADER_HIDE_DELTA = 4; // ignore tiny/jittery scroll deltas

function onScroll(){
  const y = Math.max(window.scrollY, 0);
  header.classList.toggle('scrolled', y > 40);

  if(mobileNav.classList.contains('open')){
    headerHidden = false;
  } else if(y <= HEADER_HIDE_DEADZONE){
    headerHidden = false;
  } else {
    const delta = y - lastScrollY;
    if(delta > HEADER_HIDE_DELTA) headerHidden = true;
    else if(delta < -HEADER_HIDE_DELTA) headerHidden = false;
  }
  header.classList.toggle('header-hidden', headerHidden);
  lastScrollY = y;

  if(heroContent && !reduceMotion && y < window.innerHeight){
    heroContent.style.transform = 'translateY(' + (y*0.22) + 'px)';
    heroContent.style.opacity = Math.max(1 - y/620, 0);
  }
}
window.addEventListener('scroll', onScroll, {passive:true});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('no-scroll', open);
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle.classList.remove('open');
  document.body.classList.remove('no-scroll');
}));

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ---------- Animated counters (Home only — no-ops elsewhere) ----------
const counters = document.querySelectorAll('.stat-number');
function animateCounter(el){
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  if(reduceMotion){ el.textContent = prefix + target + suffix; return; }
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now-start)/duration, 1);
    const eased = 1 - Math.pow(1-progress, 3);
    el.textContent = prefix + Math.floor(eased*target) + suffix;
    if(progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(tick);
}
if('IntersectionObserver' in window){
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        cio.unobserve(entry.target);
      }
    });
  }, {threshold:0.5});
  counters.forEach(el => cio.observe(el));
}

// ---------- Particle field (rising, twinkling dots — hero, page-header & footer zones) ----------
function initParticleField(canvas){
  const ctx = canvas.getContext('2d');
  let particles = [];
  let t = 0;
  const minCount = parseInt(canvas.dataset.particleMin || '0', 10);
  const starRatio = parseFloat(canvas.dataset.starRatio || '0.12');
  function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function initParticles(){
    particles = [];
    const count = Math.max(minCount, Math.min(90, Math.floor((canvas.width*canvas.height)/13000)));
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.5+0.4,
        sy: Math.random()*0.26+0.05,
        sx: (Math.random()-0.5)*0.14,
        baseO: Math.random()*0.45+0.15,
        twSpeed: Math.random()*0.02+0.006,
        twPhase: Math.random()*Math.PI*2,
        star: Math.random() < starRatio
      });
    }
  }
  function drawStar(x, y, r, alpha){
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = 'rgba(240,225,235,1)';
    ctx.lineWidth = Math.max(0.5, r*0.35);
    ctx.beginPath();
    ctx.moveTo(-r*2.6, 0); ctx.lineTo(r*2.6, 0);
    ctx.moveTo(0, -r*2.6); ctx.lineTo(0, r*2.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r*0.9, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,245,250,1)';
    ctx.fill();
    ctx.restore();
  }
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    t += 1;
    particles.forEach(p => {
      p.y -= p.sy; p.x += p.sx;
      if(p.y < -6) p.y = canvas.height+6;
      if(p.x < -6) p.x = canvas.width+6;
      if(p.x > canvas.width+6) p.x = -6;
      const twinkle = 0.5 + 0.5*Math.sin(t*p.twSpeed + p.twPhase);
      const o = p.baseO + twinkle*0.4;
      if(p.star && twinkle > 0.72){
        drawStar(p.x, p.y, p.r*1.8, Math.min(1, (twinkle-0.72)/0.28));
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(232,98,143,' + o + ')';
        ctx.fill();
      }
    });
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize(); initParticles(); animate();
}
document.querySelectorAll('.particle-field').forEach(canvas => {
  if(reduceMotion){ canvas.style.display = 'none'; }
  else { initParticleField(canvas); }
});

// ---------- Shared form helper ----------
const encodeFormData = (form) => new URLSearchParams(new FormData(form)).toString();

// ---------- Contact form (Contact page only — submits to Netlify Forms) ----------
const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');
if(quoteForm){
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encodeFormData(quoteForm)
    })
    .then(() => {
      quoteForm.style.display = 'none';
      formSuccess.style.display = 'block';
    })
    .catch(() => {
      alert("Something went wrong sending your request. Please call (863) 440-4121 or email firststepcleaning1@outlook.com directly.");
    });
  });
}

// ---------- Client feedback form (Contact page only — submits to Netlify Forms) ----------
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');
if(feedbackForm){
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encodeFormData(feedbackForm)
    })
    .then(() => {
      feedbackForm.style.display = 'none';
      feedbackSuccess.style.display = 'block';
    })
    .catch(() => {
      alert("Something went wrong sending your feedback. Please call (863) 440-4121 or email firststepcleaning1@outlook.com directly.");
    });
  });
}
