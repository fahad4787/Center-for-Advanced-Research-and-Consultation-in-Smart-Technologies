(function () {
      var banner = document.getElementById('banner');
      if (!banner) return;

      var slides = [
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
