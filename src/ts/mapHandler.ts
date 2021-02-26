import bookicon from '../assets/book-icon.png';
import filmicon from '../assets/film-icon.png'
import { firestore } from './firebaseSetting';
import { Branch } from './interface/interface';
import createMap from './utils/createMap';
import getCoordinates from './utils/getCoordinates';
import toggleInfoWindow from './utils/toggleInfoWindow';
import displayMarker from './utils/displayMarker';
import { createNearStoreContent, createInfoWindowContent, createCarouselContent } from './utils/createContent'

const bookstoreColRef = firestore.collection('Bookstores');
const theatreColRef = firestore.collection('Theatres');

declare let kakao: any;
let bookstores: Array<Branch> = [];
let theatres: Array<Branch> = [];
let currentSlide = 0;
let firstClick = true;

const $bookStoreMap = document.querySelector('.bookstore-map') as HTMLElement;
const $theatreMap = document.querySelector('.theatre-map') as HTMLElement;
const $bookStoreBtn = document.querySelector('.bookstore-info-btn') as HTMLButtonElement;
const $theatreBtn = document.querySelector('.theatre-info-btn') as HTMLButtonElement;
const $bookStoreInfo = document.querySelector('.bookstore-info') as HTMLElement;
const $theatreInfo = document.querySelector('.theatre-info') as HTMLElement;

const zoomToStore = (id: string, map: any, mode: string) => {
  const stores = mode === 'bookstores' ? bookstores : theatres;
  const store = stores.find((store: Branch) => store.id === +id);
  map.setLevel(3);
  map.setCenter(new kakao.maps.LatLng(store?.lat, store?.lng));
};

const renderNearByStore = (nearByStore: Array<Branch>, map: any, mode:string) => {
  const $nearByStore =  (mode === 'bookstores')
  ? document.querySelector('.bookstore-info .closest-store-list') as HTMLElement
  : document.querySelector('.theatre-info .closest-store-list') as HTMLElement;

  const sortedByDistance = nearByStore
    .sort((store1: any, store2: any) => store1.distance - store2.distance)
    .slice(0, 3);
  $nearByStore.innerHTML = '';
  sortedByDistance.forEach((store: Branch) => {
    $nearByStore.innerHTML += createNearStoreContent(store);
  });

  $nearByStore.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('locate-store-btn')) return;
    zoomToStore(target.id, map, mode);
  });
};

const findNearByStore = async (locPosition: Object, map: any, mode: string) => {
  const stores = mode === 'bookstores' ? bookstores : theatres;
  const closeDistance = 15000;
  const polyline = new kakao.maps.Polyline({
    map: map,
    strokeWeight: 0
  });

  try {
    const nearbyStore: any = stores.map((store: Branch, i: number) => {
        const newPath = [locPosition, new kakao.maps.LatLng(store.lat, store.lng)];
        polyline.setPath(newPath);
        const distance = polyline.getLength();

        if (distance < closeDistance) {
          store.distance = distance;
          return store;
        }
      });
    // undefined는 filter 해서 전달
    renderNearByStore(nearbyStore.filter((store: Branch) => store), map, mode);
  } catch (err) {
    console.log(err);
  }
};

const markCurrentLoc = (map: any, mode: string) => {
  const $loader =  (mode === 'bookstores')
  ? document.querySelector('.bookstore-info .loc-loader') as HTMLElement
  : document.querySelector('.theatre-info .loc-loader') as HTMLElement;

  $loader.classList.add('is-loading')
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  var imageSize = new kakao.maps.Size(24, 35); 
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locPosition = new kakao.maps.LatLng(lat, lon);
      displayMarker(locPosition, markerImage, map);
      findNearByStore(locPosition, map, mode);
      $loader.classList.remove('is-loading');
    });
  } else {
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    message = 'geolocation를 사용할수없음';
    displayMarker(locPosition, markerImage, map, message);
  }
};

const plotMap = async (mode: string, map: any) => {
  const stores = mode === 'bookstores' ? bookstores : theatres;
  const $findNearByStoreBtn = mode ==='bookstores' 
  ? document.querySelector('.bookstore-info .loc-loader') as HTMLElement
  : document.querySelector('.theatre-info .loc-loader') as HTMLElement;


  const clusterer = new kakao.maps.MarkerClusterer({
    map: map,
    averageCenter: true,  
    minLevel: 12,
    styles: [{ 
      width : '40px', 
      height : '40px',
      background: '#efc790cf',
      borderRadius: '15px',
      color: '#191919',
      border: '1px solid #a8a5a1',
      'font-size': '1.3rem',
      textAlign: 'center',
      fontWeight: 'bold',
      lineHeight: '31px'
    }]
  });

  const imageSrc = (mode === 'bookstores') ? bookicon: filmicon;
  const imageSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69)};
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  try {
    const markers = await Promise.all(
      stores.map(async (store: Branch, i: number) => {
        const locationInfo: any = await getCoordinates(store.address);
        store.lat = locationInfo[0].address.y;
        store.lng = locationInfo[0].address.x;
        store.region = locationInfo[0].road_address.region_1depth_name;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(store.lat, store.lng),
          image: markerImage
        });

        const content = createInfoWindowContent(store);

        const overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition()
        });

        overlay.setMap(null);

        kakao.maps.event.addListener(map, 'zoom_changed', () => {
          if (map.getLevel() <= 3) overlay.setMap(map);
          else overlay.setMap(null);
        });

        kakao.maps.event.addListener(
          marker,
          'click',
          toggleInfoWindow(map, overlay)
        );

        return marker;
      })
    );
    clusterer.addMarkers(markers);
    $findNearByStoreBtn.addEventListener('click', (e: MouseEvent) => {
      markCurrentLoc(map, mode)  
    });
  } catch (err) {
    console.log(err);
  }
  
};

const createListNav = (mode: string) => {
  const stores = mode === 'bookstores' ? bookstores : theatres;
  const $storeByRegionTab = (mode ==='bookstores' 
  ?  document.querySelector('.bookstore-info .cities') as HTMLElement 
  : document.querySelector('.theatre-info .cities') as HTMLElement) 
  
  const storeByRegion = stores
    .map((store: Branch, i: number) => {
      return store.region;
    })
    .filter(
      (location: any, index: number, locArray: any) =>
        locArray.indexOf(location) === index
    );
  $storeByRegionTab.innerHTML = storeByRegion
    .map(
      ($menu: any, i: number) =>
        `<div>
        <input type="radio" name="location" id="${mode}${++i}" class="display-list-btn">
        <label for="${mode}${i}">${$menu}</label>
        </div>
        `
    )
    .join('');
};

const displayListCarousel = (mode: string, map: any) => {
  const stores = mode === 'bookstores' ? bookstores : theatres;
  const $carouselContainer = (mode === 'bookstores'
  ? document.querySelector('.bookstore-carousel') as HTMLElement
  : document.querySelector('.theatre-carousel') as HTMLElement);
  
  const $storeByRegionTab = (mode === 'bookstores' 
  ? document.querySelector('.bookstore-info .cities') as HTMLElement
  : document.querySelector('.theatre-info .cities') as HTMLElement);

  const $storeCarousel = (mode === 'bookstores'  
  ? document.querySelector('.bookstore-info .bookstore-carousel-slides') as HTMLElement
  : document.querySelector('.theatre-info .theatre-carousel-slides') as HTMLElement);

  $storeByRegionTab.addEventListener('change', (e: Event) => {
    currentSlide = 0;
    const target = e.target as HTMLElement;
    if (!target.classList.contains('display-list-btn')) return;
    const matchingStore = stores.filter(
      (store: Branch) => store.region === target.nextElementSibling?.textContent
    );
    $storeCarousel.innerHTML = matchingStore
      .map((store: Branch) => {
        return createCarouselContent(store);
      })
      .join('');
    $storeCarousel.style.setProperty('--currentSlide', '0');
    $storeCarousel.style.display = 'flex';
    zoomToStore(Array.from($storeCarousel.children)[currentSlide].id, map, mode);
    });
    
    $carouselContainer.addEventListener('click', (e: MouseEvent) => {
      const slides = Array.from($storeCarousel.children)
      const target = e.target as HTMLElement;

      if (target.classList.contains('prev')) {
        if (currentSlide <= 0) {
          zoomToStore(slides[currentSlide].id, map, mode);
        }
        else {
          $storeCarousel.style.setProperty('--currentSlide', --currentSlide + '');
          $storeCarousel.style.setProperty('--duration', 500 + '');
          zoomToStore(slides[currentSlide].id, map, mode);
          console.log(currentSlide);
        }
      }
      if (target.classList.contains('next')) {
        if (currentSlide >= slides.length - 1) {
          zoomToStore(slides[currentSlide].id, map, mode);
        }
        else {
          $storeCarousel.style.setProperty('--currentSlide', ++currentSlide + '');
          $storeCarousel.style.setProperty('--duration', 500 + '');
          zoomToStore(slides[currentSlide].id, map, mode);
        }
      }
    })
};

const fetchData = async (query: string) => {
  try {
  if (query === 'bookstores') {
  const bookSnapshot: any = await bookstoreColRef.get();
  bookSnapshot.forEach((doc: any) => bookstores.push(doc.data()))
  } else {
  const theatreSnapshot: any = await theatreColRef.get();
  theatreSnapshot.forEach((doc: any) => theatres.push(doc.data()))
  }
  } catch (err) {
  console.log(err);
  }
  };

const renderMap = async (mode: string) => {
  const map = createMap(mode);
  await plotMap(mode, map);
  createListNav(mode);
  displayListCarousel(mode, map);
};

const initBookStoreMap = async () => {
  const $spinner = document.querySelector('.bookstore-info .spinner') as HTMLElement;
  $spinner.style.display = 'block';
  try {
    await fetchData('bookstores');
    await renderMap('bookstores');
  } catch (err) {
    console.log(err);
  }
  $spinner.style.display = 'none';
  $bookStoreMap.style.opacity = '1';
}

const initTheatreMap = async () => {
  const $spinner = document.querySelector('.theatre-info .spinner') as HTMLElement;
  $spinner.style.display = 'block';
  try {
    await fetchData('theatres');
    await renderMap('theatres');
  } catch (err) {
    console.log(err);
  }
  $spinner.style.display = 'none';
  $theatreMap.style.opacity = '1';
}

const mapHandler = () => {
  document.addEventListener(
    'DOMContentLoaded',
    kakao.maps.load(async () => {
      initBookStoreMap();
    })
  );

  $bookStoreBtn.addEventListener('click', (e: MouseEvent) => {
    kakao.maps.load(()=> {  
     $bookStoreInfo.classList.add('is-active');
     $theatreInfo.classList.remove('is-active');
    });
  });

  $theatreBtn.addEventListener('click', (e: MouseEvent) => {
    kakao.maps.load(() => {
      $theatreInfo.classList.add('is-active');
      $bookStoreInfo.classList.remove('is-active');
      if (firstClick) {
        firstClick = false;
        initTheatreMap();
      }
    });
  });
};

export default mapHandler;
