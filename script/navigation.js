// Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const getHelpBtnMobile = document.getElementById('getHelpBtnMobile');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    // Mobile Menu Toggle
    if (navToggle && mobileSidebar) {
        navToggle.addEventListener('click', () => {
            mobileSidebar.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Mobile Sidebar Close
    if (mobileCloseBtn && mobileSidebar) {
        mobileCloseBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close mobile sidebar when clicking outside
    if (mobileSidebar) {
        mobileSidebar.addEventListener('click', (e) => {
            if (e.target === mobileSidebar) {
                mobileSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navToggle && mobileSidebar && !navToggle.contains(e.target) && !mobileSidebar.contains(e.target)) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Dropdown functionality for desktop and mobile
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });

    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.mobile-dropdown-toggle');
        
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other mobile dropdowns
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });

    // Mobile Get Help button functionality (for mobile menu)
    if (getHelpBtnMobile) {
        getHelpBtnMobile.addEventListener('click', () => {
            // Close mobile menu when help button is clicked
            if (mobileSidebar) mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
            // Show mobile help popup
            const mobileHelpPopup = document.getElementById('mobileHelpPopup');
            if (mobileHelpPopup) {
                mobileHelpPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Mobile Help Popup functionality
    const mobileHelpPopup = document.getElementById('mobileHelpPopup');
    const mobileHelpPopupClose = document.getElementById('mobileHelpPopupClose');
    const mobileHelpPopupOverlay = document.getElementById('mobileHelpPopupOverlay');
    const mobileGetHelpBtn = document.getElementById('mobileGetHelpBtn');

    // Mobile Get Help button in mobile actions
    if (mobileGetHelpBtn) {
        mobileGetHelpBtn.addEventListener('click', () => {
            if (mobileHelpPopup) {
                mobileHelpPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (mobileHelpPopup && mobileHelpPopupClose) {
        mobileHelpPopupClose.addEventListener('click', () => {
            mobileHelpPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (mobileHelpPopup && mobileHelpPopupOverlay) {
        mobileHelpPopupOverlay.addEventListener('click', () => {
            mobileHelpPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile help popup when clicking outside
    if (mobileHelpPopup) {
        mobileHelpPopup.addEventListener('click', (e) => {
            if (e.target === mobileHelpPopup) {
                mobileHelpPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Responsive behavior
    window.addEventListener('resize', () => {
        // Close mobile menu on resize if screen becomes larger
        if (window.innerWidth > 1024) {
            if (mobileSidebar) mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset dropdown states
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Reset mobile dropdown states
            mobileDropdowns.forEach(dropdown => {
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
            if (window.innerWidth > 1024) {
                link.style.transform = 'translateY(-1px)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) {
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
