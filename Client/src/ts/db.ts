import firebaseConfig from './firebaseSetting';
import firebase from 'firebase/app'
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const theatreRef = firestore.doc('datas/Theatre');
const bookStoreRef = firestore.doc('datas/Bookstore');

export default () => {
  theatreRef.set({
      id: 1,
      name: '라이카 시네마',
      address: '서울 서대문구 연희로8길 18',
      tel: '070-7780-0962',
      openhour: '',
      introduction: `라이카시네마는 연희동에 불시착한 복합문화공간 '스페이스독'에  안착해있습니다. 스페이스독은 지하1층 라이카시네마, 1~2층 카페스페이스독, 3~4층 스페이스독 스튜디오로 구성됩니다. 
    각 공간 간의 유기적인 연결을 통해 창작이 흐르는 복합문화공간 모델을 제시하고자 합니다. 
    라이카시네마는 스페이스독 내 공간들, 콘텐츠들과 결합해 극장에서 보다 확장된 체험을 제공합니다.`,
      website: 'http://laikacinema.com/',
      instagram: 'https://www.instagram.com/laikacinema/',
      img: 'https://cdn.imweb.me/thumbnail/20201214/00faa1897f1c8.jpg'
    })
    .then(() => {
      console.log('Status saved!');
    })
    .catch(err => {
      console.log('Got an error: ', err);
    });

  const sampleImg1 = new Image();
  const $bookstoreCarousel = document.querySelector('.bookstore-carousel-slides') as HTMLElement;
  theatreRef.get()
    .then(doc => {
      if (doc && doc.exists) {
        const myData = doc.data() as firebase.firestore.DocumentData;

        sampleImg1.src = myData.img;
        $bookstoreCarousel.appendChild(sampleImg1);
      }
    })
};