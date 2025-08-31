// Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const getHelpBtn = document.getElementById('getHelpBtn');
    const getHelpBtnMobile = document.getElementById('getHelpBtnMobile');
    const helpPopup = document.getElementById('helpPopup');
    const helpPopupClose = document.getElementById('helpPopupClose');

    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Dropdown functionality for mobile
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        if (dropdownToggle) {
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
        }
    });

    // Help Popup functionality
    if (getHelpBtn && helpPopup) {
        getHelpBtn.addEventListener('click', () => {
            helpPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    if (getHelpBtnMobile && helpPopup) {
        getHelpBtnMobile.addEventListener('click', () => {
            helpPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            // Close mobile menu when help popup opens
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    }

    if (helpPopupClose && helpPopup) {
        helpPopupClose.addEventListener('click', () => {
            helpPopup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close help popup when clicking outside
    if (helpPopup) {
        helpPopup.addEventListener('click', (e) => {
            if (e.target === helpPopup) {
                helpPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close help popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && helpPopup && helpPopup.classList.contains('active')) {
            helpPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Responsive behavior
    window.addEventListener('resize', () => {
        // Close mobile menu on resize if screen becomes larger
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
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
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
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
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            navbar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 100);
    }

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
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
        }
    });
});
