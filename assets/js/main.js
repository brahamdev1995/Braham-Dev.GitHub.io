// 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene').appendChild(renderer.domElement);

// Create floating particles
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    vertices.push(x, y, z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ color: 0x00ff88, size: 2 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 500;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    
    renderer.render(scene, camera);
}

animate();

// Typed text animation
const typedText = document.querySelector('.typed-text');
const words = ['Linux Engineer', 'DevOps Enthusiast', 'Container Specialist', 'Cloud Expert', 'RHCSA Certified'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();

// File upload handling
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('resume');
    const file = fileInput.files[0];
    
    if (file) {
        // Here you would typically upload to a server
        // For GitHub Pages, we'll store in localStorage
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('resume', e.target.result);
            alert('Resume uploaded successfully!');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file first!');
    }
});

// Display selected file name
document.getElementById('resume').addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name || 'No file chosen';
    document.getElementById('file-name').textContent = fileName;
});

// Progress bars animation on scroll
const skillItems = document.querySelectorAll('.skill-item');

function animateProgressBars() {
    skillItems.forEach(item => {
        const progress = item.dataset.progress;
        const progressBar = item.querySelector('.progress-bar-3d');
        
        if (isElementInViewport(item)) {
            progressBar.style.setProperty('--progress', `${progress}%`);
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Create a sample resume file
function createSampleResume() {
    const resumeContent = `
        Braham Dev
        Junior Linux Engineer
        =====================
        
        Contact: braham.dev@email.com
        Phone: +91 XXXXXXXXXX
        
        Summary:
        Experienced Linux Engineer with 4+ years in IT infrastructure,
        RHCSA certified, specializing in DevOps practices and cloud technologies.
        
        Experience:
        - Junior Linux Engineer at Teamwork India Pvt. Ltd. (Current)
        - Desktop Support Engineer at Delhi University
        
        Certifications:
        - RHCSA
        - Red Hat Certified Specialist in Containers
        
        Skills:
        - Linux, Windows, MacOS
        - AWS, GCP, Azure
        - Docker, Podman
        - Sophos Firewall
        - Monitoring Tools
    `;
    
    const blob = new Blob([resumeContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Braham_Dev_Resume.pdf';
    a.click();
}

// Add download resume functionality
document.getElementById('download-resume').addEventListener('click', function(e) {
    e.preventDefault();
    createSampleResume();
});

// Responsive handling
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
