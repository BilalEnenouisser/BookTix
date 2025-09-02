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
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
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
                        // Active slide - show full content with animation
                        title.style.display = 'none'; // Hide original title
                        cardInner.style.justifyContent = 'flex-end';
                        
                        // Animate content appearance with staggered effect
                        content.style.display = 'contents';
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(20px)';
                        
                        // Staggered animation for content elements
                        const contentElements = content.querySelectorAll('*');
                        contentElements.forEach((element, i) => {
                            element.style.opacity = '0';
                            element.style.transform = 'translateY(15px)';
                            element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        });
                        
                        // Trigger main content animation
                        setTimeout(() => {
                            content.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                            
                            // Staggered animation for child elements
                            contentElements.forEach((element, i) => {
                                setTimeout(() => {
                                    element.style.opacity = '1';
                                    element.style.transform = 'translateY(0)';
                                }, 100 + (i * 50)); // 50ms delay between each element
                            });
                        }, 50);
                        
                    } else {
                        // Non-active slides - hide content immediately (no animation)
                        title.style.display = 'block'; // Show original title
                        title.style.fontSize = '1.5rem';
                        title.style.fontWeight = '600';
                        title.style.color = '#0D2346';
                        title.style.alignSelf = 'center';
                        title.style.margin = '0';
                        cardInner.style.justifyContent = 'flex-end';
                        
                        // Hide content immediately without animation
                        content.style.display = 'none';
                    }
                });
            },
            init: function () {
                // Initialize content visibility on load
                this.emit('slideChange');
                
                // Store initial position to prevent shifts
                setTimeout(() => {
                    this.initialTranslate = this.getTranslate();
                    this.initialActiveIndex = this.activeIndex;
                }, 100);
            },
            resize: function () {
                // Prevent automatic resize handling that causes position shifts
                // We'll handle resize manually in our resize handler
                return false;
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
    
    // Function to maintain carousel state
    function maintainCarouselState() {
        if (swiper && window.innerWidth > 768) {
            // Store current state
            const currentIndex = swiper.activeIndex;
            const lockedPosition = originalTranslate || swiper.getTranslate();
            
            // Completely disable Swiper updates during resize
            swiper.allowTouchMove = false;
            swiper.allowSlideNext = false;
            swiper.allowSlidePrev = false;
            
            // Prevent Swiper from recalculating positions
            swiper.allowSlideNext = false;
            swiper.allowSlidePrev = false;
            
            // Force update but immediately override the position
            swiper.updateSize();
            swiper.updateSlides();
            
            // Immediately restore exact position
            if (currentIndex >= 0) {
                // Override any automatic position calculations
                const wrapper = swiper.wrapperEl;
                if (wrapper) {
                    // Force the exact position
                    wrapper.style.transform = `translate3d(${lockedPosition}px, 0px, 0px)`;
                    wrapper.style.transition = 'none';
                    
                    // Override Swiper's internal translate
                    swiper.setTranslate(lockedPosition);
                    
                    // Force the position again to ensure it sticks
                    setTimeout(() => {
                        wrapper.style.transform = `translate3d(${lockedPosition}px, 0px, 0px)`;
                        swiper.setTranslate(lockedPosition);
                    }, 10);
                }
                
                // Update active index manually
                swiper.activeIndex = currentIndex;
                swiper.updateActiveIndex();
                
                // Triple-check position is maintained
                setTimeout(() => {
                    const currentPos = swiper.getTranslate();
                    if (Math.abs(currentPos - lockedPosition) > 1) {
                        swiper.setTranslate(lockedPosition);
                        if (wrapper) {
                            wrapper.style.transform = `translate3d(${lockedPosition}px, 0px, 0px)`;
                        }
                    }
                }, 100);
                
                // Re-enable interactions
                setTimeout(() => {
                    swiper.allowTouchMove = true;
                    swiper.allowSlideNext = true;
                    swiper.allowSlidePrev = true;
                    if (wrapper) {
                        wrapper.style.transition = '';
                    }
                }, 300);
            }
        }
    }
    
    // Window resize handler
    let resizeTimeout;
    let isResizing = false;
    let originalTranslate = null;
    
    window.addEventListener('resize', () => {
        if (!isResizing) {
            isResizing = true;
            // Store the original position immediately
            if (swiper) {
                originalTranslate = swiper.getTranslate();
                // Completely disable Swiper
                swiper.allowTouchMove = false;
                swiper.allowSlideNext = false;
                swiper.allowSlidePrev = false;
                
                // Lock the wrapper position immediately
                const wrapper = swiper.wrapperEl;
                if (wrapper) {
                    wrapper.style.transition = 'none';
                    wrapper.style.transform = `translate3d(${originalTranslate}px, 0px, 0px)`;
                }
                
                // Add CSS class to prevent position shifts
                const carouselContainer = document.querySelector('.who-we-serve-swiper');
                if (carouselContainer) {
                    carouselContainer.classList.add('resizing');
                    carouselContainer.style.setProperty('--locked-position', `${originalTranslate}px`);
                }
            }
        }
        
        // Debounce resize events to prevent excessive updates
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            maintainCarouselState();
            isResizing = false;
            
            // Remove CSS class after resize
            const carouselContainer = document.querySelector('.who-we-serve-swiper');
            if (carouselContainer) {
                carouselContainer.classList.remove('resizing');
                carouselContainer.style.removeProperty('--locked-position');
            }
        }, 400);
    });
});
