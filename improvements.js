console.log('refined-protoncalendar');

document.onkeydown = function(evt) {
  evt = evt || window.event;

  // Save (commmand + S)
  if (evt.keyCode == 83 && evt.metaKey) {
    evt.preventDefault();
    evt.stopPropagation();

    const saveButtonSelectors = [
      '[data-testid="create-event-popover:save"]',
      '[data-testid="create-event-modal:save"]',
    ];

    for (let selector of saveButtonSelectors) {
      let saveButton = document.querySelector(selector);

      if (saveButton) {
        saveButton.click();
        break;
      }
    }
  }

  let activeElement = document.activeElement;
  const inputs = ['input', 'textarea'];

  if (activeElement && (
    inputs.includes(activeElement.tagName.toLowerCase())
    || activeElement.getAttribute('role') === 'textbox')
  ) {
    return;
  }

  const selectors = {
    69: '[data-testid="event-popover:edit"]', // e
    74: '[data-testid="calendar-toolbar:next"]', // j
    75: '[data-testid="calendar-toolbar:previous"]', // k
    84: '[data-testid="calendar-toolbar:today"]', // t
  };

  if (selectors[evt.keyCode]) {
    evt.preventDefault();
    evt.stopPropagation();

    document.querySelector(selectors[evt.keyCode]).click();
  }

  // View options (day/week/month)
  const viewOptionSelectors = {
    49: 0, // Day
    68: 0, // Day
    50: 1, // Week
    87: 1, // Week
    51: 2, // Month
    77: 2, // Month
  };

  if (viewOptionSelectors[evt.keyCode] >= 0) {
    // Find the right dropdown
    let dropdowns = document.querySelectorAll('[data-testid="dropdown-button"]');
    for (let dropdown of dropdowns) {
      if (dropdown.textContent == "Day" || dropdown.textContent == "Week" || dropdown.textContent == "Month") {
        dropdown.click();
        document.querySelectorAll('[data-testid="calendar-view:view-options"]')[viewOptionSelectors[evt.keyCode]].click();
        dropdown.click();
        break;
      }
    }
  }

  // Event deletion
  if (evt.keyCode === 8) { // delete/backspace
    document.querySelector('[data-testid="event-popover:delete"]').click();
  }

  // Confirm event deletion
  if (evt.keyCode === 13) { // enter
    let submitButtons = document.querySelectorAll('button[type="submit"]');

    for (let submitButton of submitButtons) {
      if (submitButton.innerText === 'Delete') {
        submitButton.click();
        break;
      }
    }

    let updateConfirmationButtons = document.querySelector('.modal-two-footer').querySelectorAll('button');

    for (let button of updateConfirmationButtons) {
      if (button.innerText === 'Update') {
        button.click();
        break;
      }
    }
  }
};
