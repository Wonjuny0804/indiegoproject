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

export default toggleInfoWindow;