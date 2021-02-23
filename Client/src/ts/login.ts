import firebase from 'firebase/app';
import loginLogo from '../assets/login.svg';
import loginImage from '../assets/login-image.svg';

// DOM element


const loginLogoLoader = () => {
  
};

const login = () => {
  // get Elements
  const $loginBtn = document.querySelector('.login-btn') as HTMLButtonElement; 
  const $login = document.querySelector('.login') as HTMLElement;

  const showPopUp = () => {
    const $login = document.querySelector('.login') as HTMLElement;
    const $loginLogo = document.querySelector('.login-logo') as HTMLImageElement;
    const $loginImage = document.querySelector('.login-image') as HTMLImageElement;

    $loginLogo.src = loginLogo;
    $loginImage.src = loginImage;

    $login.classList.toggle('is-active');
  }

  const closePopUp = (clickEvent: MouseEvent): void => {
    const $bgContainer = document.querySelector('.login-popup-container') as HTMLElement;
    // if (clickEvent.target.classList.contains('login-popup-bg')) $login.classList.toggle('is-active');
  }
  
  
  // const generatePopup = () =>{
  //   const $loginSection = document.querySelector('.login') as HTMLElement;
  //   // initialize
  //   $loginSection.innerHTML = '';
  //   // Generate DOM elements
  //   const $loginPopUpBg = document.createElement('div');

  //   const $loginPopUpContainer = document.createElement('section');
  //   const $loginFormContainer = document.createElement('div');
  //   const $loginImage = new Image();
  //   const $loginLogo = new Image();

  //   const $loginForm = document.createElement('form'); 

  //   const $loginEmailInput = document.createElement('input');
  //   const $loginPwdInput = document.createElement('input');
  //   const $emailLabel = document.createElement('label');
  //   const $passwordLabel = document.createElement('label');
  //   const $loginBtn = document.createElement('input');
  //   const $signupBtn = document.createElement('button');

  //   $loginPopUpBg.classList.add('login-popup-bg');
  //   $loginPopUpContainer.classList.add('login-popup-container');
  //   $loginFormContainer.classList.add('login-form-container');

  //   $loginImage.src = loginImage;
  //   $loginLogo.src = loginLogo;

  //   $loginImage.alt = 'login image';
  //   $loginLogo.alt = 'login logo';

  //   $emailLabel.htmlFor = 'loginEmail';
  //   $passwordLabel.htmlFor = 'loginPwd';

  //   $loginEmailInput.type= 'email';
  //   $loginEmailInput.id = 'loginEmail';
  //   $loginEmailInput.required = true;

  //   $loginPwdInput.type = 'password';
  //   $loginPwdInput.id = 'loginPwd';
  //   $loginPwdInput.required = true;

  //   $loginBtn.type = 'submit';
  //   $loginBtn.value = 'login';

  //   $loginForm.append($emailLabel, $loginEmailInput, $passwordLabel, $loginPwdInput, $loginBtn, $signupBtn);
  //   $loginFormContainer.appendChild($loginForm);
  //   $loginPopUpContainer.append($loginLogo, $loginImage, $loginFormContainer);
  //   $loginPopUpBg.appendChild($loginPopUpContainer);
  //   $loginSection.appendChild($loginPopUpBg);
  // }


  $loginBtn.addEventListener('click', showPopUp);
  $login.addEventListener('click', closePopUp);
}

// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((user) => {
//     // Signed in
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });

export { loginLogoLoader, login };