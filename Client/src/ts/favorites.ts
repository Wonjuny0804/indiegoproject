import { firestore } from './firebaseSetting';
import { fireauth } from './firebaseSetting';

// DOM
const $favBtn = document.querySelector('.check-favorite-btn') as HTMLButtonElement;
const $favoritePopup = document.querySelector('.favorite-popup') as HTMLElement;
const $favoriteList = document.querySelector('.favorite-list') as HTMLUListElement;

const usersColRef = firestore.collection('Users');
const bookstoreColRef = firestore.collection('Bookstores');

export const renderFavorites = async (favorites: string[]) => {
  const favoriteQuerySnapshot = await usersColRef.get();

  fireauth.onAuthStateChanged((user: any) =>{
    favoriteQuerySnapshot.forEach(doc => {
      if (doc.data().userEmail === user.email) {
        $favoriteList.innerHTML = favorites.map(favorite => {
          return `<li class="favorite-item">${favorite}</li>`
        }).join('');
      }
    });
  });
}

export const favorite = async () => {
  const users = await usersColRef.get()
  
  fireauth.onAuthStateChanged((user: any) =>{
    users.forEach(doc => {
      if (doc.data().userEmail === user.email) {
        if (doc.data().favorites.length) {
          renderFavorites(doc.data().favorites);
        } else {
          $favoriteList.innerHTML = 'Nothing to show yet!';
        } 
      }
    })
  });

  $favBtn.addEventListener('click', () => {
    $favoritePopup.classList.toggle('is-active');
  });

  $favoriteList.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.favorite-item')) return;

    const bookstoreQuerySnapshot = await bookstoreColRef.get();
    const usersQuerySnapshot = await usersColRef.get();
    
    bookstoreQuerySnapshot.forEach(bookstore => {
      fireauth.onAuthStateChanged((user: any) =>{
        usersQuerySnapshot.forEach(doc => {
          if (doc.data().userEmail === user.email) {
            if (bookstore.data().name === target.textContent) {
              console.log(bookstore.data());
            }
          }
        })
      });
    });
  });
}
