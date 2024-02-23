/*
* to include js file write: `//= include ./path-to-file`
* */
//= include ../lib/jquery.min.js ;
//= include ../lib/swiper/swiper-bundle.min.js

// CUSTOM SCRIPTS

$(document).ready(function () {

    // MOBILE MENU
    const nav = $('.header__nav');

    $('.btn-burger').click(function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        jQuery('.backdrop').fadeToggle();
    });

    $('.menu__link, .backdrop').click(function (e) {
        $('.btn-burger').removeClass('open');
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });


    //SLIDER
    if ($('.slider-components').length > 0) {
        const sliderComponents = new Swiper(".slider-components", {
            direction: "vertical",
            pagination: {
                el: ".section-about .part_right .swiper-pagination",
                clickable: true,
            },
        });
    }

//ACCORDION
    const accordionList = document.querySelectorAll(".accordion__item");

    accordionList.forEach((event) =>
        event.addEventListener("click", () => {
            if (event.classList.contains("active")) {
                event.classList.remove("active");
            } else {
                accordionList.forEach((event2) => event2.classList.remove("active"));
                event.classList.add("active");
            }
        })
    );

    // Banner letters
    const bannerTitle = document.querySelector('.section-banner .section__title');
    if (bannerTitle) {
        const text = bannerTitle.innerText;
        const htmlText = text.split('').map(letter => {
            if (letter.trim()) {
                return '<span class="section-banner__title-letter">' + letter + '</span>';
            }
            return letter;
        }).join('');

        bannerTitle.innerHTML = htmlText;
        const chars = document.querySelectorAll('.section-banner__title-letter');

        if (chars) {
            gsap.fromTo(chars, {opacity: 0.6}, {
                stagger: 0.075,
                ease: 'back.in',
                duration: 0.01,
                opacity:1,
            })
        }
    }
    const bannerImg = document.querySelector('.section-banner__wrap-img');

    if(bannerImg) {
        gsap.fromTo(bannerImg, {
            x: 500,
            duration: -1,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power.out',
            duration: 1.2,
            delay: 0.2
        })
    }

});



