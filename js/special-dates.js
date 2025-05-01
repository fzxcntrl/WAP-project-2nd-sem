document.addEventListener('DOMContentLoaded', function() {
  // Initialize counter for loved ones
  let lovedOneCounter = 1;
  let eventCounter = 1;
  
  // Add Loved One Button
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
      
      // Enable remove button on the first row if there are now multiple rows
      if (lovedOneCounter === 2) {
        document.querySelector('#lovedOne1 .btn-remove-date').disabled = false;
      }
      
      // Add event listener for the new remove button
      const removeBtn = newRow.querySelector('.btn-remove-date');
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          newRow.remove();
          
          // If only one row remains, disable its remove button
          const remainingRows = document.querySelectorAll('.loved-one-row');
          if (remainingRows.length === 1) {
            remainingRows[0].querySelector('.btn-remove-date').disabled = true;
          }
        });
      }
    });
  }
  
  // Add Event Button
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
      
      // Enable remove button on the first row if there are now multiple rows
      if (eventCounter === 2) {
        document.querySelector('#specialEventsDates .special-event-row:first-child .btn-remove-date').disabled = false;
      }
      
      // Add event listener for the new remove button
      const removeBtn = newRow.querySelector('.btn-remove-date');
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          newRow.remove();
          
          // If only one row remains, disable its remove button
          const remainingRows = document.querySelectorAll('.special-event-row');
          if (remainingRows.length === 1) {
            remainingRows[0].querySelector('.btn-remove-date').disabled = true;
          }
        });
      }
    });
  }
  
  // Save Dates Button
  const saveDatesBtn = document.getElementById('saveDatesBtn');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const successModalBtn = document.getElementById('successModalBtn');
  const overlay = document.getElementById('overlay');
  
  if (saveDatesBtn && successModal) {
    saveDatesBtn.addEventListener('click', function() {
      // In a real application, you would validate and save the form data here
      // For demo purposes, we'll just show the success modal
      
      // Show success modal
      successModal.style.display = 'flex';
      if (overlay) overlay.style.display = 'block';
      
      // Optionally collect form data and log it for demo purposes
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
      
      // Redirect to home page or another page if needed
      // window.location.href = 'index.html';
    });
  }
  
  // Helper function to collect and log form data (for demo purposes)
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
    
    // Collect loved ones data
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
    
    // Collect special events data
    const eventRows = document.querySelectorAll('.special-event-row');
    eventRows.forEach((row, index) => {
      const rowNumber = index + 1;
      const event = {
        name: document.getElementById(`eventName${rowNumber}`)?.value || '',
        date: document.getElementById(`eventDate${rowNumber}`)?.value || ''
      };
      formData.specialEvents.push(event);
    });
    
    // In a real application, you would send this data to a server
    console.log('Form Data:', formData);
  }
}); 