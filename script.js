// ========================================
// DOM Elements
// ========================================
const header = document.querySelector('.header');
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const tickerItems = document.querySelectorAll('.ticker-item');
const contactForm = document.getElementById('contactForm');

// ========================================
// Mobile Navigation Toggle
// ========================================
mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ========================================
// Header Scroll Effect
// ========================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Smooth Scrolling for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Market Ticker Price Simulation
// ========================================
const tickerPrices = {
    'BTC': { price: 67234.56, change: 2.34 },
    'ETH': { price: 3456.78, change: 1.89 },
    'AAPL': { price: 189.45, change: 0.76 },
    'TSLA': { price: 245.67, change: -1.23 },
    'NVDA': { price: 878.90, change: 3.45 },
    'SPY': { price: 512.34, change: 0.45 }
};

function updateTickerPrices() {
    tickerItems.forEach(item => {
        const symbol = item.querySelector('.ticker-symbol').textContent;
        const priceEl = item.querySelector('.ticker-price');
        const changeEl = item.querySelector('.ticker-change');
        
        if (tickerPrices[symbol]) {
            // Simulate small price changes
            const priceChange = (Math.random() - 0.5) * 0.01;
            tickerPrices[symbol].price *= (1 + priceChange);
            
            // Update change slightly
            tickerPrices[symbol].change += (Math.random() - 0.5) * 0.1;
            
            // Format price
            let formattedPrice;
            if (tickerPrices[symbol].price > 1000) {
                formattedPrice = '$' + tickerPrices[symbol].price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                formattedPrice = '$' + tickerPrices[symbol].price.toFixed(2);
            }
            
            priceEl.textContent = formattedPrice;
            
            // Update change indicator
            const isPositive = tickerPrices[symbol].change >= 0;
            changeEl.textContent = (isPositive ? '+' : '') + tickerPrices[symbol].change.toFixed(2) + '%';
            changeEl.className = 'ticker-change ' + (isPositive ? 'positive' : 'negative');
        }
    });
}

// Update prices every 3 seconds
setInterval(updateTickerPrices, 3000);

// ========================================
// Counter Animation for Statistics
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
let countersAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, observerOptions);

counterObserver.observe(heroSection);

// ========================================
// Form Validation
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const subject = this.querySelector('select[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Simple validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage = 'Please enter your name.';
        } else if (!email || !emailRegex.test(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (!subject) {
            isValid = false;
            errorMessage = 'Please select a subject.';
        } else if (!message) {
            isValid = false;
            errorMessage = 'Please enter your message.';
        }
        
        if (isValid) {
            // Show success message (in a real app, this would send data to server)
            alert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// ========================================
// Quick Amount Buttons in Trade Panel
// ========================================
const quickAmounts = document.querySelectorAll('.quick-amounts span');
quickAmounts.forEach(btn => {
    btn.addEventListener('click', function() {
        quickAmounts.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const fadeElements = document.querySelectorAll('.service-card, .market-card, .testimonial-card, .feature-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Add fade-in class styles
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========================================
// Number Formatting for Market Prices
// ========================================
function formatPrice(price, decimals = 2) {
    if (price >= 1000) {
        return '$' + price.toLocaleString('en-US', { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
        });
    }
    return '$' + price.toFixed(decimals);
}

// ========================================
// Handle Window Resize
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any responsive elements if needed
    }, 250);
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('NexusTrade - Broker Website Loaded');
});
