// DOMContentLoaded ensures JS runs after HTML is loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // ===== DYNAMIC YEAR IN FOOTER =====
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    document.querySelector("footer p").innerHTML += ` | ${yearSpan.textContent}`;

    // ===== TIME-BASED GREETING =====
    const greetingElement = document.createElement("div");
    greetingElement.style.textAlign = "center";
    greetingElement.style.fontSize = "1.2rem";
    greetingElement.style.marginTop = "10px";

    let hours = new Date().getHours();
    if (hours < 12) {
        greetingElement.textContent = "Good Morning! 🌞";
    } else if (hours < 18) {
        greetingElement.textContent = "Good Afternoon! ☀️";
    } else {
        greetingElement.textContent = "Good Evening! 🌙";
    }
    document.querySelector(".site-header").appendChild(greetingElement);

    // ===== SCROLL TO TOP BUTTON =====
    const scrollButton = document.createElement("button");
    scrollButton.textContent = "⬆ Top";
    scrollButton.id = "scrollToTopBtn";
    document.body.appendChild(scrollButton);

    // Style the button dynamically
    scrollButton.style.position = "fixed";
    scrollButton.style.bottom = "20px";
    scrollButton.style.right = "20px";
    scrollButton.style.padding = "10px 15px";
    scrollButton.style.border = "none";
    scrollButton.style.background = "#6c63ff";
    scrollButton.style.color = "#fff";
    scrollButton.style.borderRadius = "5px";
    scrollButton.style.cursor = "pointer";
    scrollButton.style.display = "none";
    scrollButton.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

    // Show button after scrolling down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    });

    // Smooth scroll to top
    scrollButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ===== SMOOTH SCROLL FOR IN-PAGE LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href"))
                .scrollIntoView({ behavior: "smooth" });
        });
    });
});
