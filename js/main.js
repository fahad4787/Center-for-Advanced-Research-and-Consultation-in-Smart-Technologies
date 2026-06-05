(function () {
      function initBanner() {
            var banner = document.getElementById('banner');
            if (!banner || !banner.classList.contains('banner--slider')) return;

            var isEn = document.documentElement.lang === 'en';
            var slides = isEn ? [
                  {
                        title: 'Research Today to Innovate Tomorrow',
                        text: 'We develop applied research and advanced consultation in smart technologies to enable digital transformation and achieve Saudi Vision 2030 targets.',
                        btn: 'Discover More About the Center'
                  },
                  {
                        title: 'Smart Governance for Future Cities',
                        text: 'Exploring the role of artificial intelligence and the Internet of Things in developing smart governance for urban services.',
                        btn: 'Featured Studies'
                  }
            ] : [
                  {
                        title: 'نبحث اليوم لنبتكر الغد',
                        text: 'نعمل على تطوير بحوث تطبيقية واستشارات متقدمة في التقنيات الذكية لتمكين التحول الرقمي وتحقيق مستهدفات رؤية السعودية 2030.',
                        btn: 'اكتشف المزيد عن المركز'
                  },
                  {
                        title: 'الحوكمة الذكية للمدن المستقبلية',
                        text: 'استكشاف دور الذكاء الاصطناعي وإنترنت الأشياء في تطوير الحوكمة الذكية للخدمات الحضرية.',
                        btn: 'دراسات مميزة'
                  }
            ];

            var bgs = banner.querySelectorAll('.banner__bg');
            var title = document.getElementById('banner-title');
            var text = document.getElementById('banner-text');
            var btn = document.getElementById('banner-btn');
            var i = 0;

            setInterval(function () {
                  bgs[i].classList.remove('is-active');
                  i = (i + 1) % slides.length;
                  bgs[i].classList.add('is-active');
                  title.textContent = slides[i].title;
                  text.textContent = slides[i].text;
                  btn.textContent = slides[i].btn;
            }, 6000);
      }

      function initHeader() {
            var header = document.getElementById('header');
            if (!header) return;

            var searchToggle = header.querySelector('.header__searchToggle');
            var searchPanel = document.getElementById('headerSearch');
            var menuToggle = header.querySelector('.header__menuToggle');
            var overlay = document.getElementById('headerOverlay');
            var nav = document.getElementById('headerNav');
            var isEn = document.documentElement.lang === 'en';

            function closeSearch() {
                  if (!searchPanel || !searchToggle) return;
                  searchPanel.classList.remove('is-open');
                  header.classList.remove('is-search-open');
                  searchToggle.setAttribute('aria-expanded', 'false');
            }

            function closeMenu() {
                  header.classList.remove('is-nav-open');
                  document.body.classList.remove('is-nav-open');
                  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                  if (overlay) overlay.hidden = true;
            }

            function openSearch() {
                  closeMenu();
                  searchPanel.classList.add('is-open');
                  header.classList.add('is-search-open');
                  searchToggle.setAttribute('aria-expanded', 'true');
                  var input = searchPanel.querySelector('input');
                  if (input) window.setTimeout(function () { input.focus(); }, 50);
            }

            function openMenu() {
                  closeSearch();
                  header.classList.add('is-nav-open');
                  document.body.classList.add('is-nav-open');
                  menuToggle.setAttribute('aria-expanded', 'true');
                  if (overlay) overlay.hidden = false;
            }

            if (searchToggle && searchPanel) {
                  searchToggle.addEventListener('click', function () {
                        if (header.classList.contains('is-search-open')) {
                              closeSearch();
                              return;
                        }
                        openSearch();
                  });
            }

            if (menuToggle && nav) {
                  menuToggle.addEventListener('click', function () {
                        if (header.classList.contains('is-nav-open')) {
                              closeMenu();
                              return;
                        }
                        openMenu();
                  });

                  nav.querySelectorAll('a').forEach(function (link) {
                        link.addEventListener('click', closeMenu);
                  });
            }

            if (overlay) {
                  overlay.addEventListener('click', closeMenu);
                  overlay.setAttribute('aria-label', isEn ? 'Close menu' : 'إغلاق القائمة');
            }

            document.addEventListener('click', function (e) {
                  if (searchPanel && searchPanel.classList.contains('is-open') &&
                        !e.target.closest('.header__search') &&
                        !e.target.closest('.header__searchToggle')) {
                        closeSearch();
                  }
            });

            document.addEventListener('keydown', function (e) {
                  if (e.key === 'Escape') {
                        closeSearch();
                        closeMenu();
                  }
            });
      }

      function boot() {
            initBanner();
            initHeader();
      }

      if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', boot);
      } else {
            boot();
      }
})();
