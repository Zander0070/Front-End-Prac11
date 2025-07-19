var h1 = document.getElementById("typeText");
var fullText = (h1 === null || h1 === void 0 ? void 0 : h1.dataset.text) || "";
var hasTyped = false;
function typeWriter(element, text, speed) {
    if (speed === void 0) { speed = 100; }
    var index = 0;
    var interval = setInterval(function () {
        element.textContent += text.charAt(index);
        index++;
        if (index === text.length) {
            clearInterval(interval);
        }
    }, speed);
}
if (h1) {
    // Observer for the typing effect
    var typingObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                typeWriter(h1, fullText);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    typingObserver.observe(h1);
}
// Observer for fade-in sections
var fadeInElements = document.querySelectorAll(".fade-in-section");
var fadeInObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        var target = entry.target;
        if (entry.isIntersecting) {
            target.classList.add("show-on-scroll");
            target.classList.remove("hidden-on-load");
            observer.unobserve(target);
        }
    });
}, { threshold: 0.1 });
fadeInElements.forEach(function (el) { return fadeInObserver.observe(el); });
