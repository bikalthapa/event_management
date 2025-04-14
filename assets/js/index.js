document.addEventListener("DOMContentLoaded", function () {
    // Array of counter data
    const countersData = [
        { id: "customerCount", title: "Happy Customers", value: 4620 },
        { id: "eventCount", title: "Events Hosted", value: 5000 },
        { id: "reviewCount", title: "5-Star Reviews", value: 3200 }
    ];

    // Get the container
    const counterSection = document.getElementById("counterSection");

    if (!counterSection) {
        console.error("Element with id 'counterSection' not found.");
        return;
    }

    // Dynamically create counter elements
    countersData.forEach(counter => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("col"); // For Bootstrap layout

        wrapper.innerHTML = `
            <div class="counter">
                <div id="${counter.id}" class="value">0</div>
                <div class="title">${counter.title}</div>
            </div>
        `;

        counterSection.appendChild(wrapper);
    });

    // Function to animate a single counter
    function animateCounter(counterElement, targetValue) {
        let current = 0;
        const duration = 2000;
        const step = Math.ceil(targetValue / (duration / 50));

        const interval = setInterval(() => {
            current += step;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(interval);
            }
            counterElement.textContent = current.toLocaleString() + "+";
        }, 50);
    }

    // IntersectionObserver to trigger animation
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const counterData = countersData.find(c => c.id === target.id);
                if (counterData) {
                    animateCounter(target, counterData.value);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    // Observe each counter element
    countersData.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (el) observer.observe(el);
    });
});
