import movie1 from '../assets/movie-1.jpg'
import movie2 from '../assets/movie-2.jpg'
import movie3 from '../assets/movie-3.jpg'
import movie4 from '../assets/movie-4.jpg'

const sampleImg1 = new Image()
const sampleImg2 = new Image()
const sampleImg3 = new Image()
const sampleImg4 = new Image()

sampleImg1.src = movie1
sampleImg2.src = movie2
sampleImg3.src = movie3
sampleImg4.src = movie4

export default () => {
  const $bookstoreCarousel = document.querySelector('.bookstore-carousel-slides') as HTMLElement
  const $fragment = document.createDocumentFragment();
  $fragment.append(sampleImg1, sampleImg2, sampleImg3, sampleImg4);
  $bookstoreCarousel.appendChild($fragment);
}