(function () {
  function openCtModal() {
    const bg = document.getElementById('ct-modal-bg');
    if (!bg) return;
    if (bg.parentElement !== document.body) document.body.appendChild(bg);

    bg.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => bg.classList.add('is-open'));
    });

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeCtModal() {
    const bg = document.getElementById('ct-modal-bg');
    if (!bg) return;
    bg.classList.remove('is-open');
    setTimeout(() => {
      bg.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, 280);
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('#ct-open-call-btn')) {
      e.preventDefault();
      openCtModal();
      return;
    }
    if (e.target.closest('#ct-modal-close') || e.target.id === 'ct-modal-bg') {
      closeCtModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCtModal();
  });
})();
