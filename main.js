// Lightbox functionality
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.closeBtn = document.querySelector('.lightbox-close');
        
        this.init();
    }

    init() {
        // Add click listeners to all guide images
        const guideImages = document.querySelectorAll('[data-lightbox]');
        guideImages.forEach(image => {
            image.addEventListener('click', (e) => {
                this.open(e.target.src, e.target.alt);
            });
        });

        // Close lightbox when clicking close button
        this.closeBtn.addEventListener('click', () => {
            this.close();
        });

        // Close lightbox when clicking outside image
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        // Close lightbox with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.style.display === 'block') {
                this.close();
            }
        });
    }

    open(src, alt) {
        this.lightboxImage.src = src;
        this.lightboxImage.alt = alt;
        this.lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            this.lightbox.style.opacity = '1';
        });
    }

    close() {
        this.lightbox.style.opacity = '0';
        setTimeout(() => {
            this.lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 150);
    }
}

// Smooth scroll for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle any internal anchor links if added later
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements that should animate in
            const animatedElements = document.querySelectorAll('.step, .resource-card, .author-card');
            animatedElements.forEach(el => {
                this.observer.observe(el);
            });
        }
    }
}

// Enhanced button interactions
class ButtonEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.download-btn, .resource-card');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRipple);
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        // Ensure button has relative positioning
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
}

// Add CSS for ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize scroll performance
        this.setupScrollOptimization();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Note: This would be used if we had data-src attributes
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    setupScrollOptimization() {
        // Throttle scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Handle scroll-based animations if needed
            }, 16); // ~60fps
        }, { passive: true });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
    new SmoothScroll();
    new AnimationObserver();
    new ButtonEffects();
    new PerformanceOptimizer();
    
    // Add a subtle entrance animation to the header
    const header = document.querySelector('.header');
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
});

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        // Could add a placeholder or retry logic here
    }
}, true);

// Add initial styles for header animation
document.querySelector('.header').style.cssText = `
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
`;
