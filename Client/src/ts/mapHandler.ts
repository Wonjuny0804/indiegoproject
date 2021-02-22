import axios from 'axios';
import bookicon from '../assets/book-icon.png'
import filmicon from '../assets/film-icon.png'

declare let kakao: any;

interface Branch {
  id: number;
  name: string;
  address: string;
  tel: string;
  openhour: string;
  introduction: string;
  website: string;
  instgram: string;
  img: string;
  content: string;
  lat: number;
  lng: number;
  distance: number;
  region: string;
}

let stores: Array<Branch> = [];

const $bookStoreMap = document.querySelector('.bookstore-map') as HTMLElement;
const $theatreMap = document.querySelector('.theatre-map') as HTMLElement;
const $bookStoreBtn = document.querySelector('.bookstore-info-btn') as HTMLButtonElement;
const $theatreBtn = document.querySelector('.theatre-info-btn') as HTMLButtonElement;
const $bookStoreInfo = document.querySelector('.bookstore-info') as HTMLElement;
const $theatreInfo = document.querySelector('.theatre-info') as HTMLElement;


const getCoordinates = (address: string) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: Object, status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    });
  });
};

const toggleInfoWindow = (map: any, overlay: any) => {
  let isOpen = false;
  return () => {
    if (isOpen) {
      overlay.setMap(map);
      isOpen = !isOpen;
    } else {
      overlay.setMap(null);
      isOpen = !isOpen;
    }
  };
};

const displayMarker = (locPosition: Object, image: string, map: any, message?: string) => {
  const marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
    image
  });

  if (message) {
    const infowindow = new kakao.maps.InfoWindow({
        content : message,
        removable : true
    });
    infowindow.open(map, marker);
  }

  map.setLevel(8);
  map.setCenter(locPosition);
};

const zoomToStore = (id: string, map: any) => {
  const store = stores.find((store: Branch) => store.id === +id);
  map.setLevel(3);
  map.setCenter(new kakao.maps.LatLng(store?.lat, store?.lng));
};

const renderNearByStore = (nearByStore: Array<Branch>, map: any) => {
  const $nearByStore = document.querySelector('.closest-store-list') as HTMLElement;
  const sortedByDistance = nearByStore
    .sort((store1: any, store2: any) => store1.distance - store2.distance)
    .slice(0, 5);
  
  sortedByDistance.forEach(({ id, name, distance, lat, lng }: Branch) => {
    $nearByStore.innerHTML += `<li class="store-list"><button class="locate-store-btn" id="${id}">${name}</button>
    - 약 ${Math.ceil(distance) / 1000}km
    - <a target="_blank" href="https://map.kakao.com/link/to/${name},${lat},${lng}">길찾기</a>
    </li>
    `;
  });

  $nearByStore.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('locate-store-btn')) return;
    zoomToStore(target.id, map);
  });
};

const findNearByStore = async (locPosition: Object, map: any) => {
  const closeDistance = 8000;
  const polyline = new kakao.maps.Polyline({
    map: map,
    strokeWeight: 0
  });

  try {
    const nearbyStore: any = await Promise.all(
      stores.map(async (store: any, i: number) => {
        const locationInfo: any = await getCoordinates(store.address);

        const lat = locationInfo[0].address.y;
        const lng = locationInfo[0].address.x;

        const newPath = [locPosition, new kakao.maps.LatLng(lat, lng)];
        polyline.setPath(newPath);
        const distance = polyline.getLength();

        if (distance < closeDistance) {
          store.distance = distance;
          return store;
        }
      })
    );
    // undefined는 filter 해서 전달
    renderNearByStore(
      nearbyStore.filter((store: Branch) => store),
      map
    );
  } catch (err) {
    console.log(err);
  }
};

const markCurrentLoc = (map: any) => {
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  var imageSize = new kakao.maps.Size(24, 35); 
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const locPosition = new kakao.maps.LatLng(lat, lon);
      displayMarker(locPosition, markerImage, map);
      findNearByStore(locPosition, map);
    });
  } else {
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    message = 'geolocation를 사용할수없음';
    displayMarker(locPosition, markerImage, map, message);
  }
};

const createMap = (mode: string) => {

  const $container = (mode === 'bookstores' ? $bookStoreMap : $theatreMap);
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978),
    level: 14
  };
  return new kakao.maps.Map($container, options);
};

const plotMap = async (mode: string, map: any) => {
  
  const $findNearByStoreBtn = document.querySelector(
    '.find-closest-btn'
  ) as HTMLButtonElement;

  const clusterer = new kakao.maps.MarkerClusterer({
    map: map,
    averageCenter: true,  
    minLevel: 12,
    styles: [{ 
      width : '40px', height : '40px',
      background: 'rgba(249, 241, 230, 0.75)',
      borderRadius: '15px',
      color: '#8c6022',
      textAlign: 'center',
      fontWeight: 'bold',
      lineHeight: '31px'
    }]
  });

  const imageSrc =
    mode === 'bookstores'
      ? bookicon
      : filmicon;
  const imageSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  try {
    const markers: any = await Promise.all(
      stores.map(async (store: Branch, i: number) => {
        const locationInfo: any = await getCoordinates(store.address);
        store.lat = locationInfo[0].address.y;
        store.lng = locationInfo[0].address.x;
        store.region = locationInfo[0].road_address.region_1depth_name;
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(store.lat, store.lng),
          image: markerImage
        });
        const content = `<div class="wrap">
      <div class="info">
        <div class="title">${store.name}</div> 
          <div class="body"> 
            <div class="img">
              <img src=${store.img} width="73" height="70"> 
            </div>  
              <div class="desc">
                <div class="ellipsis">${store.address}</div>  
                  <div class="jibun ellipsis">${store.openhour}, ${store.tel}</div> 
                    <div>
                      <a href="${store.website}" target="_blank" class="link">홈페이지</a>
                    </div> 
                </div>
           </div>
        </div>   
    </div>`;

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
    $findNearByStoreBtn.addEventListener('click', () => markCurrentLoc(map));
  } catch (err) {
    console.log(err);
  }
};

// const createListNav = () => {
//   const $storeByRegionTab = document.querySelector(
//     '.store-by-region-tabs'
//   ) as HTMLElement;
//   const storeByRegion = stores
//     .map((store: Branch, i: number) => {
//       return store.region;
//     })
//     .filter(
//       (location: any, index: number, locArray: any) =>
//         locArray.indexOf(location) === index
//     );

//   $storeByRegionTab.innerHTML = storeByRegion
//     .map(
//       ($menu: any) =>
//         `<li class="menu-tab"><button class='display-menu-btn'>${$menu}</button></li>`
//     )
//     .join('');
// };

// const displayListNav = () => {
//   const $storeByRegionTab = document.querySelector(
//     '.store-by-region-tabs'
//   ) as HTMLElement;
//   const $storeCarousel = document.querySelector(
//     '.store-carousel'
//   ) as HTMLElement;

//   $storeByRegionTab.addEventListener('click', (e: MouseEvent) => {
//     const target = e.target as HTMLElement;
//     if (!target.classList.contains('display-menu-btn')) return;
//     const matchingStore = stores.filter(
//       (store: Branch) => store.region === target.textContent
//     );
//     $storeCarousel.innerHTML = matchingStore
//       .map((store: Branch) => {
//         return `<img src="${store.img}" alt="${store.name}">`;
//       })
//       .join('');
//   });
// };

const fetchData = async (query: string) => {
  try {
    const response = await axios.get(`http://localhost:7000/${query}`);
    const bookstores = response.data;
    stores = bookstores;
  } catch (err) {
    console.log(err);
  }
};

const renderMap = async (mode: string) => {
  const map = createMap(mode);
  await plotMap(mode, map);
  // createListNav();
  // displayListNav();
};

const initBookStoreMap = async () => {
  try {
    await fetchData('bookstores');
    await renderMap('bookstores');
  } catch (err) {
    console.log(err);
  }
}

const initTheatreMap = async () => {
  try {
    await fetchData('theatres');
    await renderMap('theatres');
  } catch (err) {
    console.log(err);
  }
}

const mapHandler = () => {
  document.addEventListener(
    'DOMContentLoaded',
    kakao.maps.load(async () => {
      initBookStoreMap();
    })
  );

  $bookStoreBtn.addEventListener('click', (e: MouseEvent) => {
    kakao.maps.load(async () => {
     $bookStoreInfo.classList.add('is-active');
     $theatreInfo.classList.remove('is-active');
     initBookStoreMap();
    });
  });

  $theatreBtn.addEventListener('click', (e: MouseEvent) => {
    kakao.maps.load(async () => {
      $theatreInfo.classList.add('is-active');
      $bookStoreInfo.classList.remove('is-active');
      initTheatreMap();
    });
  });

};

export default mapHandler;
