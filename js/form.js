(function () {
      function closeDropdown(field) {
            field.classList.remove('is-open');
            var toggle = field.querySelector('.formField__toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }

      function closeAllDropdowns(except) {
            document.querySelectorAll('.formField--dropdown.is-open').forEach(function (field) {
                  if (field !== except) closeDropdown(field);
            });
      }

      function initDropdowns() {
            document.querySelectorAll('.formField--dropdown').forEach(function (field) {
                  var toggle = field.querySelector('.formField__toggle');
                  var menu = field.querySelector('.formField__menu');
                  var hidden = field.querySelector('input[type="hidden"]');
                  var placeholder = field.querySelector('.formField__placeholder');
                  var valueEl = field.querySelector('.formField__value');
                  if (!toggle || !menu) return;

                  toggle.addEventListener('click', function () {
                        var isOpen = field.classList.contains('is-open');
                        closeAllDropdowns(field);
                        if (!isOpen) {
                              field.classList.add('is-open');
                              toggle.setAttribute('aria-expanded', 'true');
                        }
                  });

                  menu.querySelectorAll('[role="option"]').forEach(function (option) {
                        option.addEventListener('click', function () {
                              var val = option.getAttribute('data-value');
                              var label = option.textContent.trim();

                              menu.querySelectorAll('[role="option"]').forEach(function (item) {
                                    item.classList.remove('is-selected');
                                    item.setAttribute('aria-selected', 'false');
                              });

                              option.classList.add('is-selected');
                              option.setAttribute('aria-selected', 'true');

                              if (hidden) hidden.value = val;

                              if (valueEl) {
                                    valueEl.textContent = label;
                              } else {
                                    var span = document.createElement('span');
                                    span.className = 'formField__value';
                                    span.textContent = label;
                                    if (placeholder) placeholder.remove();
                                    toggle.insertBefore(span, toggle.firstChild);
                              }

                              closeDropdown(field);
                        });
                  });
            });

            document.addEventListener('click', function (e) {
                  if (!e.target.closest('.formField--dropdown')) {
                        closeAllDropdowns();
                  }
            });

            document.addEventListener('keydown', function (e) {
                  if (e.key === 'Escape') closeAllDropdowns();
            });
      }

      function initDateFields() {
            document.querySelectorAll('.formField--date').forEach(function (field) {
                  var input = field.querySelector('.formField__control');
                  if (!input) return;

                  var sync = function () {
                        field.classList.toggle('has-value', !!input.value);
                  };

                  input.addEventListener('change', sync);
                  input.addEventListener('input', sync);
                  sync();
            });
      }

      function initEventTabs() {
            document.querySelectorAll('.eventsTabs').forEach(function (tabs) {
                  tabs.querySelectorAll('.eventsTab').forEach(function (tab) {
                        tab.addEventListener('click', function () {
                              tabs.querySelectorAll('.eventsTab').forEach(function (item) {
                                    item.classList.remove('is-active');
                                    item.setAttribute('aria-selected', 'false');
                              });
                              tab.classList.add('is-active');
                              tab.setAttribute('aria-selected', 'true');
                        });
                  });
            });
      }

      function boot() {
            initDropdowns();
            initDateFields();
            initEventTabs();
      }

      if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', boot);
      } else {
            boot();
      }
})();
