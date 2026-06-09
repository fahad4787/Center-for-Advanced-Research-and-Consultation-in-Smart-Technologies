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
            document.querySelectorAll('.eventsTab').forEach(function (tab) {
                  tab.addEventListener('click', function () {
                        var filter = tab.getAttribute('data-filter');
                        document.querySelectorAll('.eventsTab').forEach(function (item) {
                              var isActive = item.getAttribute('data-filter') === filter;
                              item.classList.toggle('is-active', isActive);
                              item.setAttribute('aria-selected', isActive ? 'true' : 'false');
                        });
                  });
            });
      }

      function initEventsView() {
            var form = document.getElementById('eventsFilterForm');
            var areasSection = document.getElementById('eventsAreas');
            var emptyPanel = document.querySelector('[data-events-panel="empty"]');
            var resultsPanel = document.querySelector('[data-events-panel="results"]');
            if (!emptyPanel || !resultsPanel) return;

            function setView(showResults) {
                  if (areasSection) areasSection.hidden = showResults;
                  emptyPanel.classList.toggle('is-active', !showResults);
                  resultsPanel.classList.toggle('is-active', showResults);
                  emptyPanel.hidden = showResults;
                  resultsPanel.hidden = !showResults;
                  if (showResults && window.refreshScrollAnimations) {
                        window.requestAnimationFrame(function () {
                              window.refreshScrollAnimations();
                        });
                  }
            }

            function hasSearchParams() {
                  var params = new URLSearchParams(window.location.search);
                  return ['q', 'type', 'field', 'date'].some(function (key) {
                        return params.get(key);
                  });
            }

            if (form) {
                  form.addEventListener('submit', function (e) {
                        e.preventDefault();
                        var data = new FormData(form);
                        var params = new URLSearchParams();
                        data.forEach(function (value, key) {
                              if (value) params.set(key, value);
                        });
                        var query = params.toString();
                        var url = window.location.pathname + (query ? '?' + query : '');
                        window.history.replaceState(null, '', url);
                        setView(true);
                        var listing = document.getElementById('eventsListing');
                        if (listing) {
                              window.setTimeout(function () {
                                    listing.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 50);
                        }
                  });
            }

            setView(hasSearchParams());
      }

      function resetCustomDropdowns(form) {
            if (!form) return;
            form.querySelectorAll('.formField--dropdown').forEach(function (field) {
                  var hidden = field.querySelector('input[type="hidden"]');
                  var toggle = field.querySelector('.formField__toggle');
                  var valueEl = field.querySelector('.formField__value');
                  var placeholder = field.querySelector('.formField__placeholder');
                  if (hidden) hidden.value = '';
                  field.querySelectorAll('[role="option"]').forEach(function (option) {
                        option.classList.remove('is-selected');
                        option.setAttribute('aria-selected', 'false');
                  });
                  if (valueEl) valueEl.remove();
                  if (toggle && !toggle.querySelector('.formField__placeholder')) {
                        var span = document.createElement('span');
                        span.className = 'formField__placeholder';
                        var label = field.getAttribute('data-placeholder');
                        if (label) {
                              span.textContent = label;
                              toggle.insertBefore(span, toggle.firstChild);
                        }
                  }
            });
      }

      function initResearchFilter() {
            var form = document.getElementById('researchFilterForm');
            var areasSection = document.getElementById('researchAreas');
            var emptySection = document.getElementById('researchEmpty');
            var featuredSection = document.getElementById('researchFeatured');
            var resultsSection = document.getElementById('researchResults');
            if (!form || !emptySection || !featuredSection || !resultsSection) return;

            form.querySelectorAll('.formField--dropdown').forEach(function (field) {
                  var placeholder = field.querySelector('.formField__placeholder');
                  if (placeholder) field.setAttribute('data-placeholder', placeholder.textContent.trim());
            });

            function setView(showResults) {
                  emptySection.hidden = showResults;
                  featuredSection.hidden = !showResults;
                  resultsSection.hidden = !showResults;
                  if (showResults && window.refreshScrollAnimations) {
                        window.requestAnimationFrame(function () {
                              window.refreshScrollAnimations();
                        });
                  }
            }

            function syncUrl() {
                  var data = new FormData(form);
                  var params = new URLSearchParams();
                  data.forEach(function (value, key) {
                        if (value) params.set(key, value);
                  });
                  var query = params.toString();
                  window.history.replaceState(null, '', window.location.pathname + (query ? '?' + query : ''));
            }

            function showResults() {
                  setView(true);
                  syncUrl();
                  window.setTimeout(function () {
                        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
            }

            function showDefault() {
                  window.history.replaceState(null, '', window.location.pathname);
                  resetCustomDropdowns(form);
                  setView(true);
            }

            function hasSearchParams() {
                  var params = new URLSearchParams(window.location.search);
                  return ['q', 'keyword', 'field', 'type', 'year'].some(function (key) {
                        return params.get(key);
                  });
            }

            form.addEventListener('submit', function (e) {
                  e.preventDefault();
                  showResults();
            });

            form.addEventListener('input', function (e) {
                  if (e.target.name === 'q' && e.target.value.trim()) {
                        showResults();
                  }
            });

            form.addEventListener('click', function (e) {
                  if (e.target.closest('[role="option"]')) {
                        window.setTimeout(showResults, 0);
                  }
            });

            form.addEventListener('reset', function () {
                  window.setTimeout(showDefault, 0);
            });

            form.querySelectorAll('.viewToggle__btn').forEach(function (btn) {
                  btn.addEventListener('click', function () {
                        form.querySelectorAll('.viewToggle__btn').forEach(function (item) {
                              var isActive = item === btn;
                              item.classList.toggle('is-active', isActive);
                              item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                        });
                        showResults();
                  });
            });

            setView(true);
      }

      function boot() {
            initDropdowns();
            initDateFields();
            initEventTabs();
            initEventsView();
            initResearchFilter();
      }

      if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', boot);
      } else {
            boot();
      }
})();
