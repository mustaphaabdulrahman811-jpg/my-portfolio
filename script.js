const roles = ["Software Engineer.", "Frontend Developer.", "Brand Creator.", "Responsive Web Designer.", "Digital Storyteller."];
const target = document.getElementById("typewriter");
let phraseIndex = 0, letterIndex = 0, direction = 1;

function typeWriter() {
    const currentPhrase = roles[phraseIndex];
    target.textContent = currentPhrase.slice(0, letterIndex);
    letterIndex += direction;
    if (letterIndex > currentPhrase.length) { direction = -1; setTimeout(typeWriter, 1400); return; }
    if (letterIndex < 0) { direction = 1; phraseIndex = (phraseIndex + 1) % roles.length; setTimeout(typeWriter, 200); return; }
    setTimeout(typeWriter, direction === 1 ? 90 : 45);
}

// Falling Hearts
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

class Heart {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 18 + 8;
        this.speed = Math.random() * 1.8 + 0.8;
        this.opacity = Math.random() * 0.4 + 0.15;
    }
    update() { this.y += this.speed; if (this.y > canvas.height + this.size) this.reset(); }
    draw() {
        const isDark = document.documentElement.classList.contains('dark');
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(239, 68, 68, ${this.opacity})`;
        ctx.font = `${this.size}px serif`;
        ctx.fillText('♥', this.x, this.y);
    }
}

function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); hearts.forEach(h => { h.update(); h.draw(); }); requestAnimationFrame(animate); }

// Formspree AJAX Submission
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const feedbackCard = document.getElementById('feedbackCard');
const feedbackSpinner = document.getElementById('feedbackSpinner');
const feedbackMessage = document.getElementById('feedbackMessage');
const feedbackClose = document.getElementById('feedbackClose');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // UI Setup
    formFeedback.classList.remove('hidden');
    feedbackSpinner.style.display = 'block';
    feedbackClose.classList.add('hidden');
    feedbackCard.classList.remove('feedback-success', 'feedback-error');
    feedbackMessage.textContent = 'Sending your message...';

    const formData = new FormData(this);
    
    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        feedbackSpinner.style.display = 'none';
        feedbackClose.classList.remove('hidden');

        if (response.ok) {
            feedbackCard.classList.add('feedback-success');
            feedbackMessage.textContent = 'Sent Successfully! ✨';
            this.reset();
        } else {
            feedbackCard.classList.add('feedback-error');
            feedbackMessage.textContent = 'Oops! There was a problem.';
        }
    } catch (error) {
        feedbackSpinner.style.display = 'none';
        feedbackClose.classList.remove('hidden');
        feedbackCard.classList.add('feedback-error');
        feedbackMessage.textContent = 'Network error. Try again.';
    }
});

feedbackClose.addEventListener('click', () => formFeedback.classList.add('hidden'));

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    document.getElementById('theme-icon').className = document.documentElement.classList.contains('dark') ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-blue-500';
});

window.addEventListener('resize', resize);
resize();
hearts = Array.from({ length: 38 }, () => new Heart());
animate();
setTimeout(typeWriter, 600);