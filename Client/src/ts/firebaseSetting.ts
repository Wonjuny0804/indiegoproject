import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRj2S9njyGMVrQk2AO703DLtfwaB0SGHM",
  authDomain: "indiegoproject-70a10.firebaseapp.com",
  databaseURL: "https://indiegoproject-70a10-default-rtdb.firebaseio.com",
  projectId: "indiegoproject-70a10",
  storageBucket: "indiegoproject-70a10.appspot.com",
  messagingSenderId: "288473341976",
  appId: "1:288473341976:web:2afe55a4907822d1eda36d",
  measurementId: "G-15P9PGS5L3"
}

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();