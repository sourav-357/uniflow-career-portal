document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  elements.forEach((el) => observer.observe(el));
});

// Slide bars of TESTIMONIALS section
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = [
    {
      text: "“Uniflow made placements actually manageable. I track all my applications and get real eligibility insights. It saves me hours every week. When an internship shows up and I’m not eligible, it literally tells me why and what to fix. That kind of feedback is gold for someone who wants to grow.”",
      name: "@ananya_03",
      role: "3rd Year, CSE",
      avatar: "https://i.pravatar.cc/100?img=25",
    },
    {
      text: "“We had 4 different WhatsApp groups just for placement updates. Half the links were outdated or already closed. Uniflow centralizes all apply to. Plus, the one-click application system is a lifesaver — no more filling out the same details again and again.”",
      name: "@ravi.kumar",
      role: "Final Year, ECE",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      text: "“Uniflow changed everything for me. Earlier, I used to miss deadlines just because I didn’t know which forms were active or whether I having a placement assistant that actually works.”",
      name: "@sneha.codes",
      role: "2nd Year, IT",
      avatar: "https://i.pravatar.cc/100?img=40",
    },
    {
      text: "“I use Uniflow every week now. It’s not just about finding opportunities — it’s about saving time. I no longer waste hours checking emails or guessing what I’m eligible for. It’s clean, it’s fast, and the career ID system is actually useful. Even TPO announcements show up right inside the dashboard.”",
      name: "@arjun_dev",
      role: "3rd Year, AI&DS",
      avatar: "https://i.pravatar.cc/100?img=33",
    },
    {
      text: "“I honestly didn’t expect to use it this much. The analytics are my favorite part — I can see where I’m lacking and what I need to work on. When an internship shows up and I’m not eligible, it literally tells me why and what to fix. That kind of feedback is gold for someone who wants to grow.”",
      name: "@sourav.kumar",
      role: "Final Year, CSE",
      avatar: "https://i.pravatar.cc/100?img=19",
    },
  ];

  const card = document.querySelector(".testimonial-card");
  const text = card.querySelector("blockquote p");
  const footer = card.querySelector("blockquote footer");
  const avatar = card.querySelector("img");

  const dotsContainer = document.querySelector(".dots");
  let current = 0;
  let interval;

  function updateTestimonial(index) {
    const t = testimonials[index];
    text.textContent = t.text;
    footer.innerHTML = `<strong>${t.name}</strong> — ${t.role}`;
    avatar.src = t.avatar;

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active-dot"));
    dots[index].classList.add("active-dot");
  }

  function nextTestimonial() {
    current = (current + 1) % testimonials.length;
    updateTestimonial(current);
  }

  function prevTestimonial() {
    current = (current - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(current);
  }

  function startAutoplay() {
    interval = setInterval(nextTestimonial, 6000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  // Arrows
  document.querySelector(".arrow.left").addEventListener("click", () => {
    prevTestimonial();
    stopAutoplay();
    startAutoplay();
  });

  document.querySelector(".arrow.right").addEventListener("click", () => {
    nextTestimonial();
    stopAutoplay();
    startAutoplay();
  });

  // Dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => {
      current = index;
      updateTestimonial(index);
      stopAutoplay();
      startAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  updateTestimonial(current);
  startAutoplay();
});

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && !href.startsWith("#") && !href.startsWith("mailto")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      }, 300); // matches the CSS transition duration
    });
  }
});
