declare let kakao: any;

const getCoordinates = (address: string):Promise<Object> => {
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

export default getCoordinates;