// Brands Swiper Configuration
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure Swiper is fully loaded
    setTimeout(() => {
        const brandsSwiper = new Swiper('.brands-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 5000,
            grabCursor: true,
            allowTouchMove: true,
            freeMode: true,
            freeModeMomentum: false,
            breakpoints: {
                640: {
                    spaceBetween: 50,
                },
                768: {
                    spaceBetween: 60,
                },
                1024: {
                    spaceBetween: 80,
                },
                1200: {
                    spaceBetween: 100,
                }
            },
            on: {
                init: function() {
                    // Force start autoplay
                    if (this.autoplay) {
                        this.autoplay.start();
                    }
                },
                slideChange: function() {
                }
            }
        });

        // Ensure autoplay is working
        if (brandsSwiper && brandsSwiper.autoplay) {
            brandsSwiper.autoplay.start();
        }
    }, 100);
});
