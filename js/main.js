const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

function attachReveal(root = document) {
    root.querySelectorAll('section, .glass-card').forEach((el, index) => {
                if (el.dataset.revealBound || el.closest('slot-header') || el.closest('slot-hero') || el.id === 'services') return;
        el.dataset.revealBound = '1';
        el.classList.add('reveal-up');
        if (el.classList.contains('glass-card')) {
            el.style.transitionDelay = ((index % 3) * 120) + 'ms';
        }
        revealObserver.observe(el);
    });
}

new MutationObserver(() => attachReveal()).observe(document.body, { childList: true, subtree: true });

async function loadBlocks() {
    const slots = ['header', 'hero', 'services', 'calculator', 'faq', 'contact', 'footer'];

    for (const slot of slots) {
        try {
            const response = await fetch('blocks/' + slot + '.html');
            if (response.ok) {
                const content = await response.text();
                const slotElement = document.querySelector('slot-' + slot);
                slotElement.innerHTML = content;

                const oldScripts = slotElement.querySelectorAll('script');
                for (const oldScript of oldScripts) {
                    const newScript = document.createElement('script');
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.head.appendChild(newScript);
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки блока ' + slot + ':', error);
        }
    }
    if (window.lucide) {
        lucide.createIcons();
    }
    attachReveal();
}

loadBlocks();

let activeCard = null;
let activeRect = null;
let rafPending = false;
let pointerX = 0, pointerY = 0;

function resetCard(card) {
    if (!card) return;
    card.style.transform = '';
    card.style.willChange = 'auto';
}

function animateActiveCard() {
    rafPending = false;
    if (!activeCard || !activeRect) return;
    const x = pointerX - activeRect.left;
    const y = pointerY - activeRect.top;
    activeCard.style.setProperty('--x', x + 'px');
    activeCard.style.setProperty('--y', y + 'px');
    const rotateX = ((y / activeRect.height) - 0.5) * -8;
    const rotateY = ((x / activeRect.width) - 0.5) * 8;
    activeCard.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) scale(1.015)';
}

document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.glass-card');
    if (card !== activeCard) {
        resetCard(activeCard);
        activeCard = card;
        if (activeCard) {
            activeCard.style.willChange = 'transform';
            activeRect = activeCard.getBoundingClientRect();
        } else {
            activeRect = null;
        }
    }
    if (!activeCard) return;
    pointerX = e.clientX;
    pointerY = e.clientY;
    if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(animateActiveCard);
    }
}, { passive: true });

window.addEventListener('scroll', () => {
    if (activeCard) activeRect = activeCard.getBoundingClientRect();
}, { passive: true });

// Двухэтажная шапка при скролле и мобильное меню
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (!header) return;
    if (window.scrollY > 70) header.classList.add('is-scrolled');
    else if (window.scrollY < 15) header.classList.remove('is-scrolled');
}, { passive: true });

document.addEventListener('click', (e) => {
    if (e.target.closest('#sh-mobile-toggle')) {
        const drawer = document.getElementById('mobile-menu');
        if (drawer) drawer.classList.toggle('is-open');
    } else if (e.target.closest('.sh-mobile-link')) {
        const drawer = document.getElementById('mobile-menu');
        if (drawer) drawer.classList.remove('is-open');
    }
});
// Анимация сборки заголовка в мозаику со световым лучом сканера
function initHeroMosaic() {
  const title = document.querySelector('.hero-mosaic-title');
  if (!title || title.dataset.mosaicReady) return;
  title.dataset.mosaicReady = '1';

  const isMobile = window.innerWidth < 640;
  const spread = isMobile ? 28 : 65;

  const nodes = Array.from(title.childNodes);
  title.innerHTML = '';

  let charIndex = 0;
  nodes.forEach((node) => {
    const isAccent = node.nodeType === 1 && node.classList.contains('text-sky-400');
    const parts = node.textContent.split(/(\s+)/);

    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        title.appendChild(document.createTextNode(' '));
        return;
      }

      const wordWrap = document.createElement('span');
      wordWrap.className = 'mosaic-word';

      for (const ch of part) {
        const span = document.createElement('span');
        span.className = 'mosaic-piece' + (isAccent ? ' is-accent' : '');
        span.setAttribute('aria-hidden', 'true');
        span.textContent = ch;

        const rx = Math.round((Math.random() - 0.5) * 2 * spread);
        const ry = Math.round((Math.random() - 0.5) * 2 * spread);
        const rr = Math.round((Math.random() - 0.5) * 50);

        span.style.setProperty('--mx', rx + 'px');
        span.style.setProperty('--my', ry + 'px');
        span.style.setProperty('--mr', rr + 'deg');
        span.style.transitionDelay = (charIndex * 55) + 'ms';

        wordWrap.appendChild(span);
        charIndex++;
      }

      title.appendChild(wordWrap);
    });
  });


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      title.classList.add('is-assembled');
    });
  });
}

new MutationObserver(() => initHeroMosaic()).observe(document.body, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', initHeroMosaic);
