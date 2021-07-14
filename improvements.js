document.onkeydown = function(evt) {
  let activeElement = document.activeElement;
  const inputs = ['input', 'textarea'];

  if (activeElement && (
    inputs.includes(activeElement.tagName.toLowerCase())
    || activeElement.getAttribute('role') === 'textbox')
  ) {
    return;
  }

  const selectors = {
    74: '[data-test-id="calendar-toolbar:next"]', // j
    75: '[data-test-id="calendar-toolbar:previous"]', // k
    84: '[data-test-id="calendar-toolbar:today"]', // t
  };

  evt = evt || window.event;

  if (selectors[evt.keyCode]) {
    document.querySelector(selectors[evt.keyCode]).click();
  }

  // View options (day/week/month)
  const viewOptionSelectors = {
    49: 0, // Day
    50: 1, // Week
    51: 2, // Month
  };

  if (viewOptionSelectors[evt.keyCode] >= 0) {
    document.querySelectorAll('[data-test-id="calendar-view:view-options"]')[viewOptionSelectors[evt.keyCode]].click();
  }
};
