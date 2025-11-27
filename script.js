// DOM Elements
const header = document.querySelector('.header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('.section');
const portfolioTabs = document.querySelectorAll('.tab-btn');
const portfolioContents = document.querySelectorAll('.portfolio-content');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioCircles = document.querySelectorAll('.portfolio-circle');
const portfolioSections = document.querySelectorAll('.portfolio-section');
const mergedContactForm = document.querySelector('.merged-contact-form');

const EMAIL_JS_CONFIG = {
    serviceId: 'service_inrh3ml',
    templateId: 'template_3kxydkj',
    publicKey: 'hau0K0IPygzW7b-N-'
};

// Debug: Check if elements are found
console.log('Portfolio circles found:', portfolioCircles.length);
console.log('Portfolio sections found:', portfolioSections.length);
portfolioCircles.forEach((circle, index) => {
    console.log(`Circle ${index}:`, circle, 'data-category:', circle.dataset.category);
});
portfolioSections.forEach((section, index) => {
    console.log(`Section ${index}:`, section, 'id:', section.id);
});

// Header Scroll Effect
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animate sections on scroll
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled > sectionTop - windowHeight + 100) {
            section.classList.add('visible');
        }
    });
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight || 60;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize navigation links
function initializeNavigation() {
    console.log('🚀 Initializing navigation...');
    
    // Get all navigation links (header and footer)
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            console.log('Navigation clicked:', targetId);
            
            if (targetId.startsWith('#')) {
                smoothScroll(targetId);
            }
        });
    });
    
    console.log('✅ Navigation initialized');
}

// Mobile Navigation Functions
function toggleMobileNav() {
    if (mobileNav && mobileMenuToggle) {
        mobileNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        
        // Prevent background scrolling on mobile
        if (mobileNav.classList.contains('active')) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }
}

function closeMobileNav() {
    if (mobileNav && mobileMenuToggle) {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.style.position = '';
        document.body.style.width = '';
    }
}

// Initialize Mobile Navigation
function initializeMobileNavigation() {
    console.log('🚀 Initializing mobile navigation...');
    
    // Mobile menu toggle click
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileNav();
        });
        
        // Add touch event for better mobile responsiveness
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
    }
    
    // Close mobile nav when clicking outside
    if (mobileNav) {
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMobileNav();
            }
        });
    }
    
    // Mobile nav links click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            console.log('Mobile navigation clicked:', targetId);
            
            // Close mobile nav first
            closeMobileNav();
            
            // Then navigate
            if (targetId.startsWith('#')) {
                setTimeout(() => {
                    smoothScroll(targetId);
                }, 300); // Wait for nav to close
            }
        });
        
        // Add touch events for better mobile experience
        link.addEventListener('touchstart', function(e) {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }, { passive: true });
        
        link.addEventListener('touchend', function(e) {
            this.style.backgroundColor = '';
        }, { passive: true });
    });
    
    // Handle escape key to close mobile nav
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    console.log('✅ Mobile navigation initialized');
}

// Portfolio Tabs
function switchTab(tabName) {
    // Update tab buttons
    portfolioTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update content
    portfolioContents.forEach(content => {
        if (content.id === `${tabName}-content`) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
}

// CLEAN IMAGE MODAL IMPLEMENTATION
let modal = null;
let modalImg = null;
let closeSpan = null;

function openModal(imageSrc) {
    console.log('🚀 OPENING MODAL with image:', imageSrc);
    
    if (!modal) {
        modal = document.getElementById('imageModal');
        modalImg = document.getElementById('modalImage');
        closeSpan = document.querySelector('.close');
        
        console.log('Modal elements:', { modal, modalImg, closeSpan });
    }
    
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.style.display = 'block';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal opened successfully');
    } else {
        console.error('❌ Modal elements not found');
    }
}

function closeModal() {
    console.log('❌ CLOSING MODAL');
    
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        document.body.style.overflow = 'auto';
        console.log('✅ Modal closed successfully');
    }
}

function initializeImageModal() {
    console.log('🔧 Initializing image modal...');
    
    // Get modal elements
    modal = document.getElementById('imageModal');
    modalImg = document.getElementById('modalImage');
    closeSpan = document.querySelector('.close');
    
    console.log('Found elements:', { modal, modalImg, closeSpan });
    
    if (!modal || !modalImg || !closeSpan) {
        console.error('❌ Required modal elements not found!');
        return;
    }
    
    // Close button click
    closeSpan.onclick = function(e) {
        console.log('❌ Close button clicked');
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    };
    
    // Click outside to close
    modal.onclick = function(e) {
        console.log('🎯 Modal backdrop clicked');
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // ESC key to close
    document.onkeydown = function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            console.log('⌨️ ESC pressed');
            closeModal();
        }
    };
    
    // Make ALL images clickable
    const allImages = document.querySelectorAll('img');
    console.log(`🖼️ Found ${allImages.length} images to make clickable`);
    
    allImages.forEach((img, index) => {
        // Skip form background images
        if (img.classList.contains('form-bg-image')) {
            console.log(`⏭️ Skipping form background image ${index}`);
            return;
        }
        
        img.style.cursor = 'pointer';
        img.onclick = function(e) {
            console.log(`📸 IMAGE ${index} CLICKED:`, this.src);
            e.preventDefault();
            e.stopPropagation();
            openModal(this.src);
        };
        
        console.log(`✅ Made image ${index} clickable`);
    });
    
    console.log('✅ Image modal initialization complete');
}

// Test function
function testModal() {
    console.log('🧪 Testing modal...');
    openModal('./Edits/1.jpeg');
}

// Portfolio switching functions (called from HTML)
function showEdits() {
    console.log('🎨 Showing Edits section...');
    
    // Update circles
    document.querySelectorAll('.portfolio-circle').forEach(circle => {
        circle.classList.remove('active');
        if (circle.dataset.category === 'edits') {
            circle.classList.add('active');
        }
    });
    
    // Update sections
    document.querySelectorAll('.portfolio-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === 'edits') {
            section.classList.add('active');
        }
    });
}

function showPaintings() {
    console.log('🎨 Showing Paintings section...');
    
    // Update circles
    document.querySelectorAll('.portfolio-circle').forEach(circle => {
        circle.classList.remove('active');
        if (circle.dataset.category === 'paintings') {
            circle.classList.add('active');
        }
    });
    
    // Update sections
    document.querySelectorAll('.portfolio-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === 'paintings') {
            section.classList.add('active');
        }
    });
}

// Parallax effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Add hover effects
function addHoverEffects() {
    // Removed hover effects to prevent conflicts with modal functionality
    console.log('Hover effects disabled to prevent transform conflicts');
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.portfolio-item, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// Add floating animation to elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.hero-image img, .about-image-main');
    floatingElements.forEach(element => {
        element.classList.add('float-animation');
    });
}

// Initialize Phosphor Icons
function initPhosphorIcons() {
    // Phosphor icons are loaded via CDN, no additional initialization needed
    console.log('Phosphor icons loaded');
}

// Setup scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .portfolio-title');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Starting initialization...');
    
    // Initial setup
    initPhosphorIcons();
    setupIntersectionObserver();
    setupScrollAnimations();
    addHoverEffects();
    addFloatingAnimation();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Initialize image modal FIRST
    initializeImageModal();
    
    // Initialize mobile-specific features
    initializeMobileImageHandling();
    initializeMobileModal();
    
    // Scroll events
    const debouncedScroll = debounce(() => {
        handleScroll();
        handleParallax();
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Navigation events
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileNav);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileNav);
    }
    
    // Close mobile nav when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            closeMobileNav();
            setTimeout(() => smoothScroll(target), 300);
        });
    });
    
    // Desktop navigation is handled by initializeNavigation() function
    
    // Portfolio tabs
    portfolioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Portfolio navigation - Add click handlers as backup
    const editsBtn = document.querySelector('[data-category="edits"]');
    const paintingsBtn = document.querySelector('[data-category="paintings"]');
    
    if (editsBtn) {
        editsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Edits button clicked');
            showEdits();
        });
    }
    
    if (paintingsBtn) {
        paintingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Paintings button clicked');
            showPaintings();
        });
    }
    
    // Initialize with Edits showing by default
    setTimeout(() => {
        showEdits();
    }, 500);
    
    let emailJsReady = false;
    if (window.emailjs) {
        if (
            EMAIL_JS_CONFIG.publicKey &&
            !EMAIL_JS_CONFIG.publicKey.includes('YOUR_EMAILJS')
        ) {
            emailjs.init({
                publicKey: EMAIL_JS_CONFIG.publicKey
            });
            emailJsReady = true;
        } else {
            console.warn('EmailJS public key missing. Update EMAIL_JS_CONFIG.');
        }
    } else {
        console.warn('EmailJS library failed to load.');
    }

    if (mergedContactForm) {
        mergedContactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const requestSelect = mergedContactForm.querySelector('select[name="RequestType"]');
            if (!requestSelect || !requestSelect.value) {
                alert('Please select what you are looking for.');
                return;
            }
            
            if (!emailJsReady) {
                alert('The email service is not configured yet. Please email zeutreiofficiel@gmail.com directly.');
                return;
            }
            
            const submitBtn = mergedContactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ph ph-spinner-gap"></i> Sending...';
            
            const formData = new FormData(mergedContactForm);
            const templateParams = {
                subject: `${requestSelect.value} inquiry via Marina's House`,
                name: formData.get('Name'),
                email: formData.get('Email'),
                requestType: formData.get('RequestType'),
                brandOrProject: formData.get('BrandOrProject') || 'Not provided',
                description: formData.get('Description'),
                budget: formData.get('Budget') || 'Not provided',
                links: formData.get('Links') || 'Not provided'
            };
            
            try {
                await emailjs.send(
                    EMAIL_JS_CONFIG.serviceId,
                    EMAIL_JS_CONFIG.templateId,
                    templateParams
                );
                
                submitBtn.innerHTML = '<i class="ph ph-check"></i> Sent!';
                mergedContactForm.reset();
            } catch (error) {
                console.error('EmailJS error:', error);
                submitBtn.innerHTML = '<i class="ph ph-warning"></i> Error';
                alert('Something went wrong while sending. Please try again or email zeutreiofficiel@gmail.com directly.');
            } finally {
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 2500);
            }
        });
    }
    
    console.log('✅ All event listeners initialized');
});

// Resize handler
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
}, 250));

// Prevent context menu for better UX (disabled to allow right-click and dev tools)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    .float-animation {
        animation: float-gentle 6s ease-in-out infinite;
    }
    
    @keyframes float-gentle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        filter: blur(0px) !important;
    }
`;
document.head.appendChild(style);

// Global functions for portfolio switching
window.showEdits = function() {
    console.log('🎨 showEdits() called');
    const editsBtn = document.querySelector('[data-category="edits"]');
    const paintingsBtn = document.querySelector('[data-category="paintings"]');
    const editsSection = document.getElementById('edits');
    const paintingsSection = document.getElementById('paintings');
    
    console.log('Elements found:', { editsBtn, paintingsBtn, editsSection, paintingsSection });
    
    if (editsBtn && paintingsBtn && editsSection && paintingsSection) {
        // Update button states
        editsBtn.classList.add('active');
        paintingsBtn.classList.remove('active');
        
        // Show edits section
        editsSection.style.display = 'block';
        editsSection.classList.add('active');
        
        // Hide paintings section
        paintingsSection.style.display = 'none';
        paintingsSection.classList.remove('active');
        
        console.log('✅ Successfully switched to Edits');
        
        // Re-initialize image modal for new images
        setTimeout(() => {
            initializeImageModal();
        }, 100);
    } else {
        console.error('❌ Could not find portfolio elements for Edits');
    }
};

window.showPaintings = function() {
    console.log('🖼️ showPaintings() called');
    const editsBtn = document.querySelector('[data-category="edits"]');
    const paintingsBtn = document.querySelector('[data-category="paintings"]');
    const editsSection = document.getElementById('edits');
    const paintingsSection = document.getElementById('paintings');
    
    console.log('Elements found:', { editsBtn, paintingsBtn, editsSection, paintingsSection });
    
    if (editsBtn && paintingsBtn && editsSection && paintingsSection) {
        // Update button states
        paintingsBtn.classList.add('active');
        editsBtn.classList.remove('active');
        
        // Show paintings section
        paintingsSection.style.display = 'block';
        paintingsSection.classList.add('active');
        
        // Hide edits section
        editsSection.style.display = 'none';
        editsSection.classList.remove('active');
        
        console.log('✅ Successfully switched to Paintings');
        
        // Re-initialize image modal for new images
        setTimeout(() => {
            initializeImageModal();
        }, 100);
    } else {
        console.error('❌ Could not find portfolio elements for Paintings');
    }
};

// Global functions for debugging and access
window.testModal = testModal;
window.openModal = openModal;
window.closeModal = closeModal;

// Export functions for global access
window.MarinaPortfolio = {
    smoothScroll,
    openModal,
    closeModal,
    toggleMobileNav,
    switchTab,
    showEdits: window.showEdits,
    showPaintings: window.showPaintings
};

// Add mobile-specific image handling
function initializeMobileImageHandling() {
    console.log('🚀 Initializing mobile image handling...');
    
    // Add touch interactions to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            // Add touch feedback
            item.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            item.addEventListener('touchend', function(e) {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
                
                // Open modal on touch end (after a brief delay to ensure it's not a scroll)
                setTimeout(() => {
                    const imageSrc = this.dataset.image || img.src;
                    if (imageSrc) {
                        openModal(imageSrc);
                    }
                }, 50);
            }, { passive: true });
            
            item.addEventListener('touchcancel', function(e) {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
            }, { passive: true });
        }
    });
    
    // Add touch interactions to testimonial images
    const postItems = document.querySelectorAll('.post-item');
    postItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            item.addEventListener('touchend', function(e) {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    const imageSrc = img.src;
                    if (imageSrc) {
                        openModal(imageSrc);
                    }
                }, 50);
            }, { passive: true });
            
            item.addEventListener('touchcancel', function(e) {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
            }, { passive: true });
        }
    });
    
    console.log('✅ Mobile image handling initialized');
}

// Improved mobile modal handling
function initializeMobileModal() {
    console.log('🔧 Initializing mobile modal...');
    
    // Get modal elements
    modal = document.getElementById('imageModal');
    modalImg = document.getElementById('modalImage');
    closeSpan = document.querySelector('.close');
    
    console.log('Found elements:', { modal, modalImg, closeSpan });
    
    if (modal && closeSpan) {
        // Close modal on click/touch
        closeSpan.addEventListener('click', closeModal);
        closeSpan.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeModal();
        }, { passive: false });
        
        // Close modal when clicking/touching outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        modal.addEventListener('touchend', function(e) {
            if (e.target === modal) {
                e.preventDefault();
                closeModal();
            }
        }, { passive: false });
        
        // Handle swipe gestures to close modal
        let startY = null;
        let startX = null;
        
        modal.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            }
        }, { passive: true });
        
        modal.addEventListener('touchmove', function(e) {
            if (!startY || !startX || e.touches.length !== 1) return;
            
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const diffY = startY - currentY;
            const diffX = startX - currentX;
            
            // Close on significant vertical swipe (up or down)
            if (Math.abs(diffY) > 100 && Math.abs(diffY) > Math.abs(diffX)) {
                closeModal();
                startY = null;
                startX = null;
            }
        }, { passive: true });
        
        console.log('✅ Mobile modal initialized');
    } else {
        console.error('❌ Modal elements not found');
    }
} 