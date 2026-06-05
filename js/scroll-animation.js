(function () {
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var effects = ['rise', 'reveal', 'fan', 'sweep', 'scale', 'clip-up'];
      var staggerSelectors = '.badge, p.w-65, p.text-center, .box.green, .box.borderBox, .col-lg-6 > .imgBox, .col-lg-5 > .imgBox, .col-lg-7 > .imgBox, .col-lg-6 > h2, .col-lg-6 > h3, .col-lg-5 > p, .col-lg-7 > h2, .col-lg-7 > h3, .brandHolder > img, .heading, .gridBox > .col, .orgChart > .holder, .list > li, .banner h1, .banner-list > li, .filterForm:not(.inlineBox):not(.researchFilter), .researchFilter__row, .eventsTab, .eventsSort, .imgCard, .researchCard, .eventsGrid > .text-center, #researchEmpty h4, [data-sa-stagger] > h4, .eventsFeatured__content .box';
      var observer;

      function getEffect(el) {
            var effect = el.getAttribute('data-sa');
            return effect && effects.indexOf(effect) !== -1 ? effect : 'rise';
      }

      function markComplete(el) {
            el.classList.add('sa-complete');
      }

      function reveal(el) {
            if (el.classList.contains('is-inview')) return;
            el.classList.add('is-inview');
            if (observer) observer.unobserve(el);
            window.setTimeout(function () {
                  markComplete(el);
            }, reducedMotion ? 0 : 950);
      }

      function isInViewport(el) {
            var rect = el.getBoundingClientRect();
            var viewH = window.innerHeight || document.documentElement.clientHeight;
            return rect.top < viewH * 0.92 && rect.bottom > viewH * 0.08;
      }

      function revealVisible() {
            document.querySelectorAll('.sa:not(.is-inview)').forEach(function (el) {
                  if (isInViewport(el)) reveal(el);
            });
      }

      function shouldAnimate(child, parent) {
            if (child.closest('[data-sa-ignore]')) return false;
            if (child.classList.contains('sa')) return false;
            var animatedParent = child.parentElement && child.parentElement.closest('.sa');
            if (animatedParent && parent.contains(animatedParent)) return false;
            return true;
      }

      function initElements() {
            document.querySelectorAll('[data-sa]').forEach(function (el) {
                  if (el.classList.contains('sa')) return;
                  el.classList.add('sa', 'sa--' + getEffect(el));
                  if (reducedMotion) reveal(el);
            });

            document.querySelectorAll('[data-sa-stagger]').forEach(function (parent) {
                  var effect = parent.getAttribute('data-sa-effect');
                  var validEffect = effect && effects.indexOf(effect) !== -1 ? effect : 'rise';
                  var children = parent.querySelectorAll(staggerSelectors);
                  var index = 0;

                  children.forEach(function (child) {
                        if (!shouldAnimate(child, parent)) return;
                        child.classList.add('sa', 'sa--' + validEffect);
                        if (!reducedMotion) {
                              child.style.transitionDelay = (index * 90) + 'ms';
                        }
                        index += 1;
                        if (reducedMotion) reveal(child);
                  });
            });
      }

      function initObserver() {
            var targets = document.querySelectorAll('.sa:not(.is-inview)');
            if (!targets.length) return;

            if (reducedMotion) {
                  targets.forEach(reveal);
                  return;
            }

            revealVisible();

            if (!('IntersectionObserver' in window)) {
                  targets.forEach(reveal);
                  return;
            }

            if (observer) observer.disconnect();

            observer = new IntersectionObserver(function (entries) {
                  entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        reveal(entry.target);
                  });
            }, {
                  root: null,
                  rootMargin: '0px 0px -5% 0px',
                  threshold: 0.05
            });

            document.querySelectorAll('.sa:not(.is-inview)').forEach(function (el) {
                  observer.observe(el);
            });
      }

      function initBackToTop() {
            if (document.querySelector('.backToTop')) return;

            var label = document.documentElement.lang === 'ar' ? 'العودة إلى الأعلى' : 'Back to top';
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'backToTop';
            btn.setAttribute('aria-label', label);
            btn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
            document.body.appendChild(btn);

            var toggle = function () {
                  if (window.scrollY > 280) {
                        btn.classList.add('is-visible');
                  } else {
                        btn.classList.remove('is-visible');
                  }
            };

            btn.addEventListener('click', function () {
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
            });

            window.addEventListener('scroll', toggle, { passive: true });
            toggle();
      }

      function boot() {
            initElements();
            initObserver();
            initBackToTop();
            requestAnimationFrame(revealVisible);
      }

      window.refreshScrollAnimations = function () {
            initElements();
            initObserver();
            requestAnimationFrame(revealVisible);
      };

      if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', boot);
      } else {
            boot();
      }

      window.addEventListener('load', function () {
            initElements();
            initObserver();
            requestAnimationFrame(revealVisible);
      });

      window.addEventListener('scroll', function () {
            revealVisible();
      }, { passive: true });
})();
