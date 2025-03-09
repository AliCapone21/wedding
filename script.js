const countdownElement = document.getElementById('countdown');

window.onload = function() {
    window.scrollTo(0, 0);
  };

function updateCountdown() {
    const weddingDate = new Date('2025-04-13T17:00:00'); // Corrected wedding date
    const now = new Date();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML = "🎉 The big day is here! 🎉";
        clearInterval(interval);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
        <div class="time-box">
            <div class="time-number">${days}</div>
            <div class="time-label">ДНЕЙ</div>
        </div>
        <div class="time-box">
            <div class="time-number">${hours}</div>
            <div class="time-label">ЧАСОВ</div>
        </div>
        <div class="time-box">
            <div class="time-number">${minutes}</div>
            <div class="time-label">МИНУТ</div>
        </div>
        <div class="time-box">
            <div class="time-number">${seconds}</div>
            <div class="time-label">СЕКУНД</div>
        </div>`;
}

// Run countdown every second
const interval = setInterval(updateCountdown, 1000);
updateCountdown();


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


// Function to create sakura leaves
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
