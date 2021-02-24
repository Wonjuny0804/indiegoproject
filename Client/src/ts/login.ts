import { fireauth } from './firebaseSetting';
import loginLogo from '../assets/login.svg';
import loginImage from '../assets/login-image.svg';
import closeBtn from '../assets/close-btn.svg';
import _ from 'lodash';
import { initialize, openPopup, closePopup } from './utils';

const login = () => {
  // get DOM Elements
  const $login = document.querySelector('.login') as HTMLElement;
  const $loginBtn = document.querySelector('.login-btn') as HTMLButtonElement; 
  const $loginForm = document.querySelector('.login-form-container > form') as HTMLFormElement;
  const $loginbg = document.querySelector('.login-popup-bg') as HTMLDivElement;
  const $loginLogo = document.querySelector('.login-logo') as HTMLImageElement;
  const $loginImage = document.querySelector('.login-image') as HTMLImageElement;
  const $closeBtn = document.querySelector('.close-btn') as HTMLSpanElement;
  const $closeBtnImg = $closeBtn.firstElementChild as HTMLImageElement;
  const $email = document.querySelector('form > #loginEmail') as HTMLInputElement;
  const $loginInputs = document.querySelectorAll('form input') as NodeList;
  const $password = document.querySelector('form > #loginPwd') as HTMLInputElement;
  const $signin = document.querySelector('.sign-in') as HTMLButtonElement;

  // const initialize = (): void => {
  //   $login.classList.toggle('is-active');
  //   $email.value = '';
  //   $password.value = '';
  // }

  const loader = (): void => {
    $loginLogo.src = loginLogo;
    $loginImage.src = loginImage;
    $closeBtnImg.src = closeBtn;

    openPopup($login);
  }

  const closePopUp = (e: Event): void => {
    if (e.target !== $loginbg && e.target !== $closeBtnImg) return;

    initialize($loginInputs);
    closePopup($login);
  }

  const signIn = async (e: Event) => {
    e.preventDefault();

    try {
      const user = await fireauth.signInWithEmailAndPassword($email.value, $password.value);
      console.log(user);
      initialize($loginInputs);
    } 
    catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(error);
    }
  }

  // label placeholder part
  const labelTransition = (): void => {
    console.log('gogo');
  }

  const validationCheck = (e: KeyboardEvent): void => {
    const $inputTarget = e.target as HTMLInputElement;
    const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;

    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ as RegExp;
    if ($inputTarget.id === 'loginPwd') regExp = /$/;

    if (!regExp.test($inputTarget.value) || $inputTarget.value === '') {
      $inputTarget.classList.add('not-valid');
      $labelInput.classList.add('not-valid');
      $signin.disabled = true;
      } else {
        $inputTarget.classList.remove('not-valid');
        $labelInput.classList.remove('not-valid');
        $signin.disabled = false;
      }
  }



  $email.addEventListener('keyup', _.throttle(validationCheck, 1000));
  $password.addEventListener('keyup', _.throttle(validationCheck, 1000));
  $email.addEventListener('focus', labelTransition);
  $loginForm.addEventListener('submit', signIn);
  $loginBtn.addEventListener('click', loader);
  $loginbg.addEventListener('click', closePopUp);
}

export default login;