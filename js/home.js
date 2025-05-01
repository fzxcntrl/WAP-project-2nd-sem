document.addEventListener('DOMContentLoaded', function() {

  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentTestimonial = 0;
  let testimonialInterval;
  
  if (testimonials.length > 0) {
    startTestimonialCarousel();
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        showTestimonial(index);
        resetTestimonialInterval();
      });
    });
  }
  
  const cakeButtons = document.querySelectorAll('.cake-btn');
  
  if (cakeButtons.length > 0) {
    cakeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const cakeName = this.getAttribute('data-cake');
        localStorage.setItem('selectedCake', cakeName);
        window.location.href = 'order.html';
      });
    });
  }
  
  function showTestimonial(index) {
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
  }
  
  function startTestimonialCarousel() {
    testimonialInterval = setInterval(() => {
      const nextTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextTestimonial);
    }, 5000);
  }
  
  function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    startTestimonialCarousel();
  }
  
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
      element.classList.add('aos-init');
      observer.observe(element);
    });
  }
});
