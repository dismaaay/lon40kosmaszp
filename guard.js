(function () {
  const VERIFIED_KEY = 'cf_turnstile_verified';
  const NEXT_PAGE_KEY = 'cf_turnstile_next_page';
  const SITE_KEY = window.CF_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

  function isVerified() {
    return sessionStorage.getItem(VERIFIED_KEY) === '1';
  }

  function markVerified() {
    sessionStorage.setItem(VERIFIED_KEY, '1');
    sessionStorage.removeItem(NEXT_PAGE_KEY);
  }

  function currentPath() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function ensureGuardOnSubpages() {
    const page = currentPath();
    if (page !== 'index.html' && !isVerified()) {
      sessionStorage.setItem(NEXT_PAGE_KEY, page);
      window.location.href = 'index.html';
    }
  }

  function setupIndexGate() {
    const modal = document.getElementById('captchaModal');
    const info = document.getElementById('captchaInfo');
    const links = document.querySelectorAll('[data-protected-link]');
    let targetHref = null;

    if (!modal || !links.length) {
      return;
    }

    function openModal(message) {
      modal.classList.add('open');
      info.textContent = message;
    }

    function closeModal() {
      modal.classList.remove('open');
    }

    function goToTarget() {
      if (targetHref) {
        window.location.href = targetHref;
      }
    }

    window.onTurnstileSuccess = function () {
      markVerified();
      closeModal();
      goToTarget();
    };

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        if (isVerified()) {
          return;
        }

        event.preventDefault();
        targetHref = link.getAttribute('href');
        sessionStorage.setItem(NEXT_PAGE_KEY, targetHref);
        openModal('Potwierdź CAPTCHA Cloudflare, aby przejść dalej.');
      });
    });

    const queuedPage = sessionStorage.getItem(NEXT_PAGE_KEY);
    if (queuedPage && !isVerified()) {
      targetHref = queuedPage;
      openModal('Najpierw przejdź CAPTCHA Cloudflare.');
    }

    if (window.turnstile) {
      window.turnstile.render('#turnstileWidget', {
        sitekey: SITE_KEY,
        callback: window.onTurnstileSuccess,
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureGuardOnSubpages();
    if (currentPath() === 'index.html') {
      setupIndexGate();
    }
  });
})();
