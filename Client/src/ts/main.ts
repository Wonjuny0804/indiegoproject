import bookstoreRender from './bookstoreCarousel';
import imageHandler from "./imageHandler";
import mapHandler from "./mapHandler";
import './firebaseSetting'
import './auth'
import { loginLogoLoader, login } from './login'
import fireStore from './db';

// bookstoreRender();
imageHandler();

login();
mapHandler();
fireStore();
