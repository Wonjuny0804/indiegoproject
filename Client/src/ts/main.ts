import bookstoreRender from './bookstoreCarousel';
import imageHandler from "./imageHandler";
import './firebaseSetting'
import './auth'
import { loginLogoLoader, login } from './login'


bookstoreRender();
imageHandler();

login();
