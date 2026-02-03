// src/directives/fadeOnScroll.js
export default {
  mounted(el) {
    el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-2000');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-4');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
  }
};
