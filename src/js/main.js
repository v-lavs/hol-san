/*
* to include js file write: `//= include ./path-to-file`
* */
//= include ../lib/jquery.min.js ;
//= include ../lib/lenis.js
//= include ../lib/swiper/swiper-bundle.min.js


// CUSTOM SCRIPTS

$(document).ready(function () {
        const lenis = new Lenis({
            duration: 2.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        function raf(time) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

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
                        scrollTop: $($.attr(this, 'href')).offset().top
                    }, 600);
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
                autoplay: {
                    delay: 3000
                },
                loop: true,
                pagination: {
                    el: ".section-about .part_right .swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        direction: 'horizontal',
                        slidesPerView: 1,
                    },
                    1024: {
                        direction: 'vertical',
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                },
            });

            result.innerHTML = '0' + (sliderComponents.slides.length - 2);

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

        const $sectionBanner = $('.section-banner .container');
        const $colorDisclaimer = $('.disclaimer-main');

        $(window).on('scroll', (e) => {
            const offset = Math.floor($(window).scrollTop());
            const bannerHeight = Math.floor($sectionBanner.height());

            requestAnimationFrame(() => {
                if (offset > bannerHeight) {
                    $colorDisclaimer.css({
                        color: '#DCDDE0',
                    })

                } else if (offset <= bannerHeight) {
                    $colorDisclaimer.css({
                        color: '#ffffff',
                    })
                }
            });
        });

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
            const bannerGoOutStage2 = gsap.from(
                '.section-banner', {
                    opacity: 0,

                })

            ScrollTrigger.create({
                animation: bannerGoOutStage,
                trigger: document.querySelector('.section-effects'),
                end: "bottom center",
                scrub: 0.1,
                immediateRender: true,
                invalidateOnRefresh: true,
            });

            const banner = document.querySelector('.section-banner');

            ScrollTrigger.create({
                trigger: '.section-banner',
                start: () => banner.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
            });
        }

        bannerOutAnim();


        // function sectionEffectsIntroAnim() {
        //     const timeline = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: '#action',
        //             pin: true,
        //             scrub: 1.5,
        //             start: "top+=10% top", // when the top of the trigger hits the top of the viewport
        //             end: "bottom top+=200",
        //             invalidateOnRefresh: true
        //             // markers: true
        //         }
        //     });
        //
        //     timeline.to('.effects .card__thumb', {
        //         yPercent: 50,
        //     });
        //
        //     timeline.to(".section-effects .card__text", {
        //         opacity: 0
        //     }, "<");
        //
        //     timeline.to('.effects', {
        //         scale: 0.45,
        //         opacity: 0,
        //     });
        //     timeline.to('.section-effects .effects__pill',
        //         {opacity: 1,},
        //         "<-=0.2"
        //     );
        //     timeline.to('.section-effects .effects__pill',
        //         {x: 0,},
        //         "<+=0.2"
        //     );
        //
        //     timeline.to('.section-effects .pill-side',
        //         {width: 0},
        //         "<"
        //     );
        //     return timeline;
        // }
        function sectionEffectsIntroAnim() {
            const timeline = gsap.timeline();

            const mm = gsap.matchMedia();
            const breakPointX = 320;

            mm.add({
                isDesktop: `(min-width: ${breakPointX}px)`,
                isMobile: `(max-width: ${breakPointX - 1}px)`
            }, (context) => {
                const {isDesktop, isMobile} = context.conditions;

                if (isDesktop) {
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
                        {opacity: 1,},
                        "<-=0.2"
                    );
                    timeline.to('.section-effects .effects__pill',
                        {x: 0,},
                        "<+=0.2"
                    );

                    timeline.to('.section-effects .pill-side',
                        {width: 0},
                        "<"
                    );
                    ScrollTrigger.create({
                        trigger: '#action',
                        pin: true,
                        scrub: 1.5,
                        start: () => {
                            return "top+=150 top";
                        }, // when the top of the trigger hits the top of the viewport
                        end: () => {
                            return "bottom center";
                        },
                        invalidateOnRefresh: true,
                        animation: timeline,
                        // markers: true
                    });
                } else if (isMobile) {
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
                        {opacity: 1,},
                        "<-=0.2"
                    );
                    timeline.to('.section-effects .effects__pill',
                        {x: 0,},
                        "<+=0.2"
                    );

                    timeline.to('.section-effects .pill-side',
                        {width: 0},
                        "<"
                    );
                    ScrollTrigger.create({
                        trigger: '#action',
                        pin: true,
                        scrub: 2,
                        start: () => {
                            return "top top+=50";
                        }, // when the top of the trigger hits the top of the viewport
                        end: () => {
                            return "bottom center-=50";
                        },
                        invalidateOnRefresh: true,
                        animation: timeline,
                        markers: true
                    });
                }
            });


            return timeline;
        }

        const effIntro = sectionEffectsIntroAnim();


        function complaintsAnim() {
            const timeline = gsap.timeline({});

            const mm1 = gsap.matchMedia();
            const breakPoint = 769;

            mm1.add(
                {
                    isDesktop: `(min-width: ${breakPoint}px)`,
                    isMobile: `(max-width: ${breakPoint - 1}px)`,
                },
                (context) => {

                    let {isDesktop, isMobile} = context.conditions;

                    if (isDesktop) {

                        const defaultPositionProps = {
                            opacity: 0,
                            y: 100,

                        };
                        timeline.fromTo('.img_1',
                            defaultPositionProps, {
                                y: 0,
                                opacity: 1,
                                ease: 'power4.out',
                            },);
                        timeline.fromTo('.block-bg',
                            defaultPositionProps, {
                                y: 0,
                                opacity: 1,
                                stagger: 0.2,
                                ease: 'power1.out',
                            }, '<60%');
                        timeline.fromTo('.img-ellipse',
                            defaultPositionProps, {
                                y: 0,
                                opacity: 1,
                                duration: 0.35,
                                stagger: 0.25,
                                ease: 'power1.out',
                            }, '<10%',);
                        timeline.fromTo('.section-symptoms .section__title',
                            defaultPositionProps, {
                                y: 0,
                                opacity: 1,
                                stagger: 0.4,
                                ease: 'power1.out',
                                duration: 2.2,
                            }, '<60%');
                        timeline.fromTo('.dot', {
                            y: 50,
                            opacity: 0,
                        }, {
                            y: 0,
                            opacity: 1,
                            stagger: 0.3,
                            duration: 1.2,
                        }, '<');
                        timeline.fromTo(".symptoms .card", {
                                opacity: 0,
                                duration: -1,
                            },
                            {
                                opacity: 1,
                                stagger: 0.2,
                                ease: 'power1.in',
                            }, '<');

                        ScrollTrigger.create({
                            trigger: '#complaints',
                            start: 'top top+=200',
                            scrub: 3,
                            pin: true,
                            invalidateOnRefresh: true,
                            animation: timeline,
                            // markers: true
                        });
                    }
                    // else if (isMobile) {
                    //     const defaultPositionProps = {
                    //         opacity: 0,
                    //         y: 100,
                    //
                    //     };
                    //     // timeline.fromTo('.img_1',
                    //     //     defaultPositionProps, {
                    //     //         y: 0,
                    //     //         opacity: 1,
                    //     //         ease: 'power4.out',
                    //     //     },);
                    //     // timeline.fromTo('.block-bg',
                    //     //     defaultPositionProps, {
                    //     //         y: 0,
                    //     //         opacity: 1,
                    //     //         stagger: 0.2,
                    //     //         ease: 'power1.out',
                    //     //     }, '<70%');
                    //     timeline.fromTo('.img-ellipse',
                    //         defaultPositionProps, {
                    //             y: 0,
                    //             opacity: 1,
                    //             duration: 0.35,
                    //             stagger: 0.25,
                    //             ease: 'power1.out',
                    //         }, '<20%',);
                    //     timeline.fromTo('.section-symptoms .section__title',
                    //         defaultPositionProps, {
                    //             y: 0,
                    //             opacity: 1,
                    //             stagger: 0.4,
                    //             ease: 'power1.out',
                    //             duration: 2.2,
                    //         }, '<70%');
                    //     timeline.fromTo('.dot', {
                    //         y: 50,
                    //         opacity: 0,
                    //     }, {
                    //         y: 0,
                    //         opacity: 1,
                    //         stagger: 0.3,
                    //         duration: 1.2,
                    //     }, '<');
                    //     timeline.fromTo(".symptoms .card", {
                    //             opacity: 0,
                    //             duration: -1,
                    //         },
                    //         {
                    //             opacity: 1,
                    //             stagger: 0.2,
                    //             ease: 'power1.in',
                    //         }, '<');
                    //
                    //     ScrollTrigger.create({
                    //         trigger: '#complaints',
                    //         // start: 'top top+=50',
                    //         start: 'top top+=200',
                    //         // end:'center+=100 center',
                    //         scrub: 4,
                    //         // pin: true,
                    //
                    //         invalidateOnRefresh: true,
                    //         animation: timeline,
                    //         // markers: true
                    //     });
                    // }
                    return () => {
                    };
                }
            );

            return timeline;
        }

        const complaints = complaintsAnim();

        function sOutAnim() {
            const sGoOutStage = gsap.timeline();

            const mm1 = gsap.matchMedia();
            const breakPoint = 769;

            mm1.add(
                {
                    isDesktop: `(min-width: ${breakPoint}px)`,
                    isMobile: `(max-width: ${breakPoint - 1}px)`,
                },
                (context) => {

                    let {isDesktop, isMobile} = context.conditions;

                    if (isDesktop) {
                        sGoOutStage.to('.section-symptoms', {
                            opacity: 0
                        })
                        ScrollTrigger.create({
                            animation: sGoOutStage,
                            trigger: document.querySelector('.section-symptoms'),
                            start: 'bottom top+=40%',
                            end: 'bottom top',
                            immediateRender: true,
                            invalidateOnRefresh: true,
                            scrub: 3,
                            // markers: true
                        })
                    }
                    // else if (isMobile) {
                    //     sGoOutStage.to('.section-symptoms',{
                    //         opacity:0
                    //     })
                    //     ScrollTrigger.create({
                    //         animation: sGoOutStage,
                    //         trigger: document.querySelector('.spacer-anim'),
                    //         start: 'bottom+=100% bottom',
                    //
                    //         immediateRender: true,
                    //         invalidateOnRefresh: true,
                    //         scrub: 3,
                    //         // markers: true
                    //     })
                    // }
                    return () => {
                    };
                }
            );
        }

        sOutAnim();


        // ====================================================================================
        // function complaintsAnim() {
        //
        //
        //     const timeline = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: '#complaints',
        //             start: 'top top+=100',
        //             scrub: 6,
        //             pin: true,
        //
        //             invalidateOnRefresh: true,
        //             // markers: true
        //         }
        //     });
        //
        //     const defaultPositionProps = {
        //         y: 100,
        //         opacity: 0,
        //     };
        //
        //     timeline.fromTo('.img_1',
        //         defaultPositionProps,
        //         {
        //             y: 0,
        //             opacity: 1,
        //             ease: 'power1.out',
        //         },
        //     );
        //
        //     timeline.fromTo('.block-bg',
        //         defaultPositionProps,
        //         {
        //             y: 0,
        //             opacity: 1,
        //             stagger: 0.2,
        //             ease: 'power1.out',
        //         },
        //         '<60%'
        //     );
        //
        //     timeline.fromTo('.img-ellipse',
        //         defaultPositionProps,
        //         {
        //             y: 0,
        //             opacity: 1,
        //             duration: 0.35,
        //             stagger: 0.25,
        //             ease: 'power1.out',
        //         }, '<10%',
        //     );
        //
        //     timeline.fromTo('.section-symptoms .section__title',
        //         defaultPositionProps,
        //         {
        //             y: 0,
        //             opacity: 1,
        //             stagger: 0.4,
        //             ease: 'power1.out',
        //             duration: 2.2,
        //         }, '<60%');
        //
        //     timeline.fromTo('.dot',
        //         {
        //             y: 50,
        //             opacity: 0,
        //         },
        //         {
        //             y: 0,
        //             opacity: 1,
        //             stagger: 0.3,
        //             duration: 1.2,
        //         },
        //         '<'
        //     );
        //
        //     timeline.fromTo(".symptoms .card",
        //         {
        //             opacity: 0,
        //             duration: -1,
        //         },
        //         {
        //             opacity: 1,
        //             stagger: 0.2,
        //             ease: 'power1.in',
        //         }, '<');
        //
        //     return timeline;
        // }
        //
        // function sOutAnim() {
        //     const sGoOutStage = gsap.to(
        //         '.section-symptoms', {
        //             opacity: 0,
        //         })
        //
        //     ScrollTrigger.create({
        //         animation: sGoOutStage,
        //         trigger: document.querySelector('.section-symptoms'),
        //         start: 'bottom top-=50%',
        //         immediateRender: true,
        //         invalidateOnRefresh: true,
        //         scrub: 3,
        //         markers:true
        //     });
        // }
        //
        // sOutAnim();
        //
        // const complaints = complaintsAnim();


        function aboutAnim() {
            const timeline = gsap.timeline();
            const mm = gsap.matchMedia();
            const breakPointX = 769;

            mm.add({
                isDesktop: `(min-width: ${breakPointX}px)`,
                isMobile: `(max-width: ${breakPointX - 1}px)`,

            }, (context) => {
                const {isDesktop, isMobile} = context.conditions;
                if (isDesktop) {

                    timeline.fromTo('#about-main-img-end', {
                        y: -400,
                        xPercent: -50,
                        scale: 1.5,
                        left: '100%',
                        opacity: 0,
                        duration: 0.1
                    }, {
                        y: -400,
                        xPercent: -50,
                        scale: 1.5,
                        left: '100%',
                        opacity: 1,
                        duration: 0.6,
                    });
                    timeline.fromTo('#about-main-img-end', {
                        y: -400,
                        xPercent: -50,
                        scale: 1.5,
                        left: '100%',
                    }, {
                        y: 0,
                        xPercent: 0,
                        scale: 1,
                        duration: 1,
                        left: 0,
                    }, '>');
                    timeline.fromTo('.img-about_2', {
                        x: -600,
                        opacity: 0,
                    }, {
                        opacity: 1,
                        x: 0,
                        duration: 1
                    }, '-=0.5');
                    timeline.fromTo('.swiper-pagination', {
                        opacity: 0,
                    }, {
                        opacity: 1,
                    }, '15%');
                    timeline.fromTo('.section-about .section__title', {
                        opacity: 0,
                        y: 100,
                    }, {
                        opacity: 1,
                        y: 0,
                    }, '15%');
                    timeline.fromTo('.slider-components', {
                        y: 100,
                        opacity: 0,
                    }, {
                        opacity: 1,
                        y: 0
                        // }, '<50%'
                    }, '<-=50%');
                    timeline.fromTo('.section-about .arrow-left', {
                        x: 50,
                        opacity: 0,
                    }, {
                        opacity: 1,
                        x: 0
                    }, '<+=2%');
                    ScrollTrigger.create({
                        trigger: '.section-about',
                        start: 'top 30%',
                        end: 'bottom bottom',
                        pin: true,
                        scrub: 6,
                        invalidateOnRefresh: true,
                        animation: timeline,
                    });
                }
            });
            return timeline;
        }


        const about = aboutAnim();

        gsap.to('.disclaimer-main', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'bottom bottom',
                end: 'center center',
                scrub: true,
                invalidateOnRefresh: true,
            }
        });


        // Debounce
        function debounce(func, time) {
            var time = time || 100; // 100 by default if no param
            var timer;
            return function (event) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(func, time, event);
            };
        }

        function resizeContent() {
            // Do loads of stuff once window has resized
            complaints.scrollTrigger.refresh();
            effIntro.scrollTrigger.refresh();
            about.scrollTrigger.refresh();

            console.log('resized');
        }

// Eventlistener
        window.addEventListener("resize", debounce(resizeContent, 150));
    }
);





