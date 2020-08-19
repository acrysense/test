document.addEventListener("DOMContentLoaded", function () {
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const overlay = document.getElementsByClassName('overlay')[0]

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('hamburger--active') && overlay.classList.contains('overlay--open')) {
            hamburger.classList.remove("hamburger--active");
            overlay.classList.remove("overlay--open");
            document.body.classList.remove("scroll-disabled");
        } else {
            hamburger.classList.add("hamburger--active");
            overlay.classList.add("overlay--open");
            document.body.classList.add("scroll-disabled");
        }
    });

    // ACCORDIONS
    document.querySelectorAll('.accordion__trigger').forEach((item) =>
        item.addEventListener('click', () => {
            const parent = item.parentNode

            if (parent.classList.contains('accordion__item--active')) {
                parent.classList.remove('accordion__item--active')
            } else {
                document.querySelectorAll('.accordion__item').forEach((child) => child.classList.remove('accordion__item--active'))
                parent.classList.add('accordion__item--active')
            }
        })
    )

    // SWIPER
    let mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
});