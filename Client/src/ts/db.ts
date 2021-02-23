import firebaseConfig from './firebaseSetting';
import firebase from 'firebase/app'
import 'firebase/firestore';
import carouselImageRender from './carouselImageRender';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

// const theatreRef = firestore.doc('theatre');
// const bookStoreRef = firestore.doc('bookstore');
const theatreColRef = firestore.collection('Theatres');
const bookstoreColRef = firestore.collection('Bookstores');

export default () => {
  // theatreColRef.add({
  //   id: 1,
  //   name: '라이카 시네마',
  //   address: '서울 서대문구 연희로8길 18',
  //   tel: '070-7780-0962',
  //   openhour: '',
  //   introduction: `라이카시네마는 연희동에 불시착한 복합문화공간 '스페이스독'에  안착해있습니다. 스페이스독은 지하1층 라이카시네마, 1~2층 카페스페이스독, 3~4층 스페이스독 스튜디오로 구성됩니다. 
  // 각 공간 간의 유기적인 연결을 통해 창작이 흐르는 복합문화공간 모델을 제시하고자 합니다. 
  // 라이카시네마는 스페이스독 내 공간들, 콘텐츠들과 결합해 극장에서 보다 확장된 체험을 제공합니다.`,
  //   website: 'http://laikacinema.com/',
  //   instagram: 'https://www.instagram.com/laikacinema/',
  //   img: 'https://cdn.imweb.me/thumbnail/20201214/00faa1897f1c8.jpg'
  // })
  // .then(function (docRef) {
  //   console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function (error) {
  //   console.error("Error adding document: ", error);
  // });

  // bookstoreColRef.add({
  //   id: 10,
  //   name: '꿈공작소모모',
  //   address: '인천광역시 강화군 강화읍 북문길 10',
  //   tel: '010-8761-4362',
  //   openhour: 'Thu-Mon 11:00 ~ 17:00',
  //   introduction: `강화 관청리 용흥궁 가는 길목에 있는 아주 작은 책방이다. 상호는 널리 알려진 책 '모모'에서 가져왔다. 책을 사야 입장할 수 있는 조그마한 책방 안에는 예쁜 공간들이 숨어 있다. 책방지기는 한 사람, 한 사람의 꿈을 엮어가는 공간을 목표로 운영하고 있다. 전인성 에디터 팁: 방문 시 '릴레이 필사'를 꼭 시도해볼 것!`,
  //   website: 'https://blog.naver.com/momo_ggum',
  //   instagram: 'www.instagram.com/momo_ggum',
  //   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/IMG_9767_1600.jpg'
  // })
  // .then(function (docRef) {
  //   console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function (error) {
  //   console.error("Error adding document: ", error);
  // });
  
  // theatreColRef.get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // });
  // theatreRef.set()
  // .then(() => {
  //   console.log('Status saved!');
  // })
  // .catch(err => {
  //   console.log('Got an error: ', err);
  // });

  // bookStoreRef.set({
  //   id: 1,
  //   name: '스토리지북앤필름 해방촌점',
  //   address: '서울특별시 용산구 신흥로 115-1',
  //   tel: '070-5103-9975',
  //   openhour: '13:00~19:00',
  //   introduction: `little press,
  //   independent book store & publish.해방촌 언덕에 있는 독립출판물 서점이다.필름카메라도 함께 판매하고 있으며 사진,
  //   출판 관련 강좌도 열리는 곳이다.특히 나만의 사진집 만들기 강좌는 꾸준한 인기를 얻고 있다.`,
  //   website: 'https://smartstore.naver.com/justorage/',
  //   instagram: 'https://www.instagram.com/storagebookandfilm/?hl=ko',
  //   img: 'https://shop-phinf.pstatic.net/20180612_163/jumpgyu1_15287856963669OyzD_JPEG/dce1b98c-976b-4844-a8b4-d3d224cd3164.jpg'
  // })
  // .then(() => {
  //   console.log('Status saved!');
  // })
  // .catch(err => {
  //   console.log('Got an error: ', err);
  // });

  

  bookstoreColRef.get()
  .then(querySnapshot => {
    carouselImageRender(querySnapshot);
  });

  // theatreRef.get()
  //   .then(doc => {
  //     if (doc && doc.exists) {
  //       const myData = doc.data() as firebase.firestore.DocumentData;

  //       sampleImg1.src = myData.img;
  //       $bookstoreCarousel.appendChild(sampleImg1);
  //     }
  //   })
};

// {
//   id: 2,
//   name: '샵 메이커즈',
//   address: '부산 금정구 부산대학로64번길 120',
//   tel: '051-512-9906  ',
//   openhour: '화~일 12:00~19:00',
//   introduction: `꾸준히 성장하는 부산 1호 독립출판서점`,
//   website: 'https://m.blog.naver.com/goforit_k/221701575122',
//   instagram: 'https://www.instagram.com/shop_makers/',
//   img: 'https://post-phinf.pstatic.net/MjAxNzAxMjFfMTE0/MDAxNDg0OTc0ODY5MTM4.a29kUkuyqpnkHM-yw4h5LWR1xKxIJpUB3OqVg130xJMg.tyPFmd3UZDuEVcOWHRcOQZQcYtEE8HuLxUClLkJdcs4g.JPEG/%EB%B6%80%EC%82%B0_%EC%83%B5%EB%A9%94%EC%9D%B4%EC%BB%A4%EC%A6%88%EC%99%B8%EA%B4%802.jpg?type=w1200'
// }
// {
//   id: 3,
//   name: '이야호우북스',
//   address: '경기도 고양시 일산서구 탄중로101번길 41 (덕이동) 388-8',
//   tel: '0507-1369-9193',
//   openhour: '',
//   introduction: `경기 고양 일산서구 덕이동에 있는 그림책 서점이다. 책으로 잇는 복합문화예술 공간을 목표로 독립출판물과 다양한 분야의 책, 굿즈를 소개하며, 커피를 함께 즐길 수 있다. 독서와 북토크, 공연, 전시, 강연, 그림책 만들기 워크숍 등 다양한 모임을 열며 공간대여를 제공한다.`,
//   website: 'iyahoubooks.modoo.at',
//   instagram: 'www.instagram.com/iyahou_books',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/iyahou_books_137670636_179010127333158_3767788679059195621_n.jpg'
// }
// {
//   id: 4,
//   name: '월곶동책한송이',
//   address: '경기도 시흥시 월곶해안로 111',
//   tel: '070-7756-0070',
//   openhour: 'Everyday 09:30 ~ 24:00',
//   introduction: `소소한 사치를 즐길 수 있는 공간을 꿈꾸는 로컬벤처회사 ‘빌드’의 2호점으로, 독립출판물과 꽃, 식물을 주로 소개한다. 커피나 차를 함께 즐길 수 있다.`,
//   website: 'chaeg1songi.imweb.me',
//   instagram: 'www.instagram.com/chaeg_han_song_i_book',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/chaeg_han_song_i_42655761_273777546587811_8874105253233482528_n.jpg'
// }
// {
//   id: 5,
//   name: '그런의미에서',
//   address: '경기도 수원시 영통구 매여울로40번길 42-2',
//   tel: '010-6480-5534',
//   openhour: 'Tue-Sun 14:00 ~ 21:00',
//   introduction: `경기도 수원 영통구 매탄동 아주대 근처에 있는 독립출판물 서점이다. 주말에만 문을 열며, 독립출판물과 에세이, 소설, 시를 주로 소개한다. 주인장은 이 공간에서 사람들이 주말에 읽을만한 책을 찾고 의미를 만들기를 바란다.`,
//   website: 'blog.naver.com/2nd_meaning',
//   instagram: 'https://www.instagram.com/2nd_his_meaningshop',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/his_bookshop_54463872_400835227423766_8066434258263284492_n.jpg'
// }
// {
//   id: 6,
//   name: '핸즈북스',
//   address: '부산광역시 연제구 거제대로252번길 7',
//   tel: '051-868-2682',
//   openhour: 'Mon-Fri 10:00 ~ 16:00, Sat. Reservation only',
//   introduction: `부산 거제동에 있는 공예(工藝) 전문 공방 겸 서점이다. 공예실용서와 전통공예, 복식유물 관련 책을 주로 소개하며, 인문과 에세이 등 일반서적 신간과 베스트셀러를 판매한다. 전통공예와 규방공예, 전통매듭 등 다양한 워크숍과 전시를 연다. 책방지기는 눈으로 보는 행복, 손으로 만드는 즐거움을 동시에 느낄 수 있는 공간으로 만들어가고 있다.`,
//   website: 'handsbooks1.modoo.at',
//   instagram: 'www.instagram.com/handsbooks',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/handsbooks-cover_1600.jpg'
// }
// {
//   id: 7,
//   name: '플리커러프엣지',
//   address: '전라북도 전주시 완산구 서신천변로 43',
//   tel: '070-4245-7196',
//   openhour: 'Tue-Sun 14:00 ~ 19:00',
//   introduction: `	전북 전주시 서신동에 있는 예술 서점이다. 책방지기는 책과 함께하는 소통의 공간으로 만들고자 한다. 디자인 전문회사 '디자인에보'가 운영한다. 독서모임과 워크숍, 강좌를 정기적으로 열며 아티스트 레지던시를 제공한다.`,
//   website: 'www.designevogroup.com',
//   instagram: 'www.instagram.com/flicker_roughedge_books',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/Flicker-Designevo-Jeonju.jpg'
// }
// {
//   id: 8,
//   name: '청맥살롱',
//   address: '서울특별시 동작구 서달로 161-1',
//   tel: '02-822-1605',
//   openhour: '월-금요일 11:00 ~ 21:00, 토-일요일 12:00 ~ 21:00',
//   introduction: `서울 흑석동 중앙대 근처에 있는 술이 있는 서점이다. 2011년에 문닫은 ‘청맥서점’을 새로 고쳐 복합문화공간으로 운영하고 있다. 다양한 분야의 책과 함께 커피와 맥주 등 다양한 음료를 함께 즐길 수 있다.`,
//   website: 'https://www.facebook.com/chmk.salon',
//   instagram: 'https://www.instagram.com/seodalro_161_1',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/01_%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF_%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%86%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%AF%E1%84%85%E1%85%A9%E1%86%BC-c.jpg'
// }
// {
//   id: 9,
//   name: '아베끄',
//   address: '제주특별자치도 제주시 한림읍 금능9길 1-1',
//   tel: '010-3299-1609',
//   openhour: 'Thu-Tue 13:00 ~ 19:00',
//   introduction: `	서점 안 작은 창문으로 바다가 내다보이며, 마당에는 편안하게 책을 읽을 수 있는 간이 의자와 소파가 마련되어 있는 서점이다. 책방에 딸린 방 하나를 북스테이 '오사랑'으로 운영한다.`,
//   website: 'https://www.instagram.com/bookstay_avec',
//   instagram: 'https://www.instagram.com/bookstay_avec',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A6%E1%84%81%E1%85%B3.jpg'
// }
// {
//   id: 10,
//   name: '꿈공작소모모',
//   address: '인천광역시 강화군 강화읍 북문길 10',
//   tel: '010-8761-4362',
//   openhour: 'Thu-Mon 11:00 ~ 17:00',
//   introduction: `강화 관청리 용흥궁 가는 길목에 있는 아주 작은 책방이다. 상호는 널리 알려진 책 '모모'에서 가져왔다. 책을 사야 입장할 수 있는 조그마한 책방 안에는 예쁜 공간들이 숨어 있다. 책방지기는 한 사람, 한 사람의 꿈을 엮어가는 공간을 목표로 운영하고 있다. 전인성 에디터 팁: 방문 시 '릴레이 필사'를 꼭 시도해볼 것!`,
//   website: 'https://blog.naver.com/momo_ggum',
//   instagram: 'www.instagram.com/momo_ggum',
//   img: 'https://bookshopmap.s3.ap-northeast-2.amazonaws.com/venue/IMG_9767_1600.jpg'
// }