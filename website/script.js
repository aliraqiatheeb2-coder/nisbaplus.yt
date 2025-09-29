// JavaScript for Nisba+ Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const navLinks = document.querySelector('.md\\:flex');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.toggle('hidden');
                navLinks.classList.toggle('flex');
                navLinks.classList.toggle('flex-col');
                navLinks.classList.toggle('absolute');
                navLinks.classList.toggle('top-16');
                navLinks.classList.toggle('left-0');
                navLinks.classList.toggle('w-full');
                navLinks.classList.toggle('bg-gray-900');
                navLinks.classList.toggle('py-4');
                navLinks.classList.toggle('glass-effect');
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinksAnchors = document.querySelectorAll('a[href^="#"]');
    
    navLinksAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && !navLinks.classList.contains('hidden')) {
                    navLinks.classList.add('hidden');
                    navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-gray-900', 'py-4', 'glass-effect');
                }
            }
        });
    });
    
    // Particle Animation Enhancement
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random emoji content
        const emojis = ['⭐', '🎯', '✨', '🚀', '💫', '🌟', '🔥', '⚡'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        document.querySelector('.floating-elements').appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 300);
    }
    
    // Create new particles periodically
    setInterval(createParticle, 2000);
    
    // Download Button Animation
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('floating-animation');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('floating-animation');
        });
    });
    
    // Form Submission Handling (if there were forms)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would handle form submission here
            // For now, we'll just show an alert
            alert('Thank you for your submission! In a real implementation, this would be sent to our servers.');
            form.reset();
        });
    });
    
    // Feature Card Hover Effects Enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Dynamic Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Window Load Event
window.addEventListener('load', function() {
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Initialize any additional libraries or features
    console.log('Nisba+ Website Loaded Successfully');
});