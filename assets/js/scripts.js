$(function () {

    "use strict";

    /* =============================================================================
    -----------------------------  Smooth Footer   -----------------------------
    ============================================================================= */

    gsap.set('.footer-container', { yPercent: -50 })
    const uncover = gsap.timeline({ paused: true })
    uncover
        .to('.footer-container', { yPercent: 0, ease: 'none' })
        ;

    ScrollTrigger.create({
        trigger: 'main',
        start: 'bottom bottom',
        end: '+=50%',
        animation: uncover,
        scrub: true,
    });

    /* =============================================================================
   -----------------------------  Smooth contact   -----------------------------
   ============================================================================= */

    gsap.set('.contact-container', { yPercent: -50 })
    const cover = gsap.timeline({ paused: true })
    cover
        .to('.contact-container', { yPercent: 0, ease: 'none' })
        ;

    ScrollTrigger.create({
        trigger: '.main-box',
        start: 'bottom bottom',
        end: '+=50%',
        animation: cover,
        scrub: true,
    });

    /* =============================================================================
    -------------------------------  Cursor Animation   -----------------------------
    ============================================================================= */

    (function () {
        const link = document.querySelectorAll('.hover-this');
        const cursor = document.querySelector('.cursor');
        const animateit = function (e) {
            const hoverAnim = this.querySelector('.hover-anim');
            const { offsetX: x, offsetY: y } = e,
                { offsetWidth: width, offsetHeight: height } = this,
                move = 25,
                xMove = x / width * (move * 2) - move,
                yMove = y / height * (move * 2) - move;
            hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
            if (e.type === 'mouseleave') hoverAnim.style.transform = '';
        };
        const editCursor = e => {
            const { clientX: x, clientY: y } = e;
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
        };
        link.forEach(b => b.addEventListener('mousemove', animateit));
        link.forEach(b => b.addEventListener('mouseleave', animateit));
        window.addEventListener('mousemove', editCursor);

        $("a, .cursor-pointer").hover(
            function () {
                $(".cursor").addClass("cursor-active");
            }, function () {
                $(".cursor").removeClass("cursor-active");
            }
        );

        let elements = document.querySelectorAll(".rolling-text");

        elements.forEach((element) => {
            let innerText = element.innerText;
            element.innerHTML = "";

            let textContainer = document.createElement("div");
            textContainer.classList.add("block");

            for (let letter of innerText) {
                let span = document.createElement("span");
                span.innerText = letter.trim() === "" ? "\xa0" : letter;
                span.classList.add("letter");
                textContainer.appendChild(span);
            }

            element.appendChild(textContainer);
            element.appendChild(textContainer.cloneNode(true));
        });

        elements.forEach((element) => {
            element.addEventListener("mouseover", () => {
                element.classList.remove("play");
            });
        });
    })();

    /* =============================================================================
    ////////////////////////////////////////////////////////////////////////////////
    ============================================================================= */

    $(window).on("load", function () {

        /* =============================================================================
        -----------------------------  isotope Masonery   ------------------------------
        ============================================================================= */

        $('.gallery').isotope({
            itemSelector: '.items'
        });

        var $gallery = $('.gallery').isotope();

        $('.filtering').on('click', 'span', function () {
            var filterValue = $(this).attr('data-filter');
            $gallery.isotope({ filter: filterValue });
        });

        $('.filtering').on('click', 'span', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });

        /* =============================================================================
        -----------------------------  Contact Valdition   -----------------------------
        ============================================================================= */

        $('#contact-form').validator();

        $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact.php";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data) {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact-form').find('.messages').html(alertBox);
                            $('#contact-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        });

    });

    /* =============================================================================
    -----------------------------  Button scroll up   ------------------------------
    ============================================================================= */

    $(document).ready(function () {

        "use strict";

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 150;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        })

    });

    /* =============================================================================
    -------------------------------  Wow Animation   -------------------------------
    ============================================================================= */

    var wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });
    wow.init();

    $(document).ready(function () {
        $("#siteWrapper").animsition({
            inClass: 'overlay-slide-in-top',
            outClass: 'overlay-slide-out-bottom',
            inDuration: 500,
            outDuration: 1000,
            linkElement: '.animsition-link',
            loading: false,
            loadingParentElement: 'body',
            loadingClass: 'animsition-loading',
            loadingInner: '',
            timeout: false,
            timeoutCountdown: 5000,
            onLoadEvent: true,
            browser: ['animation-duration', '-webkit-animation-duration'],
            overlay: true,
            overlayClass: 'animsition-overlay-slide',
            overlayParentElement: 'body',
            transition: function (url) { window.location.href = url; }
        });
    });
});