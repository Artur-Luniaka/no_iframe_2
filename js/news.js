// News page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to "Read More" buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('read-more')) {
            e.preventDefault();
            
            // In a real application, this would navigate to the full news article
            alert('This would navigate to the full news article in a real application.');
        }
    });
});