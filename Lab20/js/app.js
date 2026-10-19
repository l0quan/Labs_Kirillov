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
    const nameInput = document.getElementById('subscriptionName');
    const emailInput = document.getElementById('subscriptionEmail');
    const periodSelect = document.getElementById('subscriptionPeriod');
    const topicInputs = form.querySelectorAll('input[name="topics"]');
    const topicsGroup = form.querySelector('.subscription_options');
    const status = document.getElementById('subscriptionStatus');
    const button = form.querySelector('.subscription_button');
    const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(container, text) {
        container.querySelector('.subscription_message').textContent = text;
        container.classList.toggle('is_error', Boolean(text));
    }

    function setStatus(text, type) {
        status.textContent = text;
        status.classList.toggle('is_error', type === 'error');
    }

    function getTopics() {
        return Array.prototype.filter.call(topicInputs, function(input) {
            return input.checked;
        }).map(function(input) {
            return input.value;
        });
    }

    // Как только пользователь правит поле, убираем его ошибку и общее сообщение
    [nameInput, emailInput].forEach(function(input) {
        input.addEventListener('input', function() {
            setError(input.parentNode, '');
            setStatus('', null);
        });
    });
    Array.prototype.forEach.call(topicInputs, function(input) {
        input.addEventListener('change', function() {
            setError(topicsGroup, '');
            setStatus('', null);
        });
    });
    periodSelect.addEventListener('change', function() {
        setStatus('', null);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const topics = getTopics();
        let firstInvalid = null;

        function fail(container, control, text) {
            setError(container, text);
            firstInvalid = firstInvalid || control;
        }

        setError(nameInput.parentNode, '');
        setError(emailInput.parentNode, '');
        setError(topicsGroup, '');
        setStatus('', null);

        if (!name) {
            fail(nameInput.parentNode, nameInput, 'Введите ваше имя');
        }
        if (!email) {
            fail(emailInput.parentNode, emailInput, 'Введите email');
        } else if (!EMAIL_REGEXP.test(email)) {
            fail(emailInput.parentNode, emailInput, 'Проверьте адрес: он должен выглядеть как name@example.com');
        }
        if (!topics.length) {
            fail(topicsGroup, topicInputs[0], 'Выберите хотя бы одну тему');
        }
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        const data = {
            name: name,
            email: email,
            period: periodSelect.value, // weekly | biweekly | monthly
            topics: topics              // promo | blog
        };

        button.disabled = true;

        // Здесь отправка данных на сервер. Замените вызов onSuccess() на свой запрос, например:
        // fetch(form.action, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(data)
        // }).then(onSuccess).catch(onError);
        onSuccess();

        function onSuccess() {
            form.reset();
            button.disabled = false;
            setStatus('Спасибо, ' + data.name + '! Вы подписались на рассылку', 'success');
        }

        function onError() {
            button.disabled = false;
            setStatus('Не удалось отправить. Попробуйте ещё раз', 'error');
        }
    });
}
