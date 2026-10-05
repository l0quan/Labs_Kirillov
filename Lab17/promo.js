// Сколько миллисекунд показывать прелоадер.
// 3000 = 3 секунды. Увеличь, если хочешь, чтобы GIF крутился дольше.
var PRELOADER_DURATION = 3000;

function hidePreloader() {
    var body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('loaded')) {
        body.classList.add('loaded');
    }
}

// Скрываем прелоадер по таймеру после загрузки страницы
window.addEventListener('load', function() {
    setTimeout(hidePreloader, PRELOADER_DURATION);
});

// Подстраховка на случай, если load не сработает
setTimeout(hidePreloader, PRELOADER_DURATION + 3000);