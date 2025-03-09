const countdownElement = document.getElementById('countdown');

// Countdown Timer Functionality
const countdownDate = new Date("April 13, 2025 17:00:00").getTime();

// Background Music
const audio = document.getElementById("bg-music");

if (audio) {
    audio.volume = 0.5; // Set volume to medium

    document.addEventListener("DOMContentLoaded", () => {
        audio.muted = false; // Unmute the audio
        audio.play().catch(err => console.log("Autoplay blocked:", err));
    });

    // Mobile fix: Start music on the first tap
    document.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        }
    }, { once: true });
}

// Force scroll to top when the page loads
window.onload = () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
};

// Update the countdown every second
let countdownInterval = setInterval(function () {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "The Day Has Come!";
    }
}, 1000);

// Intersection Observer for fade-in effect
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add class to trigger animation
        }
    });
}, { threshold: 0.2 }); // 20% of the element must be visible

fadeElements.forEach(el => observer.observe(el));

// Function to create sakura leaves with random rotation directions
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('sakura-leaf');
    
    const leafPositionX = Math.random() * window.innerWidth;
    const leafPositionY = -40;
    
    leaf.style.left = `${leafPositionX}px`;
    leaf.style.top = `${leafPositionY}px`;

    const rotationValue = (Math.random() * 720 - 360).toFixed(2);
    leaf.style.transform = `rotate(${rotationValue}deg)`;

    const animationDuration = Math.random() * (8 - 5) + 5;
    leaf.style.animationDuration = `${animationDuration}s`;

    document.body.appendChild(leaf);
    
    setTimeout(() => {
        leaf.remove();
    }, animationDuration * 1000);
}

// Create a new leaf every 200ms
setInterval(createLeaf, 200);
