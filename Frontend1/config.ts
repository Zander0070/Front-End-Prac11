const h1 = document.getElementById("typeText") as HTMLElement | null;
const fullText = h1?.dataset.text || "";
let hasTyped = false;

function typeWriter(element: HTMLElement, text: string, speed = 100): void {
  let index = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(interval);
    }
  }, speed);
}

if (h1) {
  // Observer for the typing effect
  const typingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typeWriter(h1, fullText);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  typingObserver.observe(h1);
}

// Observer for fade-in sections
const fadeInElements = document.querySelectorAll<HTMLElement>(".fade-in-section");

const fadeInObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        target.classList.add("show-on-scroll");
        target.classList.remove("hidden-on-load");
        observer.unobserve(target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeInElements.forEach(el => fadeInObserver.observe(el));