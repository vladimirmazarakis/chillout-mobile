// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSlAjzQIdYfXlUTE4TzEUoHeDlDaZCeco",
  authDomain: "chillout-development-1e21e.firebaseapp.com",
  projectId: "chillout-development-1e21e",
  storageBucket: "chillout-development-1e21e.appspot.com",
  messagingSenderId: "640438306486",
  appId: "1:640438306486:web:66b72da39f2478af0fc817",
  measurementId: "G-M8XCZVDLJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {app, auth, firestore}