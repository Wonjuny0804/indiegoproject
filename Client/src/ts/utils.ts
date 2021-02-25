const initialize = (inputElements: NodeList) => {
  const inputs = Array.from(inputElements) as unknown as HTMLInputElement[];

  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('not-valid');
    input.classList.remove('pwd-different');
    if (input.previousElementSibling) {
      input.previousElementSibling.classList.remove('not-valid');
      input.previousElementSibling.classList.remove('pwd-different');
      input.previousElementSibling.classList.remove('label-focus');
    }
  });
};

const openPopup = (popup: HTMLElement): void => {
  popup.classList.add('is-active');
};

const closePopup = (popup: HTMLElement): void => {
  popup.classList.remove('is-active');
};

const placeholder = (inputElement: HTMLInputElement): void => {
  const $labelPlaceholder = inputElement.previousElementSibling as HTMLLabelElement;
  if ($labelPlaceholder) $labelPlaceholder.classList.toggle('label-focus');
};

export { initialize, openPopup, closePopup, placeholder };