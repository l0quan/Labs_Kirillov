window.addEventListener('load', function() {
    setBodyLoaded();
    setGoodsBlockLoaded();
    initSubscriptionForm();
});

function setBodyLoaded() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('loaded');
}

function setGoodsBlockLoaded() {
    let reached = false;
    const GOODS_BLOCK_OFFSET = 300;
    const goodsBlock = document.getElementById('goodsBlock');
    const goodsBlockOffset = goodsBlock.offsetTop;
    const windowHeight = window.innerHeight;
    
    window.addEventListener('scroll', function() {
        let scrolled = window.pageYOffset;
        if (scrolled + windowHeight > goodsBlockOffset + GOODS_BLOCK_OFFSET) {
            if (!reached) {
                goodsBlock.classList.add('goods_block_loaded');
                reached = true;
            }
            
        }
    })
}

function initSubscriptionForm() {
    const form = document.getElementById('subscriptionForm');
    if (!form) {
        return;
    }
    const input = document.getElementById('subscriptionEmail');
    const message = document.getElementById('subscriptionMessage');
    const field = input.parentNode;
    const button = form.querySelector('.subscription_button');
    const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function showMessage(text, type) {
        message.textContent = text;
        field.classList.remove('is_error', 'is_success');
        if (type) {
            field.classList.add('is_' + type);
        }
    }

    input.addEventListener('input', function() {
        showMessage('', null);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = input.value.trim();

        if (!email) {
            showMessage('Введите email', 'error');
            input.focus();
            return;
        }
        if (!EMAIL_REGEXP.test(email)) {
            showMessage('Проверьте адрес: он должен выглядеть как name@example.com', 'error');
            input.focus();
            return;
        }

        button.disabled = true;

        // Здесь отправка адреса на сервер. Замените блок на свой запрос, например:
        // fetch(form.action, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({email: email})
        // }).then(onSuccess).catch(onError);
        onSuccess();

        function onSuccess() {
            input.value = '';
            button.disabled = false;
            showMessage('Спасибо! Вы подписались на рассылку', 'success');
        }

        function onError() {
            button.disabled = false;
            showMessage('Не удалось отправить. Попробуйте ещё раз', 'error');
        }
    });
}
