// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkmEU3MADD1-FLzxt-7urMCIgnaFWl4Uo",
  authDomain: "portfolio-builder-92cdb.firebaseapp.com",
  databaseURL: "https://portfolio-builder-92cdb-default-rtdb.firebaseio.com",
  projectId: "portfolio-builder-92cdb",
  storageBucket: "portfolio-builder-92cdb.appspot.com",
  messagingSenderId: "512285391370",
  appId: "1:512285391370:web:1412be81e96c8993fd7df3",
  measurementId: "G-CMQEY9Z6XE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
