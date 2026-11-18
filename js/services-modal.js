(function () {
  if (window.__shServicesModalInit) return;
  window.__shServicesModalInit = true;

  function initWaveHeading() {
    const box = document.getElementById('guarantee-title-box');
    const title = document.getElementById('guarantee-wave-title');
    const sub = document.getElementById('guarantee-wave-sub');
    if (!box || !title || title.dataset.waveReady) return;
    title.dataset.waveReady = '1';

    const words = [
      { text: 'Мы', accent: false },
      { text: ' ', accent: false },
      { text: 'гарантируем', accent: true }
    ];
    const offsets = [
      { x: -75, y: -45, r: -18 }, { x: -35, y: 50, r: 14 }, { x: 0, y: 0, r: 0 },
      { x: 40, y: -55, r: 16 }, { x: -50, y: 45, r: -14 }, { x: 65, y: -35, r: 20 },
      { x: -30, y: -50, r: -12 }, { x: 55, y: 48, r: 15 }, { x: -65, y: -30, r: -16 },
      { x: 35, y: 52, r: 12 }, { x: 75, y: -42, r: -19 }, { x: -40, y: 46, r: 14 },
      { x: 60, y: -48, r: -15 }, { x: 85, y: 38, r: 18 }
    ];

    let charIndex = 0;
    const chars = [];

    words.forEach(function (word) {
      if (word.text === ' ') {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.width = '0.32em';
        space.style.display = 'inline-block';
        title.appendChild(space);
        charIndex++;
        return;
      }
      const wordWrap = document.createElement('span');
      wordWrap.style.display = 'inline-block';
      wordWrap.style.whiteSpace = 'nowrap';

      for (const ch of word.text) {
        const span = document.createElement('span');
        span.textContent = ch;
        span.className = 'sh-wave-char' + (word.accent ? ' sh-wave-accent' : '');
        chars.push({ el: span, off: offsets[charIndex % offsets.length], idx: charIndex });
        wordWrap.appendChild(span);
        charIndex++;
      }
      title.appendChild(wordWrap);
    });

    function updateWaveOnScroll() {
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.96;
      const end = vh * 0.52;
      const baseProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

      chars.forEach(function (item) {
        const waveDelay = (item.idx / chars.length) * 0.28;
        const localP = Math.max(0, Math.min(1, (baseProgress - waveDelay) / (1 - waveDelay)));
        const inv = 1 - (1 - Math.pow(1 - localP, 3));
        item.el.style.transform = 'translate3d(' + (item.off.x * inv).toFixed(1) + 'px,' + (item.off.y * inv).toFixed(1) + 'px,0) rotate(' + (item.off.r * inv).toFixed(1) + 'deg)';
        item.el.style.opacity = (0.12 + 0.88 * (1 - inv)).toFixed(2);
      });

      if (sub) {
        const subP = Math.max(0, Math.min(1, (baseProgress - 0.35) / 0.65));
        sub.style.opacity = subP.toFixed(2);
        sub.style.transform = 'translateY(' + ((1 - subP) * 14).toFixed(1) + 'px)';
      }
    }

    window.addEventListener('scroll', updateWaveOnScroll, { passive: true });
    window.addEventListener('resize', updateWaveOnScroll, { passive: true });
    updateWaveOnScroll();
  }
  const db = {
    "пультовая охрана": {
      badge: "Для бизнеса • Мониторинг 24/7",
      title: "Пультовая охрана объектов",
      desc: "Круглосуточный контроль офисов, магазинов и складов в Улан-Удэ и Заиграевском районе. При тревоге сигнал мгновенно поступает на пульт, и выезжает ближайший экипаж ГБР.",
      items: ["Монтаж датчиков движения, открытия и разбития стекла", "Оперативный выезд вооружённого экипажа ГБР 24/7", "Материальная ответственность по договору", "Управление охраной со смартфона"],
      cta: "Рассчитать охрану объекта"
    },
    "кнопка sos": {
      badge: "Для бизнеса • Экстренный вызов",
      title: "Тревожная кнопка (Кнопка SOS)",
      desc: "Мгновенный вызов ГБР при нападении, конфликтах с посетителями, попытках кражи или угрозе персоналу.",
      items: ["Стационарная скрытая кнопка или носимый радиобрелок", "Бесшумная передача сигнала без провокации нарушителя", "Круглосуточное дежурство экипажей ГБР", "Регулярная проверка канала связи"],
      cta: "Подключить кнопку SOS"
    },
    "пожарная сигнализация": {
      badge: "Для бизнеса • Пожарная безопасность",
      title: "Пожарная сигнализация",
      desc: "Проектирование, монтаж и обслуживание систем пожарной безопасности в соответствии с нормами МЧС.",
      items: ["Проектирование и монтаж систем АПС и СОУЭ", "Установка дымовых и тепловых извещателей", "Вывод сигнала на пульт пожарного мониторинга", "Техническое обслуживание и документация для проверок"],
      cta: "Заказать выезд инженера"
    },
    "физическая охрана": {
      badge: "Для бизнеса • Посты охраны",
      title: "Физическая охрана объектов",
      desc: "Стационарные посты и патрулирование на предприятиях, стройках, складах и в торговых центрах.",
      items: ["Лицензированные охранники 4–6 разрядов", "Контрольно-пропускной режим для людей и транспорта", "Предотвращение хищений и сохранность имущества", "Контроль видеонаблюдения и обход территории"],
      cta: "Подобрать график постов"
    },
    "охрана мероприятий": {
      badge: "Для бизнеса • Общественный порядок",
      title: "Охрана мероприятий",
      desc: "Обеспечение безопасности на форумах, концертах, корпоративах и спортивных событиях.",
      items: ["Осмотр площадки и разработка плана безопасности", "Фейс-контроль и организация пропускного режима", "Оперативное пресечение конфликтов", "Взаимодействие с экстренными службами"],
      cta: "Рассчитать охрану мероприятия"
    },
    "сопровождение грузов": {
      badge: "Для бизнеса • Логистика",
      title: "Сопровождение грузов",
      desc: "Вооружённая защита ценных и коммерческих грузов при перевозке по Бурятии и России.",
      items: ["Разработка безопасного маршрута движения", "Сопровождение в кабине или на автомобиле охраны", "Постоянная связь с оперативным дежурным", "Ответственность за сохранность груза в пути"],
      cta: "Заказать сопровождение"
    }
  };
  Object.assign(db, {
    "охрана квартир": {
      badge: "Для дома • Защита жилья",
      title: "Пультовая охрана квартир",
      desc: "Надёжная защита вашей квартиры от проникновения взломщиков, кражи имущества, пожара и протечек воды с круглосуточным выездом экипажа ГБР.",
      items: ["Аккуратный монтаж беспроводных датчиков без повреждения ремонта", "Прибытие вооружённого экипажа ГБР по сигналу тревоги 24/7", "Push-уведомления на смартфон о постановке и снятии с охраны", "Возможность подключения датчиков дыма, газа и протечки воды"],
      cta: "Защитить квартиру"
    },
    "дома и коттеджи": {
      badge: "Для дома • Частный сектор",
      title: "Охрана частных домов и коттеджей",
      desc: "Комплексная защита загородных домов, коттеджей и участков в Улан-Удэ и Заиграевском районе с охраной периметра и хозпостроек.",
      items: ["Контроль входных дверей, окон, гаража и периметра участка", "Встроенный аккумулятор — охрана работает даже при отключении света", "Оперативное реагирование экипажей ГБР в любую погоду", "Полное управление сигнализацией через приложение в телефоне"],
      cta: "Защитить дом"
    },
    "охрана гаражей": {
      badge: "Для дома • Сохранность авто",
      title: "Охрана гаражей и боксов",
      desc: "Круглосуточная защита гаражных боксов, автомобилей, мототехники и дорогостоящего инструмента от взлома ворот и проникновения.",
      items: ["Морозостойкие датчики открытия ворот и движения (до -45 °C)", "Автономное питание и защищённый канал связи с пультом", "Мгновенный выезд группы быстрого реагирования при тревоге", "SMS и push-оповещения владельца о любых событиях"],
      cta: "Подключить охрану гаража"
    },
    "видеонаблюдение": {
      badge: "Для дома и бизнеса • Онлайн-контроль",
      title: "Монтаж систем видеонаблюдения",
      desc: "Установка современных IP-камер с ночной съёмкой, записью звука и круглосуточным онлайн-доступом со смартфона из любой точки мира.",
      items: ["Подбор и установка уличных и внутренних HD/4K-камер", "Просмотр живого видео и архива записей через телефон", "Уведомления при обнаружении движения в охраняемой зоне", "Настройка облачного или локального хранения архива"],
      cta: "Заказать расчёт камер"
    },
    "мобильный телохранитель": {
      badge: "Для семьи • Тревожная кнопка в смартфоне",
      title: "Мобильный телохранитель",
      desc: "Экстренная тревожная кнопка в смартфоне для защиты детей, пожилых родственников и близких в любой точке зоны действия ГБР.",
      items: ["Вызов группы быстрого реагирования одним нажатием в приложении", "Автоматическая передача точных GPS-координат человека на пульт", "Круглосуточная поддержка оперативного дежурного 24/7", "Идеально для безопасности детей по дороге из школы и пожилых людей"],
      cta: "Подключить защиту близких"
    },
    "личная охрана": {
      badge: "VIP-безопасность • Сопровождение",
      title: "Личная охрана и сопровождение",
      desc: "Индивидуальная физическая защита и безопасное сопровождение на деловых встречах, в поездках и повседневной жизни.",
      items: ["Подготовленные лицензированные телохранители с опытом работы", "Предварительная проверка маршрутов и мест проведения встреч", "Строгая конфиденциальность и тактичность в любой обстановке", "Гибкий график работы: разовое сопровождение или на постоянной основе"],
      cta: "Заказать личную охрану"
    }
  });

  function setupCards() {
    initWaveHeading();
    document.querySelectorAll('#list-jur .glass-card, #list-phy .glass-card').forEach(function (card) {
      if (card.dataset.shCardInit) return;
      card.dataset.shCardInit = '1';
      card.style.cursor = 'pointer';
      const p = card.querySelector('p');
      if (p && !card.querySelector('.sh-hint')) {
        p.insertAdjacentHTML('afterend', '<div class="sh-hint">Подробнее об услуге →</div>');
      }
    });
  }

  setTimeout(setupCards, 300);
  setTimeout(setupCards, 1000);

  function openFromCard(card) {
    const bg = document.getElementById('sh-modal-bg');
    const box = document.getElementById('sh-modal-card');
    if (!bg || !box) return;
    if (bg.parentElement !== document.body) document.body.appendChild(bg);

    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    const key = h3 ? h3.textContent.trim().toLowerCase() : '';
    const data = db[key] || {
      badge: "ООО «Щит и А»",
      title: h3 ? h3.textContent.trim() : "Охранная услуга",
      desc: (p ? p.textContent.trim() : "") + " Надёжная защита в Улан-Удэ и Заиграевском районе.",
      items: ["Индивидуальный подбор решения", "Выезд экипажа ГБР 24/7", "Официальный договор"],
      cta: "Заказать охрану"
    };

    document.getElementById('sh-m-badge').textContent = data.badge;
    document.getElementById('sh-m-title').textContent = data.title;
    document.getElementById('sh-m-desc').textContent = data.desc;
    document.getElementById('sh-m-cta').textContent = data.cta;
    document.getElementById('sh-m-list').innerHTML = data.items.map(function (t) {
      return '<li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#38bdf8;font-weight:700;">✓</span><span>' + t + '</span></li>';
    }).join('');

    const r = card.getBoundingClientRect();
    const ox = (r.left + r.width / 2) - (window.innerWidth / 2);
    const oy = (r.top + r.height / 2) - (window.innerHeight / 2);

    box.style.transition = 'none';
    box.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(0.2)';
    box.style.opacity = '0';
    bg.style.display = 'flex';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bg.style.opacity = '1';
        box.style.transition = 'transform 0.34s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease';
        box.style.transform = 'translate(0,0) scale(1)';
        box.style.opacity = '1';
      });
    });

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeBox() {
    const bg = document.getElementById('sh-modal-bg');
    const box = document.getElementById('sh-modal-card');
    if (!bg || !box) return;
    bg.style.opacity = '0';
    box.style.transform = 'scale(0.85)';
    box.style.opacity = '0';
    setTimeout(function () {
      bg.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, 260);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('#sh-modal-x, #sh-m-close') || e.target.id === 'sh-modal-bg') {
      closeBox();
      return;
    }
    if (e.target.closest('#sh-m-cta')) {
      const titleText = document.getElementById('sh-m-title')?.textContent || '';
      const msgField = document.querySelector('#contact textarea, #contact input[name*="message"], #contact input[name*="comment"]');
      if (msgField && titleText) msgField.value = 'Интересует услуга: ' + titleText;
      closeBox();
      return;
    }
    const card = e.target.closest('#list-jur .glass-card, #list-phy .glass-card');
    if (card && !e.target.closest('a, button')) openFromCard(card);
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
})();
