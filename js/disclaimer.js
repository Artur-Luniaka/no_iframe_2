// Disclaimer page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to caution sections
    const cautionSections = document.querySelectorAll('.caution-section');
    
    if (cautionSections.length > 0) {
        // Simple fade-in effect when scrolling
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cautionSections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(section);
        });
    }
});