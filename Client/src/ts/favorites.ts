import { firestore } from './firebaseSetting';
import { fireauth } from './firebaseSetting';

// DOM
const $favBtn = document.querySelector('.check-favorite-btn') as HTMLButtonElement;
const $favoritePopup = document.querySelector('.favorite-popup') as HTMLElement;
const $favoriteList = document.querySelector('.favorite-list') as HTMLUListElement;

const usersColRef = firestore.collection('Users');
// let favorites: string[] = [];

export const favorite = () => {
  $favoriteList.innerHTML = `<li>Nothing to show yet.</li>`
  $favBtn.addEventListener('click', () => {
    $favoritePopup.classList.toggle('is-active');
  });
}

export const renderFavorites = async (favorites: string[]) => {
  const favoriteQuerySnapshot = await usersColRef.get();
  fireauth.onAuthStateChanged((user: any) =>{
    favoriteQuerySnapshot.forEach((doc: any) => {
      if (doc.data().userEmail === user.email) {
        $favoriteList.innerHTML = favorites.map(favorite => {
          return `<li>${favorite}</li>`
        }).join('');
      }
    });
  });
}