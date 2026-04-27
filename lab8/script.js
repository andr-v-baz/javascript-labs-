const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");

const slides = document.getElementById("slides");
const slideImages = slides.querySelectorAll("img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.getElementById("indicators");

let currentSlide = 0;

burgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

function createIndicators() {
  slideImages.forEach((_, index) => {
    const button = document.createElement("button");

    button.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });

    indicators.appendChild(button);
  });
}

function updateCarousel() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

  const buttons = indicators.querySelectorAll("button");
  buttons.forEach((button, index) => {
    button.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideImages.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
  updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

createIndicators();
updateCarousel();

setInterval(nextSlide, 3000);