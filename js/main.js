// Animation de particules dorées discrètes (touche médiévale)
(function () {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  const particles = [];
  const MAX = 80;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth * dpr;
    height = canvas.clientHeight * dpr;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  function spawn() {
    if (particles.length >= MAX) return;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.6,
      vx: -0.2 + Math.random() * 0.4,
      vy: -0.15 + Math.random() * 0.3,
      life: 0,
      hue: 45 + Math.random() * 20
    });
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);

    // léger voile vignetté
    const g = ctx.createRadialGradient(width*0.5, height*0.2, 0, width*0.5, height*0.2, Math.max(width, height)*0.8);
    g.addColorStop(0, 'rgba(255, 225, 170, 0.02)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0.06)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,width,height);

    // particules
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life += 1;
      if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
        particles.splice(i, 1);
        continue;
      }
      const alpha = Math.max(0, 0.5 - p.life/600);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${alpha})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (Math.random() < 0.6) spawn();
    requestAnimationFrame(tick);
  }

  tick();
})();


