document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  const overlay = document.getElementById('overlay');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
      if (overlay) {
        overlay.style.display = navList.classList.contains('active') ? 'block' : 'none';
      }
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      if (menuToggle) menuToggle.classList.remove('active');
      if (navList) navList.classList.remove('active');
      overlay.style.display = 'none';
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        modal.style.display = 'none';
      });
    });
  }
  
  const accountBtn = document.getElementById('accountBtn');
  const accountModal = document.getElementById('accountModal');
  const closeAccountModal = document.getElementById('closeAccountModal');
  
  if (accountBtn && accountModal) {
    accountBtn.addEventListener('click', function(e) {
      e.preventDefault();
      accountModal.style.display = 'flex';
      if (overlay) overlay.style.display = 'block';
    });
  }
  
  if (closeAccountModal) {
    closeAccountModal.addEventListener('click', function() {
      if (accountModal) accountModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  }
  
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId)?.classList.add('active');
      });
    });
  }
  
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMessage = document.getElementById('newsletterMessage');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (!email || !isValidEmail(email)) {
        if (newsletterMessage) {
          newsletterMessage.textContent = 'Please enter a valid email address.';
          newsletterMessage.classList.add('error');
        }
        return;
      }
      if (newsletterMessage) {
        newsletterMessage.textContent = 'Thank you for subscribing to our newsletter!';
        newsletterMessage.classList.remove('error');
        newsletterMessage.classList.add('success');
      }
      newsletterForm.reset();
      setTimeout(() => {
        if (newsletterMessage) {
          newsletterMessage.textContent = '';
          newsletterMessage.classList.remove('success');
        }
      }, 5000);
    });
  }
  
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Login functionality would be implemented in a production environment.');
      loginForm.reset();
      if (accountModal) accountModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  }
  
  const registerForm = document.getElementById('registerForm');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Registration functionality would be implemented in a production environment.');
      registerForm.reset();
      if (accountModal) accountModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  }
  
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
      });
    });
  }
  
  const logo = document.querySelector('.logo h1');
  if (logo) {
    logo.addEventListener('click', function() {
      this.style.animation = 'none';
      this.offsetHeight;
      this.style.animation = 'logoSpin 1s ease-in-out';
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes logoSpin {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.2) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(360deg);
    }
  }
  
  .logo h1 {
    cursor: pointer;
    transition: all var(--transition-normal);
  }
  
  .logo h1:hover {
    color: var(--color-primary);
  }
`;

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
  return parseFloat(amount).toFixed(2);
}
