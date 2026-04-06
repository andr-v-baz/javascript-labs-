const menuToggle = document.getElementById("menuToggle");
const navRight = document.getElementById("navRight");
const menuLinks = document.querySelectorAll("#mobileMenu a");

if(menuToggle && navRight){
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navRight.classList.toggle("open");
  });

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navRight.classList.remove("open");
    });
  });

  window.addEventListener("resize", () => {
    if(window.innerWidth >= 768){
      menuToggle.classList.remove("active");
      navRight.classList.remove("open");
    }
  });
}
