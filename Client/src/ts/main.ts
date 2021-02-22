import bookstoreRender from './bookstoreCarousel';
import imageHandler from "./imageHandler";
import mapHandler from "./mapHandler";

import './firebaseSetting'
import './auth'
import './login'
import fireStore from './db';

// bookstoreRender();
imageHandler();
mapHandler();
fireStore();
