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
    //  function preventScrolling() {
    //      window.addEventListener("scroll", function(){
    //          window.scrollTo(0,0);
    //      });
    //  }function removeEventListener() {
    //      window.removeEventListener("scroll", function(){
    //          window.scrollTo(0,0);
    //      });
    //  }
    // let slider = document.querySelector(".slider-components");
    //  slider.addEventListener("slideChanged", removeEventListener);
    //  preventScrolling();


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
    //
    // const tl = gsap.timeline();
    // tl.fromTo(' .img_1',
    //         {
    //             y: 100,
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.out',
    //             duration: 1.2,
    //         },
    //     )
    //     .fromTo('.block-bg',
    //         {
    //             y: 100,
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.out',
    //             duration: 1.2,
    //             force3D: true
    //         },
    //         .8
    //     )
    //
    //     .fromTo('.section-symptoms .section__title',
    //         {
    //             y: 100,
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.out',
    //             duration: 1.2,
    //         },
    //         .8
    //     )
    //     .fromTo('.img-ellipse_warm',
    //         {
    //             y: 100,
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.out',
    //             duration: 1.2,
    //
    //         },
    //         .6
    //     )
    //     .fromTo('.img-ellipse_green',
    //         {
    //             y: 100,
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.out',
    //             duration: 1.2,
    //         },
    //         .8
    //     )
    //     .fromTo('.dot',
    //         {
    //             y: 50,
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.2,
    //             ease: 'power1.out',
    //             duration: 1.2,
    //         },
    //         .9
    //     )
    //     .fromTo('.symptoms .card',
    //         {
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             opacity: 1,
    //             stagger: 0.5,
    //             ease: 'power1.in',
    //             duration: 1.2,
    //         },
    //         1.5
    //     )

    // gsap.to('.section-banner .section-banner__bg', {
    //     scrollTrigger: {
    //         trigger: '.section',
    //         toggleActions: 'restart none revers none',
    //         // markers: true,
    //         start: 'center center',
    //         scrub: true,
    //     },
    //     yPercent: 40
    // })
    // ScrollTrigger.refresh();

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
    //             scrub: true,
    //             // markers: true,
    //             // pin: true,
    //             start: "top 70%",
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
    //             scrub: true,
    //             // markers: true,
    //             // pin: true,
    //             start: "top 25%",
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
    //             scrub: true,
    //             start: "top 15%",
    //
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
    //             scrub: true,
    //             start: "top 15%",
    //
    //         },
    //     },
    // )
    // const tl1 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".section-symptoms",
    //         scrub: true,
    //         // markers: true,
    //         pin: true,
    //         start: "top top",
    //         end: 'bottom 70%'
    //     }
    // });
    //
    // tl1.fromTo('.section-symptoms .section__title',
    //     {
    //         y: 100,
    //         opacity: 0,
    //         // duration: -1,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.2,
    //         ease: 'power1.out',
    //         // duration: 1.2,
    //     },
    //     .8
    // ).fromTo('.dot',
    //     {
    //         y: 50,
    //         opacity: 0,
    //         // duration: -1,
    //     },
    //     {
    //         y: 0,
    //         opacity: 1,
    //         stagger: 0.2,
    //         ease: 'power1.out',
    //         // duration: 1.2,
    //     },
    //     .9
    // ).fromTo('.symptoms .card',
    //         {
    //             opacity: 0,
    //             duration: -1,
    //         },
    //         {
    //             opacity: 1,
    //             stagger: 0.8,
    //             ease: 'power1.in',
    //             duration: 1.2,
    //
    //         },
    //
    //     )


    // const lenis = new Lenis()
    //
    // lenis.on('scroll', (e) => {
    //     console.log(e)
    // })
    //
    // lenis.on('scroll', ScrollTrigger.update)
    //
    // gsap.ticker.add((time)=>{
    //     lenis.raf(time * 5000)
    // })
    //
    // gsap.ticker.lagSmoothing(0)

    gsap.registerPlugin(ScrollTrigger);

    (function ($) {
        // $(document).ready(function() {
        initialiseApp();

        function initialiseApp() {
            initialiseGSAPScrollTriggerPinning();
            initialiseGSAPScrollTriggerPinningInsidePinning();
            initialiseLenisScroll();
        }

        function initialiseGSAPScrollTriggerPinning() {
            gsap.utils.toArray('.section-pin').forEach((section, i) => {
                const nextSection = section.nextElementSibling;

                ScrollTrigger.normalizeScroll({
                    allowNestedScroll: true
                });

                if (section.classList.contains('section-symptoms')) {

                } else {
                    ScrollTrigger.normalizeScroll(false);

                    ScrollTrigger.create({
                        trigger: section,
                        start: 'bottom bottom',
                        pin: true,
                        pinType: 'fixed',
                        pinSpacing: false,
                        anticipatePin: 2,
                        scrub: .5,
                        invalidateOnRefresh: true,
                        ease: 'none'
                    })
                }

                gsap.to(section, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: nextSection,
                        start: '10% bottom',
                        end: 'top top',
                        stagger: .1,
                        scrub: .5,
                        ease: 'Power2.easeInOut'
                    }
                });
            });
        }

        function initialiseGSAPScrollTriggerPinningInsidePinning() {
            let sectionSymp = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section-symptom',
                    start: 'top bottom',
                    end: 'top top',
                    pin: true
                }
            });
                gsap.registerPlugin(ScrollTrigger);

                const parallax = gsap.timeline();
                parallax.from(' .img_1',
                    {
                        y: 100,
                        opacity: 0,
                        stagger: 0.2,
                        ease: 'power1.out',
                        duration: 1.6,
                    },
                )
                    .from('.block-bg',
                        {
                            y: 100,
                            opacity: 0,
                            stagger: 0.2,
                            ease: 'power1.out',
                            duration: 1.6,
                        },
                        .8
                    )

                    .from('.section-symptoms .section__title',
                        {
                            y: 100,
                            opacity: 0,
                            stagger: 0.2,
                            ease: 'power1.out',
                            duration: 1.6,
                        },
                        .8
                    )
                    .from('.img-ellipse_warm',
                        {
                            y: 100,
                            opacity: 0,
                            stagger: 0.2,
                            ease: 'power1.out',
                            duration: 1.6,

                        },
                        .7
                    )
                    .from('.img-ellipse_green',
                        {
                            y: 100,
                            opacity: 0,
                            stagger: 0.2,
                            ease: 'power1.out',
                            duration: 1.6,
                        },
                        .9
                    )
                    .from('.dot',
                        {
                            y: 50,
                            opacity: 0,
                            stagger: 0.2,
                            ease: 'power2.out',
                            duration: 1.6,
                        },
                       '<'
                    )
                    .from('.symptoms .card',
                        {
                            opacity: 0,
                            stagger: 0.6,
                            ease: 'power1.out',
                            duration: 1.6,
                        },
                       1.2
                    )
                ScrollTrigger.create({
                    animation: parallax,
                    trigger: '.section-symptoms',
                    start: 'top 30%',
                    end: 'bottom 80%',
                    marker: true,
                    scrub:5,

                })
        }
        ScrollTrigger.refresh();

        function initialiseLenisScroll() {
            const lenis = new Lenis({
                smoothWheel: true,
                duration: 1.2,
                // easing: easeInQuart,
                easing:easeInExpo,
            });

            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 6000);
            });

            gsap.ticker.lagSmoothing(0);
        }

        // });
    })(jQuery);

});




