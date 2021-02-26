import { firestore } from './firebaseSetting';
import { fireauth } from './firebaseSetting';

// DOM
let bookinfos: string[] = [];
let theatreinfos: string[] = [];

const $favBtn = document.querySelector('.check-favorite-btn') as HTMLButtonElement;
const $favoritePopup = document.querySelector('.favorite-popup') as HTMLElement;
const $favoriteList = document.querySelector('.favorite-list') as HTMLUListElement;

const $bookstoreCarousel = document.querySelector('.bookstore-carousel-slides') as HTMLElement;
const $theatreCarousel = document.querySelector('.theatre-carousel-slides') as HTMLElement;

const usersColRef = firestore.collection('Users');
const bookstoreColRef = firestore.collection('Bookstores');
const theatreColRef = firestore.collection('Theatres');

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


  $bookstoreCarousel.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const slide = target.closest('.slide') as HTMLElement;
    const id = +slide?.id;
    const bookstoreQuerySnapshot = await bookstoreColRef.get();
    const usersQuerySnapshot = await usersColRef.get();
    
    if (!target.matches('.favorite-btn')) return;

    bookstoreQuerySnapshot.forEach(doc => {
      if (id === doc.data().id) {
        bookinfos = [...bookinfos, doc.data().name];
        fireauth.onAuthStateChanged((user: any) =>{
          usersQuerySnapshot.forEach(doc => {
            if (doc.data().userEmail === user.email) {
              usersColRef.doc(doc.id).update({
                favorites: bookinfos
              })
            }
          })
        });
      }
    });

    renderFavorites(bookinfos);

  })

  $theatreCarousel.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const slide = target.closest('.slide') as HTMLElement;
    const id = +slide?.id;
    const theatreQuerySnapshot = await theatreColRef.get();
    const usersQuerySnapshot = await usersColRef.get();
    
    if (!target.matches('.favorite-btn')) return;

    theatreQuerySnapshot.forEach(doc => {
      if (id === doc.data().id) {
        theatreinfos = [...theatreinfos, doc.data().name];
        fireauth.onAuthStateChanged((user: any) =>{
          usersQuerySnapshot.forEach(doc => {
            if (doc.data().userEmail === user.email) {
              usersColRef.doc(doc.id).update({
                favorites: theatreinfos
              })
            }
          })
        });
      }
    });

    renderFavorites(theatreinfos);

  })
}
