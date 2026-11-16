// Инициализация Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация счетчиков
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
    
    // Функция анимации счетчиков
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            count += increment;
            if (count < target) {
                element.innerText = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                element.innerText = target;
            }
        };
        
        updateCounter();
    }
    
    // Модальное окно
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close');
    
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Калькулятор стоимости
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceType = document.getElementById('serviceType').value;
            const complexity = document.getElementById('complexity').value;
            const timeline = document.getElementById('timeline').value;
            
            // Простая логика расчета стоимости
            let basePrice = 0;
            switch(serviceType) {
                case 'website':
                    basePrice = 5000;
                    break;
                case 'app':
                    basePrice = 10000;
                    break;
                case 'seo':
                    basePrice = 3000;
                    break;
                default:
                    basePrice = 2000;
            }
            
            // Добавляем стоимость за сложность
            const complexityMultiplier = {
                'simple': 1,
                'medium': 1.5,
                'complex': 2
            };
            
            // Добавляем стоимость за сроки
            const timelineMultiplier = {
                'short': 1.2,
                'medium': 1,
                'long': 0.8
            };
            
            const finalPrice = basePrice * complexityMultiplier[complexity] * timelineMultiplier[timeline];
            
            // Отображаем результат
            document.getElementById('priceResult').innerHTML = 
                `Стоимость: ${finalPrice.toLocaleString()} руб.`;
        });
    }
    
    // Валидация форм
    const auditForm = document.getElementById('auditForm');
    const consultationForm = document.getElementById('consultationForm');
    
    if (auditForm) {
        auditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            this.reset();
            modal.style.display = 'none';
        });
    }
    
    // Добавляем эффекты при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(11, 15, 25, 0.98)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'rgba(11, 15, 25, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
});