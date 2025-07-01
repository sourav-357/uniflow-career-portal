const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("lazy-loaded");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

document.querySelectorAll(".lazy-section").forEach((section) => {
  observer.observe(section);
});

const profileMenu = document.getElementById("profileMenu");
const dropdown = profileMenu.querySelector(".profile-dropdown");

profileMenu.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!profileMenu.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

