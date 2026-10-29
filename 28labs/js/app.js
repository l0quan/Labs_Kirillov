document.addEventListener("DOMContentLoaded", () => {
    
    // находим элемент
    const promoTitle = document.getElementById('promoTitle');
    const popup = document.getElementById('namePopup');
    const input = document.getElementById('userNameInput');
    const btn = document.getElementById('saveNameBtn');

    // обновляем заголовок
    function updateTitle(name) {
        const greetingName = name ? name : 'мой друг';
        promoTitle.innerText = `Привет, ${greetingName}! Добро пожаловать на сайт группы отелей Selly Hotels!`;
    }

    // проверяем имя
    const savedName = localStorage.getItem('sellyClientName');

    if (savedName) {
        updateTitle(savedName);
    } else {
        setTimeout(() => {
            popup.classList.add('active');
        }, 1500);
    }

    // обработка нажатия
    btn.addEventListener('click', () => {
        const name = input.value.trim();

        if (name) {
            localStorage.setItem('sellyClientName', name);
            updateTitle(name);
            popup.classList.remove('active');
        } else {
            input.style.borderColor = '#e74c3c';
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });
    
    input.addEventListener('input', () => {
        input.style.borderColor = '#ccc';
    });
});