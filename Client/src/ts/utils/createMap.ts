declare let kakao: any;

const createMap = (mode: string) => {
  const $bookStoreMap = document.querySelector('.bookstore-map') as HTMLElement;
  const $theatreMap = document.querySelector('.theatre-map') as HTMLElement;
  const $container = (mode === 'bookstores' ? $bookStoreMap : $theatreMap);
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978),
    level: 12
  };
  return new kakao.maps.Map($container, options);
};

export default createMap;