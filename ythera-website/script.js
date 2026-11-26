/* Ythera Beauty Atelier — site script
   To change a price or add a service, edit GROUPS below. Everything else updates itself. */

const WA_NUMBER = '254740131544';

const GROUPS = [
  { cat:'Nails', slug:'nails', title:'Nail Services', short:'Nails', img:'img/nails2.jpg', card:'img/nails.jpg',
    blurb:'Manicure, gel, tips and gum gel.',
    sub:'Manicure, gel, tips, builder gel, gum gel, pedicure and sculpting.',
    note:'Male Manicure & Pedicure Also Available ♡',
    items:[['n1','Manicure',500],['n2','Gel',500],['n3','Tips & Gel',1200],['n4','Builder Gel on Natural Nails',1200],['n5','Tips & Builder Gel',1500],
           ['n6','Gum Gel on Natural Nails',1500],['n7','Tips & Gum Gel',2000],['n8','Pedicure',700],['n9','Sculpting',2500]] },
  { cat:'Makeup', slug:'makeup', title:'Makeup Services', short:'Make-up', img:'img/makeup2.jpg', card:'img/makeup.jpg',
    blurb:'Natural glam to full glam.',
    sub:'Natural glam, soft glam, detailed makeup and full glam.',
    items:[['m1','Natural Glam',1000],['m2','Soft Glam',1500],['m3','Detailed Makeup',2000],['m4','Full Glam',2500]] },
  { cat:'Bridal', slug:'bridal', title:'Bridal Makeup', short:'Bridal', img:'img/glam.jpg', card:'img/glam.jpg',
    blurb:'Bride, visitors and bridal team.',
    sub:'Bride, visitors and bridal team packages. Transport is catered for by the client.',
    note:'Transport to and fro is catered for by the client.', plain:true,
    items:[['br1','Bride',3500],['br2','Visitors',2000,'per person'],['br3','Bridal Team (Below 5)',2500,'per person'],['br4','Bridal Team (5 and Above)',2000,'per person']] },
  { cat:'Lashes', slug:'lashes', title:'Lash Services', short:'Lashes', img:'img/lashes2.jpg', card:'img/lashes.jpg',
    blurb:'Strip and cluster lashes.',
    sub:'Strip and cluster lashes.',
    items:[['l1','Strip Lashes',500],['l2','Cluster Lashes',1000]] },
  { cat:'Eyebrows', slug:'eyebrows', title:'Eyebrow Services', short:'Brows', img:'img/brows.jpg', card:'img/brows.jpg',
    blurb:'Shaping, tinting and threading.',
    sub:'Shaping, outlining, tinting and threading.',
    items:[['e1','Eyebrow Shaping',100],['e2','Eyebrow Shaping & Outlining',300],['e3','Eyebrow Shaping & Tinting',400],['e4','Eyebrow Threading',200]] },
  { cat:'Piercing', slug:'piercing', title:'Piercing Services', short:'Piercing', img:'img/piercing.jpg', card:'img/piercing.jpg',
    blurb:'Ear and nose, earring included.',
    sub:'Ear and nose piercing, earring included.',
    items:[['p1','Ear Piercing',450,'earring included'],['p2','Nose Piercing',650,'earring included']] }
];

const REELS = [
  ['lash-offer','Lash installation','Now on offer',true],
  ['nails','Gum gel tips','Nail art at the atelier'],
  ['makeup','Full glam make-up','Bold eyes, flawless base'],
  ['brows','Eyebrow threading','Before and after'],
  ['piercing','Ear piercing','Gentle and sterile'],
  ['natural-glam','Natural glam','Soft, skin-first look'],
  ['lash-install','Lash extensions','Precision, lash by lash'],
  ['lashes','Lash set close-up','Fluffy, full finish'],
  ['studio-tour','Tour the spa','Our pink studio in Kihunguro'],
  ['ceo','Meet the founder','A dream come true']
];

const FAQ = [
  ['Bridal','Do you do bridal make-up away from the salon?','Yes. Bride KSh 3,500, visitors KSh 2,000 per person, bridal team KSh 2,500 per person (below 5) or KSh 2,000 per person (5 and above). Transport to and from the venue is catered for by the client.'],
  ['Piercing','Is the earring included with piercing?','Yes. Ear piercing is KSh 450 and nose piercing KSh 650, both with the earring included.'],
  ['Visiting','Do you take walk-ins?','Yes, walk in for make-up and nails. You can also book your appointment on WhatsApp to secure a time.'],
  ['Visiting','Do you serve men?','Yes. Male manicure and pedicure are available, from KSh 500.'],
  ['Aftercare','How do I care for a new piercing?',"Clean twice daily with saline, don't twist the stud, and avoid swimming for two weeks. Message us if anything feels off."],
  ['Aftercare','How do I care for my nails after gel or gum gel?','Wear gloves for cleaning, avoid using your nails as tools, and moisturise your cuticles daily. Come back for a refill or removal rather than peeling them off.'],
  ['Aftercare','How do I make my lashes last longer?',"Keep them dry for the first 24 hours, avoid oil-based cleansers and don't rub your eyes. Brush them gently each morning."]
];

const PERKS = [
  ['<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>','Quality service','Professional touch and unmatched elegance, every visit.'],
  ['<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>','Easy to find','Nyingi House, Shop G5B, opposite Mark Hotel, Kihunguro.'],
  ['<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>','Male manicure & pedicure','Grooming for gentlemen too, from KSh 500.'],
  ['<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>','Aftercare on WhatsApp','Tips for your lashes, nails and piercings whenever you need them.']
];

/* ---------- helpers ---------- */
const $ = id => document.getElementById(id);
const fmt = n => 'KSh ' + n.toLocaleString('en-KE');
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ICON = {
  plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>',
  tick:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  x:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  heart:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  muted:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>',
  sound:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  play:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
};

GROUPS.forEach(g => g.items = g.items.map(([id,name,price,unit]) => ({ id, name, price, unit, group:g.title, img:g.img })));
const ITEMS = Object.fromEntries(GROUPS.flatMap(g => g.items).map(i => [i.id, i]));
const BY_SLUG = Object.fromEntries(GROUPS.map(g => [g.slug, g]));
const minPrice = g => Math.min(...g.items.map(i => i.price));

/* ---------- static parts built from data ---------- */
$('cats').innerHTML = GROUPS.map(g => `
  <a class="cat" href="#${g.slug}">
    <div class="ph"><img src="${g.card}" alt="" loading="lazy"></div>
    <div class="body"><div><h3>${g.short === 'Brows' ? 'Eyebrows' : g.short}</h3><p>${g.blurb}</p></div><div class="from">FROM<b>${fmt(minPrice(g))}</b></div></div>
  </a>`).join('');

$('ddMenu').innerHTML = GROUPS.map(g => `<a href="#${g.slug}">${g.title}<small>from ${fmt(minPrice(g))}</small></a>`).join('');
$('mlinks').innerHTML = '<a href="#home">Home</a><a href="#services">Services &amp; prices</a>' +
  GROUPS.map(g => `<a class="sub" href="#${g.slug}">${g.title}</a>`).join('') +
  '<a href="#videos">Videos</a><a href="#studio">The studio</a><a href="#faq">Care &amp; FAQ</a><a href="#contact">Contact</a><a href="https://www.tiktok.com/@ytherabeautyatelier" target="_blank" rel="noopener">TikTok</a>';
$('fServices').innerHTML = GROUPS.map(g => `<li><a href="#${g.slug}">${g.title}</a></li>`).join('');

const perksHTML = PERKS.map(([p,h,t]) => `<div class="perk"><div class="ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${p}</svg></div><h4>${h}</h4><p>${t}</p></div>`).join('');
$('perksHome').innerHTML = perksHTML;
$('perksStudio').innerHTML = perksHTML;

$('faqList').innerHTML = FAQ.map(([k,q,a]) => `<details><summary><span><small>${k}</small>${q}</span><i>${ICON.plus}</i></summary><p>${a}</p></details>`).join('');
$('yr').textContent = new Date().getFullYear();

/* ---------- rate card ---------- */
let cat = 'All';
let cart = [];
try { const s = JSON.parse(localStorage.getItem('ythera-booking') || '[]'); if (Array.isArray(s)) cart = s.filter(id => ITEMS[id]); } catch (e) {}
const saveCart = () => { try { localStorage.setItem('ythera-booking', JSON.stringify(cart)); } catch (e) {} };

function renderChips() {
  $('chips').innerHTML = GROUPS.map(g =>
    `<a class="chip ${g.cat === cat ? 'on' : ''}" href="#${g.slug}">${g.short}</a>`
  ).join('');
}

function renderGrid() {
  const q = $('q').value.trim().toLowerCase();
  const sort = $('sort').value;
  const cards = GROUPS.filter(g => cat === 'All' || g.cat === cat).map(g => {
    let items = g.items.filter(i => !q || (i.name + ' ' + g.title).toLowerCase().includes(q));
    if (sort === 'lo') items = [...items].sort((a,b) => a.price - b.price);
    if (sort === 'hi') items = [...items].sort((a,b) => b.price - a.price);
    if (!items.length) return '';
    return `<article class="mcard">
      <div class="pill"><h3>${g.title}</h3>${ICON.heart}</div>
      <img class="ph" src="${g.img}" alt="" loading="lazy">
      ${items.map(i => {
        const on = cart.includes(i.id);
        return `<div class="mrow"><span class="nm">${esc(i.name)}${i.unit ? `<small>${i.unit}</small>` : ''}</span><span class="dots"></span><span class="pr">${fmt(i.price)}</span><button class="addb ${on ? 'on' : ''}" type="button" data-add="${i.id}" aria-pressed="${on}" aria-label="${on ? 'Remove' : 'Add'} ${esc(i.name)}">${on ? ICON.tick : ICON.plus}</button></div>`;
      }).join('')}
      ${g.note ? `<div class="mnote ${g.plain ? 'plain' : ''}">${g.note}</div>` : ''}
    </article>`;
  }).filter(Boolean);
  $('grid').classList.toggle('single', cards.length === 1);
  $('grid').innerHTML = cards.join('') || '<div class="empty">No services match your search. Try “gel”, “lashes” or “glam”.</div>';
}

function setCat(c) {
  cat = c;
  const g = GROUPS.find(x => x.cat === c);
  $('shopTitle').textContent = g ? g.title : 'Our services & rate card';
  $('shopSub').textContent = g ? g.sub : 'Everything we offer at the atelier.';
  renderChips();
  renderGrid();
}
$('q').addEventListener('input', renderGrid);
$('sort').addEventListener('change', renderGrid);

/* ---------- booking ---------- */
function toggleItem(id) {
  const k = cart.indexOf(id);
  if (k > -1) { cart.splice(k, 1); toast('Removed from booking'); }
  else { cart.push(id); toast(ITEMS[id].name + ' added to booking'); bump(); }
  sync();
}
function bump() { const n = $('count'); n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); }

function sync() {
  saveCart();
  renderGrid();
  const rows = cart.map(id => ITEMS[id]);
  const total = rows.reduce((a, r) => a + r.price, 0);
  $('count').textContent = rows.length;
  $('items').innerHTML = rows.length
    ? rows.map(r => `<div class="li"><img src="${r.img}" alt=""><div><b>${esc(r.name)}</b><small>${r.group}${r.unit === 'per person' ? ' · per person' : ''}</small></div><span class="pr">${fmt(r.price)}</span><button class="rm" type="button" data-rm="${r.id}" aria-label="Remove ${esc(r.name)}">${ICON.x}</button></div>`).join('')
    : `<div class="dempty"><span class="script">Nothing yet</span>Tap + next to a service on the rate card to start your booking.<br><a class="btn btn-ghost" href="#services">Browse services</a></div>`;
  $('tot').textContent = fmt(total);
  $('mbarN').textContent = rows.length + (rows.length === 1 ? ' service selected' : ' services selected');
  $('mbarT').textContent = fmt(total);
  $('mbar').classList.toggle('show', rows.length > 0);
  updateWhatsApp(rows, total);
}

function updateWhatsApp(rows, total) {
  rows = rows || cart.map(id => ITEMS[id]);
  total = total ?? rows.reduce((a, r) => a + r.price, 0);
  const name = $('nm').value.trim(), when = $('dt').value.trim();
  let msg = "Hello Ythera Beauty Atelier, I'd like to book:\n" +
    (rows.length ? rows.map(r => `• ${r.name} – ${fmt(r.price)}${r.unit === 'per person' ? ' per person' : ''}`).join('\n') : '• (service to discuss)') +
    `\nEstimated total: ${fmt(total)}`;
  if (name) msg += `\nName: ${name}`;
  if (when) msg += `\nPreferred time: ${when}`;
  $('waBtn').href = `https://wa.me/${WA_NUMBER}?text=` + encodeURIComponent(msg);
}
['nm','dt'].forEach(id => $(id).addEventListener('input', () => updateWhatsApp()));

function openCart(open) {
  document.body.classList.toggle('cart-open', open);
  $('drawer').setAttribute('aria-hidden', String(!open));
  if (open) setTimeout(() => $('closeCart').focus(), 60);
}
$('openCart').onclick = () => openCart(true);
$('mbarBtn').onclick = () => openCart(true);
$('closeCart').onclick = () => openCart(false);
$('scrim').onclick = () => openCart(false);

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) { toggleItem(add.dataset.add); return; }
  const rm = e.target.closest('[data-rm]');
  if (rm) { cart = cart.filter(x => x !== rm.dataset.rm); sync(); return; }
  if (e.target.closest('.drawer a[href^="#"]')) openCart(false);
});

/* ---------- printed rate card lightbox ---------- */
$('openCardImg').onclick = () => $('lightbox').classList.add('on');
$('closeLb').onclick = () => $('lightbox').classList.remove('on');
$('lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') $('lightbox').classList.remove('on'); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { openCart(false); $('lightbox').classList.remove('on'); closeNav(); }
});

/* ---------- mobile menu ---------- */
function closeNav() { document.body.classList.remove('nav-open'); $('menuBtn').setAttribute('aria-expanded', 'false'); }
$('menuBtn').onclick = () => { const o = document.body.classList.toggle('nav-open'); $('menuBtn').setAttribute('aria-expanded', String(o)); };
$('mlinks').addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });

/* ---------- videos ---------- */
$('reels').innerHTML = REELS.map(([f, t, s, offer]) => `
  <div class="reel">
    <div class="v" data-reel role="button" tabindex="0" aria-label="Play or pause: ${t}">
      <video src="vid/${f}.mp4" poster="vid/${f}.jpg" muted loop playsinline preload="none"></video>
      ${offer ? '<span class="badge">On offer</span>' : ''}
      <div class="play"><i>${ICON.play}</i></div>
      <button class="snd" type="button" aria-label="Turn sound on">${ICON.muted}</button>
    </div>
    <h4>${t}</h4><p>${s}</p>
  </div>`).join('');

const vids = [...document.querySelectorAll('.reel video')];
vids.forEach(v => {
  v.addEventListener('play', () => v.parentElement.classList.add('playing'));
  v.addEventListener('pause', () => v.parentElement.classList.remove('playing'));
});
const reelObserver = new IntersectionObserver(entries => entries.forEach(e => {
  const v = e.target;
  if (e.isIntersecting && !reduceMotion && !v.dataset.user && v.closest('.view.on')) v.play().catch(() => {});
  else if (!e.isIntersecting) v.pause();
}), { threshold: .6 });
vids.forEach(v => reelObserver.observe(v));

function tapReel(box) {
  const v = box.querySelector('video');
  v.dataset.user = '1';
  if (v.paused) v.play().catch(() => {}); else v.pause();
}
$('reels').addEventListener('click', e => {
  const s = e.target.closest('.snd');
  if (s) {
    const v = s.parentElement.querySelector('video'), turnOn = v.muted;
    vids.forEach(x => x.muted = true);
    document.querySelectorAll('.snd').forEach(b => { b.innerHTML = ICON.muted; b.setAttribute('aria-label', 'Turn sound on'); });
    if (turnOn) { v.muted = false; s.innerHTML = ICON.sound; s.setAttribute('aria-label', 'Mute'); v.play().catch(() => {}); }
    return;
  }
  const box = e.target.closest('[data-reel]');
  if (box) tapReel(box);
});
$('reels').addEventListener('keydown', e => {
  const box = e.target.closest('[data-reel]');
  if (box && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); tapReel(box); }
});

/* ---------- copy number ---------- */
$('copyBtn').onclick = () => {
  const done = () => toast('Number copied: 0740 131 544');
  if (navigator.clipboard) navigator.clipboard.writeText('0740131544').then(done, () => toast('Our number: 0740 131 544'));
  else toast('Our number: 0740 131 544');
};

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- pages (hash routing) ---------- */
const VIEWS = ['home','services','videos','studio','faq','contact'];
const PAGE_TITLES = { services:'Services & prices', videos:'Videos', studio:'The studio', faq:'Care & FAQ', contact:'Contact' };

function route() {
  let v = (location.hash || '#home').slice(1);
  if (!VIEWS.includes(v) && !BY_SLUG[v]) v = 'home';
  const view = BY_SLUG[v] ? 'services' : v;
  if (view === 'services') setCat(BY_SLUG[v] ? BY_SLUG[v].cat : 'All');

  document.querySelectorAll('.view').forEach(x => x.classList.toggle('on', x.dataset.view === view));
  document.querySelectorAll('.links a, .mlinks a, .ddm a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('on', href === '#' + v || (view === 'services' && a.dataset.parent === 'services'));
  });
  document.querySelectorAll('.view:not(.on) video').forEach(x => x.pause());
  if (view === 'videos') setTimeout(() => vids.forEach(x => { reelObserver.unobserve(x); reelObserver.observe(x); }), 50);

  closeNav();
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  window.scrollTo({ top: 0, behavior: 'instant' });

  const sub = BY_SLUG[v] ? BY_SLUG[v].title : PAGE_TITLES[view];
  document.title = (sub ? sub + ' · ' : '') + 'Ythera Beauty Atelier';
}
window.addEventListener('hashchange', route);

sync();
route();
