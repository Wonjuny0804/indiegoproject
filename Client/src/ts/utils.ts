const initialize = (inputElements: NodeList) => {
  const inputs = Array.from(inputElements) as unknown as HTMLInputElement[];

  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('not-valid');
    input.classList.remove('pwd-different');
    if (input.previousElementSibling) {
      input.previousElementSibling.classList.remove('not-valid');
      input.previousElementSibling.classList.remove('pwd-different');
    }
  });
};

const openPopup = (popup: HTMLElement): void => {
  popup.classList.add('is-active');
};

const closePopup = (popup: HTMLElement): void => {
  popup.classList.remove('is-active');
};



export { initialize, openPopup, closePopup };