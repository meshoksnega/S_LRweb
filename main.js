// Smooth scroll behavior for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe guide steps for stagger animation
    const guideSteps = document.querySelectorAll('.guide-step');
    guideSteps.forEach(step => {
        observer.observe(step);
    });

    // Add parallax effect to header image
    const showcaseImage = document.querySelector('.showcase-image');
    if (showcaseImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < window.innerHeight) {
                showcaseImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add subtle image loading effects
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // Add download button click tracking (optional analytics)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // You can add analytics tracking here if needed
            console.log('Download button clicked');
        });
    }

    // Enhanced hover effects for resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });

    // Lightbox functionality
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <img class="lightbox-image" src="" alt="">
        `;
        document.body.appendChild(lightbox);
        return lightbox;
    }

    const lightbox = createLightbox();
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Add click handlers to all images
    const clickableImages = document.querySelectorAll('.showcase-image, .guide-image, .author-avatar');
    
    clickableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox handlers
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// Add CSS class for loaded images
document.head.insertAdjacentHTML('beforeend', `
    <style>
        img {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img.loaded {
            opacity: 1;
        }
    </style>
`);
