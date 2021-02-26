declare let kakao: any;

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

export default displayMarker;