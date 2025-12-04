// Custom Cursor Script
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let lastX = 0;
let lastY = 0;
let speed = 0;
let targetSize = 36;
let currentSize = 36;
let targetBorder = 4;
let currentBorder = 4;
let isHovering = false;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Calculate speed
    const deltaX = mouseX - lastX;
    const deltaY = mouseY - lastY;
    speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    lastX = mouseX;
    lastY = mouseY;
});

// Animate cursor
function animate() {
    // Instant position update
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Determine target size based on speed (shrink when moving fast)
    if (isHovering) {
        targetSize = 36;
        targetBorder = 4;
    } else {
        // Scale size inversely with speed (faster = smaller)
        // Maps speed 0-30 to size 36-24
        const minSize = 24;
        const maxSize = 36;
        const maxSpeed = 30;
        targetSize = Math.max(minSize, maxSize - (speed / maxSpeed) * (maxSize - minSize));
        
        // Scale border inversely with speed (slower = thicker)
        // Maps speed 0-30 to border 6-2
        const minBorder = 2;
        const maxBorder = 4;
        targetBorder = Math.max(minBorder, maxBorder - (speed / maxSpeed) * (maxBorder - minBorder));
    }

    // Smooth size and border interpolation
    currentSize += (targetSize - currentSize) * 0.15;
    currentBorder += (targetBorder - currentBorder) * 0.15;

    // Apply size and border
    cursor.style.width = currentSize + 'px';
    cursor.style.height = currentSize + 'px';
    cursor.style.borderWidth = currentBorder + 'px';

    // Decay speed
    speed *= 0.9;

    requestAnimationFrame(animate);
}

animate();

// Fill cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .button');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        isHovering = true;
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        isHovering = false;
    });
});