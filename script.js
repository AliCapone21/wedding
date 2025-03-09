const countdownElement = document.getElementById('countdown');

// Countdown Timer Functionality
const countdownDate = new Date("April 13, 2025 17:00:00").getTime();

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
    // Create a new leaf element
    const leaf = document.createElement('div');
    leaf.classList.add('sakura-leaf');
    
    // Position the leaf randomly at the top of the page
    const leafPositionX = Math.random() * window.innerWidth; // Random position from left to right
    const leafPositionY = -40; // Start position (above the page)

    // Apply the position to the leaf
    leaf.style.left = `${leafPositionX}px`;
    leaf.style.top = `${leafPositionY}px`;

    // Random rotation value (between -360 to 360 degrees)
    const rotationValue = (Math.random() * 720 - 360).toFixed(2); // Random rotate from -360deg to 360deg
    leaf.style.transform = `rotate(${rotationValue}deg)`;  // Apply random rotation

    // Set a random animation duration to make each leaf fall at different speeds
    const animationDuration = Math.random() * (8 - 5) + 5; // between 5s and 8s
    leaf.style.animationDuration = `${animationDuration}s`;

    // Add the leaf to the body
    document.body.appendChild(leaf);
    
    // Remove the leaf after it falls off the screen (after animation duration)
    setTimeout(() => {
        leaf.remove();
    }, animationDuration * 1000);
}

// Create a new leaf every 200ms (you can adjust this timing for more or fewer leaves)
setInterval(createLeaf, 200);

// Force scroll to top when the page loads
window.onload = () => window.scrollTo(0, 0);
