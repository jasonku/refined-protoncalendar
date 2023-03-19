document.onkeydown = function(evt) {
  evt = evt || window.event;

  // Save (commmand + S) or (ctrl + S)
  if (evt.keyCode === 83 && (evt.metaKey || evt.ctrlKey)) {
    evt.preventDefault();
    evt.stopPropagation();

    const saveButtonSelectors = [
      '[data-test-id="create-event-popover:save"]',
      '[data-test-id="create-event-modal:save"]',
    ];

    for (let selector of saveButtonSelectors) {
      let saveButton = document.querySelector(selector);

      if (saveButton) {
        saveButton.click();
        break;
      }
    }
  }

  // Close popovers
  if (evt.keyCode === 27) { // escape
    document.querySelector('button[title="Close popover"]').click();
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
    69: '[data-test-id="event-popover:edit"]', // e
    74: '[data-test-id="calendar-toolbar:next"]', // j
    75: '[data-test-id="calendar-toolbar:previous"]', // k
    84: '[data-test-id="calendar-toolbar:today"]', // t
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
    document.querySelectorAll('[data-test-id="calendar-view:view-options"]')[viewOptionSelectors[evt.keyCode]].click();
  }

  // Event deletion
  if (evt.keyCode === 8) { // delete/backspace
    document.querySelector('[data-test-id="event-popover:delete"]').click();
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
  }
};
