document.addEventListener('DOMContentLoaded', () => {
    // Example of a simple animation
    const ctaButtons = document.querySelectorAll('.cta');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Add to cart functionality (simplified example)
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Added to cart!');
        });
    });
});
