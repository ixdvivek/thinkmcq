/* ============================================================
   thinkMCQ — package landing page behaviour
   Bootstrap 5 handles the carousel and the how-to-purchase
   offcanvas (focus trap, ESC, backdrop). Everything below is
   the page-specific glue on top of it.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- mobile nav toggle ------------------------------------ */
  var navToggle = document.getElementById('navToggle');
  var topnav = document.getElementById('topnav');
  if (navToggle && topnav) {
    navToggle.addEventListener('click', function () {
      var open = topnav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---- exam selection, shared across every control ----------
     The hero dropdown, the CTA pill group and the mobile sticky
     bar all edit the same value, so a choice made in one place
     survives when the visitor scrolls to another.              */
  var selects = Array.prototype.slice.call(document.querySelectorAll('[data-exam-sync]'));
  var pillGroups = Array.prototype.slice.call(document.querySelectorAll('[data-exam-pills]'));
  var selectedExam = (selects[0] && selects[0].value) || 'DHA';

  function renderExam(source) {
    selects.forEach(function (el) {
      if (el !== source) { el.value = selectedExam; }
    });
    pillGroups.forEach(function (group) {
      group.querySelectorAll('.pill').forEach(function (pill) {
        var on = pill.dataset.value === selectedExam;
        pill.classList.toggle('selected', on);
        pill.setAttribute('aria-checked', String(on));
      });
    });
  }

  selects.forEach(function (el) {
    el.addEventListener('change', function () {
      selectedExam = el.value;
      renderExam(el);
    });
  });

  pillGroups.forEach(function (group) {
    group.addEventListener('click', function (e) {
      var pill = e.target.closest('.pill');
      if (!pill || !group.contains(pill)) { return; }
      selectedExam = pill.dataset.value;
      renderExam(null);
      pop(pill);
    });
  });

  /* Restart the select animation on the pill that was just chosen. Re-adding the
     class needs a reflow between remove and add, or the animation never replays. */
  function pop(pill) {
    if (reduceMotion.matches) { return; }
    pill.classList.remove('pill-pop');
    void pill.offsetWidth;
    pill.classList.add('pill-pop');
  }

  renderExam(null);

  /* ---- carousel dots ----------------------------------------
     The dots sit outside .carousel, so Bootstrap's own indicator
     sync does not reach them — mirror the active slide by hand. */
  var carousel = document.getElementById('packageCarousel');
  var dots = Array.prototype.slice.call(document.querySelectorAll('#carDots .dot'));
  if (carousel && dots.length) {
    carousel.addEventListener('slid.bs.carousel', function (e) {
      dots.forEach(function (dot, i) {
        var on = i === e.to;
        dot.classList.toggle('active', on);
        if (on) { dot.setAttribute('aria-current', 'true'); }
        else { dot.removeAttribute('aria-current'); }
      });
    });
  }

  /* ---- Buy Now ----------------------------------------------
     Hands the chosen council exam off to the cart. Swap the
     destination for the real add-to-cart endpoint on wire-up.  */
  document.querySelectorAll('[data-buy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.location.href = '/cart/add?package=D33&exam=' + encodeURIComponent(selectedExam);
    });
  });

  /* ---- reveal on scroll -------------------------------------
     Every band below the first fold fades and lifts into place the
     first time it comes near the viewport.                      */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* ---- bento icons: still by default, animated on card hover --
     The GIF is only fetched the first time a card is hovered, and
     swapping back to the PNG both stops and rewinds the loop.    */
  document.querySelectorAll('.bento-item').forEach(function (card) {
    var img = card.querySelector('.icon img[data-gif]');
    if (!img) { return; }
    var still = img.getAttribute('src');
    var play = function () { if (!reduceMotion.matches) { img.src = img.dataset.gif; } };
    var stop = function () { img.src = still; };
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focusin', play);
    card.addEventListener('focusout', stop);
  });

  /* ---- video placeholders -----------------------------------
     Replace the placeholder with the real embed on click, so no
     third-party player loads until the visitor asks for it.    */
  document.querySelectorAll('[data-video]').forEach(function (el) {
    el.addEventListener('click', function () {
      console.info('Play video:', el.dataset.video);
    });
  });
})();
