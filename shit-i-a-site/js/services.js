// Массив услуг для юрлиц
const juridicalServices = [
  { name: "Пультовая охрана", description: "Круглосуточное наблюдение за объектом" },
  { name: "Кнопка SOS", description: "Экстренная связь при возникновении чрезвычайной ситуации" },
  { name: "Пожарная сигнализация", description: "Система обнаружения и оповещения о пожаре" },
  { name: "Телохранитель", description: "Персональная защита персонала" },
  { name: "Охрана мероприятий", description: "Безопасность на мероприятиях и событиях" },
  { name: "Сопровождение грузов", description: "Охрана транспортировки ценностей и товаров" }
];

// Массив услуг для физлиц
const physicalServices = [
  { name: "Квартиры", description: "Охрана жилых помещений" },
  { name: "Дома и коттеджи", description: "Защита частных домов и загородных домов" },
  { name: "Гаражи", description: "Охрана гаражей и парковочных мест" },
  { name: "Мониторинг детей", description: "Контроль за безопасностью детей" },
  { name: "Пожилых людей", description: "Сопровождение пожилых граждан" },
  { name: "Домработников", description: "Охрана домашнего персонала" }
];

// Функция для рендеринга карточек услуг
function renderServiceCards(services, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'glass-card p-6 rounded-xl backdrop-blur-lg bg-slate-900/30 border border-slate-700/50';
    card.innerHTML = `
      <h3 class="text-xl font-bold text-white mb-2">${service.name}</h3>
      <p class="text-slate-300 mb-4">${service.description}</p>
      <button class="btn-primary-3d w-full py-2 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition duration-300 transform hover:scale-105">
        Подробнее
      </button>
    `;
    container.appendChild(card);
  });
}

// Функция переключения вкладок
function toggleTabs(activeTab) {
  const juridicalTab = document.getElementById('juridical-tab');
  const physicalTab = document.getElementById('physical-tab');
  const juridicalGrid = document.getElementById('grid-juridical');
  const physicalGrid = document.getElementById('grid-physical');
  
  if (activeTab === 'juridical') {
    juridicalTab.classList.add('bg-sky-500');
    juridicalTab.classList.remove('bg-slate-700');
    physicalTab.classList.remove('bg-sky-500');
    physicalTab.classList.add('bg-slate-700');
    juridicalGrid.classList.remove('hidden');
    physicalGrid.classList.add('hidden');
  } else {
    physicalTab.classList.add('bg-sky-500');
    physicalTab.classList.remove('bg-slate-700');
    juridicalTab.classList.remove('bg-sky-500');
    juridicalTab.classList.add('bg-slate-700');
    physicalGrid.classList.remove('hidden');
    juridicalGrid.classList.add('hidden');
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  renderServiceCards(juridicalServices, 'grid-juridical');
  renderServiceCards(physicalServices, 'grid-physical');
  
  // Установка активной вкладки по умолчанию
  toggleTabs('juridical');
});