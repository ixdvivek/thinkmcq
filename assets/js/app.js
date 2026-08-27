/* ============================================================
   thinkMCQ — package landing page behaviour
   Bootstrap 5 handles the carousel and the how-to-purchase
   offcanvas (focus trap, ESC, backdrop). Everything below is
   the page-specific glue on top of it.
   ============================================================ */
(function () {
  'use strict';

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
    });
  });

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

  /* ---- video placeholders -----------------------------------
     Replace the placeholder with the real embed on click, so no
     third-party player loads until the visitor asks for it.    */
  document.querySelectorAll('[data-video]').forEach(function (el) {
    el.addEventListener('click', function () {
      console.info('Play video:', el.dataset.video);
    });
  });
})();
