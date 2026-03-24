// ==========================================
// RIVAAJE' — Rotating Dotted Globe
// Vanilla JS + Canvas (no D3 dependency)
// Rose gold themed wireframe globe
// ==========================================

function initGlobe(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const container = canvas.parentElement;
  let W, H, radius;
  let rotationAngle = 0;
  const rotationSpeed = 0.003;
  let animId;

  // Rose gold colors
  const COLORS = {
    bg: 'transparent',
    outline: 'rgba(196, 136, 120, 0.6)',
    grid: 'rgba(196, 136, 120, 0.15)',
    dot: 'rgba(196, 136, 120, 0.5)',
    dotBright: 'rgba(212, 160, 144, 0.8)',
    glow: 'rgba(196, 136, 120, 0.08)'
  };

  function resize() {
    W = container.offsetWidth;
    H = container.offsetHeight || 350;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    radius = Math.min(W, H) * 0.38;
  }

  // Simple land approximation using lat/lng rectangles for major continents
  // This avoids needing D3 or GeoJSON loading
  const continents = [
    // Africa
    { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
    // Europe
    { latMin: 35, latMax: 71, lngMin: -10, lngMax: 40 },
    // Asia
    { latMin: 5, latMax: 55, lngMin: 40, lngMax: 145 },
    // Russia/Siberia
    { latMin: 50, latMax: 75, lngMin: 40, lngMax: 180 },
    // India
    { latMin: 8, latMax: 35, lngMin: 68, lngMax: 90 },
    // North America
    { latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 },
    // South America
    { latMin: -56, latMax: 13, lngMin: -82, lngMax: -34 },
    // Australia
    { latMin: -45, latMax: -10, lngMin: 112, lngMax: 155 },
    // Southeast Asia
    { latMin: -10, latMax: 20, lngMin: 95, lngMax: 140 },
    // Middle East
    { latMin: 12, latMax: 42, lngMin: 32, lngMax: 65 },
    // Japan/Korea
    { latMin: 30, latMax: 46, lngMin: 125, lngMax: 146 },
    // UK/Ireland
    { latMin: 50, latMax: 60, lngMin: -11, lngMax: 2 },
    // Scandinavia
    { latMin: 55, latMax: 71, lngMin: 5, lngMax: 30 },
  ];

  // Generate dot grid for land masses
  function generateLandDots() {
    const dots = [];
    const spacing = 4; // degrees
    for (let lat = -80; lat <= 80; lat += spacing) {
      for (let lng = -180; lng <= 180; lng += spacing) {
        let isLand = false;
        for (const c of continents) {
          if (lat >= c.latMin && lat <= c.latMax && lng >= c.lngMin && lng <= c.lngMax) {
            isLand = true;
            break;
          }
        }
        if (isLand) {
          dots.push({ lat: lat * Math.PI / 180, lng: lng * Math.PI / 180 });
        }
      }
    }
    return dots;
  }

  const landDots = generateLandDots();

  // Project lat/lng to 2D with rotation
  function project(lat, lng, rotation) {
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const adjustedLng = lng + rotation;
    const cosLng = Math.cos(adjustedLng);
    const sinLng = Math.sin(adjustedLng);

    // 3D coordinates
    const x = cosLat * sinLng;
    const y = -sinLat;
    const z = cosLat * cosLng;

    // Only show front-facing points
    if (z < 0) return null;

    const cx = W / 2;
    const cy = H / 2;

    return {
      x: cx + x * radius,
      y: cy + y * radius,
      z: z
    };
  }

  // Draw graticule (grid lines)
  function drawGraticule(rotation) {
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;

    // Longitude lines
    for (let lng = -180; lng <= 180; lng += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 2) {
        const p = project(lat * Math.PI / 180, lng * Math.PI / 180, rotation);
        if (p) {
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lng = -180; lng <= 180; lng += 2) {
        const p = project(lat * Math.PI / 180, lng * Math.PI / 180, rotation);
        if (p) {
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }
  }

  // Draw globe outline
  function drawOutline() {
    const cx = W / 2;
    const cy = H / 2;

    // Glow
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.3);
    glow.addColorStop(0, 'transparent');
    glow.addColorStop(0.7, COLORS.glow);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Circle outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Draw land dots
  function drawDots(rotation) {
    landDots.forEach(dot => {
      const p = project(dot.lat, dot.lng, rotation);
      if (p) {
        const brightness = 0.3 + p.z * 0.7;
        const size = 1.2 + p.z * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 136, 120, ${brightness * 0.7})`;
        ctx.fill();
      }
    });
  }

  // Highlight India with brighter dots
  function drawIndiaHighlight(rotation) {
    const indiaLat = 22 * Math.PI / 180;
    const indiaLng = 78 * Math.PI / 180;
    const p = project(indiaLat, indiaLng, rotation);
    if (p) {
      // Glow around India
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 160, 144, 0.25)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232, 180, 160, 0.9)';
      ctx.fill();
    }
  }

  function render() {
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    drawOutline();
    drawGraticule(rotationAngle);
    drawDots(rotationAngle);
    drawIndiaHighlight(rotationAngle);

    rotationAngle += rotationSpeed;
    animId = requestAnimationFrame(render);
  }

  // Mouse drag rotation
  let isDragging = false;
  let dragStartX = 0;
  let dragRotation = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragRotation = rotationAngle;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    rotationAngle = dragRotation + dx * 0.005;
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    dragStartX = e.touches[0].clientX;
    dragRotation = rotationAngle;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - dragStartX;
    rotationAngle = dragRotation + dx * 0.005;
  });

  canvas.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    render();
  });

  resize();
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initGlobe('rivaaje-globe');
});
