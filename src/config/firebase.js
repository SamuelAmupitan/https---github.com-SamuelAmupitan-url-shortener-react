// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhM2fv5W3gtE6QbTcwBawSOcp8GN64g7M",
  authDomain: "altschool-b910c.firebaseapp.com",
  projectId: "altschool-b910c",
  storageBucket: "altschool-b910c.appspot.com",
  messagingSenderId: "871619301023",
  appId: "1:871619301023:web:35880da17767780ae79caa",
  measurementId: "G-YWCRFLE6PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export {app, auth, googleProvider}