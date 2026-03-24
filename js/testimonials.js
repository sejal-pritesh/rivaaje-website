/* ==========================================
   RIVAAJE' — Circular Testimonial Carousel
   ========================================== */

(function () {
  const testimonials = [
    {
      img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
      name: 'Priya Sharma',
      designation: 'Bride, Mumbai',
      quote: 'My wedding lehenga from Rivaaje\u2019 was absolutely breathtaking! Every guest couldn\u2019t stop complimenting the intricate design. Sejal understood exactly what I wanted and delivered perfection.'
    },
    {
      img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=400&h=400&fit=crop',
      name: 'Meera Patel',
      designation: 'Navratri Enthusiast, Ahmedabad',
      quote: 'The chaniya choli I wore for Navratri garba was stunning. The fusion of traditional embroidery with modern cuts made me feel like a queen on the dance floor!'
    },
    {
      img: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=400&h=400&fit=crop',
      name: 'Anita Desai',
      designation: 'Festival Lover, Delhi',
      quote: 'I ordered matching outfits for my family for Diwali \u2014 the quality and attention to detail was incredible. Rivaaje\u2019 truly understands festive fashion.'
    },
    {
      img: 'https://images.unsplash.com/photo-1594815219767-16e8dba9ef34?w=400&h=400&fit=crop',
      name: 'Kavya Mehta',
      designation: 'Haldi Ceremony, Surat',
      quote: 'The custom haldi outfit was everything I dreamed of. The yellow embroidered kurta set was gorgeous and so comfortable. Thank you Rivaaje\u2019 for making my ceremony special!'
    }
  ];

  let current = 0;
  let autoTimer = null;

  const track = document.querySelector('.testimonial-carousel-track');
  const quoteEl = document.querySelector('.testimonial-quote-text');
  const nameEl = document.querySelector('.testimonial-name');
  const designationEl = document.querySelector('.testimonial-designation');
  const prevBtn = document.querySelector('.testimonial-arrow-left');
  const nextBtn = document.querySelector('.testimonial-arrow-right');

  if (!track) return;

  // Build image items
  testimonials.forEach(function (t, i) {
    const item = document.createElement('div');
    item.className = 'testimonial-carousel-item';
    item.setAttribute('data-index', i);

    const img = document.createElement('img');
    img.src = t.img;
    img.alt = t.name;
    img.loading = 'lazy';

    item.appendChild(img);
    track.appendChild(item);

    item.addEventListener('click', function () {
      goTo(i);
    });
  });

  function positionItems() {
    var items = track.querySelectorAll('.testimonial-carousel-item');
    var total = testimonials.length;

    items.forEach(function (item, i) {
      var offset = i - current;

      // Wrap around
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      item.classList.remove('active', 'left', 'right', 'far-left', 'far-right', 'hidden');

      if (offset === 0) {
        item.classList.add('active');
      } else if (offset === -1) {
        item.classList.add('left');
      } else if (offset === 1) {
        item.classList.add('right');
      } else if (offset === -2) {
        item.classList.add('far-left');
      } else if (offset === 2) {
        item.classList.add('far-right');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  function animateQuote(text) {
    quoteEl.innerHTML = '';
    var words = text.split(' ');
    words.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'testimonial-word';
      span.textContent = word + ' ';
      span.style.animationDelay = (i * 0.04) + 's';
      quoteEl.appendChild(span);
    });
  }

  function updateInfo() {
    var t = testimonials[current];
    animateQuote(t.quote);
    nameEl.textContent = t.name;
    designationEl.textContent = t.designation;
  }

  function goTo(index) {
    current = ((index % testimonials.length) + testimonials.length) % testimonials.length;
    positionItems();
    updateInfo();
    resetAuto();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Touch / swipe support
  var touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
  }, { passive: true });

  // Init
  positionItems();
  updateInfo();
  resetAuto();
})();
