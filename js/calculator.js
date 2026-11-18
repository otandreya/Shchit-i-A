(function () {
  if (window.__shCalcExternalInit) return;
  window.__shCalcExternalInit = true;
  let activeTab = 'pult';

  function fmt(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  function openCalc(triggerBtn) {
    const bg = document.getElementById('sh-calc-backdrop');
    const panel = document.getElementById('sh-calc-panel');
    if (!bg || !panel) return;

    if (bg.parentElement !== document.body) {
      document.body.appendChild(bg);
    }

    let ox = 0, oy = 0;
    if (triggerBtn) {
      const r = triggerBtn.getBoundingClientRect();
      ox = (r.left + r.width / 2) - (window.innerWidth / 2);
      oy = (r.top + r.height / 2) - (window.innerHeight / 2);
    }

    bg.style.transition = 'opacity 0.35s ease';
    bg.style.opacity = '0';
    bg.style.display = 'flex';

    panel.style.transition = 'none';
    panel.style.transform = 'translate(' + ox + 'px, ' + oy + 'px) scale(0.25)';
    panel.style.opacity = '0';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bg.style.opacity = '1';
        panel.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out';
        panel.style.transform = 'translate(0px, 0px) scale(1)';
        panel.style.opacity = '1';
      });
    });

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    recalc();
  }

  function closeCalc() {
    const bg = document.getElementById('sh-calc-backdrop');
    const panel = document.getElementById('sh-calc-panel');
    if (!bg) return;

    bg.style.opacity = '0';
    if (panel) {
      panel.style.transition = 'transform 0.28s ease-in, opacity 0.24s ease-in';
      panel.style.transform = 'scale(0.85)';
      panel.style.opacity = '0';
    }

    setTimeout(function () {
      bg.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, 300);
  }

  function recalc() {
    const periodEl = document.getElementById('sh-calc-period');
    const totalEl = document.getElementById('sh-calc-total');
    const subBox = document.getElementById('sh-calc-sub-box');
    const subEl = document.getElementById('sh-calc-sub');
    const noteEl = document.getElementById('sh-calc-note');
    if (!periodEl || !totalEl) return '';

    if (activeTab === 'pult') {
      const area = +document.getElementById('in-pult-area').value;
      const rooms = +document.getElementById('in-pult-rooms').value;
      const doors = +document.getElementById('in-pult-doors').value;
      const outb = document.getElementById('in-pult-outbuilding').checked;
      const sos = document.getElementById('in-pult-sos').checked;

      document.getElementById('v-pult-area').textContent = area + ' м²';
      document.getElementById('v-pult-rooms').textContent = rooms;
      document.getElementById('v-pult-doors').textContent = doors;

      let installSum = 9500 + (rooms * 1800) + ((doors - 1) * 1500);
      if (outb) installSum += 4500;
      if (sos) installSum += 2500;

      let monthlySub = area <= 50 ? 1200 : area <= 120 ? 1500 : area <= 250 ? 2200 : 3000;
      if (outb) monthlySub += 500;

      periodEl.textContent = 'Оборудование и монтаж (разово):';
      totalEl.textContent = 'от ' + fmt(installSum);
      if (subBox && subEl) { subBox.style.display = 'block'; subEl.textContent = fmt(monthlySub) + '/мес'; }
      if (noteEl) noteEl.style.display = 'block';

      return 'Пультовая охрана (' + area + ' м², комнат: ' + rooms + ', дверей: ' + doors + (outb ? ', +строение' : '') + (sos ? ', +кнопка SOS' : '') + ') — монтаж от ' + fmt(installSum) + ', абонплата ' + fmt(monthlySub) + '/мес';
    }

    if (activeTab === 'phys') {
      const area = +document.getElementById('in-phys-area').value;
      const posts = +document.getElementById('in-phys-posts').value;
      const mode = document.querySelector('input[name="phys-mode"]:checked').value;
      const armed = document.getElementById('in-phys-armed').checked;

      document.getElementById('v-phys-area').textContent = area + ' м²';
      document.getElementById('v-phys-posts').textContent = posts + (posts === 1 ? ' пост' : posts < 5 ? ' поста' : ' постов');

      const sum = posts * ((mode === '24' ? 95000 : 52000) + (armed ? 20000 : 0)) + Math.floor(area / 1000) * 3000;
      periodEl.textContent = 'Ориентировочная стоимость постов (в месяц):';
      totalEl.textContent = 'от ' + fmt(sum);
      if (subBox) subBox.style.display = 'none';
      if (noteEl) noteEl.style.display = 'none';

      return 'Физическая охрана (' + area + ' м², постов: ' + posts + ' по ' + mode + ' ч' + (armed ? ', вооружённый 6 разряд' : '') + ') — от ' + fmt(sum) + '/мес';
    }

    if (activeTab === 'video') {
      const cams = +document.getElementById('in-video-cams').value;
      const loc = document.querySelector('input[name="video-loc"]:checked').value;
      const cloud = document.getElementById('in-video-cloud').checked;

      document.getElementById('v-video-cams').textContent = cams + (cams === 1 ? ' камера' : cams < 5 ? ' камеры' : ' камер');
      const pricePerCam = loc === 'indoor' ? 6500 : loc === 'outdoor' ? 8500 : 7500;
      const sum = 6000 + (cams * pricePerCam) + (cloud ? 4500 : 0);

      periodEl.textContent = 'Оборудование и монтаж «под ключ» (разово):';
      totalEl.textContent = 'от ' + fmt(sum);
      if (subBox) subBox.style.display = 'none';
      if (noteEl) noteEl.style.display = 'block';

      const locName = loc === 'indoor' ? 'внутри' : loc === 'outdoor' ? 'снаружи/периметр' : 'комбинированно';
      return 'Видеонаблюдение (' + cams + ' камер, ' + locName + (cloud ? ', онлайн-доступ + архив' : '') + ') — от ' + fmt(sum);
    }
  }

  function bindHeroCalcBtn() {
    document.querySelectorAll('slot-hero a, slot-hero button, #hero a, #hero button').forEach(function (btn) {
      if (btn.textContent.trim().toLowerCase().includes('рассчитать') && !btn.dataset.shCalcBound) {
        btn.dataset.shCalcBound = '1';
        btn.textContent = 'Рассчитать примерную стоимость';
        btn.style.textAlign = 'center';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          openCalc(btn);
        });
      }
    });
  }

  setTimeout(bindHeroCalcBtn, 300);
  setTimeout(bindHeroCalcBtn, 1000);

  document.addEventListener('click', function (e) {
    const openBtn = e.target.closest('#sh-calc-open-btn');
    if (openBtn) { openCalc(openBtn); return; }
    if (e.target.closest('#sh-calc-close-btn') || e.target.id === 'sh-calc-backdrop') { closeCalc(); return; }

    const tabBtn = e.target.closest('.sh-calc-tab');
    if (tabBtn) {
      activeTab = tabBtn.dataset.tab;
      document.querySelectorAll('.sh-calc-tab').forEach(function (b) {
        b.classList.toggle('is-active', b === tabBtn);
      });
      document.querySelectorAll('.sh-calc-pane').forEach(function (p) { p.style.display = 'none'; });
      const activePane = document.getElementById('sh-tab-' + activeTab);
      if (activePane) activePane.style.display = 'flex';
      recalc();
    }
    if (e.target.closest('#sh-calc-submit')) {
      const summary = recalc();
      const msgField = document.querySelector('#contact textarea, #contact input[name*="message"], #contact input[name*="comment"]');
      if (msgField && summary) msgField.value = 'Расчёт из калькулятора: ' + summary;
      closeCalc();
    }
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCalc(); });
  document.addEventListener('input', function (e) { if (e.target.closest('#sh-calc-panel')) recalc(); });
  document.addEventListener('change', function (e) { if (e.target.closest('#sh-calc-panel')) recalc(); });
})();
