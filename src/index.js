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

const setClass = (el, className, enabled) => {
  if (enabled) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};

const each = (coll, f) => {
  for (let x of coll) {
    f(x);
  }
};

document.getElementById("js-pricing-toggle").addEventListener("change", (e) => {
  const childrenLabel = document.getElementById("js-pricing-label-children");
  const adultLabel = document.getElementById("js-pricing-label-adults");
  const childrenPrices = document.getElementsByClassName("js-price-children");
  const adultPrices = document.getElementsByClassName("js-price-adults");

  setClass(childrenLabel, "pricing-toggle__label--active", !e.target.checked);
  setClass(adultLabel, "pricing-toggle__label--active", e.target.checked);
  each(childrenPrices, (p) => setClass(p, "hidden", e.target.checked));
  each(adultPrices, (p) => setClass(p, "hidden", !e.target.checked));
});
