// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const getHelpBtn = document.getElementById('getHelpBtn');
const getHelpBtnMobile = document.getElementById('getHelpBtnMobile');
const helpPopup = document.getElementById('helpPopup');
const helpPopupClose = document.getElementById('helpPopupClose');

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Dropdown functionality for mobile
dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    
    dropdownToggle.addEventListener('click', (e) => {
        // Only handle click events on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    });
});

// Help Popup functionality
getHelpBtn.addEventListener('click', () => {
    helpPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

getHelpBtnMobile.addEventListener('click', () => {
    helpPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    // Close mobile menu when help popup opens
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
});

helpPopupClose.addEventListener('click', () => {
    helpPopup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close help popup when clicking outside
helpPopup.addEventListener('click', (e) => {
    if (e.target === helpPopup) {
        helpPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close help popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && helpPopup.classList.contains('active')) {
        helpPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Responsive behavior
window.addEventListener('resize', () => {
    // Close mobile menu on resize if screen becomes larger
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Reset dropdown states
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects for better UX
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            link.style.transform = 'translateY(-1px)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            link.style.transform = 'translateY(0)';
        }
    });
});

// Button hover animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Initialize tooltips for better accessibility
document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('focus', () => {
        // Add focus styles for accessibility
        element.style.outline = '2px solid #0065CC';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
    });
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize logic here if needed
    }, 250);
});

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle fade-in effect to the navbar
    const navbar = document.querySelector('.navbar');
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        navbar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
});

// Who We Serve Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper Carousel
    const swiper = new Swiper('.who-we-serve-swiper .swiper', {
        grabCursor: true,
        initialSlide: 2, // Start with Community Theatre (center card)
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
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accordionItem => {
                accordionItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Mobile menu functionality (if exists)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Help popup functionality (if exists)
    const helpBtns = document.querySelectorAll('#getHelpBtn, #getHelpBtnMobile');
    const helpPopup = document.getElementById('helpPopup');
    const helpPopupClose = document.getElementById('helpPopupClose');
    
    if (helpBtns.length > 0 && helpPopup && helpPopupClose) {
        helpBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                helpPopup.classList.add('active');
            });
        });
        
        helpPopupClose.addEventListener('click', () => {
            helpPopup.classList.remove('active');
        });
        
        helpPopup.addEventListener('click', (e) => {
            if (e.target === helpPopup) {
                helpPopup.classList.remove('active');
            }
        });
        
        // Close popup on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && helpPopup.classList.contains('active')) {
                helpPopup.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
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

// Console log for debugging
console.log('BookTix Navbar loaded successfully!');
console.log('Features:');
console.log('- Responsive design with mobile hamburger menu');
console.log('- Dropdown menus with hover and click animations');
console.log('- Get Help popup with close functionality');
console.log('- Smooth transitions and hover effects');
console.log('- Accessibility features included');

// Benefits Section Functionality
(() => {
    const track = document.getElementById("track");
    const wrap = track.parentElement;
    const cards = Array.from(track.children);
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    const isMobile = () => matchMedia("(max-width:767px)").matches;

    let current = 0;

    function center(i) {
        const card = cards[i];
        const axis = isMobile() ? "top" : "left";
        const size = isMobile() ? "clientHeight" : "clientWidth";
        const start = isMobile() ? card.offsetTop : card.offsetLeft;
        wrap.scrollTo({
            [axis]: start - (wrap[size] / 2 - card[size] / 2),
            behavior: "smooth"
        });
    }

    function toggleUI(i) {
        cards.forEach((c, k) => {
            if (k === i) {
                c.setAttribute("active", "");
                c.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            } else {
                c.removeAttribute("active");
                c.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            }
        });
        prev.disabled = i === 0;
        next.disabled = i === cards.length - 1;
    }

    function activate(i, scroll) {
        if (i === current) return;
        current = i;
        toggleUI(i);
        if (scroll) center(i);
    }

    function go(step) {
        activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
    }

    prev.onclick = () => go(-1);
    next.onclick = () => go(1);

    addEventListener(
        "keydown",
        (e) => {
            if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
            if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
        },
        { passive: true }
    );

    cards.forEach((card, i) => {
        card.addEventListener(
            "mouseenter",
            () => matchMedia("(hover:hover)").matches && activate(i, true)
        );
        card.addEventListener("click", () => activate(i, true));
    });

    let sx = 0,
        sy = 0;
    track.addEventListener(
        "touchstart",
        (e) => {
            sx = e.touches[0].clientX;
            sy = e.touches[0].clientY;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        (e) => {
            const dx = e.changedTouches[0].clientX - sx;
            const dy = e.changedTouches[0].clientY - sy;
            if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
                go((isMobile() ? dy : dx) > 0 ? -1 : 1);
        },
        { passive: true }
    );

    addEventListener("resize", () => center(current));

    toggleUI(0);
    center(0);
})();

// Testimonial Swiper
(() => {
    // Sample testimonial data
    const testimonials = [
        {
            quote: "Feature rich and easy to use. They are super responsive whenever I have a question or request and are always happy to help.",
            author: "Chris Satola",
            title: "Events manager",
            organization: "Garfield Heights Center For The Performing Arts / OH",
            category: "Dance Studio",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "BookTix has transformed how we manage our events. The platform is intuitive and the support team is exceptional.",
            author: "Sarah Johnson",
            title: "Marketing Director",
            organization: "Community Arts Center / CA",
            category: "Arts Center",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "We've seen a 40% increase in ticket sales since switching to BookTix. The analytics and reporting features are game-changing.",
            author: "Michael Chen",
            title: "Operations Manager",
            organization: "Downtown Theater / NY",
            category: "Theater",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "The customer support is outstanding. They helped us set up our first event in under an hour.",
            author: "Emily Rodriguez",
            title: "Event Coordinator",
            organization: "Local Community Center / TX",
            category: "Community Center",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "BookTix makes event management so much easier. The mobile app for attendees is a huge plus.",
            author: "David Thompson",
            title: "Program Director",
            organization: "Youth Arts Foundation / FL",
            category: "Youth Organization",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "We love the integration capabilities. BookTix works seamlessly with our existing systems.",
            author: "Lisa Wang",
            title: "Technical Director",
            organization: "Performing Arts Complex / WA",
            category: "Performing Arts",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "The fundraising features are incredible. We've raised more money than ever before.",
            author: "Robert Davis",
            title: "Development Manager",
            organization: "Cultural Heritage Center / GA",
            category: "Cultural Center",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "BookTix has streamlined our entire ticketing process. The automated features save us hours every week.",
            author: "Jennifer Lee",
            title: "Administrative Director",
            organization: "Regional Arts Council / NC",
            category: "Arts Council",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "The platform is so user-friendly that our volunteers can easily help with ticket sales.",
            author: "Thomas Wilson",
            title: "Volunteer Coordinator",
            organization: "Community Theater / OH",
            category: "Community Theater",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        },
        {
            quote: "We've been using BookTix for over a year and couldn't be happier. It's revolutionized our event management.",
            author: "Amanda Foster",
            title: "Executive Director",
            organization: "Local Arts Alliance / PA",
            category: "Arts Alliance",
            avatar: "assets/testimonial/testimonial-avatar1.jpg",
            image: "assets/testimonial/testimonial-hero.jpg"
        }
    ];

    let currentSlide = 0;
    const totalSlides = testimonials.length;

    // DOM elements
    const testimonialCard = document.querySelector('.testimonial-card');
    const testimonialImage = document.querySelector('.testimonial-image img');
    const currentSlideElement = document.querySelector('.current-slide');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    // Update testimonial content
    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        
        // Update quote
        testimonialCard.querySelector('.testimonial-quote p').innerHTML = testimonial.quote.replace(
            /easy to use|intuitive|user-friendly|seamless|outstanding|exceptional|game-changing|incredible|revolutionized/gi,
            '<strong>$&</strong>'
        );
        
        // Update author info
        testimonialCard.querySelector('.author-name').textContent = testimonial.author;
        testimonialCard.querySelector('.author-title').textContent = testimonial.title;
        testimonialCard.querySelector('.author-organization').textContent = testimonial.organization;
        testimonialCard.querySelector('.category').textContent = testimonial.category;
        
        // Update avatar
        testimonialCard.querySelector('.author-avatar img').src = testimonial.avatar;
        
        // Update hero image
        testimonialImage.src = testimonial.image;
        
        // Update pagination
        currentSlideElement.textContent = String(index + 1).padStart(2, '0');
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSlides - 1;
        
        // Add fade animation
        testimonialCard.style.opacity = '0';
        setTimeout(() => {
            testimonialCard.style.opacity = '1';
        }, 150);
    }

    // Navigation functions
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateTestimonial(currentSlide);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Auto-play functionality (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0);
            }
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Pause auto-play on hover
    testimonialCard.addEventListener('mouseenter', stopAutoPlay);
    testimonialCard.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    updateTestimonial(0);
    startAutoPlay();
})();
