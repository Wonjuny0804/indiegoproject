import { fireauth } from './firebaseSetting';
import { firestore } from './firebaseSetting';
import loginLogo from '../assets/login.svg';
import loginImage from '../assets/login-image.svg';
import closeBtn from '../assets/close-btn.svg';
import _ from 'lodash';
import { initialize, openPopup, closePopup, placeholder } from './utils';

const login = () => {
  // get DOM Elements
  const $login = document.querySelector('.login') as HTMLElement;
  const $loginBtn = document.querySelector('.login-btn') as HTMLButtonElement; 
  const $logoutBtn = document.querySelector('.logout-btn') as HTMLButtonElement; 
  const $loginForm = document.querySelector('.login-form-container > form') as HTMLFormElement;
  const $loginbg = document.querySelector('.login-popup-bg') as HTMLDivElement;
  const $loginLogo = document.querySelector('.login-logo') as HTMLImageElement;
  const $loginImage = document.querySelector('.login-image') as HTMLImageElement;
  const $loginInputs = document.querySelectorAll('form input') as NodeList;
  const $email = document.querySelector('form #loginEmail') as HTMLInputElement;
  const $password = document.querySelector('form #loginPwd') as HTMLInputElement;
  const $signin = document.querySelector('.sign-in') as HTMLButtonElement;
  const $favBtn = document.querySelector('.check-favorite-btn') as HTMLButtonElement;
  const $closeBtn = document.querySelector('.close-btn') as HTMLSpanElement;
  const $closeBtnImg = $closeBtn.firstElementChild as HTMLImageElement;

  const usersColRef = firestore.collection('Users');

  // event handlers
  const imgloader = (): void => {
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
      const user: any = await fireauth.signInWithEmailAndPassword($email.value, $password.value);

      const querySnapshot: any = await usersColRef.get();

      querySnapshot.forEach((doc: any) => {
        if (doc.data().userEmail !== user.user.email) {
          console.log(doc.data().userEmail, user.user.email);
          usersColRef.add({
            userEmail: user.user.email,
            favorites: []
          });
        }
      });
      initialize($loginInputs);
      closePopup($login);
    } 
    catch (error) {
      window.alert(error.message);
    }
  }

  const validPwd = (e: KeyboardEvent): void => {
    const $inputTarget = e.target as HTMLInputElement;
    const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;
    console.log($inputTarget.parentNode?.parentNode);
    const regExpPwd = /$/ as RegExp;

    if (!regExpPwd.test($inputTarget.value) || $inputTarget.value === '') {
      $inputTarget.classList.add('not-valid');
      $labelInput.classList.add('not-valid');
      $signin.disabled = true;
      } else {
        $inputTarget.classList.remove('not-valid');
        $labelInput.classList.remove('not-valid');
        $signin.disabled = false;
      }
  };


  const validEmail = (e: KeyboardEvent) => {
    const $inputTarget = e.target as HTMLInputElement;
    const $labelInput = $inputTarget.previousElementSibling as HTMLLabelElement;

    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ as RegExp;
    if (!regExpEmail.test($inputTarget.value) || $inputTarget.value === '') {
      $inputTarget.classList.add('not-valid');
      $labelInput.classList.add('not-valid');
      $signin.disabled = true;
      } else {
        $inputTarget.classList.remove('not-valid');
        $labelInput.classList.remove('not-valid');
        $signin.disabled = false;
      }
  }

  const signOut = async () => {
    try {
      const user = await fireauth.signOut();
      window.alert(`You're signed out!`);
    } 
    catch (error) {
      window.alert(error);
    }
  };

  const labelTransition = (e: FocusEvent) => {
    const $inputElement = e.target as HTMLInputElement;
    if ($inputElement.value !== '') return;
    placeholder($inputElement);
  }

  const displayLoginLogout = (user: any) => {
    if (user) {
      $loginBtn.style.display = 'none';
      $logoutBtn.style.display = 'block';
      $favBtn.style.display = 'block';
    }
    else {
      $loginBtn.style.display = 'block';
      $logoutBtn.style.display = 'none';
      $favBtn.style.display = 'none';
    }
  }



  $email.addEventListener('keyup', _.throttle(validEmail, 1000));
  $password.addEventListener('keyup', _.throttle(validPwd, 1000));
  $loginbg.addEventListener('focusin', labelTransition);
  $loginbg.addEventListener('focusout', labelTransition);
  $loginForm.addEventListener('submit', signIn);
  $loginBtn.addEventListener('click', imgloader);
  $loginbg.addEventListener('click', closePopUp);
  $logoutBtn.addEventListener('click', signOut);

  fireauth.onAuthStateChanged(displayLoginLogout);
}

export default login;