import movie1 from '../assets/movie-1.jpg'

console.log(movie1)

const sampleImg = new Image()

sampleImg.src = movie1

if (document.querySelector('.bookstore-carousel-slides')) {
  const test = document.querySelector('.bookstore-carousel-slides') as HTMLElement
  test.appendChild(sampleImg)
}