// Who We Serve Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper Carousel
    const swiper = new Swiper('.who-we-serve-swiper .swiper', {
        grabCursor: true,
        initialSlide: 2, // Start with School Theatre (center card)
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 40,
        speed: 800,
        freeMode: false,
        effect: 'slide',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // Update content visibility based on active slide
                const slides = document.querySelectorAll('.who-we-serve-swiper .swiper-slide');
                slides.forEach((slide, index) => {
                    const content = slide.querySelector('.card-content');
                    const title = slide.querySelector('.card-title');
                    const cardInner = slide.querySelector('.card-inner');
                    
                    if (index === this.activeIndex) {
                        // Active slide - show full content with everything at bottom
                        content.style.display = 'contents';
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                        title.style.display = 'none'; // Hide original title
                        cardInner.style.justifyContent = 'flex-end';
                    } else {
                        // Non-active slides - hide content completely, show only title at bottom
                        content.style.display = 'none';
                        title.style.display = 'block'; // Show original title
                        title.style.fontSize = '1.5rem';
                        title.style.fontWeight = '600';
                        title.style.color = '#0D2346';
                        title.style.alignSelf = 'center';
                        title.style.margin = '0';
                        cardInner.style.justifyContent = 'flex-end';
                    }
                });
            },
            init: function () {
                // Initialize content visibility on load
                this.emit('slideChange');
            }
        }
    });

    // Add click functionality to slides
    const slides = document.querySelectorAll('.who-we-serve-swiper .swiper-slide');
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            swiper.slideTo(index);
        });
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        // Update Swiper on resize
        if (window.innerWidth > 768 && swiper) {
            swiper.update();
        }
    });
});
