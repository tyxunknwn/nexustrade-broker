// DOM Elements
const header = document.querySelector('.header');
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const tickerItems = document.querySelectorAll('.ticker-item');
const contactForm = document.getElementById('contactForm');

// Current user state
let currentUser = null;

// Mobile Navigation Toggle
mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Header Scroll Effect
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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Active Navigation
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

// Market Ticker
const tickerPrices = {
    'TSLA': { price: 412.34, change: 3.45 },
    'SPACE': { price: 156.78, change: 2.89 },
    'DOGE': { price: 0.1234, change: 5.67 },
    'BTC': { price: 67234.56, change: 2.34 },
    'ETH': { price: 3456.78, change: 1.89 },
    'XRP': { price: 0.5678, change: -1.23 }
};

function updateTickerPrices() {
    tickerItems.forEach(item => {
        const symbol = item.querySelector('.ticker-symbol').textContent;
        const priceEl = item.querySelector('.ticker-price');
        const changeEl = item.querySelector('.ticker-change');
        
        if (tickerPrices[symbol]) {
            const priceChange = (Math.random() - 0.5) * 0.01;
            tickerPrices[symbol].price *= (1 + priceChange);
            tickerPrices[symbol].change += (Math.random() - 0.5) * 0.1;
            
            let formattedPrice;
            if (tickerPrices[symbol].price > 1000) {
                formattedPrice = '$' + tickerPrices[symbol].price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else if (tickerPrices[symbol].price > 1) {
                formattedPrice = '$' + tickerPrices[symbol].price.toFixed(2);
            } else {
                formattedPrice = '$' + tickerPrices[symbol].price.toFixed(4);
            }
            
            priceEl.textContent = formattedPrice;
            const isPositive = tickerPrices[symbol].change >= 0;
            changeEl.textContent = (isPositive ? '+' : '') + tickerPrices[symbol].change.toFixed(2) + '%';
            changeEl.className = 'ticker-change ' + (isPositive ? 'positive' : 'negative');
        }
    });
}

setInterval(updateTickerPrices, 3000);

// Counter Animation
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

const heroSection = document.querySelector('.hero');
let countersAnimated = false;
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });
counterObserver.observe(heroSection);

// Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        this.reset();
    });
}

// Quick Amount Buttons
const quickAmounts = document.querySelectorAll('.quick-amounts span');
quickAmounts.forEach(btn => {
    btn.addEventListener('click', function() {
        quickAmounts.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    setTimeout(() => { openModal(toModalId); }, 200);
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    
    if (email && password) {
        currentUser = { email: email, name: email.split('@')[0] };
        updateUIForLoggedInUser(currentUser.name);
        closeModal('loginModal');
        alert('Login successful! Welcome back to OptimusTrade.');
        form.reset();
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const fullname = form.querySelector('input[name="fullname"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    
    if (fullname && email && password) {
        currentUser = { email: email, name: fullname };
        updateUIForLoggedInUser(fullname);
        closeModal('registerModal');
        alert('Account created successfully! Welcome to OptimusTrade. Your admin dashboard is now available!');
        form.reset();
    }
}

// Update UI when user logs in
function updateUIForLoggedInUser(name) {
    // Hide login/register buttons
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';
    
    // Show user greeting and logout
    const greeting = document.getElementById('userGreeting');
    greeting.textContent = 'Welcome, ' + name + '!';
    greeting.style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
    
    // Show admin nav link
    document.getElementById('adminNav').style.display = 'block';
    
    // Show admin dashboard section
    document.getElementById('admin').style.display = 'block';
    
    // Update admin name
    document.getElementById('adminName').textContent = name;
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    
    // Show login/register buttons
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('registerBtn').style.display = 'block';
    
    // Hide user greeting and logout
    document.getElementById('userGreeting').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    
    // Hide admin nav link
    document.getElementById('adminNav').style.display = 'none';
    
    // Hide admin dashboard section
    document.getElementById('admin').style.display = 'none';
    
    alert('You have been logged out. See you soon!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('OptimusTrade - SpaceX & Tesla Broker Website Loaded');
});
