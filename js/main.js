(function () {
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
})();
