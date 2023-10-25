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
    49: 'view-option-day', // Day
    68: 'view-option-day', // Day
    50: 'view-option-week', // Week
    87: 'view-option-week', // Week
    51: 'view-option-month', // Month
    77: 'view-option-month', // Month
  };

  if (viewOptionSelectors[evt.keyCode] !== undefined) {
    document.querySelector('[data-testid="calendar-view:view-options-dropdown"]').click();
    document.querySelector('[data-testid="' + viewOptionSelectors[evt.keyCode] + '"]').click();
    document.querySelector('[data-testid="calendar-view:view-options-dropdown"]').click();
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
