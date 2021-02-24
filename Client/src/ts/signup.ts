import signuplogo from '../assets/signup.svg';
import signupImage from '../assets/signup-image.svg';
import { initialize, openPopup, closePopup } from './utils';
import { fireauth } from './firebaseSetting'; 
import _ from 'lodash';
const signup = () => {
  // Get DOM elements
  const $main = document.querySelector('.main') as HTMLElement;
  const $login = document.querySelector('.login') as HTMLElement;
  const $signup = document.querySelector('.signup') as HTMLElement;
  const $signupbtn = document.querySelector('.sign-up') as HTMLButtonElement;
  const $signupForm = document.querySelector('.signup-form') as HTMLFormElement;  
  const $signupbg = document.querySelector('.signup-popup-bg') as HTMLDivElement;
  const $signupSubmit = document.querySelector('.signup-submit') as HTMLButtonElement;
  const $signupInputs = document.querySelectorAll('.signup-form input') as NodeList;

  // Event listener
  const load = (e: MouseEvent) => {
    if (e.target !== $signupbtn) return;

    const $signupLogo = document.querySelector('.signup-logo') as HTMLImageElement;
    const $signupImage = document.querySelector('.signup-image') as HTMLImageElement;
    
    $signupLogo.src = signuplogo;
    $signupImage.src = signupImage;

    openPopup($signup);
    closePopup($login);
  }

  const closeSignup = (e: MouseEvent) => {
    if (e.target !== $signupbg || e.target === $signupbtn) return;

    initialize($signupInputs);
    closePopup($signup);
  }

  const createNewUser = async (e: Event) => {
    e.preventDefault();
    try {
      const newUser = await fireauth.createUserWithEmailAndPassword($signupForm['signupEmail'].value, $signupForm['signupPwConfirm'].value)
      console.log(newUser);

      initialize($signupInputs);
      closePopup($signup);
    }
    catch (error) {
      window.alert(error);
      initialize($signupInputs);
    }
  }

  const validationCheck = (e: KeyboardEvent) => {
    const $inputTarget = e.target as HTMLInputElement;
    const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;
    if ($inputTarget === $signupSubmit) return;

    let regExp = /$/ as RegExp;

    if (e.target === $signupForm['signupName']) {
      regExp = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    } else if (e.target === $signupForm['signupEmail']) {
      regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    } else if (e.target === $signupForm['signupPw'] || e.target === $signupForm['signupPwConfirm']) {
      regExp = /^([a-zA-Z0-9@*#]{8,15})$/;
    }

    if (!regExp.test($inputTarget.value) || $inputTarget.value === '') {
      $inputTarget.classList.add('not-valid');
      $labelInput.classList.add('not-valid');
      $signupSubmit.disabled = true;
    } else {
      $inputTarget.classList.remove('not-valid');
      $labelInput.classList.remove('not-valid');
      $signupSubmit.disabled = false;
    }

    if ($inputTarget === $signupForm['signupPwConfirm']) {
      if ($signupForm['signupPw'].value !== $inputTarget.value) {
        $inputTarget.classList.add('pwd-different');
        $labelInput.classList.add('pwd-different');
        $signupSubmit.disabled = true;
      } else {  
        $inputTarget.classList.remove('pwd-different');
        $labelInput.classList.remove('pwd-different');
        $signupSubmit.disabled = false;
      }
    }
  }

  $main.addEventListener('click', load);
  $signupbg.addEventListener('click', closeSignup);
  $signupForm.addEventListener('submit', createNewUser);
  $signupForm.addEventListener('keyup', _.throttle(validationCheck));
}

export default signup;