document.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-question');
  if (!btn) return;

  const item = btn.closest('.faq-item');
  const answer = item?.querySelector('.faq-answer');
  if (!item || !answer) return;

  const isOpen = item.classList.contains('is-open');

  // Закрываем остальные открытые вопросы для аккуратного вида
  document.querySelectorAll('.faq-item.is-open').forEach((other) => {
    if (other !== item) {
      other.classList.remove('is-open');
      const otherAns = other.querySelector('.faq-answer');
      if (otherAns) otherAns.style.maxHeight = '0px';
    }
  });

  if (isOpen) {
    item.classList.remove('is-open');
    answer.style.maxHeight = '0px';
  } else {
    item.classList.add('is-open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
});
