document.addEventListener("DOMContentLoaded", function () {
    // Array of counter data
    const countersData = [
        { id: "customerCount", title: "Happy Customers", value: 4620 },
        { id: "eventCount", title: "Events Hosted", value: 5000 },
        { id: "reviewCount", title: "5-Star Reviews", value: 3200 }
    ];
    const animText = [
        "corporate events.",
        "wedding planning.",
        "birthday celebrations.",
        "product launches.",
        "live concerts.",
        "luxury gala nights.",
    ];




    let anim = "";
    let x = 0;
    let i = 0;
    let writingMode = true;
    let animationContainer = document.getElementById("writingAnimation");

    function updateContent() {
        let writingDelay = 300;
        let erasingDelay = 90;

        if (i < animText.length) {
            if (x < animText[i].length && writingMode === true) {
                anim += animText[i].charAt(x);
                x++;
            } else {
                writingMode = false;
                if (x >= 0) {
                    anim = anim.substring(0, x);
                    x--;
                } else {
                    x = 0;
                    anim = "";
                    i++;
                    writingMode = true;
                }
            }
        } else {
            i = 0;
        }

        animationContainer.innerHTML = "We specialize in "+anim;

        setTimeout(updateContent, writingMode ? writingDelay : erasingDelay);
    }
    updateContent(); // Start the animation




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
