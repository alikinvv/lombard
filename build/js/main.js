$('body').on('click', 'a[data-tab]', (e) => {
    $('.tabs__nav a').removeClass('active');
    $('.tabs__item').removeClass('active');
    $(e.currentTarget).addClass('active');
    $(`.tabs__item[data-tab="${$(e.currentTarget).attr('data-tab')}"]`).addClass('active');
});

let openModal = (e) => {
    $('.modal').removeClass('active');
    $('.modals').addClass('active').attr(`data-open`, $(e.currentTarget).attr('data-modal'));
    $(`.modal[data-modal="${$(e.currentTarget).attr('data-modal')}"]`).addClass('active');
    $('html, body').addClass('overflow');
}

$('body').on('click', 'a[data-modal]', (e) => {
    if ($(window).width() >= 1280) {
        openModal(e);
    } else {
        if ($(e.currentTarget).attr('data-modal') !== 'contract') {
            openModal(e);
        } else {
            if ($(window).width() >= 1024) {
                $('.tabs, h2, .menu a').fadeOut('300', () => {
                    if ($('.back').length === 0) {
                        $('.menu .container').append($('.modal[data-modal="contract"] .modal__title'));
                        $('.menu .container').append('<img class="back" alt="" src="img/slider.svg">');
                    }
                });
            } else {
                $('.tabs, h2, .contacts a, .contacts div').fadeOut('300', () => {
                    if ($('.back').length === 0) {
                        $('.contacts').append($('.modal[data-modal="contract"] .modal__title'));
                        $('.contacts').append('<img class="back" alt="" src="img/slider.svg">');
                    }
                });
            }
            
            $('.mobile .container').append($('.modal[data-modal="contract"]').html());
            $('.mobile').addClass($(e.currentTarget).attr('data-modal'));
        }
    }
});

$('body').on('click', '.back', () => {
    if ($(window).width() >= 1024) {
        $('.tabs, h2, .menu a').fadeIn();
        $('.modal[data-modal="contract"]').prepend($('.menu .container .modal__title'));
    } else {
        $('.tabs, h2, .contacts a, .contacts div').fadeIn();
        $('.modal[data-modal="contract"]').prepend($('.contacts .modal__title'));
    }

    $('.back').remove();
    $('.mobile .container').html('');
    $('.mobile').removeAttr('class').addClass('mobile');
});

$('body').on('click', '.modal__close', (e) => {
    $('.modals').removeClass('active').attr('data-open', '');
    $('.modal').removeClass('active');
    $('html, body').removeClass('overflow');
});

$('body').on('click', '.modals', (e) => {
    if ($(e.target).is('.modals')) {
        $('.modals').removeClass('active').attr('data-open', '');
        $('.modal').removeClass('active');
        $('html, body').removeClass('overflow');
    }
});

let rangeSlider = document.getElementById('slider-range');

noUiSlider.create(rangeSlider, {
    start: [100000],
    connect: [true, false],
    range: {
        'min': [100],
        'max': [1200000]
    },
    pips: {
        mode: 'steps',
        density: 2
    },
    format: wNumb({
        decimals: 0
    }),
});

let rangeSliderValueElement = document.getElementById('slider-range-value');

rangeSlider.noUiSlider.on('update', (values, handle) => {
    rangeSliderValueElement.value = values[handle] + ' ₽';
});

rangeSliderValueElement.addEventListener('change', () => {
    rangeSlider.noUiSlider.set([null, this.value]);
});

let bonus = document.getElementById('bonus');

noUiSlider.create(bonus, {
    start: [700],
    connect: [true, false],
    range: {
        'min': [1],
        'max': [700]
    },
    pips: {
        mode: 'steps',
        density: 2
    },
    format: wNumb({
        decimals: 0
    }),
});

let bonusValue = document.getElementById('bonus-value');

bonus.noUiSlider.on('update', (values, handle) => {
    bonusValue.value = values[handle] + ' ₽';
});

rangeSliderValueElement.addEventListener('change', () => {
    bonusValue.noUiSlider.set([null, this.value]);
});

$('body').on('submit', 'form', (e) => {
    e.preventDefault();
});

$('body').on('change', '#bonus-checkbox', () => {
    $('.hidden').slideToggle();
});

if ($(window).width() >= 768) {
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            769: {
                slidesPerView: 2,
                centeredSlides: true,
            },
        }
    });

    if ($(window).width() <= 1023) {
        swiper.slideTo(1, false,false);
    }
}

$('.tabs__item:not(:first)').removeClass('active');

$('body').on('click', '.profile .btn:not(.edit)', (e) => {
    $('.profile input').addClass('edit');
    $(e.currentTarget).addClass('edit').text('Сохранить');
});

$('body').on('click', '.profile .btn.edit', (e) => {
    $('.profile input').removeClass('edit');
    $(e.currentTarget).removeClass('edit').text('Изменить данные');
});

$('input[name="phone"]').mask('+7 (000) 000-00-00', { placeholder: "Телефон" });
$('input[name="code"]').mask('00000', { placeholder: "-----" });

$('body').on('blur', 'input[name="code"]', (e) => {
    $(e.currentTarget).addClass('error').next('p').find('span').remove();
    $(e.currentTarget).addClass('error').next('p').prepend('<span>Не верный смс-код!</span>');
});

let changeView = () => {
    if ($(window).width() <= 1023 && $('.hamburger').length === 0) {
        $('.header').after('<div class="contacts"></div>');
        $('.contacts').append($('.header__menu > .header__menu-item'));
        $('.header__logo-text').html('<span>Ювелирный <br> ломбард</span>');
        $('.header .container').append('<div class="hamburger"><span></span></div>');
    } else if ($(window).width() > 1023  && $('.hamburger').length > 0) {
        $('.hamburger').remove();
        $('.header__menu').append($('.contacts > .header__menu-item'));
        $('.contacts').remove();
    }
}

if ($(window).width() <= 1023) {
    changeView();
}

$(window).on('resize', changeView);

$('body').on('click', '.hamburger', (e) => {
    $(e.currentTarget).toggleClass('active');
    $('.menu').toggleClass('active');
    $('html, body').toggleClass('overflow');
});

$('body').on('click', '.close-menu', () => {
    $('.hamburger').toggleClass('active');
    $('.menu').removeClass('active');
});