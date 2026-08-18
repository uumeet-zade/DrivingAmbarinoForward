document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for the racecar text reveal animation
    const revealContainer = document.getElementById('reveal-container');

    if (revealContainer) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the container is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the active class to trigger the CSS transition
                    revealContainer.classList.add('active');
                    // Optional: unobserve if you only want it to animate once
                    // observer.unobserve(entry.target);
                } else {
                    // Remove if you want it to reset when scrolled out of view
                    revealContainer.classList.remove('active');
                }
            });
        }, observerOptions);

        observer.observe(revealContainer);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll position to account for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
