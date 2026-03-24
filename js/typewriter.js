/* ==========================================
   RIVAAJE' — Typewriter Effect
   ========================================== */

(function () {
  const phrases = [
    'your wedding day',
    'festive celebrations',
    'the woman who defines elegance',
    'timeless traditions',
    'Navratri nights'
  ];

  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER_TYPE = 1500;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing
      charIndex++;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause then start deleting
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // Deleting
      charIndex--;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, TYPE_SPEED);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Start after a brief delay so the page settles
  setTimeout(tick, 500);
})();
