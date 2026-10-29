$(window).on('load', function(){
    initMobileMenu();
    initScrollUpButton();
    initSubscribePopup();
    toggleScrollUpButton();
});

$(window).on('scroll', function() {
    toggleScrollUpButton();
});

function toggleScrollUpButton() {
    var TOP_OFFSET = 400;

    if ($(window).scrollTop() > $(window).height() - TOP_OFFSET) {
        $('#scrollUpArrow').addClass('visible');
    }
    else {
        $('#scrollUpArrow').removeClass('visible');
    }
}

function initScrollUpButton() {
    $('#scrollUpArrow').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });
}

function initSubscribePopup() {
    var $overlay = $('#overlay');
    var $popup   = $('#popupWindow');

    function openPopup() {
        $overlay.addClass('visible');
        $popup.addClass('visible');
    }

    function closePopup() {
        $overlay.removeClass('visible');
        $popup.removeClass('visible');
    }

    $('#subscribePopupButton').on('click', function(e) {
        e.preventDefault();
        openPopup();
    });

    $('#closeButton').on('click', function() {
        closePopup();
    });

    $overlay.on('click', function() {
        closePopup();
    });

    // Закрытие по Esc — приятный бонус для пользователей
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $popup.hasClass('visible')) {
            closePopup();
        }
    });
}

function initMobileMenu() {
    $('#menuButton').on('click', function() {
        $('#menuButton').toggleClass('active');
        $('#menuContainer').toggleClass('active');
    });
}
function initSubscribePopup() {
    var $overlay = $('#overlay');
    var $popup   = $('#popupWindow');
    var $form    = $popup.find('.order_form');
    var $email   = $form.find('input[name="email"]');

    function openPopup() {
        $overlay.addClass('visible');
        $popup.addClass('visible');
    }

    function closePopup() {
        $overlay.removeClass('visible');
        $popup.removeClass('visible');
        $email.removeClass('error');
    }

    $('#subscribePopupButton').on('click', function(e) {
        e.preventDefault();
        openPopup();
    });

    $('#closeButton').on('click', function() {
        closePopup();
    });

    $overlay.on('click', function() {
        closePopup();
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $popup.hasClass('visible')) {
            closePopup();
        }
    });

    // Валидация формы
    $form.on('submit', function(e) {
        if ($.trim($email.val()) === '') {
            e.preventDefault();
            $email.addClass('error');
        }
    });

    // Снимаем подсветку при взаимодействии с полем
    $email.on('focus click input', function() {
        $email.removeClass('error');
    });
}