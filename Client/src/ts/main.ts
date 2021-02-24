import bookstoreRender from './bookstoreCarousel';
import imageHandler from "./imageHandler";
import mapHandler from "./mapHandler";
import './firebaseSetting';
import fireStore from './db';
import login from './login';

// bookstoreRender();
imageHandler();

login();
mapHandler();
fireStore();
