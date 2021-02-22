
// DOM element
const $loginBtn = document.querySelector('.login-btn') as HTMLButtonElement

if ($loginBtn) {
  $loginBtn.addEventListener('click', () => {
    const $login = document.querySelector('.login') as HTMLElement
    $login.style.display = 'block'
  })
}