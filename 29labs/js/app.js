document.addEventListener("DOMContentLoaded", () => {
    const promoWrapper = document.getElementById('promoWrapper');
    const popup = document.getElementById('agePopup');
    const input = document.getElementById('userAgeInput');
    const btn = document.getElementById('saveAgeBtn');

    function applyAgeBackground(age) {
        promoWrapper.classList.remove('aquapark', 'club');
        
        if (age < 16) {
            promoWrapper.classList.add('aquapark');
        } else if (age >= 16 && age <= 35) {
            promoWrapper.classList.add('club');
        } 
    }

    const savedAge = localStorage.getItem('sellyUserAge');

    if (savedAge) {
        applyAgeBackground(parseInt(savedAge));
    } else {
        setTimeout(() => {
            popup.classList.add('active');
        }, 1500);
    }

    btn.addEventListener('click', () => {
        const ageValue = input.value.trim();
        const age = parseInt(ageValue);

        if (!isNaN(age) && age > 0 && age < 120) {
            localStorage.setItem('sellyUserAge', age);
            applyAgeBackground(age);
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