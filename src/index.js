import "./css/main.css";

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = e.target.getAttribute("href");
    const target = document.querySelector(id);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: "smooth"});
    }
  });
});
