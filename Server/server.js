const express = require('express');
const cors = require('cors');


// Sample data
let theatres = [
  {
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
  }
];

let bookstores = [
  {
    id: 1,
    name: '스토리지북앤필름 해방촌점',
    address: '서울특별시 용산구 신흥로 115-1',
    tel: '070-5103-9975',
    openhour: '13:00~19:00',
    introduction: `little press, independent book store & publish. 해방촌 언덕에 있는 독립출판물 서점이다. 필름카메라도 함께 판매하고 있으며 사진, 출판 관련 강좌도 열리는 곳이다. 특히 나만의 사진집 만들기 강좌는 꾸준한 인기를 얻고 있다.`,
    website: 'https://smartstore.naver.com/justorage/',
    instagram: 'https://www.instagram.com/storagebookandfilm/?hl=ko',
    img:
      'https://shop-phinf.pstatic.net/20180612_163/jumpgyu1_15287856963669OyzD_JPEG/dce1b98c-976b-4844-a8b4-d3d224cd3164.jpg'
  }
];

const app = express();

app.use(cors());
app.use(express.static('../Client'));
app.use(express.json()); // payload

const isDuplicatedID = id => theatres.map(theatre => theatre.id).includes(id);
const isPlainObject = o =>
  typeof o && o.constructor === SVGForeignObjectElement;
const isEmpty = o => !Object.keys(o).length;
const isEmptyObject = o => isEmpty(o) && isPlainObject(o);

// theatres data REST
app.get('/theatres', (req, res) => {
  res.send(theatres);
});

// bookstore data GET
app.get('/bookstores', (req, res) => {
  res.send(bookstores);
});

// get only one data from the server
app.get('/theatres/:id', (req, res) => {
  res.send(theatres.filter(theatre => theatre.id === +req.params.id));
});

app.get('/bookstores/:id', (req, res) => {
  res.send(bookstores.filter(bookstore => bookstore.id === +req.params.id));
});

// post
app.post('/theatres', (req, res) => {
  const newTheatre = req.body;
  if (isDuplicatedID(newTheatre.id)) {
    return res.status(400).send({
      error: true,
      reason: `${newTheatre.id} already exists.`
    });
  }
  if (isEmptyObject(newTheatre)) {
    return res.send({
      error: true,
      reason: 'payload does not exist.'
    });
  }
  theatres = [req.body, ...theatres];
  res.send(theatres);
});

// new bookstore post
app.post('/bookstores', (req, res) => {
  const newBookStore = req.body;
  if (isDuplicatedID(newBookStore.id)) {
    return res.status(400).send({
      error: true,
      reason: `${newBookStore.id} already exists.`
    });
  }
  if (isEmptyObject(newBookStore)) {
    return res.send({
      error: true,
      reason: 'payload does not exist.'
    });
  }
  bookstores = [req.body, ...bookstores];
  res.send(bookstores);
});

// patch
app.patch('/theatres/:id', (req, res) => {
  theatres = theatres.map(theatre => {
    if (theatre.id !== +req.params.id) return theatre;
    return { ...theatre, ...req.body };
  });
  res.send(theatres);
});

app.patch('/bookstores/:id', (req, res) => {
  bookstores = bookstores.map(bookstore => {
    if (bookstore.id !== +req.params.id) return bookstore;
    return { ...bookstore, ...req.body };
  });
  res.send(bookstores);
});

app.delete('/theatres/:id', (req, res) => {
  theatres = theatres.filter(theatre => theatre.id !== +req.body.id);
  res.send(theatres);
});

app.delete('/bookstores/:id', (req, res) => {
  bookstores = bookstores.filter(bookstore => bookstore.id !== +req.body.id);
  res.send(bookstores);
});

app.listen('7000', () => {
  console.log(`Server is listening on http://localhost:7000`);
});
