// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderScroll();
    setupCartFunctionality();
    setupProductCards();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll effect to header
function setupHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Cart functionality
let cartCount = 3;

function setupCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            showCartModal();
        });
    }
}

function showCartModal() {
    alert(`You have ${cartCount} items in your cart!\n\nItems:\n• Rose Bouquet\n• Tulip Collection\n• Sunflower Bunch\n\nTotal: $74.97`);
}

function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.innerHTML = `🛒 Cart (${cartCount})`;
    }
}

// Product card functionality
function setupProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            addToCart(card);
        });
    });
}

function addToCart(productCard) {
    cartCount++;
    updateCartCount();
    
    // Visual feedback
    productCard.style.transform = 'scale(1.1)';
    setTimeout(() => {
        productCard.style.transform = 'scale(1.05)';
    }, 200);
    
    // Get product name
    const productName = productCard.querySelector('h3').textContent;
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Optional: Add some celebration effect
    addCelebrationEffect(productCard);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 2500);
}

function addCelebrationEffect(element) {
    // Create floating hearts effect
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingHeart(element);
        }, i * 100);
    }
}

function createFloatingHeart(element) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 2s ease-out forwards;
    `;
    
    const rect = element.getBoundingClientRect();
    heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
    heart.style.top = (rect.top + window.scrollY) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2000);
}

// Add dynamic CSS for animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes floatUp {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(0.5); 
            }
            50% { 
                opacity: 1; 
                transform: translateY(-50px) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-100px) scale(0.5); 
            }
        }
        
        .notification {
            transition: all 0.3s ease;
        }
        
        .product-card {
            transition: all 0.3s ease;
        }
        
        .product-card:active {
            transform: scale(0.95) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Mobile menu toggle (for future enhancement)
function setupMobileMenu() {
    // This can be expanded for mobile hamburger menu
    const navMenu = document.querySelector('.nav-menu');
    
    // Add mobile menu button dynamically if screen is small
    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #333;
            cursor: pointer;
        `;
        
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    setupMobileMenu();
});

// Initialize mobile menu
setupMobileMenu();

// Search functionality (placeholder for future enhancement)
function setupSearch() {
    // This can be expanded to add search functionality
    console.log('Search functionality ready for implementation');
}

// Form validation (placeholder for contact forms)
function setupFormValidation() {
    // This can be expanded for contact or order forms
    console.log('Form validation ready for implementation');
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    setupFormValidation();
});