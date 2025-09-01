// Testimonial Swiper Configuration
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
    let progressInterval;
    let percentTime = 0;
    const progressDuration = 5000; // 5 seconds

    // DOM elements
    const testimonialCard = document.querySelector('.testimonial-card');
    const testimonialImage = document.querySelector('.testimonial-image img');
    const currentSlideElement = document.querySelector('.current-slide');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.dot');

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
        
        // Update dots and reset progress
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            const progressFill = dot.querySelector('.progressFill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        });
        
        // Add fade animation
        testimonialCard.style.opacity = '0';
        setTimeout(() => {
            testimonialCard.style.opacity = '1';
        }, 150);
    }

    // Progress bar functions (like the example code)
    function startProgressAnimation() {
        resetProgressBar();
        percentTime = 0;
        progressInterval = setInterval(updateProgress, 10);
    }
    
    function updateProgress() {
        percentTime += 100 / (progressDuration / 10);
        const currentDot = dots[currentSlide];
        const progressFill = currentDot ? currentDot.querySelector('.progressFill') : null;
        
        if (progressFill) {
            progressFill.style.width = percentTime + '%';
        }
        
        if (percentTime >= 100) {
            // Auto-swipe to next slide
            if (currentSlide < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0); // Loop back to first slide
            }
        }
    }
    
    function resetProgressBar() {
        dots.forEach(dot => {
            const progressFill = dot.querySelector('.progressFill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        });
        clearInterval(progressInterval);
    }
    
    function stopProgressAnimation() {
        clearInterval(progressInterval);
    }

    // Navigation functions
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateTestimonial(currentSlide);
        startProgressAnimation();
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
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Pause progress on hover
    testimonialCard.addEventListener('mouseenter', stopProgressAnimation);
    testimonialCard.addEventListener('mouseleave', startProgressAnimation);

    // Initialize
    updateTestimonial(0);
    startProgressAnimation();
})();
