document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for the racecar text reveal animation
    const revealContainers = document.querySelectorAll('.reveal-container');

    if (revealContainers.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the container is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the active class to trigger the CSS transition
                    entry.target.classList.add('active');
                } else {
                    // Remove if you want it to reset when scrolled out of view
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        revealContainers.forEach(container => {
            observer.observe(container);
        });
    }

    // Rolling Dynamic Word Cycle
    const rollingInner = document.getElementById('rolling-words');
    const rollingWrapper = document.querySelector('.rolling-wrapper');
    if (rollingInner && rollingWrapper) {
        const wordCount = rollingInner.children.length;
        let currentIndex = 0;
        
        // Initialize the wrapper width to the first word's width
        rollingWrapper.style.width = rollingInner.children[0].offsetWidth + 'px';
        
        setInterval(() => {
            currentIndex++;
            
            // Update the width of the wrapper to match the new word smoothly
            const newWidth = rollingInner.children[currentIndex].offsetWidth;
            rollingWrapper.style.width = newWidth + 'px';

            rollingInner.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            rollingInner.style.transform = `translateY(-${currentIndex * 1.2}em)`;

            // If we reached the cloned word (the last child)
            if (currentIndex === wordCount - 1) {
                setTimeout(() => {
                    // Instantly reset to the first word without transition
                    rollingInner.style.transition = 'none';
                    currentIndex = 0;
                    rollingInner.style.transform = `translateY(0)`;
                }, 600); // Wait for the transition to finish
            }
        }, 2500); // Roll every 2.5 seconds
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
