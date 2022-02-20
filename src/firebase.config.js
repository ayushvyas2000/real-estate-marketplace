import {getFirestore} from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGTk8SsyL4FQ87UztelMeg7YZRrk01tnI",
  authDomain: "real-estate-marketplace-c8f47.firebaseapp.com",
  projectId: "real-estate-marketplace-c8f47",
  storageBucket: "real-estate-marketplace-c8f47.appspot.com",
  messagingSenderId: "650038400110",
  appId: "1:650038400110:web:43b4c98e070c12c60f827f"
};

initializeApp(firebaseConfig);
export const db=getFirestore()