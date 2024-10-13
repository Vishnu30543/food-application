// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";   // to be added
const firebaseConfig = {
  apiKey: "AIzaSyC2NryhwMHBPuiVxEuiM_OnQCPBWZqLruM",
  authDomain: "web-dev-62327.firebaseapp.com",
  projectId: "web-dev-62327",
  storageBucket: "web-dev-62327.appspot.com",
  messagingSenderId: "58803590966",
  appId: "1:58803590966:web:871cbb1aea146bda4c8597",
  measurementId: "G-5VGRMKDP3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db= getFirestore(app);

// Initialize Firebase
const auth = getAuth(app); // to be added



export {app, db, auth} ;