// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing effect (simplified)
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        typingElement.style.animation = 'none';
        setTimeout(() => {
            typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 100);
    }
});

// Resume Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('resumeUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadProgress = document.querySelector('.upload-progress');
    const progressBar = document.querySelector('.progress-bar');

    // Click on upload area
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.background = 'var(--light-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.background = 'white';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.background = 'white';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // Upload button click
    uploadBtn.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            handleFileUpload(fileInput.files[0]);
        } else {
            alert('Please select a file first');
        }
    });

    function handleFileUpload(file) {
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        // Show progress
        uploadProgress.style.display = 'block';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    alert('Resume uploaded successfully!');
                    uploadProgress.style.display = 'none';
                    progressBar.style.width = '0%';
                    
                    // Update resume info
                    const resumeInfo = document.querySelector('.resume-info h4');
                    const resumeDate = document.querySelector('.resume-info p');
                    if (resumeInfo && resumeDate) {
                        resumeInfo.textContent = file.name;
                        const now = new Date();
                        resumeDate.textContent = `Updated: ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
                    }
                    
                    // Store in localStorage
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        localStorage.setItem('currentResume', e.target.result);
                        localStorage.setItem('resumeName', file.name);
                        localStorage.setItem('resumeDate', new Date().toISOString());
                    };
                    reader.readAsDataURL(file);
                }, 1000);
            }
        }, 100);
    }

    // Load saved resume
    const savedResume = localStorage.getItem('currentResume');
    if (savedResume) {
        const resumeInfo = document.querySelector('.resume-info h4');
        const resumeDate = document.querySelector('.resume-info p');
        if (resumeInfo && resumeDate) {
            resumeInfo.textContent = localStorage.getItem('resumeName') || 'Braham_Dev_Resume_2024.pdf';
            const date = new Date(localStorage.getItem('resumeDate') || Date.now());
            resumeDate.textContent = `Updated: ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        }
    }

    // Download resume
    const downloadBtn = document.getElementById('download-resume');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const savedResume = localStorage.getItem('currentResume');
        
        if (savedResume) {
            const link = document.createElement('a');
            link.href = savedResume;
            link.download = localStorage.getItem('resumeName') || 'Braham_Dev_Resume_2024.pdf';
            link.click();
        } else {
            alert('No resume found. Please upload one first.');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.skill-category, .cert-card, .timeline-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
