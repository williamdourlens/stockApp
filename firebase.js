// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBciOQO2S24QgoYkEJPxa7mKsE5wXROY0A",
  authDomain: "projetmobil-1094c.firebaseapp.com",
  databaseURL: "https://projetmobil-1094c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projetmobil-1094c",
  storageBucket: "projetmobil-1094c.appspot.com",
  messagingSenderId: "938188611333",
  appId: "1:938188611333:web:347671bdf9c1050b70e16c"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
 
const auth = firebase.auth()
export { auth };