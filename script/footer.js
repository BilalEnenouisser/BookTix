// Footer Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterForm && newsletterInput && newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (!email) {
                showFooterNotification('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFooterNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            const originalText = newsletterBtn.textContent;
            newsletterBtn.textContent = 'Subscribing...';
            newsletterBtn.disabled = true;
            
            setTimeout(() => {
                showFooterNotification('Thank you for subscribing to our newsletter!', 'success');
                newsletterInput.value = '';
                newsletterBtn.textContent = originalText;
                newsletterBtn.disabled = false;
            }, 1500);
        });
        
        // Enter key support for newsletter
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
    
    // Footer CTA buttons
    const contactBtn = document.querySelector('.footer-btn.primary');
    const callBtn = document.querySelector('.footer-btn.secondary');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Scroll to contact form
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            // Open phone dialer or show phone number
            const phoneNumber = '(732) 743-5849';
            if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/)) {
                window.location.href = `tel:${phoneNumber}`;
            } else {
                showFooterNotification(`Call us at ${phoneNumber}`, 'info');
            }
        });
    }
    
    // Social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('svg').closest('a').getAttribute('href');
            showFooterNotification(`Opening ${platform}...`, 'info');
            
            // Add actual social media URLs here
            const socialUrls = {
                'instagram': 'https://instagram.com/booktix',
                'facebook': 'https://facebook.com/booktix',
                'youtube': 'https://youtube.com/booktix'
            };
            
            // Simulate opening social media
            setTimeout(() => {
                // window.open(socialUrls[platform], '_blank');
                showFooterNotification(`Redirecting to ${platform}...`, 'success');
            }, 1000);
        });
    });
    
    // Legal links
    const legalLinks = document.querySelectorAll('.legal-links a');
    legalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.textContent;
            showFooterNotification(`Opening ${pageName}...`, 'info');
        });
    });
    
    // Region selector
    const regionSelector = document.querySelector('.region-selector');
    if (regionSelector) {
        regionSelector.addEventListener('click', function() {
            showFooterNotification('Region selection coming soon!', 'info');
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Footer notification system
    function showFooterNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.footer-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `footer-notification footer-notification-${type}`;
        notification.innerHTML = `
            <div class="footer-notification-content">
                <span class="footer-notification-message">${message}</span>
                <button class="footer-notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.footer-notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }
});
