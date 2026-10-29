$(window).on('load', function(){
    initMobileMenu();
    initScrollUpButton();
    initSubscribePopup();
    initSmoothScroll();
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

function initSmoothScroll() {
    $('a.menu_link').on('click', function(e) {
        var href = $(this).attr('href');

        // Реагируем только на внутренние якоря
        if (!href || href.charAt(0) !== '#' || href === '#') {
            return;
        }

        var $target = $(href);
        if (!$target.length) {
            return;
        }

        e.preventDefault();

        // Если открыто мобильное меню — закрываем его
        if ($('#menuButton').hasClass('active')) {
            $('#menuButton').removeClass('active');
            $('#menuContainer').removeClass('active');
        }

        var offsetTop = $target.offset().top;

        // На мобильных верхнее меню фиксировано и перекрывает контент
        if (window.matchMedia('(max-width: 640px)').matches) {
            offsetTop -= $('.mobile_menu_background').outerHeight() || 0;
        }

        $('html, body').animate({
            scrollTop: offsetTop
        }, 600);
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

    $form.on('submit', function(e) {
        if ($.trim($email.val()) === '') {
            e.preventDefault();
            $email.addClass('error');
        }
    });

    $email.on('focus click input', function() {
        $email.removeClass('error');
    });
}

function initMobileMenu() {
    $('#menuButton').on('click', function() {
        $('#menuButton').toggleClass('active');
        $('#menuContainer').toggleClass('active');
    });
}