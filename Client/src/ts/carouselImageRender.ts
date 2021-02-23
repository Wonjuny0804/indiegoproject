const $bookstoreCarousel = document.querySelector('.bookstore-carousel-slides') as HTMLElement;
let html = '';

export default (querySnapshot: any) => {
  querySnapshot.forEach((doc: any) => {
    html += `<img src='${doc.data().img}'>`
  })
  $bookstoreCarousel.innerHTML = html;
}