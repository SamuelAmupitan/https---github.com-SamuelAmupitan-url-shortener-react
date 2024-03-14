// firebase.d.ts

import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Auth, GoogleAuthProvider } from 'firebase/auth';

declare module 'firebase/auth' {
  interface Auth {

  }
}

declare module 'firebase/app' {
  interface FirebaseApp {

  }
}

const firebaseConfig: FirebaseOptions;
const app: FirebaseApp;
const auth: Auth;
const googleProvider: GoogleAuthProvider;

export { firebaseConfig, app, auth, googleProvider };
