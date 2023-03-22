// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage= firebase.storage;
const auth = firebase.auth();

export { auth, storage, firebase };
