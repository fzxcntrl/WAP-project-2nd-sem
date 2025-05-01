document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  const orderAgainButtons = document.querySelectorAll('.btn-primary');
  
  orderAgainButtons.forEach(button => {
    button.addEventListener('click', function() {
      const orderCard = this.closest('.order-card');
      const cakeName = orderCard.querySelector('.cake-name').textContent;
      localStorage.setItem('selectedCake', cakeName);
      window.location.href = 'order.html';
    });
  });
});
