// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to form inputs
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});