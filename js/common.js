$('.btn-burger').click(function() {
    $('.overlay').fadeIn();
    $('.mobile-menu').fadeIn();
});

$('.btn-close').click(function() {
    $('.mobile-menu').fadeOut();
    $('.overlay').fadeOut();
});

$('.dropItem').click(function() {
    $(this).find('.dropDown-menu').fadeToggle();
});

$(document).mouseup(function(e) { // событие клика по веб-документу
    let div = $(".dropItem"); // тут указываем ID элемента
    if (!div.is(e.target) && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.find('.dropDown-menu').fadeOut(); // скрываем его
    }
});


$('.tooltip-wrapper').hover(function() {
    $(this).find('.tooltip-hidden').fadeToggle();
});


$('.works-slider').slick({
    slidesToShow: 1,
    dots: true,
    appendArrows: '.works-slider__nav',
    appendDots: '.works-slider__nav',
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>'
});

$('.signal-algorithms__slider').slick({
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    fade: true,
    appendArrows: '.signal-algorithms__slider-nav',
    appendDots: '.signal-algorithms__slider-nav',
});

$('.indicators-slider').slick({
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    fade: true,
    appendArrows: '.indicators-slider-nav',
    appendDots: '.indicators-slider-nav',
});

$('.tools-slider').slick({
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    fade: true,
    appendArrows: '.tools-slider-nav',
    appendDots: '.tools-slider-nav',
});

$('.binary-slider').slick({
    slidesToShow: 1,
    dots: true,
    appendArrows: '.binary-slider-nav',
    appendDots: '.binary-slider-nav',
    prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-left"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-right"></use></svg></button>',
});

$('.reviews-cripto-slider').slick({
    slidesToShow: 4,
    dots: true,
    appendArrows: '.reviews-cripto-slider-nav',
    appendDots: '.reviews-cripto-slider-nav',
    prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-left-new"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-right-new"></use></svg></button>',
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 840,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
            }
        }

    ]
});

$('.best-forex-slider').slick({
    slidesToShow: 1,
    dots: true,
    fade: true,
    appendArrows: '.best-forex-slider-nav',
    appendDots: '.best-forex-slider-nav',
    prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-left-new"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="img/sprite.svg#arrow-right-new"></use></svg></button>',
});

$('.main-history__content').click(function() {
    $(this).toggleClass('open').find('.main-history__info').slideToggle();
});


$('.playpause').click(function() {
    $('.video-wrapper').toggleClass('video-click');

    if ($(".fullscreen-video").get(0).paused) {
        $(".fullscreen-video").get(0).play();
        $(this).fadeOut();

    } else {
        $(".fullscreen-video").get(0).pause();

        $(this).fadeIn();
    }

});

// service
$('.service-content').each(function() {
    if ($(this).height() > 2430) {
        $(this).addClass('hidden');
        $(this).parents('.service-content__wrapper').append('<div class="btn-load"><span>Read more</span></div>');
    }
});

$('.btn-load').click(function() {
    $('.service-content').removeClass('hidden');
    $(this).fadeOut();
});

$('.btn-dropList').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('click').parents('.license-box').find('.license-box-footer').slideToggle();
});

$('.go_to').click(function() {
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
        $('html, body').animate({
            scrollTop: $(scroll_el).offset().top
        }, 500);
    }
    return false;
});


// click tab = visible block
$(".js-tab-trigger").on("click", function() {
    let id = $(this).attr('data-tab'),
        content = $('.js-tab-content[data-tab="' + id + '"]');

    $('.js-tab-trigger.active').removeClass('active'); // 1
    $(this).addClass('active'); // 2

    $('.js-tab-content.active').removeClass('active'); // 3
    content.addClass('active'); // 4
});


$('.label-radio-variable').on('click', function() {
    $('.label-radio-variable').removeClass('active');
    $(this).addClass('active');
});

// function get_name_browser(){
//     // получаем данные userAgent
//     var ua = navigator.userAgent;
//     // с помощью регулярок проверяем наличие текста,
//     // соответствующие тому или иному браузеру
//     if (ua.search(/Chrome/) > 0) {
//         $('.navigation-box3').css('display', 'flex');
//         $('.navigation-box1').css('display', 'none');
//     }
//     // if (ua.search(/Firefox/) > 0) return 'Firefox';
//     if (ua.search(/Opera/) > 0) {
//         $('.navigation-box3').css('display', 'none');
//         $('.navigation-box1').css('display', 'flex');
//     }
//     // if (ua.search(/Safari/) > 0) return 'Safari';
//     // if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
//     // условий может быть и больше.
//     // сейчас сделаны проверки только
//     // для популярных браузеров
//     // return 'Не определен';
// }
//
// get_name_browser();

if (navigator.userAgent.search(/Chrome/) > 0) {
    $('.navigation-box3').css('display', 'flex');
    $('.navigation-box1').css('display', 'none');
}

if (navigator.userAgent.search(/OPR/) > 0) {
    $('.navigation-box3').css('display', 'none');
    $('.navigation-box1').css({
        display: 'flex',
        right: '35px'
    });
    $('#modalDownload .close').css({
        right: 'auto',
        left: '54px'
    })
}

if (navigator.userAgent.search(/Firefox/) > 0) {
    $('.navigation-box1').css({
        right: '195px'
    });
}


// animate number
var target = $('.benefits__inner');
if (target.offset()) {
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;
    $(window).scroll(function() {
        var winScrollTop = $(this).scrollTop();
        if (winScrollTop > scrollToElem) {
            $({
                blurRadius: 5
            }).animate({
                blurRadius: 0
            }, {
                duration: 3500,
                easing: "swing",
            });
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(
                " "
            );
            $(".benefits__number").each(function() {
                var tcount = $(this).data("count");
                $(this).animateNumber({
                        number: tcount,
                        easing: "easeInQuad",
                        numberStep: comma_separator_number_step
                    },
                    1000
                );
            });
        }
    });
}


// timer
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

// function initializeClock(id, endtime) {
//     var clock = document.getElementById(id);
//     var daysSpan = clock.querySelector('.days');
//     var hoursSpan = clock.querySelector('.hours');
//     var minutesSpan = clock.querySelector('.minutes');
//     var secondsSpan = clock.querySelector('.seconds');

//     function updateClock() {
//         var t = getTimeRemaining(endtime);

//         daysSpan.innerHTML = t.days;
//         hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//         minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//         secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

//         if (t.total <= 0) {
//             clearInterval(timeinterval);
//         }
//     }

//     updateClock();
//     var timeinterval = setInterval(updateClock, 1000);
// }

// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
// initializeClock('countdown', deadline);