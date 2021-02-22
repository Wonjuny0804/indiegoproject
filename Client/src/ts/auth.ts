import firebaseConfig from './firebaseSetting'
import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)

const defaultAuth = firebase.auth()

