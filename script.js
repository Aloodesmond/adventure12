// script.js - Shared JavaScript for all pages
document.addEventListener("DOMContentLoaded", function () {
  // Set active navigation link based on current page
  const currentPage = document.body.id;
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `${currentPage}.html`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Initialize carousels if they exist on this page
  if (document.querySelector(".carousel")) {
    initCarousels();
  }
});

// Carousel functionality
function initCarousels() {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const dots = carousel.parentElement.querySelectorAll(".dot");

    let currentIndex = 0;
    const totalItems = items.length;

    // Set initial positions
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Auto-rotate carousel
    let interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);

    // Dot click handlers
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        currentIndex = parseInt(this.getAttribute("data-index"));
        updateCarousel();
        clearInterval(interval);
      });
    });

    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(interval);
    });

    carousel.addEventListener("mouseleave", () => {
      clearInterval(interval);
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
      }, 5000);
    });
  });
}