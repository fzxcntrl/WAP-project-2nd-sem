document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cakeCards = document.querySelectorAll('.cake-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');

      cakeCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  const orderButtons = document.querySelectorAll('.cake-card .btn');
  
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.cake-card');
      const cakeName = card.querySelector('h3').textContent;
      const cakePrice = card.querySelector('.cake-price').textContent;
      
      localStorage.setItem('selectedCake', cakeName);
      localStorage.setItem('selectedCakePrice', cakePrice);
      
      window.location.href = 'order.html';
    });
  });
});