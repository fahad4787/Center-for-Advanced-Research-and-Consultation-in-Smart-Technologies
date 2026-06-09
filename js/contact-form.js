(function () {
      function syncControlState(control) {
            if (!control) {
                  return;
            }

            var hasValue = control.tagName === 'SELECT'
                  ? control.value !== ''
                  : control.value.trim() !== '';

            control.classList.toggle('has-value', hasValue);
      }

      function initFloatingFields(form) {
            form.querySelectorAll('.contactForm__control').forEach(function (control) {
                  syncControlState(control);
                  control.addEventListener('input', function () {
                        syncControlState(control);
                  });
                  control.addEventListener('change', function () {
                        syncControlState(control);
                  });
                  control.addEventListener('blur', function () {
                        syncControlState(control);
                  });
            });
      }

      var form = document.querySelector('.contactForm');
      if (!form) {
            return;
      }

      initFloatingFields(form);

      var params = new URLSearchParams(window.location.search);
      if (params.get('sent') !== '1') {
            return;
      }

      var message = form.getAttribute('data-success-message') || 'Thank you. Your message has been sent.';
      var alert = document.createElement('div');
      alert.className = 'contactForm__success';
      alert.setAttribute('role', 'status');
      alert.textContent = message;
      form.insertBefore(alert, form.firstChild);
      form.reset();
      initFloatingFields(form);
})();
