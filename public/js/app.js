// We don't include ANY js on the static user-facing side for now
// Next.js hello world is already a bit heavy, and we don't need the complex
// interactions. So for now, implement the basic interactivity with some vanilla
// JS.

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

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = e.target.getAttribute("href");
      const target = document.querySelector(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Pricing toggle
  document.getElementById("js-pricing-toggle").addEventListener("change", e => {
    const childrenLabel = document.getElementById("js-pricing-label-children");
    const adultLabel = document.getElementById("js-pricing-label-adults");
    const childrenPrices = document.getElementsByClassName("js-price-children");
    const adultPrices = document.getElementsByClassName("js-price-adults");

    setClass(childrenLabel, "pricing-toggle__label--active", !e.target.checked);
    setClass(adultLabel, "pricing-toggle__label--active", e.target.checked);
    each(childrenPrices, (p) => setClass(p, "hidden", e.target.checked));
    each(adultPrices, (p) => setClass(p, "hidden", !e.target.checked));
  });

  document.getElementById("js-contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(new URLSearchParams(formData).toString());
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => (e.target.innerHTML = "Success!"))
      .catch((error) => {
        e.target.innerHTML += "Error!";
        console.error(error);
      });
  });
});

