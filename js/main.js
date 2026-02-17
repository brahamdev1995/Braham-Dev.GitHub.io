// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Junior Linux Engineer',
    'RHCSA Certified',
    'Container Specialist',
    'Cloud Enthusiast',
    'DevOps Learner'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 150);
    }
}

// Start typing animation
typeEffect();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Terminal animation enhancement
const terminalBody = document.querySelector('.terminal-body');
if (terminalBody) {
    const commands = terminalBody.querySelectorAll('p');
    commands.forEach((cmd, index) => {
        cmd.style.opacity = '0';
        cmd.style.animation = `fadeIn 0.5s ease forwards ${index * 0.3}s`;
    });
}

// Add fadeIn animation
const keyframes = document.createElement('style');
keyframes.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(keyframes);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (hero && scrolled < window.innerHeight) {
        const heroContent = document.querySelector('.hero-content');
        const terminalWindow = document.querySelector('.terminal-window');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        if (terminalWindow) {
            terminalWindow.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <span class="loader-text">Loading...</span>
            <div class="loader-bar"></div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeOut 0.5s ease 1s forwards;
        }
        
        .loader {
            text-align: center;
        }
        
        .loader-text {
            color: var(--primary-color);
            font-size: 1.2rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .loader-bar {
            width: 200px;
            height: 2px;
            background: rgba(0, 255, 157, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .loader-bar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 50%;
            background: var(--primary-color);
            animation: loading 1s ease infinite;
        }
        
        @keyframes loading {
            0% { left: -50%; }
            100% { left: 100%; }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.remove();
    }, 1500);
});

// Copy email to clipboard
const emailElement = document.querySelector('.contact-item a[href^="mailto"]');
if (emailElement) {
    emailElement.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailElement.textContent;
        
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary tooltip
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary-color);
                color: var(--dark-bg);
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.8rem;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                animation: fadeOut 2s forwards;
            `;
            
            emailElement.style.position = 'relative';
            emailElement.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .terminal-window {
        animation: float 6s ease-in-out infinite;
    }
    
    .cert-card {
        animation: float 6s ease-in-out infinite;
        animation-delay: calc(var(--i) * 0.2s);
    }
    
    .skill-tag {
        transition: all 0.3s ease;
    }
    
    .skill-tag:hover {
        transform: scale(1.1) rotate(2deg);
        box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3);
    }
`;
document.head.appendChild(animationStyles);
