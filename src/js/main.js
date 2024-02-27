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
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.menu__link, .btn_close, .backdrop').click(function (e) {
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    // SMOOTH SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href');

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top + 50
                }, 3000);
            }
        });
    }

    smoothScrollToAnchor('.menu__item a');

    //SLIDER
    if ($('.slider-components').length > 0) {
        const sliderComponents = new Swiper(".slider-components", {
            pagination: {
                el: ".section-about .part_right .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    direction: 'horizontal',
                    slidesPerView: 1,
                },
                1025: {
                    direction: 'vertical',
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
            }
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
                opacity: 1,
            })
        }
    }

    const bannerImg1 = document.querySelector('.img-banner_1');
    const bannerImg2 = document.querySelector('.img-banner_2');
    const disclaimerMain = document.querySelector('.disclaimer-main');

    if (bannerImg1) {
        gsap.fromTo(bannerImg1, {
            x: 500,
            duration: -1,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power1.out',
            duration: 1.2,
            delay: 0.2
        })
    }
    if (bannerImg2) {
        gsap.fromTo(bannerImg2, {
            x: 500,
            duration: -1,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power.out',
            duration: 1.1,
            delay: 0.35
        })
    }
    if (disclaimerMain) {
        gsap.fromTo(disclaimerMain, {
            y: 120,
            duration: -1,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power1.out',
            duration: 1.2,
            delay: 0.25
        });
    }


    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    let panel = document.querySelector(".panel");
// let tops=


    let sectionSymp = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-symptom',
            start: 'top bottom',
            end: 'top top',
            pin: true,

        }
    });
    gsap.fromTo(' .img_1',
        {
            y: 100,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            ease: 'power1.out',

            scrollTrigger: {
                trigger: ".section-symptoms",
                scrub: 3,
                // markers: true,
                // pin: true,
                start: "top 70%",
                end: 'bottom 70%'
            },
        },
    )
    gsap.fromTo('.block-bg',
        {
            y: 100,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power1.out',

            scrollTrigger: {
                trigger: ".section-symptoms",
                scrub: 3,
                // markers: true,
                // pin: true,
                start: "top 25%",
                end: 'bottom 70%'
            },
        },
    )

    gsap.fromTo('.img-ellipse_warm',
        {
            y: 100,
            opacity: 0,
            // duration: -1,
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: ".section-symptoms",
                scrub: 3,
                start: "top 15%",
                end: 'bottom 70%'
            },

        },
    )
    gsap.fromTo('.img-ellipse_green',
        {
            y: 100,
            opacity: 0,
            // duration: -1,
        },
        {
            y: 0,
            opacity: 1,
            // stagger: 0.1,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: ".section-symptoms",
                scrub: 3,
                start: "top 15%",
                end: 'bottom 70%'
            },
        },
    )
    gsap.fromTo('.symptoms .card',
        {
            opacity: 0,
            duration: -1,
        },
        {
            opacity: 1,
            stagger: 0.8,
            ease: 'power1.in',
            duration: 2,
            scrollTrigger: {
                trigger: ".section-symptoms",
                scrub: 3,
                start: "top top",
                end: '-=50',
            },
        },
    )
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-symptoms",
            scrub: 3,
            start: "top top",
            end: 'top bottom'
        }
    });

    tl1.fromTo('.section-symptoms .section__title',
        {
            y: 100,
            opacity: 0,
            duration: -1,
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.4,
            ease: 'power1.out',
            duration: 2.2,
        },
        .8
    ).fromTo('.dot',
        {
            y: 50,
            opacity: 0,
            duration: -1,
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.4,
            ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            duration: 1.2,
        },
        .9
    )
    ScrollTrigger.refresh();

});




