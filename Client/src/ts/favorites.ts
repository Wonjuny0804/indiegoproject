import { firestore } from './firebaseSetting';

const favorite = () => {
  // DOM
  const $favBtn = document.querySelector('.favorite-btn') as HTMLButtonElement;
  const $favoritePopup = document.querySelector('.favorite-popup') as HTMLElement;

  const usersColRef = firestore.collection('Users');

  const renderFavorites = () => {
    
  }

  $favBtn.addEventListener('click', () => {
    $favoritePopup.classList.toggle('is-active');
  });
}

export default favorite;