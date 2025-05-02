document.addEventListener('DOMContentLoaded', function() {
  let lovedOneCounter = 1;
  let eventCounter = 1;
  
  const addLovedOneBtn = document.getElementById('addLovedOneBtn');
  const lovedOnesDates = document.getElementById('lovedOnesDates');
  
  if (addLovedOneBtn && lovedOnesDates) {
    addLovedOneBtn.addEventListener('click', function() {
      lovedOneCounter++;
      
      const newRow = document.createElement('div');
      newRow.className = 'loved-one-row';
      newRow.id = `lovedOne${lovedOneCounter}`;
      
      newRow.innerHTML = `
        <div class="form-group">
          <label for="lovedOneName${lovedOneCounter}">Name</label>
          <input type="text" id="lovedOneName${lovedOneCounter}" name="lovedOneName${lovedOneCounter}" placeholder="e.g., John Smith">
        </div>
        <div class="form-group">
          <label for="lovedOneRelation${lovedOneCounter}">Relationship</label>
          <input type="text" id="lovedOneRelation${lovedOneCounter}" name="lovedOneRelation${lovedOneCounter}" placeholder="e.g., Spouse, Child, Friend">
        </div>
        <div class="form-group">
          <label for="lovedOneDate${lovedOneCounter}">Date</label>
          <input type="date" id="lovedOneDate${lovedOneCounter}" name="lovedOneDate${lovedOneCounter}">
        </div>
        <div class="form-group">
          <label for="lovedOneOccasion${lovedOneCounter}">Occasion</label>
          <input type="text" id="lovedOneOccasion${lovedOneCounter}" name="lovedOneOccasion${lovedOneCounter}" placeholder="e.g., Birthday, Anniversary">
        </div>
        <button type="button" class="btn-remove-date">×</button>
      `;
      
      lovedOnesDates.appendChild(newRow);
      
      if (lovedOneCounter === 2) {
        document.querySelector('#lovedOne1 .btn-remove-date').disabled = false;
      }
      
      const removeBtn = newRow.querySelector('.btn-remove-date');
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          newRow.remove();
          
          const remainingRows = document.querySelectorAll('.loved-one-row');
          if (remainingRows.length === 1) {
            remainingRows[0].querySelector('.btn-remove-date').disabled = true;
          }
        });
      }
    });
  }
  
  const addEventBtn = document.getElementById('addEventBtn');
  const specialEventsDates = document.getElementById('specialEventsDates');
  
  if (addEventBtn && specialEventsDates) {
    addEventBtn.addEventListener('click', function() {
      eventCounter++;
      
      const newRow = document.createElement('div');
      newRow.className = 'special-event-row';
      newRow.id = `event${eventCounter}`;
      
      newRow.innerHTML = `
        <div class="form-group">
          <label for="eventName${eventCounter}">Event Name</label>
          <input type="text" id="eventName${eventCounter}" name="eventName${eventCounter}" placeholder="e.g., Graduation, New Job">
        </div>
        <div class="form-group">
          <label for="eventDate${eventCounter}">Event Date</label>
          <input type="date" id="eventDate${eventCounter}" name="eventDate${eventCounter}">
        </div>
        <button type="button" class="btn-remove-date">×</button>
      `;
      
      specialEventsDates.appendChild(newRow);
      
      if (eventCounter === 2) {
        document.querySelector('#specialEventsDates .special-event-row:first-child .btn-remove-date').disabled = false;
      }
      
      const removeBtn = newRow.querySelector('.btn-remove-date');
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          newRow.remove();
          
          const remainingRows = document.querySelectorAll('.special-event-row');
          if (remainingRows.length === 1) {
            remainingRows[0].querySelector('.btn-remove-date').disabled = true;
          }
        });
      }
    });
  }
  
  const saveDatesBtn = document.getElementById('saveDatesBtn');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const successModalBtn = document.getElementById('successModalBtn');
  const overlay = document.getElementById('overlay');
  
  if (saveDatesBtn && successModal) {
    saveDatesBtn.addEventListener('click', function() {
      successModal.style.display = 'flex';
      if (overlay) overlay.style.display = 'block';
      
      collectAndLogFormData();
    });
  }
  
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', function() {
      successModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  }
  
  if (successModalBtn) {
    successModalBtn.addEventListener('click', function() {
      successModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    });
  }
  
  function collectAndLogFormData() {
    const formData = {
      personalDates: {
        birthday: document.getElementById('yourBirthday')?.value || '',
        anniversary: document.getElementById('yourAnniversary')?.value || ''
      },
      lovedOnes: [],
      specialEvents: [],
      reminderPreferences: {
        oneWeek: document.getElementById('oneWeek')?.checked || false,
        threeDays: document.getElementById('threeDays')?.checked || false,
        dayBefore: document.getElementById('dayBefore')?.checked || false
      }
    };
    
    const lovedOneRows = document.querySelectorAll('.loved-one-row');
    lovedOneRows.forEach((row, index) => {
      const rowNumber = index + 1;
      const lovedOne = {
        name: document.getElementById(`lovedOneName${rowNumber}`)?.value || '',
        relationship: document.getElementById(`lovedOneRelation${rowNumber}`)?.value || '',
        date: document.getElementById(`lovedOneDate${rowNumber}`)?.value || '',
        occasion: document.getElementById(`lovedOneOccasion${rowNumber}`)?.value || ''
      };
      formData.lovedOnes.push(lovedOne);
    });
    
    const eventRows = document.querySelectorAll('.special-event-row');
    eventRows.forEach((row, index) => {
      const rowNumber = index + 1;
      const event = {
        name: document.getElementById(`eventName${rowNumber}`)?.value || '',
        date: document.getElementById(`eventDate${rowNumber}`)?.value || ''
      };
      formData.specialEvents.push(event);
    });
    
    console.log('Form Data:', formData);
  }
}); 