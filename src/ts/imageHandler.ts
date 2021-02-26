import logo from '../assets/logo.svg'

const logoImage = new Image()
logoImage.src = logo;

const imageHandler = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const landing = document.querySelector('.landing') as HTMLElement;
    landing.appendChild(logoImage);
  })
}

export default imageHandler;

