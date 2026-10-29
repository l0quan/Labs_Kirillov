$(window).on('load', function(){
    initMobileMenu();
    initScrollUpButton();
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

function initMobileMenu() {
    $('#menuButton').on('click', function() {
        $('#menuButton').toggleClass('active');
        $('#menuContainer').toggleClass('active');
    });
}