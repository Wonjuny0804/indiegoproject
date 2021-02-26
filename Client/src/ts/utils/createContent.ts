import { Branch } from '../interface/interface';

export const createNearStoreContent = ({id, name, distance, lat, lng}: Branch) => {
  return `<li class="store-list">
    <button class="locate-store-btn" id="${id}">${name}</button>
    <span class="distance-info">${Math.ceil(distance) / 1000}km</span>
    <a target="_blank" href="https://map.kakao.com/link/to/${name},${lat},${lng}"><i class="fas fa-directions"></i></a>
    </li>
    `
}

export const createInfoWindowContent = ({name, address, openhour, tel}: Branch) => {
  return `<div class="wrap">
          <div class="info">
            <div class="title">${name}</div> 
              <div class="body"> 
                  <div class="desc">
                    <address class="ellipsis">${address}</address>  
                      <p class="openhour">${openhour}</p> 
                      <a href="tel:+${tel}" class="tel">${tel}</a> 
                    </div>
              </div>
            </div>   
        </div>`;
}

export const createCarouselContent = ({id, img, name, address, introduction, instagram, website}: Branch) => {
  return ` <div class="slide" id=${id}> 
              <img src="${img}" alt="${name}">
              <div class="info-panel">
                <h2>${name}</h2>
                <span class="address"><i class="fas fa-map-marker-alt"></i> ${address}</span>
                <p>${introduction}</p>
              </div>
              <div class="overlay">
                <button type="button" class="favorite-btn">❤︎</button>
                <a href="${instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="${website}" target="_blank"><i class="fas fa-home"></i></a>
              </div> 
          </div>
        `

}