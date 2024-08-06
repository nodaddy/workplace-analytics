// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {config} from 'dotenv';
config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "piper-efac2.firebaseapp.com",
  projectId: "piper-efac2",
  storageBucket: "piper-efac2.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_AP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);