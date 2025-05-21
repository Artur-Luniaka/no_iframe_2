// Homepage specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
    
    // Add animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});