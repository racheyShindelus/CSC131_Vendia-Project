import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpDsHiOnchrgqir3aFN4QdVuYMDgPQVG8",
  authDomain: "csc131authnauthz.firebaseapp.com",
  projectId: "csc131authnauthz",
  storageBucket: "csc131authnauthz.appspot.com",
  messagingSenderId: "617099672602",
  appId: "1:617099672602:web:a5e3359496444103df25a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDpDsHiOnchrgqir3aFN4QdVuYMDgPQVG8",
//   authDomain: "csc131authnauthz.firebaseapp.com",
//   projectId: "csc131authnauthz",
//   storageBucket: "csc131authnauthz.appspot.com",
//   messagingSenderId: "617099672602",
//   appId: "1:617099672602:web:a5e3359496444103df25a3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);