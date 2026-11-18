
Вынос стилей и скриптов из `blocks/services.html` по папкам `css/` и `js/`
- **Цель:** Облегчить файл `blocks/services.html`, оставив в нём только чистую HTML-разметку, а CSS и JS перенести в профильные папки.
- **Файлы:** `blocks/services.html`, `css/services.css` (создать), `js/services-modal.js` (создать), `index.html`.
- **Задачи:**
  1. Вынести все блоки `<style>...</style>` из `blocks/services.html` в отдельный файл `css/services.css`.
  2. Вынести скрипты анимации заголовка и модальных окон услуг из `blocks/services.html` в отдельный файл `js/services-modal.js`.
  3. Подключить `css/services.css` и `js/services-modal.js` в `index.html` (с атрибутом `defer` для скрипта).
- **Критерий готовности:** `blocks/services.html` содержит только чистый HTML; анимация заголовка «Мы гарантируем» и все 12 модальных окон услуг открываются так же плавно, как раньше.