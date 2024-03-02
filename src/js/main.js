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
    let currentSlideRes = document.querySelector('.current-slide');
    let result = document.querySelector('.total');
    if ($('.slider-components').length > 0) {
        const sliderComponents = new Swiper(".slider-components", {
            parallax: true,
            speed: 2000,
            slidesPerView: 1,
            delay: 10000,
            // autoplay: {
            //     delay: 3000
            // },
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
            },
        });
        result.innerHTML = '0' + sliderComponents.slides.length;

        sliderComponents.on('slideChange', function () {
            let currentSlide = (sliderComponents.realIndex);
            currentSlideRes.innerHTML = '0' + (currentSlide + 1);
        })
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


    // ------------------------------------------GSAP----------------------

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

    function bannerAnimation() {
        // Banner letters
        const bannerTitle = document.querySelector('.section-banner .section__title');

        const text = bannerTitle.innerText;
        const htmlText = text.split('').map(letter => {
            if (letter.trim()) {
                return '<span class="section-banner__title-letter">' + letter + '</span>';
            }
            return letter;
        }).join('');

        bannerTitle.innerHTML = htmlText;

        const chars = document.querySelectorAll('.section-banner__title-letter');

        const bannerImg1 = document.querySelector('.img-banner_1');
        const bannerImg2 = document.querySelector('.img-banner_2');

        const timeline = gsap.timeline({});

        const banner_img_defaultProps = {
            x: 500,
            duration: -1,
            opacity: 0
        };

        timeline.fromTo(chars, {opacity: 0.6}, {
            stagger: 0.075,
            ease: 'back.in',
            duration: 0.01,
            opacity: 1,
        });

        timeline.fromTo(bannerImg1, banner_img_defaultProps, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power1.out',
            duration: 1.2,
            delay: 0.2
        }, '<');

        timeline.fromTo(bannerImg2, banner_img_defaultProps, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power.out',
            duration: 1.1,
            delay: 0.15
        }, '<');
    }

    bannerAnimation();

    function bannerOutAnim() {
        const bannerGoOutStage = gsap.to(
            '.section-banner .container', {
                opacity: 0,
                yPercent: -100,
            })

        ScrollTrigger.create({
            animation: bannerGoOutStage,
            trigger: document.querySelector('.section-effects'),
            end: "bottom center",
            scrub: 0.1,
            immediateRender: true,
        });

        const banner = document.querySelector('.section-banner');

        ScrollTrigger.create({
            trigger: '.section-banner',
            start: () => banner.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
            pin: true,
            pinSpacing: false
        });
    }

    bannerOutAnim();

    function sectionEffectsIntroAnim() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#action',
                pin: true,
                scrub: 1.5,
                start: "top+=10% top", // when the top of the trigger hits the top of the viewport
                end: "bottom top+=20%",
                // markers: true
            }
        });

        timeline.to('.effects .card__thumb', {
            yPercent: 50,
        });

        timeline.to(".section-effects .card__text", {
            opacity: 0
        }, "<");

        timeline.to('.effects', {
            scale: 0.45,
            opacity: 0,
        });

        timeline.to('.section-effects .effects__pill',
            {x: 0,},
            "<"
        );

        timeline.to('.section-effects .pill-side',
            {width: 0},
            "<"
        );
    }

    sectionEffectsIntroAnim();

    function symptomsAnim() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-symptoms .container',
                start: 'top-=40% top',
                end: 'center bottom',
                pin: true,
                duration: 3,
                scrub: 6,
                // markers: true
            }
        });

        const defaultPositionProps = {
            y: 100,
            opacity: 0,
        };

        timeline.fromTo('.img_1',
            defaultPositionProps,
            {
                y: 0,
                opacity: 1,
                ease: 'power1.out',
            },
        );

        timeline.fromTo('.block-bg',
            defaultPositionProps,
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                ease: 'power1.out',
            },
            '<60%'
        );

        timeline.fromTo('.img-ellipse',
            defaultPositionProps,
            {
                y: 0,
                opacity: 1,
                duration: 0.35,
                stagger: 0.25,
                ease: 'power1.out',
            }, '<10%',
        );

        timeline.fromTo('.section-symptoms .section__title',
            defaultPositionProps,
            {
                y: 0,
                opacity: 1,
                stagger: 0.4,
                ease: 'power1.out',
                duration: 2.2,
            }, '<60%');

        timeline.fromTo('.dot',
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.3,
                duration: 1.2,
            },
            '<'
        );

        timeline.fromTo(".symptoms .card",
            {
                opacity: 0,
                duration: -1,
            },
            {
                opacity: 1,
                stagger: 0.2,
                ease: 'power1.in',
            }, '<');
    }

    symptomsAnim();


    // gsap.registerPlugin(ScrollTrigger);
    //
    // gsap.to('.disclaimer-main', {
    //     toggleClass: '.hide',
    //     scrollTrigger: {
    //         trigger: '.footer',
    //         start: 'bottom bottom',
    //         end: 'center center',
    //         scrub: true
    //     }
    // });

    //
    // const sections = gsap.utils.toArray(".section .dark");
    // const dickl = document.getElementsByClassName("disclaimer-main");
    //
    // function changeColor(sec) {
    //     if (getComputedStyle(sec).backgroundColor === "rgb(255, 255, 255)") {
    //         dickl.classList.add("color-change");
    //
    //     } else {
    //         dickl.classList.remove("color-change");
    //     }
    // }
    //
    // sections.forEach((section) => {
    //     ScrollTrigger.create({
    //         trigger: section,
    //         start: "bottom top",
    //         end: "bottom bottom",
    //         onEnter: () => changeColor(section),
    //         onEnterBack: () => changeColor(section),
    //     });
    // });
    //
    // //--------------------------------------------SECT BANNER ------------------------
    //
    // // Banner letters
    // const bannerTitle = document.querySelector('.section-banner .section__title');
    // if (bannerTitle) {
    //     const text = bannerTitle.innerText;
    //     const htmlText = text.split('').map(letter => {
    //         if (letter.trim()) {
    //             return '<span class="section-banner__title-letter">' + letter + '</span>';
    //         }
    //         return letter;
    //     }).join('');
    //
    //     bannerTitle.innerHTML = htmlText;
    //     const chars = document.querySelectorAll('.section-banner__title-letter');
    //
    //     if (chars) {
    //         gsap.fromTo(chars, {opacity: 0.6}, {
    //             stagger: 0.075,
    //             ease: 'back.in',
    //             duration: 0.01,
    //             opacity: 1,
    //         })
    //     }
    // }
    //
    // const bannerImg1 = document.querySelector('.img-banner_1');
    // const bannerImg2 = document.querySelector('.img-banner_2');
    // const disclaimerMain = document.querySelector('.disclaimer-main');
    //
    // if (bannerImg1) {
    //     gsap.fromTo(bannerImg1, {
    //         x: 500,
    //         duration: -1,
    //         opacity: 0
    //     }, {
    //         x: 0,
    //         opacity: 1,
    //         stagger: 0.2,
    //         ease: 'power1.out',
    //         duration: 1.2,
    //         delay: 0.2
    //     })
    // }
    // if (bannerImg2) {
    //     gsap.fromTo(bannerImg2, {
    //         x: 500,
    //         duration: -1,
    //         opacity: 0
    //     }, {
    //         x: 0,
    //         opacity: 1,
    //         stagger: 0.2,
    //         ease: 'power.out',
    //         duration: 1.1,
    //         delay: 0.35
    //     })
    // }
    // if (disclaimerMain) {
    //     gsap.fromTo(disclaimerMain, {
    //         y: 120,
    //         duration: -1,
    //         opacity: 0
    //     }, {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.2,
    //         ease: 'power1.out',
    //         duration: 1.2,
    //         delay: 0.25
    //     });
    // }
    //
    // const banner = document.querySelector('.section-banner');
    // const bannerContainer = document.querySelector('.section-banner .container');
    // const bannerGoOutStage = gsap.to(
    //     bannerContainer, {
    //         opacity: 0,
    //         yPercent: -100,
    //     })
    //
    // ScrollTrigger.create({
    //     animation: bannerGoOutStage,
    //     trigger: document.querySelector('.section-effects'),
    //     end: "bottom center",
    //     scrub: 0.1,
    //     immediateRender: true,
    // });
    //
    // ScrollTrigger.create({
    //     trigger: banner,
    //     start: () => banner.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
    //     pin: true,
    //     pinSpacing: false
    // });
    //
    // //----------------------------------------SECT EFFECT---------------
    //
    // const sectionEffects = document.querySelector('.section-effects');
    // ScrollTrigger.create({
    //     trigger: sectionEffects,
    //     start: 'top top', // if it's shorter than the viewport, we prefer to pin it at the top
    //     pin: true,
    //     scrub: true,
    //     end: "bottom+=200% 200%",
    // });
    // gsap.to('.section-effects .card__thumb',
    //     {
    //         yPercent: 50,
    //         pin: true,
    //         scrollTrigger: {
    //             trigger: ".section-effects",
    //             start: 'top top',
    //             end: 'bottom center',
    //             scrub: 3,
    //         }
    //     })
    // gsap.to(".section-effects .card__text",
    //     {
    //         opacity: 0,
    //         scrollTrigger: {
    //             trigger: ".section-effects",
    //             start: 'top top',
    //             end: 'bottom center',
    //             scrub: 3,
    //         }
    //     }, "-=1");
    //
    // gsap.to('.section-effects .effects',
    //     {
    //         scale: 0.45,
    //         opacity: 0,
    //         delay: 2.5,
    //         ease: 'circ.inOut',
    //         scrollTrigger: {
    //             trigger: ".section-effects",
    //             scrub: 3,
    //             start: "center 70%",
    //             end: 'bottom top',
    //
    //         }
    //     },
    // )
    // gsap.to('.section-effects .effects__pill',
    //     {
    //         x: 0,
    //         ease: 'circ.inOut',
    //         scrollTrigger: {
    //             trigger: ".section-effects",
    //             scrub: 3,
    //             start: "center 70%",
    //             end: 'bottom top',
    //         }
    //     },
    // )
    // gsap.to('.section-effects .pill-side',
    //     {
    //         width: 0,
    //         ease: 'circ.inOut',
    //         scrollTrigger: {
    //             trigger: ".section-effects",
    //             scrub: 3,
    //             start: "center 70%",
    //             end: 'bottom top',
    //         }
    //     }
    // )
    // ScrollTrigger.refresh();
    //
    // // -------------------------------------SEC_SYMPT---------------------
    //
    // const sectionSym = document.querySelector('.section-symptoms');
    // ScrollTrigger.create({
    //     trigger: sectionSym,
    //     start: 'top top',
    //     pin: true,
    //     scrub: true,
    //     end: "bottom+=200% 200%",
    // });
    // gsap.fromTo(' .img_1',
    //     {
    //         y: 100,
    //         opacity: 0,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         ease: 'power1.out',
    //
    //         scrollTrigger: {
    //             trigger: ".section-symptoms",
    //             scrub: 3,
    //             start: "top 35%",
    //             end: 'bottom bottom'
    //         },
    //     },
    // )
    // gsap.fromTo('.block-bg',
    //     {
    //         y: 100,
    //         opacity: 0,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.2,
    //         ease: 'power1.out',
    //
    //         scrollTrigger: {
    //             trigger: ".section-symptoms",
    //             scrub: 3,
    //             start: "top 25%",
    //             end: 'bottom bottom'
    //         },
    //     },
    // )
    //
    // gsap.fromTo('.img-ellipse_warm',
    //     {
    //         y: 100,
    //         opacity: 0,
    //         // duration: -1,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.1,
    //         ease: 'power1.out',
    //         scrollTrigger: {
    //             trigger: ".section-symptoms",
    //             scrub: 3,
    //             start: "top 15%",
    //             end: 'bottom bottom'
    //         },
    //
    //     },
    // )
    // gsap.fromTo('.img-ellipse_green',
    //     {
    //         y: 100,
    //         opacity: 0,
    //         // duration: -1,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         // stagger: 0.1,
    //         ease: 'power1.out',
    //         scrollTrigger: {
    //             trigger: ".section-symptoms",
    //             scrub: 3,
    //             start: "top 18%",
    //             end: 'bottom bottom',
    //         },
    //     },
    // )
    //
    // gsap.fromTo('.section-symptoms .section__title',
    //     {
    //         y: 100,
    //         opacity: 0,
    //         duration: -1,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.4,
    //         ease: 'power1.out',
    //         duration: 2.2,
    //         scrollTrigger: {
    //             trigger: ".section-symptoms",
    //             scrub: 3,
    //             start: "top 20%",
    //             end: 'top bottom',
    //         }
    //     })
    // gsap.fromTo('.dot',
    //     {
    //         y: 50,
    //         opacity: 0,
    //         duration: -1,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.4,
    //         ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //         duration: 1.2,
    //         scrollTrigger: {
    //             trigger: ".section-symptoms",
    //             scrub: 3,
    //             start: "top 45%",
    //             end: 'top bottom',
    //         }
    //     })
    // document.querySelectorAll(".symptoms .dot").forEach(function (box) {
    //     gsap.fromTo(".symptoms .dot",
    //         {
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             opacity: 1,
    //             stagger: 0.4,
    //             ease: 'power1.in',
    //             scrollTrigger: {
    //                 trigger: ".section-symptoms",
    //                 scrub: 3,
    //                 start: "bottom top",
    //                 end: 'bottom bottom'
    //             },
    //         },);
    // });
    // document.querySelectorAll(".symptoms .card").forEach(function (box) {
    //     gsap.fromTo(".symptoms .card",
    //         {
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.in',
    //             scrollTrigger: {
    //                 trigger: ".section-symptoms",
    //                 scrub: 3,
    //                 start: "top 20%",
    //                 end: 'bottom bottom-=50'
    //             },
    //         },);
    // });
    //
    //
    // ScrollTrigger.refresh();
    //
    //
    // // -------------------------------------FLIP------------------------------------
    // gsap.registerPlugin(Flip);
    //
    //
    // const details = document.querySelector('#about-main-img-end img');
    // Flip.fit(details, document.querySelector('#about-main-img-start'), {
    //     scale: true,
    //     fitChild: document.querySelector('#about-main-img-end img')
    // });
    //
    // const state = Flip.getState(details);
    //
    // // set the final state
    // gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
    // gsap.set(details, {visibility: "visible", overflow: "hidden"});
    //
    // Flip.from(state, {
    //     duration: 1.4,
    //     ease: "power2.inOut",
    //     scale: true,
    // })


    function aboutAnim() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-about',
                start: 'top top',
                end: 'bottom bottom-=50% ',
                pin: true,
                duration: 2,
                scrub: 5,
                markers: true,

            }
        });


        timeline.fromTo('.img-about_2',
            {
                x: -600,
                opacity: 0,
            },
            {
                opacity: 1,
                x: 0
            },
        );
        timeline.fromTo('.swiper-pagination',
            {
                opacity: 0,
            },
            {
                opacity: 1,
            }, '<'
        );

        timeline.fromTo('.section-about .section__title',
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
            }, ' < 35%'
        );
        timeline.fromTo('.slider-components',
            {
                y: 100,
                opacity: 0,
            },
            {
                opacity: 1,
                y: 0
            }, '<'
        );
        timeline.fromTo('.section-about .arrow-left',

            {
                x: 50,
                opacity: 0,
            },
            {
                opacity: 1,
                x: 0
            }, '<'
        );

    }

    aboutAnim();
});




