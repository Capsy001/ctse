// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBelEjPtcVfRjMrwItl8KnyEpl_X8NkRAE",
  authDomain: "ctse-67495.firebaseapp.com",
  projectId: "ctse-67495",
  storageBucket: "ctse-67495.appspot.com",
  messagingSenderId: "619712461643",
  appId: "1:619712461643:web:473cf770c29443a14806ce",
  measurementId: "G-5W3HRV7R21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export {db, app}
