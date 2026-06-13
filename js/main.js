/* ── Rain ── */
(function () {
  const canvas = document.getElementById('rain');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Two rain layers: distant (small, fast, dim) and close (longer, slower, brighter)
  const MINT = '199,255,232';
  const CYAN = '34,211,238';

  function makeDrop(layer) {
    const close  = layer === 'close';
    return {
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      len:     close ? (Math.random() * 28 + 17) : (Math.random() * 12 + 6),
      speed:   close ? (Math.random() * 3.5 + 3.5) : (Math.random() * 5.5 + 6.5),
      width:   close ? (Math.random() * 0.95 + 0.5) : (Math.random() * 0.5 + 0.25),
      opacity: close ? (Math.random() * 0.12 + 0.07) : (Math.random() * 0.06 + 0.025),
      neon:    Math.random() < (close ? 0.18 : 0.06),
      color:   Math.random() < 0.65 ? MINT : CYAN,
      layer,
    };
  }

  const drops = [
    ...Array.from({ length: 100 }, () => makeDrop('distant')),
    ...Array.from({ length: 65  }, () => makeDrop('close')),
  ];

  // Wind angle — slight diagonal
  const ANGLE_X = 0.18;

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drops.forEach(d => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.len * ANGLE_X, d.y + d.len);
      ctx.strokeStyle = `rgba(${d.color},${d.opacity})`;
      ctx.lineWidth   = d.width;
      ctx.lineCap     = 'round';

      if (d.neon) {
        ctx.shadowColor = `rgba(${d.color}, 1)`;
        ctx.shadowBlur  = 6;
      }

      ctx.stroke();
      ctx.restore();

      d.y += d.speed;
      d.x += d.speed * ANGLE_X;

      if (d.y > canvas.height + d.len) {
        d.y = -d.len - Math.random() * 40;
        d.x = Math.random() * (canvas.width + 60) - 30;
      }
    });

    requestAnimationFrame(tick);
  }

  tick();
})();

/* ── Lightbox ── */
(function () {
  const items = Array.from(document.querySelectorAll('.portfolio-item img'));

  // Build DOM
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">✕</button>
    <button class="lb-prev" aria-label="Previous image">‹</button>
    <div class="lb-img-wrap">
      <img class="lb-img" alt="Portfolio image">
    </div>
    <button class="lb-next" aria-label="Next image">›</button>
    <div class="lb-counter"></div>
  `;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('.lb-img');
  const lbCounter = lb.querySelector('.lb-counter');
  let current = 0;

  function show(index) {
    current = ((index % items.length) + items.length) % items.length;
    lbImg.classList.remove('zoomed');
    lbImg.src = items[current].src;
    lbCounter.textContent = `${current + 1} / ${items.length}`;
  }

  function open(index) {
    show(index);
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.classList.remove('zoomed');
  }

  // Open on portfolio item click
  items.forEach((img, i) => {
    img.closest('.portfolio-item').addEventListener('click', () => open(i));
  });

  // Controls
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));

  // Click image to zoom / unzoom
  lbImg.addEventListener('click', (e) => {
    e.stopPropagation();
    lbImg.classList.toggle('zoomed');
  });

  // Click backdrop to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });
})();

/* ── Select placeholder colour ── */
document.getElementById('package').addEventListener('change', function () {
  this.classList.remove('unselected');
});

/* ── Tab switching ── */
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(el => {
    el.classList.remove('active');
    el.removeAttribute('aria-current');
  });
  document.getElementById('tab-' + tab).classList.add('active');
  btn.classList.add('active');
  btn.setAttribute('aria-current', 'true');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const span = btn.querySelector('span');

  btn.disabled = true;
  span.textContent = 'Sending…';

  emailjs.sendForm('service_urrd5or', 'template_qkbxofq', e.target)
    .then(() => {
      span.textContent = 'Sent ✓';
      e.target.reset();
      setTimeout(() => {
        span.textContent = 'Send it →';
        btn.disabled = false;
      }, 3000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      span.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    });
}
