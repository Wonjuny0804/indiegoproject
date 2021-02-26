const validation = () => {
  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ as RegExp;
  const regExpPwd = /^([a-zA-Z0-9@*#]{8,15})$/ as RegExp;
  const regExpName = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

  return {
    id(e: KeyboardEvent, $signin: HTMLButtonElement) {
      const $inputTarget = e.target as HTMLInputElement;
      const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;
      // const $signin = $inputTarget.parentNode?.parentNode

      if (!regExpEmail.test($inputTarget.value) || $inputTarget.value === '') {
      
        $inputTarget.classList.add('not-valid');
        $labelInput.classList.add('not-valid');
        $signin.disabled = true;
        } else {
          $inputTarget.classList.remove('not-valid');
          $labelInput.classList.remove('not-valid');
          $signin.disabled = false;
        }
    },
    password(e: KeyboardEvent) {
      const $inputTarget = e.target as HTMLInputElement;
      const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;

      if (!regExpPwd.test($inputTarget.value) || $inputTarget.value === '') {
      
        $inputTarget.classList.add('not-valid');
        $labelInput.classList.add('not-valid');
        // $signin.disabled = true;
        } else {
          $inputTarget.classList.remove('not-valid');
          $labelInput.classList.remove('not-valid');
          // $signin.disabled = false;
        }
    },
    name(e: KeyboardEvent, $signin: HTMLButtonElement) {
      const $inputTarget = e.target as HTMLInputElement;
      const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;

      if (!regExpName.test($inputTarget.value) || $inputTarget.value === '') {
      
        $inputTarget.classList.add('not-valid');
        $labelInput.classList.add('not-valid');
        $signin.disabled = true;
        } else {
          $inputTarget.classList.remove('not-valid');
          $labelInput.classList.remove('not-valid');
          $signin.disabled = false;
        }
    }
  };
};

export default validation;