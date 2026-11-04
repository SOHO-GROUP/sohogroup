/**
 * SOHO GROUP (www.sohog.org) — Nexo Central del Holding (V1.3)
 * Lightweight Accessible UI Controller: Theme Toggle (White Default / Night Mode) & Corporate Modals
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'soho-theme';
  var htmlEl = document.documentElement;

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      // Ignore storage access errors in restricted environments
    }
    return 'light'; // 100% White Default (june15consulting.com alignment)
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage access errors
    }
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');

    var metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#0A0A0A' : '#FFFFFF');
    }

    var toggleBtn = document.getElementById('theme-toggle');
    var toggleLabel = document.getElementById('theme-toggle-label');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      toggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Activar modo día (fondo blanco)' : 'Activar modo noche (fondo oscuro)'
      );
      var moonIcon = toggleBtn.querySelector('.theme-icon--moon');
      var sunIcon = toggleBtn.querySelector('.theme-icon--sun');
      if (moonIcon && sunIcon) {
        if (isDark) {
          moonIcon.classList.add('hidden');
          sunIcon.classList.remove('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    }
    if (toggleLabel) {
      toggleLabel.textContent = isDark ? 'Modo Día' : 'Modo Noche';
    }
  }

  // Apply initial theme immediately
  applyTheme(getSavedTheme());

  document.addEventListener('DOMContentLoaded', function () {
    // Re-sync button UI once DOM is ready
    applyTheme(htmlEl.getAttribute('data-theme') || 'light');

    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        saveTheme(next);
      });
    }

    // Corporate Modals Controller
    var backdrop = document.getElementById('corporate-modal-backdrop');
    var modalTriggers = document.querySelectorAll('[data-modal-target]');
    var modalCloseBtns = document.querySelectorAll('[data-modal-close]');
    var modalPanels = document.querySelectorAll('.modal-panel');
    var lastFocusedElement = null;

    function openModal(modalId, triggerElement) {
      var targetModal = document.getElementById(modalId);
      if (!backdrop || !targetModal) return;

      lastFocusedElement = triggerElement || document.activeElement;

      modalPanels.forEach(function (panel) {
        panel.classList.add('hidden');
      });

      backdrop.classList.remove('hidden');
      backdrop.setAttribute('aria-hidden', 'false');
      targetModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      var closeBtn = targetModal.querySelector('[data-modal-close]');
      if (closeBtn) {
        closeBtn.focus();
      }
    }

    function closeModal() {
      if (!backdrop || backdrop.classList.contains('hidden')) return;

      backdrop.classList.add('hidden');
      backdrop.setAttribute('aria-hidden', 'true');
      modalPanels.forEach(function (panel) {
        panel.classList.add('hidden');
      });
      document.body.style.overflow = '';

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var targetId = trigger.getAttribute('data-modal-target');
        if (targetId) {
          openModal(targetId, trigger);
        }
      });
    });

    modalCloseBtns.forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    if (backdrop) {
      backdrop.addEventListener('click', function (event) {
        if (event.target === backdrop) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  });
})();
