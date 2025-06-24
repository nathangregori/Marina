// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('.section');
const portfolioTabs = document.querySelectorAll('.tab-btn');
const portfolioContents = document.querySelectorAll('.portfolio-content');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.querySelector('.contact-form');
const portfolioCircles = document.querySelectorAll('.portfolio-circle');
const portfolioSections = document.querySelectorAll('.portfolio-section');

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

// Mobile Navigation
function toggleMobileNav() {
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileNav() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
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

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    console.log('Form submitted:', formObject);
    
    // Here you would typically send the data to a server
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
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
    
    // Initialize image modal FIRST
    initializeImageModal();
    
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
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
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
    
    // Email forms functionality
    const customForm = document.querySelector('.custom-form');
    const collaborationForm = document.querySelector('.collaboration-form');
    
    async function sendEmail(formData, formType) {
        const subject = formType === 'custom' ? 
            `Custom Art Request from ${formData.name}` : 
            `Collaboration Proposal from ${formData.name}`;
        
        let body = '';
        if (formType === 'custom') {
            body = `Name: ${formData.name}%0D%0A` +
                   `Email: ${formData.email}%0D%0A` +
                   `Request Type: ${formData.requestType}%0D%0A` +
                   `Budget: ${formData.budget}%0D%0A%0D%0A` +
                   `Description:%0D%0A${formData.description}`;
        } else {
            body = `Name: ${formData.name}%0D%0A` +
                   `Email: ${formData.email}%0D%0A` +
                   `Brand/Project: ${formData.brandName}%0D%0A` +
                   `Website: ${formData.website || 'Not provided'}%0D%0A%0D%0A` +
                   `Collaboration Idea:%0D%0A${formData.description}`;
        }
        
        const mailtoLink = `mailto:marinagreenca333@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.open(mailtoLink);
        
        const submitBtn = formType === 'custom' ? 
            customForm.querySelector('.submit-btn') : 
            collaborationForm.querySelector('.submit-btn');
        
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="ph ph-check"></i> Opening email client...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
            submitBtn.style.color = 'white';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="ph ph-check"></i> Email opened! Please send it.';
                submitBtn.style.background = 'linear-gradient(145deg, #2196F3, #1976D2)';
                submitBtn.style.color = 'white';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    
                    if (formType === 'custom') {
                        customForm.reset();
                    } else {
                        collaborationForm.reset();
                    }
                }, 3000);
            }, 1000);
            
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = '<i class="ph ph-warning"></i> Error - Please try again';
            submitBtn.style.background = 'linear-gradient(145deg, #f44336, #d32f2f)';
            submitBtn.style.color = 'white';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
        }
    }

    if (customForm) {
        customForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[type="text"]');
            const name = inputs[0].value;
            const budget = inputs[1].value;
            const email = this.querySelector('input[type="email"]').value;
            const requestType = this.querySelector('select').value;
            const description = this.querySelector('textarea').value;
            
            if (!name || !email || !requestType || !description || !budget) {
                alert('Please fill in all required fields');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            sendEmail({
                name,
                email,
                requestType,
                description,
                budget
            }, 'custom');
        });
    }

    if (collaborationForm) {
        collaborationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[type="text"], input[type="email"], input[type="url"]');
            const name = inputs[0].value;
            const email = inputs[1].value;
            const brandName = inputs[2].value;
            const website = inputs[3].value;
            const description = this.querySelector('textarea').value;
            
            if (!name || !email || !brandName || !description) {
                alert('Please fill in all required fields');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            sendEmail({
                name,
                email,
                brandName,
                description,
                website
            }, 'collaboration');
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

// Prevent context menu for better UX
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

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