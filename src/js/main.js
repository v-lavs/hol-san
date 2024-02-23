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


});



