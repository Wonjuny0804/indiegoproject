import firebase from 'firebase/app';
import loginLogo from '../assets/login.svg';
import loginImage from '../assets/login-image.svg';
// import closeBtn from '../assets/close-btn.svg';
import _ from 'lodash';

const login = () => {
  // get DOM Elements
  const $login = document.querySelector('.login') as HTMLElement;
  const $loginBtn = document.querySelector('.login-btn') as HTMLButtonElement; 
  const $loginForm = document.querySelector('.login-form-container > form') as HTMLFormElement;
  const $loginbg = document.querySelector('.login-popup-bg') as HTMLDivElement;
  const $loginLogo = document.querySelector('.login-logo') as HTMLImageElement;
  const $loginImage = document.querySelector('.login-image') as HTMLImageElement;
  // const $closeBtn = document.querySelector('');
  const $email = document.querySelector('form > #loginEmail') as HTMLInputElement;
  const $password = document.querySelector('form > #loginPwd') as HTMLInputElement;

  const deactivate = () => {
    $login.classList.toggle('is-active');
    $email.value = '';
    $password.value = '';
  }

  const showPopUp = (): void => {
    $loginLogo.src = loginLogo;
    $loginImage.src = loginImage;

    $login.classList.toggle('is-active'); 
  }

  const closePopUp = (e: Event): void => {
    if (e.target !== $loginbg) return;

    deactivate();
  }

  const signIn = async (e: Event) => {
    e.preventDefault();

    try {
      const user = await firebase.auth().signInWithEmailAndPassword($email.value, $password.value);
      
      deactivate();
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
    
    if ($inputTarget.id === 'loginPwd') regExp = /$/ as RegExp;

    if (!regExp.test($inputTarget.value) || $inputTarget.value === '') {
      $labelInput.style.color = 'red'; 
      $inputTarget.classList.add('not-valid');
      } else {
        console.log(typeof $inputTarget.value);
        $inputTarget.classList.remove('not-valid');
        $labelInput.style.color = '';
      }
  }

  $email.addEventListener('keyup', _.throttle(validationCheck, 1000));
  $password.addEventListener('keyup', _.throttle(validationCheck, 1000));
  $email.addEventListener('focus', labelTransition);
  $loginForm.addEventListener('submit', signIn);
  $loginBtn.addEventListener('click', showPopUp);
  $loginbg.addEventListener('click', closePopUp);
}

export default login;