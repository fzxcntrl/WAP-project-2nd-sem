document.addEventListener('DOMContentLoaded', function() {
  const cakePrices = {
    'Classic Cloud': 32.99,
    'Strawberry Dream': 36.99,
    'Chocolate Heaven': 38.99,
    'Lemon Bliss': 34.99
  };
  
  const sizePricing = {
    '6inch': 0,
    '8inch': 8,
    '10inch': 16,
    '12inch': 24
  };
  
  const fillingPricing = {
    'vanilla': 0,
    'chocolate': 2,
    'strawberry': 2,
    'lemon': 2,
    'caramel': 3
  };
  
  const addonPricing = {
    'Fresh Fruit': 4,
    'Edible Flowers': 6,
    'Gold Dust': 5,
    'Chocolate Drip': 3
  };
  
  const progressSteps = document.querySelectorAll('.progress-step');
  const formSteps = document.querySelectorAll('.form-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  const orderForm = document.getElementById('orderForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const overlay = document.getElementById('overlay');
  
  const selectedCake = localStorage.getItem('selectedCake');
  if (selectedCake) {
    const cakeRadio = document.querySelector(`input[value="${selectedCake}"]`);
    if (cakeRadio) {
      cakeRadio.checked = true;
    }
  }
  
  if (nextButtons.length > 0) {
    nextButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        if (validateStep(index + 1)) {
          updateFormStep(index + 1, index + 2);
        }
      });
    });
  }
  
  if (prevButtons.length > 0) {
    prevButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        const currentStep = parseInt(button.closest('.form-step').id.replace('step', ''));
        updateFormStep(currentStep, currentStep - 1);
      });
    });
  }
  
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateStep(4)) {
        if (successModal) {
          const orderNumber = 'CC' + Math.floor(10000 + Math.random() * 90000);
          document.getElementById('orderNumber').textContent = orderNumber;
          successModal.style.display = 'flex';
          if (overlay) overlay.style.display = 'block';
        }
      }
    });
  }
  
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', function() {
      if (successModal) successModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  }
  
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', function() {
      if (successModal) successModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
      window.location.href = 'index.html';
    });
  }
  
  const addLovedOneBtn = document.getElementById('addLovedOneBtn');
  const additionalLovedOnes = document.getElementById('additionalLovedOnes');
  let lovedOneCount = 1;
  
  if (addLovedOneBtn && additionalLovedOnes) {
    addLovedOneBtn.addEventListener('click', function() {
      lovedOneCount++;
      const lovedOneRow = document.createElement('div');
      lovedOneRow.className = 'loved-one-row';
      lovedOneRow.id = 'lovedOne' + lovedOneCount;
      lovedOneRow.innerHTML = `
        <div class="form-group">
          <label for="lovedOneName${lovedOneCount}">Name</label>
          <input type="text" id="lovedOneName${lovedOneCount}" name="lovedOneName${lovedOneCount}">
        </div>
        <div class="form-group">
          <label for="lovedOneRelation${lovedOneCount}">Relationship</label>
          <input type="text" id="lovedOneRelation${lovedOneCount}" name="lovedOneRelation${lovedOneCount}" placeholder="e.g., Spouse, Child, Friend">
        </div>
        <div class="form-group">
          <label for="lovedOneBirthday${lovedOneCount}">Birthday</label>
          <input type="date" id="lovedOneBirthday${lovedOneCount}" name="lovedOneBirthday${lovedOneCount}">
        </div>
        <button type="button" class="loved-one-remove" data-id="${lovedOneCount}">&times;</button>
      `;
      additionalLovedOnes.appendChild(lovedOneRow);
      const removeButton = lovedOneRow.querySelector('.loved-one-remove');
      if (removeButton) {
        removeButton.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          const rowToRemove = document.getElementById('lovedOne' + id);
          if (rowToRemove) {
            rowToRemove.remove();
          }
        });
      }
    });
  }
  
  const cakeTypeRadios = document.querySelectorAll('input[name="cakeType"]');
  const cakeSizeSelect = document.getElementById('cakeSize');
  const cakeFillingSelect = document.getElementById('cakeFilling');
  const addOnCheckboxes = document.querySelectorAll('input[name="addOns"]');
  const specialInstructions = document.getElementById('specialInstructions');
  
  if (cakeTypeRadios.length > 0) {
    cakeTypeRadios.forEach(radio => {
      radio.addEventListener('change', updateSummary);
    });
  }
  
  if (cakeSizeSelect) cakeSizeSelect.addEventListener('change', updateSummary);
  if (cakeFillingSelect) cakeFillingSelect.addEventListener('change', updateSummary);
  
  if (addOnCheckboxes.length > 0) {
    addOnCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSummary);
    });
  }
  
  if (specialInstructions) specialInstructions.addEventListener('input', updateSummary);
  
  updateSummary();
  
  function updateSummary() {
    const selectedCakeType = document.querySelector('input[name="cakeType"]:checked')?.value || 'Classic Cloud';
    const selectedSize = cakeSizeSelect?.value || '6inch';
    const selectedFilling = cakeFillingSelect?.value || 'vanilla';
    const selectedAddons = Array.from(document.querySelectorAll('input[name="addOns"]:checked')).map(cb => cb.value);
    const instructions = specialInstructions?.value || '';
    
    document.getElementById('summaryType').textContent = selectedCakeType;
    
    let sizeText = '';
    switch(selectedSize) {
      case '6inch': sizeText = '6" (serves 8-10)'; break;
      case '8inch': sizeText = '8" (serves 12-16)'; break;
      case '10inch': sizeText = '10" (serves 20-25)'; break;
      case '12inch': sizeText = '12" (serves 30-40)'; break;
      default: sizeText = '6" (serves 8-10)';
    }
    document.getElementById('summarySize').textContent = sizeText;
    
    let fillingText = '';
    switch(selectedFilling) {
      case 'vanilla': fillingText = 'Vanilla Cloud Cream'; break;
      case 'chocolate': fillingText = 'Chocolate Mousse'; break;
      case 'strawberry': fillingText = 'Strawberry Whip'; break;
      case 'lemon': fillingText = 'Lemon Curd'; break;
      case 'caramel': fillingText = 'Salted Caramel'; break;
      default: fillingText = 'Vanilla Cloud Cream';
    }
    document.getElementById('summaryFilling').textContent = fillingText;
    
    document.getElementById('summaryAddons').textContent = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None';
    document.getElementById('summaryInstructions').textContent = instructions ? instructions : 'None';
    
    const basePrice = cakePrices[selectedCakeType] || 32.99;
    const sizePrice = sizePricing[selectedSize] || 0;
    const fillingPrice = fillingPricing[selectedFilling] || 0;
    
    let addonsPrice = 0;
    selectedAddons.forEach(addon => {
      addonsPrice += addonPricing[addon] || 0;
    });
    
    const totalPrice = basePrice + sizePrice + fillingPrice + addonsPrice;
    
    document.getElementById('summaryBasePrice').textContent = formatCurrency(basePrice);
    document.getElementById('summarySizePrice').textContent = formatCurrency(sizePrice);
    document.getElementById('summaryFillingPrice').textContent = formatCurrency(fillingPrice);
    document.getElementById('summaryAddonsPrice').textContent = formatCurrency(addonsPrice);
    document.getElementById('summaryTotalPrice').textContent = formatCurrency(totalPrice);
  }
  
  function updateCustomerDetails() {
    const name = document.getElementById('customerName')?.value || '';
    const email = document.getElementById('customerEmail')?.value || '';
    const phone = document.getElementById('customerPhone')?.value || '';
    const birthday = document.getElementById('customerBirthday')?.value || '';
    const event = document.getElementById('specialEvent')?.value || '';
    const eventDate = document.getElementById('specialEventDate')?.value || '';
    
    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryEmail').textContent = email;
    document.getElementById('summaryPhone').textContent = phone;
    document.getElementById('summaryBirthday').textContent = birthday ? formatDate(birthday) : 'Not provided';
    
    const lovedOnesSummary = document.getElementById('summaryLovedOnes');
    if (lovedOnesSummary) {
      lovedOnesSummary.innerHTML = '';
      for (let i = 1; i <= lovedOneCount; i++) {
        const name = document.getElementById('lovedOneName' + i)?.value;
        const relation = document.getElementById('lovedOneRelation' + i)?.value;
        const birthday = document.getElementById('lovedOneBirthday' + i)?.value;
        
        if (name || relation || birthday) {
          const lovedOneRow = document.createElement('div');
          lovedOneRow.className = 'summary-row';
          lovedOneRow.innerHTML = `
            <span class="summary-label">${name || 'Loved One'} (${relation || 'Not specified'}):</span>
            <span class="summary-value">${birthday ? formatDate(birthday) : 'No birthday provided'}</span>
          `;
          lovedOnesSummary.appendChild(lovedOneRow);
        }
      }
    }
    
    if (event && eventDate) {
      document.getElementById('summaryEvent').textContent = `${event} on ${formatDate(eventDate)}`;
    } else if (event) {
      document.getElementById('summaryEvent').textContent = event + ' (no date provided)';
    } else {
      document.getElementById('summaryEvent').textContent = 'None';
    }
  }
  
  function updateFormStep(currentStep, newStep) {
    document.getElementById('step' + currentStep).classList.remove('active');
    document.getElementById('step' + newStep).classList.add('active');
    
    progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      if (stepNumber < newStep) {
        step.classList.add('completed');
        step.classList.add('active');
      } else if (stepNumber === newStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active');
        step.classList.remove('completed');
      }
    });
    
    const progressConnectors = document.querySelectorAll('.progress-connector');
    progressConnectors.forEach((connector, index) => {
      if (index < newStep - 1) {
        connector.classList.add('active');
      } else {
        connector.classList.remove('active');
      }
    });
    
    if (newStep === 4) {
      updateCustomerDetails();
    }
    
    window.scrollTo({
      top: document.querySelector('.order-form').offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  function validateStep(stepNumber) {
    switch (stepNumber) {
      case 1:
        return document.querySelector('input[name="cakeType"]:checked') != null;
      case 2:
        return true;
      case 3:
        const name = document.getElementById('customerName');
        const email = document.getElementById('customerEmail');
        const phone = document.getElementById('customerPhone');
        if (!name.value) {
          alert('Please enter your name');
          name.focus();
          return false;
        }
        if (!email.value) {
          alert('Please enter your email');
          email.focus();
          return false;
        }
        if (!isValidEmail(email.value)) {
          alert('Please enter a valid email address');
          email.focus();
          return false;
        }
        if (!phone.value) {
          alert('Please enter your phone number');
          phone.focus();
          return false;
        }
        return true;
      case 4:
        const termsAgree = document.getElementById('termsAgree');
        if (!termsAgree.checked) {
          alert('Please agree to the terms and conditions');
          termsAgree.focus();
          return false;
        }
        return true;
      default:
        return true;
    }
  }
});
