// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC2NryhwMHBPuiVxEuiM_OnQCPBWZqLruM",
  authDomain: "web-dev-62327.firebaseapp.com",
  projectId: "web-dev-62327",
  storageBucket: "web-dev-62327.appspot.com",
  messagingSenderId: "58803590966",
  appId: "1:58803590966:web:810d6f4c2b9f215e4c8597",
  measurementId: "G-8DJP6HKFTD"
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export {app, db} ;