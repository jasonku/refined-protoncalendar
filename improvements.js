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
    74: '', // j
    75: '', // k
    84: '', // t
  };

  evt = evt || window.event;

  if (selectors[evt.keyCode]) {
    document.querySelector(selectors[evt.keyCode]).click();
  }
};
