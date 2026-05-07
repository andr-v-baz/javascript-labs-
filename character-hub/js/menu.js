const menuToggle = document.getElementById("menuToggle");
const navRight = document.getElementById("navRight");

if(menuToggle && navRight){
  menuToggle.addEventListener("click", () => {
    navRight.classList.toggle("open");
  });

  navRight.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navRight.classList.remove("open");
    });
  });
}
